import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 768px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !compact,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.5 : 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const group = new THREE.Group();
    group.position.set(compact ? 0 : 1.7, compact ? 0.3 : 0, 0);
    group.scale.setScalar(compact ? 0.8 : 1);
    scene.add(group);

    const outerGeometry = new THREE.IcosahedronGeometry(1.75, 1);
    const outerMaterial = new THREE.MeshBasicMaterial({
      color: 0x2ef2b6,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const outer = new THREE.Mesh(outerGeometry, outerMaterial);
    group.add(outer);

    const innerGeometry = new THREE.IcosahedronGeometry(1.15, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const inner = new THREE.Mesh(innerGeometry, innerMaterial);
    group.add(inner);

    const ringGeometry = new THREE.TorusGeometry(2.5, 0.014, 8, 180);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4d8d,
      transparent: true,
      opacity: 0.55,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.5;
    ring.rotation.y = 0.3;
    group.add(ring);

    const ring2Geometry = new THREE.TorusGeometry(2.85, 0.01, 8, 180);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0x9be8ff,
      transparent: true,
      opacity: 0.28,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.z = 0.5;
    group.add(ring2);

    const particleCount = compact ? 220 : 650;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[index * 3 + 2] = radius * Math.cos(phi);
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xbfefff,
      size: compact ? 0.035 : 0.03,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const clock = new THREE.Clock();
    let frame = 0;
    let visible = true;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();

      pointer.x += (target.x - pointer.x) * 0.045;
      pointer.y += (target.y - pointer.y) * 0.045;

      camera.position.x = pointer.x * 0.7;
      camera.position.y = -pointer.y * 0.45;
      camera.lookAt(0, 0, 0);

      group.rotation.y = elapsed * 0.16 + pointer.x * 0.3;
      group.rotation.x = Math.sin(elapsed * 0.3) * 0.08 - pointer.y * 0.18;
      inner.rotation.y = -elapsed * 0.35;
      inner.rotation.z = elapsed * 0.14;
      ring.rotation.z = elapsed * 0.22;
      ring2.rotation.z = -elapsed * 0.16;
      points.rotation.y = elapsed * 0.025;

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!visible) return;
      renderFrame();
      frame = requestAnimationFrame(loop);
    };

    if (reduceMotion) {
      resize();
      renderFrame();
    } else {
      loop();
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = entry.isIntersecting;
        if (nextVisible === visible) return;
        visible = nextVisible;
        if (visible && !reduceMotion) {
          clock.start();
          loop();
        } else {
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      outerGeometry.dispose();
      outerMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none h-full w-full opacity-40 md:opacity-75"
    />
  );
}

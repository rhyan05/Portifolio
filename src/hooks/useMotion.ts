import { useEffect, useState } from "react";

const STORAGE_KEY = "rhyan-motion";
const EVENT = "rhyan:motion";

export function readMotion(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

export function applyMotionToDocument(enabled: boolean) {
  document.documentElement.classList.toggle("force-motion", enabled);
}

export function setMotion(enabled: boolean) {
  applyMotionToDocument(enabled);
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function useMotion() {
  const [enabled, setEnabled] = useState(readMotion);

  useEffect(() => {
    const sync = () => setEnabled(readMotion());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  return { enabled, toggle: () => setMotion(!readMotion()) };
}

import { useEffect, useState } from "react";

export function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScroll && current > 150);
      setShowBackToTop(current < lastScroll && current > 150);
      lastScroll = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { hidden, showBackToTop };
}

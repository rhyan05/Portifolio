import { useCallback, useState } from "react";

export function useShowMore(total: number, step: number) {
  const [visible, setVisible] = useState(step);

  const expanded = visible >= total;
  const hasMore = total > step;

  const toggle = useCallback(() => {
    setVisible((current) => (current >= total ? step : total));
  }, [total, step]);

  const reset = useCallback(() => setVisible(step), [step]);

  return { visible, expanded, hasMore, toggle, reset };
}

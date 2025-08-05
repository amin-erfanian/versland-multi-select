import { useEffect } from "react";

type Handler = (event: MouseEvent | TouchEvent | PointerEvent) => void;

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: Handler
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent | PointerEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("pointerdown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("pointerdown", listener);
    };
  }, [ref, handler]);
}

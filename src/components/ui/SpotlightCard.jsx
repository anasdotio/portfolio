import { useCallback, useRef } from "react";

/**
 * A card that tracks the pointer and renders a radial highlight that follows
 * the cursor, plus a matching border glow. Pure CSS via custom properties so
 * there is no re-render on pointer move.
 */
const SpotlightCard = ({ children, className = "", as: Tag = "div", ...rest }) => {
  const ref = useRef(null);

  const onPointerMove = useCallback((event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Tag
      ref={ref}
      onPointerMove={onPointerMove}
      className={`group relative isolate overflow-hidden rounded-2xl ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default SpotlightCard;

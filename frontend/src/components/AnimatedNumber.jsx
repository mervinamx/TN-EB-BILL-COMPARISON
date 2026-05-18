import { useEffect, useRef, useState } from 'react';

const AnimatedNumber = ({ value, prefix = '', suffix = '', decimals = 0, duration = 800 }) => {
  const [display, setDisplay] = useState(0);
  const animRef = useRef(null);
  const startRef = useRef(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const start = startRef.current;
    const end = value;
    startTimeRef.current = null;

    if (animRef.current) cancelAnimationFrame(animRef.current);

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplay(current);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        startRef.current = end;
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [value, duration]);

  const formatted = display.toFixed(decimals);

  return (
    <span>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default AnimatedNumber;

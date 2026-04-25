import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const xTo = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onEnter = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      if (t.matches('a, button, [data-magnetic]')) ring.classList.add('hover');
    };
    const onLeave = () => ring.classList.remove('hover');

    document.addEventListener('mousemove', onMove);
    const interactive = document.querySelectorAll('a, button, [data-magnetic]');
    interactive.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      interactive.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default Cursor;

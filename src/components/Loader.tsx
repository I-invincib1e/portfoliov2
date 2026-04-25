import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onDone }: { onDone: () => void }) => {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(obj.v)),
      onComplete: () => {
        gsap.to(root.current, {
          yPercent: -100,
          duration: 1.0,
          ease: 'power3.inOut',
          delay: 0.2,
          onComplete: onDone,
        });
      },
    });
    return () => { tween.kill(); };
  }, [onDone]);

  return (
    <div ref={root} className="curtain">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: '#e26a3d' }} />
        <span>RP — Studio</span>
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(4rem, 14vw, 12rem)',
        lineHeight: 1,
        fontStyle: 'italic',
        textTransform: 'none',
        letterSpacing: '-0.04em',
      }}>
        {String(count).padStart(3, '0')}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div>Mumbai</div>
        <div style={{ opacity: 0.6 }}>2026 / Edition 04</div>
      </div>
    </div>
  );
};

export default Loader;

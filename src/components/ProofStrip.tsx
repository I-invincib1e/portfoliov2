import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const proofItems = [
  { label: 'AI Product Experiments', detail: 'Agents, voice, automation' },
  { label: 'Voice Systems', detail: 'Realtime AI infrastructure' },
  { label: 'React / Python / Supabase', detail: 'Full-stack builder' },
  { label: 'Builder Logs & Field Notes', detail: 'Building in public' },
];

const ProofStrip = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.proof-item',
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: 'top 90%' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Proof"
      style={{
        background: 'var(--paper)',
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
        padding: '28px 0',
      }}
    >
      <div className="container-ed">
        <div
          className="proof-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            alignItems: 'baseline',
          }}
        >
          {proofItems.map((p, i) => (
            <div
              key={p.label}
              className="proof-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                position: 'relative',
                paddingLeft: i === 0 ? 0 : 20,
                borderLeft: i === 0 ? 'none' : '1px solid var(--rule)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                }}
              >
                <span style={{ color: 'var(--ember)', marginRight: 6 }}>✦</span>
                {p.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                {p.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .proof-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 22px !important; }
          .proof-item:nth-child(3) { border-left: none !important; padding-left: 0 !important; }
        }
        @media (max-width: 480px) {
          .proof-grid { grid-template-columns: 1fr !important; }
          .proof-item { border-left: none !important; padding-left: 0 !important; }
        }
      `}</style>
    </section>
  );
};

export default ProofStrip;

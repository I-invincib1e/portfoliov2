import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

type HeroProps = { ready?: boolean };

const Hero = ({ ready = true }: HeroProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    let killed = false;
    const run = () => {
      if (killed || !ref.current) return;
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.hero-mask').forEach((el, i) => {
          const inner = el.querySelector('span');
          gsap.set(inner, { yPercent: 110 });
          gsap.to(inner, {
            yPercent: 0,
            duration: 1.2,
            delay: 0.05 + i * 0.09,
            ease: 'expo.out',
          });
        });
        gsap.fromTo('.hero-fade', { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 1, delay: 0.5, stagger: 0.07, ease: 'power2.out',
        });
        gsap.fromTo('.hero-side', { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 0.7 });
        gsap.fromTo('.hero-numeral', { opacity: 0, scale: 0.96 }, {
          opacity: 1, scale: 1, duration: 1.6, delay: 0.3, ease: 'power3.out',
        });
        if (window.innerWidth > 640) {
          gsap.to('.hero-strip', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
        }
      }, ref);
      // store on element for cleanup
      (ref.current as any)._ctx = ctx;
    };

    const fontsReady = (document as any).fonts?.ready ?? Promise.resolve();
    document.documentElement.classList.add('fonts-loading');
    fontsReady.finally(() => {
      document.documentElement.classList.remove('fonts-loading');
      run();
    });

    return () => {
      killed = true;
      const c = (ref.current as any)?._ctx;
      if (c) c.revert();
    };
  }, [ready]);

  const ctaLabel = 'See what I ship';

  return (
    <section
      ref={ref}
      className="hero-root"
      style={{
        minHeight: '100vh',
        position: 'relative',
        paddingTop: '110px',
        paddingBottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--paper)',
        overflow: 'hidden',
      }}
    >
      {/* outline numeral */}
      <div
        className="hero-numeral"
        aria-hidden
        style={{
          position: 'absolute',
          top: '12vh',
          right: '-3vw',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'min(60vw, 56rem)',
          lineHeight: 0.8,
          color: 'transparent',
          WebkitTextStroke: '1px var(--rule-strong)',
          letterSpacing: '-0.05em',
          opacity: 0.18,
          pointerEvents: 'none',
          userSelect: 'none',
          fontWeight: 300,
        }}
      >
        01
      </div>

      {/* faint editorial grid */}
      <svg
        aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }}
      >
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* vertical caption */}
      <div
        className="hero-side"
        style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'left center',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        ◆ 01 / Mumbai · Established 2022 · Edition 04
      </div>

      <div className="container-ed" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-fade" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div className="eyebrow">Portfolio / 2026 Edition</div>
          <div className="eyebrow" style={{ color: 'var(--ink-muted)' }}>Mumbai · Edition 04</div>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.6rem, 9.5vw, 10rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            margin: 0,
            maxWidth: '18ch',
          }}
        >
          <div className="mask hero-mask">
            <span style={{ fontWeight: 300 }}>
              Building <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--ember)' }}>AI systems</em>, SaaS products,
            </span>
          </div>
          <div className="mask hero-mask">
            <span style={{ fontWeight: 300 }}>
              and automation tools people actually use.
            </span>
          </div>
        </h1>

        <p className="hero-fade" style={{
          marginTop: 28,
          maxWidth: 640,
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
          lineHeight: 1.5,
          color: 'var(--ink-soft)',
        }}>
          Built and launched Adloom on Shopify. Currently building voice AI infrastructure and experimental automation products.
        </p>
      </div>

      <div className="container-ed hero-fade" style={{ marginTop: 'auto', paddingTop: 60, position: 'relative', zIndex: 2 }}>
        <div className="editorial-grid">
          <div style={{ gridColumn: 'span 6' }}>
            <div className="hairline" style={{ marginBottom: 14 }}>What I build</div>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: 'var(--ink-soft)',
              maxWidth: 460,
              lineHeight: 1.6,
            }}>
              AI-powered SaaS, voice AI systems, and automation tools that
              take messy, manual workflows and turn them into products merchants
              and teams can actually rely on.
            </p>
          </div>

          <div className="hero-cta-col" style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', gap: 14 }}>
            <a
              href="#adloom"
              className="btn-ink hero-cta"
              data-magnetic
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('adloom')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="ember-asterisk" aria-hidden>✦</span>
              {ctaLabel}
              <span aria-hidden>→</span>
            </a>
            <Link
              to="/logs"
              className="resume-link"
              style={{
                fontSize: 13,
                color: 'var(--ink-soft)',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
              }}
            >
              or read build logs →
            </Link>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                color: 'var(--ink-muted)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              résumé ↗
            </a>
          </div>
        </div>

        <div style={{
          marginTop: 36,
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
        }}>
          <span>Scroll · 002 chapters</span>
          <span>↓</span>
        </div>
      </div>

      <div style={{
        marginTop: 60,
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
        overflow: 'hidden',
        padding: '20px 0',
        position: 'relative',
        zIndex: 2,
      }}>
        <div className="hero-strip" style={{ display: 'flex', whiteSpace: 'nowrap', gap: 48, willChange: 'transform' }}>
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} style={{ display: 'flex', gap: 48, paddingRight: 48 }}>
              {['React', 'TypeScript', 'Tailwind', 'GSAP', 'Supabase', 'LangChain', 'Groq', 'Next.js', 'Framer Motion', 'Python'].map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.3rem, 5vw, 3.5rem)',
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                }}>
                  {t} <span style={{ color: 'var(--ember)' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-cta { position: relative; }
        .hero-cta .ember-asterisk {
          display: inline-block;
          color: var(--ember);
          margin-right: 4px;
          animation: spin-ember 6s linear infinite;
        }
        @keyframes spin-ember { to { transform: rotate(360deg); } }
        @media (max-width: 720px) {
          .hero-side { display: none; }
        }
        @media (max-width: 768px) {
          .hero-numeral { font-size: min(80vw, 18rem) !important; top: 10vh !important; right: -10vw !important; opacity: 0.12 !important; }
          .hero-root { padding-top: 96px !important; }
          .hero-cta-col { align-items: flex-start !important; margin-top: 8px; }
          .hero-cta-col .btn-ink { width: 100%; justify-content: center; }
        }
        @media (max-width: 640px) {
          .hero-root { min-height: auto !important; padding-bottom: 24px !important; }
          .hero-numeral { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-strip, .hero-cta .ember-asterisk { animation: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;

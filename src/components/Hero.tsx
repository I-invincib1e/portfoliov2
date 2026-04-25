import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { fetchNow, NowWidget } from '../lib/supabase';
import { siteConfig } from '../config/siteConfig';

type HeroProps = { ready?: boolean };

const Hero = ({ ready = true }: HeroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState<NowWidget | null>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    fetchNow().then(n => setNow(n));
  }, []);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false,
    }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

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
        gsap.to('.hero-strip', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
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

  const ctaLabel = 'Commission a project';

  return (
    <section
      ref={ref}
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

      {/* organic ink shapes */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        style={{ position: 'absolute', top: '20%', left: '-40px', width: 180, height: 180, color: 'var(--ember)', opacity: 0.85, pointerEvents: 'none' }}
      >
        <path d="M30,100 C30,50 80,30 130,50 C170,68 175,120 140,150 C100,180 50,160 30,120 Z" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        style={{ position: 'absolute', bottom: '14%', right: '6%', width: 140, height: 140, color: 'var(--moss)', opacity: 0.5, pointerEvents: 'none' }}
      >
        <path d="M20,60 Q100,-10 180,60 T180,160 Q100,200 20,140 Z" fill="none" stroke="currentColor" strokeWidth="1" />
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
            fontSize: 'clamp(3rem, 12vw, 13rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            margin: 0,
          }}
        >
          <div className="mask hero-mask">
            <span style={{ fontWeight: 300 }}>Frontend</span>
          </div>
          <div className="mask hero-mask">
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>
              craft<span style={{ color: 'var(--ember)' }}>,</span>
            </span>
          </div>
          <div className="mask hero-mask" style={{ textAlign: 'right' }}>
            <span style={{ fontWeight: 500 }}>
              for the AI<span style={{ color: 'var(--ember)' }}>—</span>era.
            </span>
          </div>
        </h1>
      </div>

      <div className="container-ed hero-fade" style={{ marginTop: 'auto', paddingTop: 60, position: 'relative', zIndex: 2 }}>
        <div className="editorial-grid">
          <div style={{ gridColumn: 'span 4' }}>
            <div className="hairline" style={{ marginBottom: 14 }}>About</div>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: 'var(--ink-soft)',
              maxWidth: 360,
              lineHeight: 1.6,
            }}>
              Frontend engineer pairing <em>typography</em>, motion and large
              language models — building React systems that feel composed
              rather than assembled.
            </p>
          </div>

          <div style={{ gridColumn: 'span 4' }}>
            <div className="hairline" style={{ marginBottom: 14 }}>Now / Live</div>
            {now ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-soft)', lineHeight: 2, letterSpacing: '0.04em' }}>
                <li>↳ <span style={{ color: 'var(--ink-muted)' }}>loc</span> &nbsp; {now.location} · {time} IST</li>
                <li>↳ <span style={{ color: 'var(--ink-muted)' }}>read</span>&nbsp; {now.currently_reading}</li>
                <li>↳ <span style={{ color: 'var(--ink-muted)' }}>play</span>&nbsp; {now.currently_listening}</li>
              </ul>
            ) : (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)' }}>loading index card…</div>
            )}
          </div>

          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', gap: 14 }}>
            <Link
              to="/contact"
              className="btn-ink hero-cta"
              data-magnetic
            >
              <span className="ember-asterisk" aria-hidden>✦</span>
              {ctaLabel}
              <span aria-hidden>→</span>
            </Link>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-link"
              style={{ fontSize: 13 }}
            >
              or download résumé
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
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
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
          .hero-numeral { font-size: min(80vw, 22rem) !important; top: 8vh !important; right: -8vw !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-strip, .hero-cta .ember-asterisk { animation: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;

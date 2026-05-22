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
      }, ref);
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

  return (
    <section
      ref={ref}
      className="hero-root"
      style={{
        minHeight: '100vh',
        position: 'relative',
        paddingTop: 'clamp(140px, 20vh, 220px)',
        paddingBottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--paper)',
      }}
    >
      <div className="container-ed" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-fade" style={{ marginBottom: 32 }}>
          <div className="eyebrow">Rushikesh Pawar · Builder & AI Product Engineer</div>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.4rem, 7.5vw, 6.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            margin: 0,
            maxWidth: '18ch',
          }}
        >
          <div className="mask hero-mask">
            <span style={{ fontWeight: 300 }}>
              I build <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--ember)' }}>AI-powered</em> products
            </span>
          </div>
          <div className="mask hero-mask">
            <span style={{ fontWeight: 300 }}>
              and operational tools.
            </span>
          </div>
        </h1>

        <p className="hero-fade" style={{
          marginTop: 36,
          maxWidth: 600,
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
          lineHeight: 1.6,
          color: 'var(--ink-soft)',
        }}>
          Currently exploring AI agents, workflow automation, and product systems.
        </p>

        <div className="hero-fade" style={{ marginTop: 44, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/projects"
            className="btn-ink hero-cta"
            data-magnetic
          >
            View Projects <span aria-hidden>→</span>
          </Link>
          <Link
            to="/writing"
            className="btn-outline hero-cta"
            data-magnetic
            style={{
              borderColor: 'var(--ink)',
              color: 'var(--ink)',
            }}
          >
            Read Builder Notes
          </Link>
          <Link
            to="/contact"
            style={{
              fontSize: 14,
              color: 'var(--ink-soft)',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              transition: 'color 0.3s var(--ease-out)',
              padding: '10px 0',
            }}
          >
            Contact Me →
          </Link>
        </div>

        <div className="hero-fade" style={{ marginTop: 16 }}>
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
            resume ↗
          </a>
        </div>
      </div>

      <div className="container-ed hero-fade" style={{ marginTop: 'auto', paddingTop: 80, position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
          borderTop: '1px solid var(--rule)',
          paddingTop: 18,
        }}>
          <span>Scroll to explore</span>
          <span>↓</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-root { padding-top: 120px !important; }
        }
        @media (max-width: 640px) {
          .hero-root { min-height: auto !important; padding-bottom: 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;

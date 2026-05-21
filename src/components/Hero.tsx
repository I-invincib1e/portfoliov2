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
        paddingTop: 'clamp(140px, 20vh, 200px)',
        paddingBottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--paper)',
      }}
    >
      <div className="container-ed" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-fade" style={{ marginBottom: 28 }}>
          <div className="eyebrow">Rushikesh Pawar · AI Product Engineer</div>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.6rem, 8vw, 7.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            margin: 0,
            maxWidth: '16ch',
          }}
        >
          <div className="mask hero-mask">
            <span style={{ fontWeight: 300 }}>
              Building <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--ember)' }}>AI products</em>
            </span>
          </div>
          <div className="mask hero-mask">
            <span style={{ fontWeight: 300 }}>
              people actually use.
            </span>
          </div>
        </h1>

        <p className="hero-fade" style={{
          marginTop: 32,
          maxWidth: 560,
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
          lineHeight: 1.55,
          color: 'var(--ink-soft)',
        }}>
          SaaS, voice AI systems, automation tools. Built and launched Adloom on Shopify.
          Currently building voice AI infrastructure.
        </p>

        <div className="hero-fade" style={{ marginTop: 40, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            href="#adloom"
            className="btn-ink hero-cta"
            data-magnetic
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('adloom')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See what I ship <span aria-hidden>→</span>
          </a>
          <Link
            to="/writing"
            style={{
              fontSize: 14,
              color: 'var(--ink-soft)',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              transition: 'color 0.3s var(--ease-out)',
            }}
          >
            or read build logs →
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
            résumé ↗
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
          .hero-cta-col { align-items: flex-start !important; margin-top: 8px; }
        }
        @media (max-width: 640px) {
          .hero-root { min-height: auto !important; padding-bottom: 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;

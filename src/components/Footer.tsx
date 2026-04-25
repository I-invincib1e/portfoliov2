import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent('Project enquiry / 2026')}&body=${encodeURIComponent("Hi Rushikesh,\n\nI'd love to talk about ")}`;

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to('.foot-strip', { xPercent: -50, duration: 60, ease: 'none', repeat: -1 });

      gsap.to('.foot-numeral', {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('.foot-letter').forEach((el, i) => {
        gsap.to(el, {
          yPercent: (i % 2 === 0 ? -1 : 1) * (8 + (i % 5)),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      });

      gsap.fromTo('.foot-fade', { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.05,
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const phrases = ['field notes', 'in motion', 'shipped from mumbai', 'edition 04 / 2026', 'set in fraunces'];

  return (
    <footer
      ref={ref}
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: 'clamp(80px, 12vw, 140px) 0 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        className="foot-numeral"
        style={{
          position: 'absolute',
          right: '-4vw',
          bottom: '-6vw',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'min(70vw, 50rem)',
          lineHeight: 0.8,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(239,233,223,0.18)',
          letterSpacing: '-0.05em',
          pointerEvents: 'none',
          userSelect: 'none',
          fontWeight: 300,
          willChange: 'transform',
        }}
      >
        04
      </div>

      <div className="container-ed" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gap: 'clamp(40px, 6vw, 80px)',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            marginBottom: 'clamp(60px, 9vw, 120px)',
          }}
        >
          <div className="foot-fade">
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.55,
                marginBottom: 18,
              }}
            >
              Let's make something
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.4rem, 7vw, 6rem)',
                fontWeight: 300,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: 'var(--paper)',
                margin: 0,
              }}
            >
              Have a brief?<br />
              <em style={{ color: '#e26a3d' }}>Let&apos;s talk.</em>
            </h2>
            <Link
              to="/contact"
              className="btn-outline"
              style={{
                marginTop: 36,
                color: 'var(--paper)',
                borderColor: 'rgba(239,233,223,0.5)',
              }}
              data-magnetic
            >
              Begin a project →
            </Link>
          </div>

          <div className="foot-fade" style={{ display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'flex-end' }}>
            <div>
              <div className="foot-label">Email</div>
              <a
                href={mailto}
                className="foot-mail"
                style={{
                  color: 'var(--paper)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                {siteConfig.email}
                <span aria-hidden style={{ color: '#e26a3d', transition: 'transform 0.4s var(--ease-out)' }}>↗</span>
              </a>
            </div>
            <div>
              <div className="foot-label">Elsewhere</div>
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                {[
                  ['GitHub', siteConfig.social.github],
                  ['LinkedIn', siteConfig.social.linkedin],
                  ['Instagram', siteConfig.social.instagram],
                  ['Telegram', siteConfig.social.telegram],
                ].map(([n, u]) => (
                  <a
                    key={n}
                    href={u}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ed-link"
                    style={{
                      color: 'var(--paper)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {n}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          style={{
            borderTop: '1px solid rgba(239,233,223,0.18)',
            borderBottom: '1px solid rgba(239,233,223,0.18)',
            overflow: 'hidden',
            padding: '24px 0',
          }}
        >
          <div
            className="foot-strip"
            style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}
          >
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px, 3vw, 36px)', paddingRight: 'clamp(20px, 3vw, 36px)' }}>
                {phrases.map(p => (
                  <span
                    key={p}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.6rem, 4vw, 3rem)',
                      letterSpacing: '-0.02em',
                      color: 'rgba(239,233,223,0.85)',
                      display: 'inline-flex',
                      gap: 8,
                    }}
                  >
                    <span style={{ color: '#e26a3d' }}>✦</span>
                    {p.split('').map((ch, i) => (
                      <span key={i} className="foot-letter" style={{ display: 'inline-block', willChange: 'transform' }}>
                        {ch === ' ' ? '\u00A0' : ch}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className="foot-fade footer-meta"
          style={{
            marginTop: 28,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.55,
          }}
        >
          <span>© {new Date().getFullYear()} Rushikesh Pawar</span>
          <span>Mumbai · 19.07°N / 72.87°E</span>
          <span>Edition 04 / 2026</span>
        </div>
      </div>

      <style>{`
        .foot-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          opacity: 0.55;
          margin-bottom: 8px;
        }
        .foot-mail:hover span[aria-hidden] { transform: translate(4px, -4px); }
        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-meta { font-size: 9px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .foot-strip { transform: none !important; animation: none !important; }
          .foot-numeral, .foot-letter { transform: none !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

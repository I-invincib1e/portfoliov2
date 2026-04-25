import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

const NAME = 'Rushikesh';
const SURNAME = 'PAWAR';

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent('Project enquiry / 2026')}&body=${encodeURIComponent("Hi Rushikesh,\n\nI'd love to talk about ")}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.signoff-letter', { yPercent: 110 }, {
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.04,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
      gsap.fromTo('.signoff-surname', { letterSpacing: '0.6em', opacity: 0 }, {
        letterSpacing: '0.42em',
        opacity: 1,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      });
      gsap.to('.foot-strip', { xPercent: -50, duration: 50, ease: 'none', repeat: -1 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: '120px 0 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-ed">
        <div className="editorial-grid" style={{ marginBottom: 80 }}>
          <div style={{ gridColumn: 'span 7' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 18 }}>
              Let's make something
            </div>
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: 'var(--paper)',
            }}>
              Have a brief?<br />
              <em style={{ color: '#e26a3d' }}>Let's talk.</em>
            </h2>
            <Link
              to="/contact"
              className="btn-outline"
              style={{ marginTop: 36, color: 'var(--paper)', borderColor: 'rgba(239,233,223,0.5)' }}
              data-magnetic
            >
              Begin a project →
            </Link>
          </div>

          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'flex-end' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 8 }}>Email</div>
              <a href={mailto} style={{ color: 'var(--paper)', textDecoration: 'none', fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic' }}>
                {siteConfig.email}
              </a>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 8 }}>Elsewhere</div>
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                {[
                  ['GitHub', siteConfig.social.github],
                  ['LinkedIn', siteConfig.social.linkedin],
                  ['Instagram', siteConfig.social.instagram],
                  ['Telegram', siteConfig.social.telegram],
                ].map(([n, u]) => (
                  <a key={n} href={u} target="_blank" rel="noopener noreferrer" className="ed-link" style={{ color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    {n}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(239,233,223,0.18)', paddingTop: 32 }}>
          {/* layered sign-off */}
          <div style={{ overflow: 'hidden' }}>
            <div
              aria-label={`${NAME} ${SURNAME}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(4.5rem, 18vw, 18rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.05em',
                whiteSpace: 'nowrap',
                fontWeight: 300,
              }}
            >
              {NAME.split('').map((ch, i) => (
                <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                  <span className="signoff-letter" style={{ display: 'inline-block', willChange: 'transform' }}>
                    {ch}
                  </span>
                </span>
              ))}
              <span style={{ color: '#e26a3d' }}>.</span>
            </div>
          </div>

          <div
            className="signoff-surname"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.8rem, 1.6vw, 1rem)',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: 'rgba(239,233,223,0.7)',
              marginTop: 24,
              borderTop: '1px solid rgba(239,233,223,0.18)',
              borderBottom: '1px solid rgba(239,233,223,0.18)',
              padding: '14px 0',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <span>{SURNAME}</span>
            <span style={{ letterSpacing: '0.2em' }}>· est. Mumbai · 2022 ·</span>
            <span>Edition 04</span>
          </div>

          <div style={{ overflow: 'hidden', padding: '20px 0', marginTop: 8 }}>
            <div className="foot-strip" style={{ display: 'flex', gap: 36, whiteSpace: 'nowrap', willChange: 'transform' }}>
              {Array.from({ length: 2 }).map((_, k) => (
                <div key={k} style={{ display: 'flex', gap: 36, paddingRight: 36 }}>
                  {['Available', 'In motion', 'Made in India', 'Set in Fraunces', 'Shipped with love', 'Edition 04 / 2026'].map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(239,233,223,0.55)',
                    }}>
                      ✦ {t}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: 0.45,
        }}>
          <span>© {new Date().getFullYear()} Rushikesh Pawar — All rights reserved</span>
          <span>Set in Fraunces, Inter Tight, JetBrains Mono</span>
          <span>Mumbai / 19.0760°N · 72.8777°E</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

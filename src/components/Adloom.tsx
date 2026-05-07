import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ADLOOM = {
  name: 'Adloom',
  tagline: 'Ad performance + automation layer for Shopify stores.',
  description:
    'Adloom helps Shopify merchants run smarter promotions — tiered discounts, coupon stacking rules, and automated billing, all in one clean dashboard.',
  liveUrl: 'https://apps.shopify.com/adloom',
  badge: 'Published on Shopify App Store',
  screenshots: [
    'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  challenges: [
    'Solved a floating-point pricing corruption bug affecting tiered discounts.',
    'Rewrote coupon stacking as an explicit state machine — one path per combination.',
    'Collapsed onboarding from 5 steps to 3, cutting time-to-first-campaign to ~90s.',
    'Passed Shopify review by making every billing path explicit and auditable.',
  ],
};

const Adloom = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.adloom-fade', { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="adloom"
      ref={ref}
      style={{
        padding: '120px 0 140px',
        background: 'var(--paper)',
        position: 'relative',
        borderTop: '1px solid var(--rule)',
      }}
    >
      <div className="container-ed">
        <div className="editorial-grid adloom-fade" style={{ marginBottom: 48 }}>
          <div style={{ gridColumn: 'span 8' }}>
            <div className="hairline">02 / Featured Product</div>
            <h2 style={{
              fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)',
              marginTop: 18,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
            }}>
              {ADLOOM.name}<span style={{ color: 'var(--ember)' }}>.</span>{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--ink-soft)', fontWeight: 400 }}>
                {ADLOOM.tagline}
              </em>
            </h2>
          </div>
          <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ember)',
              border: '1px solid var(--ember)',
              padding: '6px 12px',
              borderRadius: 999,
            }}>
              ✦ {ADLOOM.badge}
            </span>
          </div>
        </div>

        <div className="editorial-grid adloom-fade" style={{ marginBottom: 40 }}>
          <div style={{ gridColumn: 'span 5' }}>
            <p style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: 'var(--ink-soft)',
              marginBottom: 28,
            }}>
              {ADLOOM.description}
            </p>
            <a
              href={ADLOOM.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink"
              data-magnetic
            >
              Open on Shopify <span aria-hidden>↗</span>
            </a>
          </div>

          <div style={{ gridColumn: 'span 7' }}>
            <div className="hairline" style={{ marginBottom: 16 }}>Challenges solved</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {ADLOOM.challenges.map((c, i) => (
                <li
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr',
                    gap: 16,
                    padding: '16px 0',
                    borderTop: i === 0 ? '1px solid var(--rule)' : undefined,
                    borderBottom: '1px solid var(--rule)',
                    fontSize: 15,
                    color: 'var(--ink-soft)',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--ember)',
                    letterSpacing: '0.1em',
                  }}>
                    /{String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="adloom-fade adloom-screens"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            marginTop: 40,
          }}
        >
          {ADLOOM.screenshots.map((src, i) => (
            <div
              key={i}
              style={{
                aspectRatio: '4/3',
                overflow: 'hidden',
                background: 'var(--paper-deep)',
                border: '1px solid var(--rule)',
              }}
            >
              <img
                src={src}
                alt={`Adloom screenshot ${i + 1}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .adloom-screens { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Adloom;

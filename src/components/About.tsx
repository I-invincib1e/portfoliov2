import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: '180px 0 140px', background: 'var(--paper)' }}>
      <div className="container-ed">
        <div className="editorial-grid" style={{ marginBottom: 80 }}>
          <div style={{ gridColumn: 'span 5' }}>
            <div className="hairline" data-reveal>02 / Profile</div>
            <h2
              data-reveal
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                marginTop: 24,
                lineHeight: 0.96,
                letterSpacing: '-0.03em',
              }}
            >
              <span style={{ fontWeight: 400 }}>I build</span>{' '}
              <em style={{ fontWeight: 400 }}>AI systems,</em>
              <br />
              <em style={{ fontWeight: 400, color: 'var(--ember)' }}>quietly — in public.</em>
            </h2>
          </div>

          <div style={{ gridColumn: 'span 1' }} />

          <div style={{ gridColumn: 'span 6' }} data-reveal>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              fontWeight: 300,
            }}>
              <span style={{
                float: 'left',
                fontSize: 'clamp(4rem, 7vw, 6rem)',
                lineHeight: 0.85,
                paddingRight: 14,
                paddingTop: 6,
                fontStyle: 'italic',
                color: 'var(--ember)',
              }}>I</span>
              build AI-powered SaaS and automation tools —
              products made for a wide audience, not demo reels. Every pixel
              treated like printed matter; every interaction tuned to hold up
              under real use.
            </p>

            <div style={{ marginTop: 28, display: 'flex', gap: 28, flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
              <div><span style={{ display: 'block', color: 'var(--ink)' }}>AI</span>systems &amp; agents</div>
              <div><span style={{ display: 'block', color: 'var(--ink)' }}>SaaS</span>shipped products</div>
              <div><span style={{ display: 'block', color: 'var(--ink)' }}>Automation</span>workflow tools</div>
              <div><span style={{ display: 'block', color: 'var(--ink)' }}>Mumbai</span>India / GMT+5:30</div>
            </div>
          </div>
        </div>

        <div className="rule" data-reveal />

        <div className="editorial-grid" style={{ marginTop: 60 }}>
          <div style={{ gridColumn: 'span 3' }}>
            <div className="hairline" data-reveal>Capabilities</div>
          </div>
          <div style={{ gridColumn: 'span 9' }}>
            {skills.map((s, i) => (
              <div
                key={s.title}
                data-reveal
                className="cap-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 2fr',
                  gap: 24,
                  padding: '28px 0',
                  borderBottom: '1px solid var(--rule)',
                  alignItems: 'baseline',
                }}
              >
                <span className="numtag">/{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{
                  fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  fontStyle: i % 2 === 0 ? 'normal' : 'italic',
                }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

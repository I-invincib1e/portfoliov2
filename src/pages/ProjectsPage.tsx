import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { allProjects } from '../config/siteConfig';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const ProjectsPage = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.proj-row').forEach((row, i) => {
        gsap.fromTo(row, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          delay: i * 0.04,
          scrollTrigger: { trigger: row, start: 'top 88%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={ref}>
      <section style={{ padding: '160px 0 60px' }}>
        <div className="container-ed">
          <div className="hairline">02 / Selected Work</div>
          <h1 style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginTop: 18, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            The <em style={{ color: 'var(--ember)' }}>archive.</em>
          </h1>
          <p style={{ marginTop: 18, maxWidth: 520, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 }}>
            A growing index of experiments, products and one-night ideas that
            ship before they get precious.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 0 120px' }}>
        <div className="container-ed">
          <div style={{ borderTop: '1px solid var(--rule)' }}>
            {allProjects.map((p, i) => (
              <a
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1.2fr 2fr 1.4fr 64px',
                  gap: 24,
                  padding: '40px 0',
                  borderBottom: '1px solid var(--rule)',
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <span className="numtag">/{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    fontStyle: i % 2 ? 'italic' : 'normal',
                  }}>
                    {p.title}
                  </h3>
                </div>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', maxWidth: 480, lineHeight: 1.6 }}>
                  {p.description}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                      border: '1px solid var(--rule)',
                      padding: '4px 10px',
                      borderRadius: 999,
                    }}>{t}</span>
                  ))}
                </div>
                <span style={{ textAlign: 'right', color: 'var(--ember)', fontSize: 18 }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProjectsPage;

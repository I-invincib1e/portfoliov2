import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { allProjects } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.work-row').forEach(row => {
        gsap.fromTo(
          row.querySelectorAll('.work-cell'),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1, ease: 'power3.out', stagger: 0.06,
            scrollTrigger: { trigger: row, start: 'top 85%' },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const featured = allProjects.filter(p => p.featured).slice(0, 5);

  const statusColor: Record<string, string> = {
    Idea: '#888',
    Building: '#d4870e',
    Live: '#2e8b57',
    Archived: '#666',
  };

  return (
    <section ref={ref} className="work-section" style={{ padding: 'clamp(72px, 12vw, 120px) 0 clamp(90px, 14vw, 160px)', background: 'var(--paper-soft)' }}>
      <div className="container-ed">
        <div className="editorial-grid" style={{ marginBottom: 60 }}>
          <div style={{ gridColumn: 'span 6' }}>
            <div className="hairline">03 / Selected Work</div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginTop: 18, letterSpacing: '-0.03em' }}>
              Recent <em style={{ color: 'var(--ember)' }}>chapters.</em>
            </h2>
          </div>
          <div style={{ gridColumn: 'span 6', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <Link to="/projects" className="ed-link">View full archive →</Link>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--rule)' }}>
          {featured.map((p, i) => {
            const href = p.link || p.github || '#';
            const isExternal = href !== '#' && href !== '';
            return (
              <a
                key={p.title}
                href={isExternal ? href : undefined}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="work-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1.4fr 2fr 1fr 64px',
                  gap: 24,
                  padding: '36px 0',
                  borderBottom: '1px solid var(--rule)',
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none',
                  position: 'relative',
                }}
              >
                <span className="work-cell numtag">/{String(i + 1).padStart(2, '0')}</span>
                <div className="work-cell">
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    fontStyle: i % 2 ? 'italic' : 'normal',
                    marginBottom: 6,
                  }}>
                    {p.title}
                  </h3>
                  {p.status && (
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: statusColor[p.status] || '#888',
                      fontWeight: 600,
                    }}>
                      {p.status}
                    </span>
                  )}
                </div>
                <div className="work-cell" style={{ fontSize: 14, color: 'var(--ink-soft)', maxWidth: 460, lineHeight: 1.55 }}>
                  {p.problemSolved || p.description}
                </div>
                <div className="work-cell" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {p.tags.slice(0, 3).map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                      border: '1px solid var(--rule)',
                      padding: '4px 8px',
                      borderRadius: 999,
                    }}>{t}</span>
                  ))}
                </div>
                <span className="work-cell" style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--ember)' }}>
                  {isExternal ? '↗' : '·'}
                </span>
              </a>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .work-row {
            grid-template-columns: 44px 1fr 36px !important;
            padding: 22px 0 !important;
          }
          .work-row > .work-cell:nth-child(3),
          .work-row > .work-cell:nth-child(4) { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Work;

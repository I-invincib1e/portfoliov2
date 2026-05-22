import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const flagships = [
  {
    title: 'SkillBarter',
    value: 'Credit-based skill exchange where professionals trade expertise without money. Fair, liquid, trust-scored.',
    tags: ['React', 'Supabase', 'Product Design'],
    status: 'Building',
  },
  {
    title: 'Deep Research Agent',
    value: 'AI agent that autonomously searches, synthesizes, and returns structured research reports with citations.',
    tags: ['AI Agents', 'LangChain', 'RAG'],
    status: 'Building',
  },
  {
    title: 'Pyscrape',
    value: 'Multi-backend Python scraper that picks the right engine per site — data pipelines ship instead of stalling on fetchers.',
    tags: ['Python', 'Automation', 'Web Scraping'],
    status: 'Live',
  },
];

const FeaturedProjects = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fp-card').forEach((card, i) => {
        gsap.fromTo(card, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: 'clamp(72px, 10vw, 120px) 0', background: 'var(--paper)' }}>
      <div className="container-ed">
        <div style={{ marginBottom: 48 }}>
          <div className="hairline">Flagship Builds</div>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
            marginTop: 16,
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
          }}>
            What I'm <em style={{ color: 'var(--ember)' }}>shipping.</em>
          </h2>
        </div>

        <div className="fp-grid">
          {flagships.map((p) => (
            <div key={p.title} className="fp-card">
              <div className="fp-card-top">
                <span className="fp-status">{p.status}</span>
              </div>

              <h3 className="fp-title">{p.title}</h3>
              <p className="fp-value">{p.value}</p>

              <div className="fp-preview">
                <div className="fp-preview-inner">
                  <span className="fp-preview-label">Architecture Preview</span>
                </div>
              </div>

              <div className="fp-tags">
                {p.tags.map(t => (
                  <span key={t} className="fp-tag">{t}</span>
                ))}
              </div>

              <Link to="/projects" className="fp-cta">
                Read case study →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .fp-card {
          border: 1px solid var(--rule);
          padding: 28px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .fp-card:hover {
          border-color: var(--ember);
          transform: translateY(-3px);
        }
        .fp-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .fp-status {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #d4870e;
          font-weight: 600;
        }
        .fp-title {
          font-size: clamp(1.4rem, 2.4vw, 1.9rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.15;
        }
        .fp-value {
          font-size: 14px;
          line-height: 1.6;
          color: var(--ink-soft);
          margin: 0;
        }
        .fp-preview {
          border: 1px dashed var(--rule);
          border-radius: 4px;
          padding: 24px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--paper-soft);
          min-height: 72px;
        }
        .fp-preview-inner { text-align: center; }
        .fp-preview-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }
        .fp-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .fp-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-muted);
          border: 1px solid var(--rule);
          padding: 3px 9px;
          border-radius: 999px;
        }
        .fp-cta {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ember);
          text-decoration: none;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--rule);
          transition: opacity 0.2s;
        }
        .fp-cta:hover { opacity: 0.7; }
        @media (max-width: 900px) {
          .fp-grid { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>
    </section>
  );
};

export default FeaturedProjects;

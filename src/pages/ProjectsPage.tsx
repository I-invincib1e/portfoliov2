import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { allProjects as fallbackProjects, StaticProject } from '../data/projects';
import { fetchProjects, Project } from '../lib/supabase';
import Footer from '../components/Footer';
import { useSeo, SITE_URL, breadcrumbJsonLd } from '../lib/seo';

type DisplayProject = {
  title: string;
  description: string;
  link: string;
  github: string;
  tags: string[];
  status: string;
  role: string;
  problemSolved: string;
  outcome: string;
};

const toDisplay = (rows: Project[] | null): DisplayProject[] => {
  if (rows && rows.length > 0) {
    return rows.map(p => ({
      title: p.title,
      description: p.summary || p.description,
      link: p.live_url || p.repo_url || '#',
      github: p.repo_url || '',
      tags: p.tags ?? [],
      status: 'Live',
      role: 'Builder',
      problemSolved: '',
      outcome: '',
    }));
  }
  return fallbackProjects.map(p => ({
    title: p.title,
    description: p.description,
    link: p.link,
    github: p.github,
    tags: p.tags,
    status: p.status || 'Live',
    role: p.role || 'Builder',
    problemSolved: p.problemSolved || '',
    outcome: p.outcome || '',
  }));
};

const statusColor: Record<string, string> = {
  Idea: '#888',
  Building: '#d4870e',
  Live: '#2e8b57',
  Archived: '#666',
};

gsap.registerPlugin(ScrollTrigger);

const ProjectsPage = () => {
  useSeo({
    title: 'Projects — Rushikesh Pawar | AI Products & Systems',
    description: 'AI products, voice systems, automation tools, and SaaS experiments by Rushikesh Pawar. Each project solves a real problem — from AI receptionists to data pipelines.',
    path: '/projects',
    keywords: ['AI product projects', 'voice AI systems', 'SaaS MVP', 'automation tools', 'Rushikesh Pawar work'],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/projects`,
        name: 'Projects',
        url: `${SITE_URL}/projects`,
        hasPart: fallbackProjects.filter(p => p.featured).map(p => ({
          '@type': 'CreativeWork',
          name: p.title,
          description: p.description,
          url: p.link || p.github,
          keywords: p.tags.join(', '),
        })),
      },
      breadcrumbJsonLd([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Projects', url: `${SITE_URL}/projects` },
      ]),
    ],
  });

  const ref = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<DisplayProject[]>(() => toDisplay(null));

  useEffect(() => {
    fetchProjects().then(rows => setProjects(toDisplay(rows)));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.proj-card').forEach((card, i) => {
        gsap.fromTo(card, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          delay: i * 0.06,
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [projects]);

  return (
    <main ref={ref} id="main">
      <section style={{ padding: '160px 0 60px' }}>
        <div className="container-ed">
          <div className="hairline">02 / Projects</div>
          <h1 style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginTop: 18, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            The <em style={{ color: 'var(--ember)' }}>archive.</em>
          </h1>
          <p style={{ marginTop: 18, maxWidth: 560, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 }}>
            AI products, voice systems, automation tools, and experiments.
            Each one solves a real problem — or teaches something worth documenting.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 0 120px' }}>
        <div className="container-ed">
          <div className="projects-grid">
            {projects.map((p) => {
              const href = p.link && p.link !== '#' ? p.link : p.github;
              return (
                <div key={p.title} className="proj-card">
                  <div className="proj-card-header">
                    <span className="proj-status" style={{ color: statusColor[p.status] || '#888' }}>
                      {p.status}
                    </span>
                    <span className="proj-role">{p.role}</span>
                  </div>

                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-desc">{p.description}</p>

                  {p.problemSolved && (
                    <div className="proj-meta-block">
                      <span className="proj-meta-label">Problem</span>
                      <span className="proj-meta-value">{p.problemSolved}</span>
                    </div>
                  )}

                  {p.outcome && (
                    <div className="proj-meta-block">
                      <span className="proj-meta-label">Outcome</span>
                      <span className="proj-meta-value">{p.outcome}</span>
                    </div>
                  )}

                  <div className="proj-tags">
                    {p.tags.map(t => (
                      <span key={t} className="proj-tag">{t}</span>
                    ))}
                  </div>

                  <div className="proj-links">
                    {p.link && p.link !== '#' && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-link">
                        Live Demo ↗
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link">
                        GitHub ↗
                      </a>
                    )}
                    {!p.link && !p.github && (
                      <span className="proj-link proj-link-muted">Coming soon</span>
                    )}
                  </div>

                  {href && (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="proj-card-overlay" aria-label={`View ${p.title}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
        }
        .proj-card {
          position: relative;
          border: 1px solid var(--rule);
          padding: 28px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .proj-card:hover {
          border-color: var(--ember);
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .proj-card-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .proj-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .proj-status {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
        }
        .proj-role {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }
        .proj-title {
          font-size: clamp(1.3rem, 2.4vw, 1.7rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0;
        }
        .proj-desc {
          font-size: 14px;
          line-height: 1.6;
          color: var(--ink-soft);
          margin: 0;
        }
        .proj-meta-block {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .proj-meta-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }
        .proj-meta-value {
          font-size: 13px;
          line-height: 1.5;
          color: var(--ink-soft);
        }
        .proj-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 4px;
        }
        .proj-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-muted);
          border: 1px solid var(--rule);
          padding: 3px 9px;
          border-radius: 999px;
        }
        .proj-links {
          display: flex;
          gap: 16px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--rule);
          position: relative;
          z-index: 2;
        }
        .proj-link {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--ember);
          transition: opacity 0.2s;
        }
        .proj-link:hover { opacity: 0.7; }
        .proj-link-muted { color: var(--ink-muted); }
        @media (max-width: 480px) {
          .projects-grid { grid-template-columns: 1fr; }
          .proj-card { padding: 22px 18px 18px; }
        }
      `}</style>
    </main>
  );
};

export default ProjectsPage;

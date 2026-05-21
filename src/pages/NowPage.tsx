import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { fetchNow, NowWidget } from '../lib/supabase';
import { useSeo } from '../lib/seo';
import Footer from '../components/Footer';

const focusCards = [
  {
    label: 'Currently Building',
    items: ['AI Receptionist MVP', 'SkillBarter product system', 'Portfolio content engine'],
  },
  {
    label: 'Currently Learning',
    items: ['AI agents & tool-use patterns', 'Voice workflows (Twilio, Deepgram)', 'Supabase architecture at scale', 'Product distribution channels'],
  },
  {
    label: 'Current Experiments',
    items: ['Deep research agent with RAG', 'Automated build log publishing', 'Voice-first interface prototypes'],
  },
  {
    label: 'Open To',
    items: ['Internships (AI / product engineering)', 'Freelance AI product builds', 'Collaborations on dev tools', 'Startup projects (co-building)'],
  },
];

const NowPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState<NowWidget | null>(null);
  const [time, setTime] = useState('');

  useSeo({
    title: 'Now — Rushikesh Pawar | Current Focus & Availability',
    description: 'What Rushikesh Pawar is currently building, learning, and open to. AI receptionist, SkillBarter, voice workflows, and more.',
    path: '/now',
  });

  useEffect(() => {
    fetchNow().then(n => setNow(n));
  }, []);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false,
    }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.now-fade', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.08,
      });
    }, ref);
    return () => ctx.revert();
  }, [now]);

  return (
    <main id="main">
      <section
        ref={ref}
        style={{
          background: 'var(--paper)',
          minHeight: '80vh',
          padding: 'clamp(140px, 18vw, 200px) 0 clamp(80px, 12vw, 120px)',
        }}
      >
        <div className="container-ed">
          <div className="hairline now-fade">/Now — live index card</div>
          <h1
            className="now-fade"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              marginTop: 16,
              letterSpacing: '-0.035em',
              lineHeight: 0.98,
              fontWeight: 300,
            }}
          >
            Where I am <em style={{ color: 'var(--ember)' }}>right now.</em>
          </h1>
          <p
            className="now-fade"
            style={{
              marginTop: 28,
              maxWidth: 620,
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: 'var(--ink-soft)',
              lineHeight: 1.6,
            }}
          >
            A small, honest page — updated when life changes. Inspired by the{' '}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--ember)', textDecoration: 'none', borderBottom: '1px solid var(--ember)' }}
            >
              /now movement
            </a>
            .
          </p>

          {now && (
            <div className="now-fade" style={{
              marginTop: 48,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 20,
              padding: '24px 0',
              borderTop: '1px solid var(--rule)',
              borderBottom: '1px solid var(--rule)',
            }}>
              <div>
                <span className="now-meta-label">Location</span>
                <span className="now-meta-value">{now.location} · {time} IST</span>
              </div>
              <div>
                <span className="now-meta-label">Status</span>
                <span className="now-meta-value">{now.status}</span>
              </div>
              <div>
                <span className="now-meta-label">Reading</span>
                <span className="now-meta-value">{now.currently_reading}</span>
              </div>
              <div>
                <span className="now-meta-label">Listening</span>
                <span className="now-meta-value">{now.currently_listening}</span>
              </div>
            </div>
          )}

          {!now && (
            <div className="now-fade" style={{
              padding: '48px 0',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
            }}>
              Loading index card...
            </div>
          )}

          <div className="now-fade now-cards-grid" style={{ marginTop: 56 }}>
            {focusCards.map((card) => (
              <div key={card.label} className="now-card">
                <h3 className="now-card-label">{card.label}</h3>
                <ul className="now-card-list">
                  {card.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="now-fade" style={{
            marginTop: 48,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
          }}>
            Last updated: {now ? new Date(now.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '...'}
          </div>
        </div>
      </section>
      <Footer />

      <style>{`
        .now-meta-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 6px;
        }
        .now-meta-value {
          display: block;
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .now-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .now-card {
          border: 1px solid var(--rule);
          padding: 28px 24px;
          transition: border-color 0.3s ease;
        }
        .now-card:hover { border-color: var(--ember); }
        .now-card-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ember);
          margin: 0 0 16px;
          font-weight: 600;
        }
        .now-card-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .now-card-list li {
          font-size: 15px;
          line-height: 1.5;
          color: var(--ink-soft);
          padding-left: 16px;
          position: relative;
        }
        .now-card-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--rule-strong);
        }
        @media (max-width: 640px) {
          .now-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
};

export default NowPage;

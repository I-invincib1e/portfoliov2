import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { fetchNow, NowWidget } from '../lib/supabase';
import { useSeo } from '../lib/seo';
import Footer from '../components/Footer';

const NowPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState<NowWidget | null>(null);
  const [time, setTime] = useState('');

  useSeo({
    title: 'Now — Rushikesh Pawar',
    description: 'What I am currently building, reading and listening to.',
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

  const entries: { label: string; value?: string }[] = now
    ? [
        { label: 'Location', value: `${now.location} · ${time} IST` },
        { label: 'Status', value: now.status },
        { label: 'Currently reading', value: now.currently_reading },
        { label: 'Currently listening', value: now.currently_listening },
        { label: 'Last updated', value: new Date(now.updated_at).toLocaleDateString() },
      ]
    : [];

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

          <div
            className="now-fade"
            style={{
              marginTop: 60,
              borderTop: '1px solid var(--rule)',
            }}
          >
            {now ? (
              entries.map((e, i) => (
                <div
                  key={e.label}
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
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-muted)',
                    }}
                  >
                    {e.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: i % 2 === 1 ? 'italic' : 'normal',
                      fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)',
                      letterSpacing: '-0.01em',
                      color: 'var(--ink)',
                    }}
                  >
                    {e.value || '—'}
                  </span>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: '48px 0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                }}
              >
                Loading index card…
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default NowPage;

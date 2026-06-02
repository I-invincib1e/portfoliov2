import { useState, useEffect, useRef } from 'react';
import { subscribeNewsletter } from '../lib/supabase';
import { useSeo, SITE_URL } from '../lib/seo';
import Footer from '../components/Footer';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  useSeo({
    title: 'Builder Notes Newsletter — Rushikesh Pawar',
    description: 'Raw field notes on building AI products, shipping SaaS tools, and lessons from real product development. No fluff, no filler — just honest build notes.',
    path: '/newsletter',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Builder Notes Newsletter',
      description: 'Subscribe to get raw field notes on building AI products and shipping SaaS tools.',
      url: `${SITE_URL}/newsletter`,
      author: { '@id': `${SITE_URL}/#person` },
    },
  });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setState('err');
      setMsg('Please enter a valid email.');
      return;
    }
    setState('loading');
    const { error } = await subscribeNewsletter(email);
    if (error) {
      setState('err');
      setMsg(error.code === '23505' ? "You're already on the list." : "Couldn't subscribe — try again.");
    } else {
      setState('ok');
      setMsg("You're in. Check your inbox for a welcome note.");
      setEmail('');
    }
  };

  return (
    <>
      <main id="main" style={{ background: 'var(--paper)', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ padding: 'clamp(140px, 18vw, 220px) 0 clamp(80px, 10vw, 140px)' }}>
          <div className="container-ed" style={{ maxWidth: 720 }} ref={heroRef}>
            <div className="hairline" style={{ marginBottom: 20 }}>Newsletter</div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              margin: '0 0 28px',
            }}>
              Builder Notes
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.7,
              color: 'var(--ink-soft)',
              maxWidth: 560,
              margin: '0 0 40px',
            }}>
              Raw field notes on building AI products, shipping SaaS tools, and the messy
              middle of turning ideas into working software. Not polished think-pieces —
              honest documentation of the build process.
            </p>

            {/* Subscribe Form */}
            {state === 'ok' ? (
              <div style={{
                padding: '28px 32px',
                border: '1px solid var(--moss)',
                background: 'rgba(45, 80, 22, 0.04)',
              }}>
                <p style={{
                  margin: 0,
                  fontSize: 16,
                  color: 'var(--ink)',
                  fontWeight: 500,
                }}>
                  Welcome aboard.
                </p>
                <p style={{
                  margin: '8px 0 0',
                  fontSize: 14,
                  color: 'var(--ink-soft)',
                  lineHeight: 1.6,
                }}>
                  Check your inbox for a welcome note from hello@rushikeshpawar.dev.
                  You'll hear from me when there's something worth sharing.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ maxWidth: 480 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (state === 'err') { setState('idle'); setMsg(''); } }}
                    placeholder="you@example.com"
                    required
                    style={{
                      flex: 1,
                      minWidth: 220,
                      padding: '16px 18px',
                      border: '1px solid var(--rule-strong)',
                      background: 'transparent',
                      color: 'var(--ink)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 14,
                      borderRadius: 0,
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    className="btn-ink"
                    style={{
                      padding: '16px 28px',
                      fontSize: 14,
                      cursor: state === 'loading' ? 'wait' : 'pointer',
                    }}
                  >
                    {state === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                {msg && (
                  <div style={{
                    marginTop: 12,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: state === 'err' ? 'var(--ember)' : 'var(--moss)',
                    letterSpacing: '0.06em',
                  }}>
                    {msg}
                  </div>
                )}
                <p style={{
                  marginTop: 14,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                }}>
                  No spam. Unsubscribe anytime. Only useful build notes.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* What You'll Get */}
        <section style={{
          padding: 'clamp(60px, 8vw, 100px) 0',
          borderTop: '1px solid var(--rule)',
        }}>
          <div className="container-ed" style={{ maxWidth: 720 }}>
            <div className="hairline" style={{ marginBottom: 16 }}>What you'll get</div>
            <div style={{ display: 'grid', gap: 32, marginTop: 28 }}>
              {[
                { label: '01', title: 'Build Logs', desc: 'Step-by-step breakdowns of AI products, from first commit to deploy. What worked, what broke, what I\'d do differently.' },
                { label: '02', title: 'Product Decisions', desc: 'The reasoning behind architecture choices, tool picks, and trade-offs that don\'t make it into READMEs.' },
                { label: '03', title: 'Lessons & Patterns', desc: 'Recurring patterns across projects — shipping faster, avoiding common AI product pitfalls, growth levers that actually work.' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16 }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    color: 'var(--ember)',
                    paddingTop: 4,
                  }}>
                    {item.label}
                  </span>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 500, margin: '0 0 8px', color: 'var(--ink)' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-soft)', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof / Stats */}
        <section style={{
          padding: 'clamp(60px, 8vw, 100px) 0',
          borderTop: '1px solid var(--rule)',
        }}>
          <div className="container-ed" style={{ maxWidth: 720 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 32,
              textAlign: 'center',
            }}>
              {[
                { stat: '1-2x', label: 'per month' },
                { stat: '5 min', label: 'avg read time' },
                { stat: '0', label: 'fluff content' },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    letterSpacing: '-0.02em',
                  }}>
                    {item.stat}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    marginTop: 6,
                  }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Issues Preview */}
        <section style={{
          padding: 'clamp(60px, 8vw, 100px) 0',
          borderTop: '1px solid var(--rule)',
        }}>
          <div className="container-ed" style={{ maxWidth: 720 }}>
            <div className="hairline" style={{ marginBottom: 24 }}>Recent issues</div>
            <div style={{ display: 'grid', gap: 20 }}>
              {[
                { title: 'Designing a Credit System for SkillBarter', tag: 'Product Design' },
                { title: 'Building a Shopify Upsell App from Scratch', tag: 'Build Log' },
                { title: 'Why I Chose Supabase Over Firebase', tag: 'Architecture' },
              ].map((issue) => (
                <div
                  key={issue.title}
                  style={{
                    padding: '20px 24px',
                    border: '1px solid var(--rule)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>
                    {issue.title}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    whiteSpace: 'nowrap',
                  }}>
                    {issue.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{
          padding: 'clamp(80px, 10vw, 140px) 0',
          borderTop: '1px solid var(--rule)',
          textAlign: 'center',
        }}>
          <div className="container-ed" style={{ maxWidth: 560 }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 16px',
            }}>
              Join the builders.
            </h2>
            <p style={{
              fontSize: 15,
              color: 'var(--ink-soft)',
              lineHeight: 1.6,
              margin: '0 0 32px',
            }}>
              Get notified when I publish a new field note, build log, or case study.
            </p>
            {state !== 'ok' && (
              <form onSubmit={submit} style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{
                    minWidth: 220,
                    padding: '14px 18px',
                    border: '1px solid var(--rule-strong)',
                    background: 'transparent',
                    color: 'var(--ink)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    borderRadius: 0,
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="btn-ink"
                  style={{ padding: '14px 24px', cursor: state === 'loading' ? 'wait' : 'pointer' }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NewsletterPage;

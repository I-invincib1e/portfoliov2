import { useState } from 'react';
import { subscribeNewsletter } from '../lib/supabase';

type Props = { compact?: boolean };

const NewsletterCTA = ({ compact = false }: Props) => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setState('err'); setMsg('Please enter a valid email.'); return;
    }
    setState('loading');
    const { error } = await subscribeNewsletter(email);
    if (error) {
      setState('err');
      setMsg(error.code === '23505' ? "You're already on the list." : "Couldn't subscribe — try again.");
    } else {
      setState('ok'); setMsg("You're in. Watch for the next field note."); setEmail('');
    }
  };

  return (
    <section
      style={{
        padding: compact ? '60px 0' : 'clamp(80px, 12vw, 140px) 0',
        background: compact ? 'transparent' : 'var(--paper)',
        borderTop: '1px solid var(--rule)',
        borderBottom: compact ? '1px solid var(--rule)' : undefined,
      }}
    >
      <div className="container-ed">
        <div style={{
          display: 'grid',
          gridTemplateColumns: compact ? '1fr auto' : 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: 'clamp(24px, 4vw, 60px)',
          alignItems: compact ? 'center' : 'end',
        }} className="nl-grid">
          <div>
            {!compact && <div className="hairline" style={{ marginBottom: 14 }}>Builder Notes</div>}
            <h3 style={{
              fontSize: compact ? 'clamp(1.2rem, 2.4vw, 1.8rem)' : 'clamp(1.8rem, 4.5vw, 3.4rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: 0,
            }}>
              {compact ? (
                <>Join <em style={{ color: 'var(--ember)' }}>Builder Notes</em> — raw notes on AI products & systems.</>
              ) : (
                <>Join <em style={{ color: 'var(--ember)' }}>Builder Notes</em></>
              )}
            </h3>
            {!compact && (
              <p style={{
                marginTop: 16,
                color: 'var(--ink-soft)',
                fontSize: 15,
                maxWidth: 520,
                lineHeight: 1.6,
              }}>
                Occasional notes on AI products, systems, and what I'm learning while building.
              </p>
            )}
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 260 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  flex: 1,
                  minWidth: 180,
                  padding: '14px 16px',
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
                style={{ cursor: state === 'loading' ? 'wait' : 'pointer' }}
              >
                {state === 'loading' ? 'Sending...' : 'Subscribe'}
              </button>
            </div>
            {msg && (
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: state === 'ok' ? 'var(--moss)' : 'var(--ember)',
                letterSpacing: '0.08em',
              }}>
                {msg}
              </div>
            )}
            {!msg && !compact && (
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--ink-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                No spam. Only useful build notes.
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .nl-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default NewsletterCTA;

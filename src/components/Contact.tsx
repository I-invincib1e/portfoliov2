import { useState } from 'react';
import { submitContactMessage } from '../lib/supabase';

const projectTypes = ['Frontend Build', 'AI / LLM Integration', 'UI System', 'Consulting', 'Other'];
const budgets = ['Under $2k', '$2k–$5k', '$5k–$15k', '$15k+'];
const timelines = ['ASAP', '1–3 months', '3–6 months', 'Flexible'];

const Contact = () => {
  const [form, setForm] = useState({
    name: '', email: '', project_type: projectTypes[0],
    budget: budgets[1], timeline: timelines[1], message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Name, email and message are required');
      setStatus('error');
      return;
    }
    setStatus('sending');
    const { error } = await submitContactMessage(form);
    if (error) {
      setErrorMsg(error.message);
      setStatus('error');
    } else {
      setStatus('sent');
    }
  };

  if (status === 'sent') {
    return (
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '160px 0' }}>
        <div className="container-ed">
          <div className="hairline">Message received</div>
          <h2 style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', marginTop: 24, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            Thanks, <em style={{ color: 'var(--ember)' }}>{form.name.split(' ')[0] || 'friend'}.</em>
            <br />I'll write back<br />within 48 hours.
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '160px 0 120px' }}>
      <div className="container-ed">
        <div className="editorial-grid" style={{ marginBottom: 60 }}>
          <div style={{ gridColumn: 'span 5' }}>
            <div className="hairline">Contact / 04</div>
            <h1 style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', marginTop: 18, letterSpacing: '-0.03em', lineHeight: 0.96 }}>
              Tell me about <em style={{ color: 'var(--ember)' }}>your idea.</em>
            </h1>
            <p style={{ marginTop: 18, color: 'var(--ink-soft)', fontSize: 16, maxWidth: 380, lineHeight: 1.6 }}>
              The more you share, the better I can write back. I usually
              respond within two working days from Mumbai.
            </p>
          </div>
          <div style={{ gridColumn: 'span 1' }} />

          <form onSubmit={onSubmit} style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="editorial-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
              <div className="field">
                <label>01 / Your name</label>
                <input value={form.name} onChange={handle('name')} placeholder="Jane Doe" />
              </div>
              <div className="field">
                <label>02 / Email</label>
                <input type="email" value={form.email} onChange={handle('email')} placeholder="hello@studio.com" />
              </div>
            </div>

            <div className="editorial-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
              <div className="field">
                <label>03 / Type</label>
                <select value={form.project_type} onChange={handle('project_type')}>
                  {projectTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="field">
                <label>04 / Budget</label>
                <select value={form.budget} onChange={handle('budget')}>
                  {budgets.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="field">
                <label>05 / Timeline</label>
                <select value={form.timeline} onChange={handle('timeline')}>
                  {timelines.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label>06 / The brief</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={handle('message')}
                placeholder="A few sentences about goals, audience, references…"
              />
            </div>

            {status === 'error' && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ember)' }}>
                ! {errorMsg}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                Encrypted · Stored on Supabase
              </span>
              <button type="submit" disabled={status === 'sending'} className="btn-ink" data-magnetic>
                {status === 'sending' ? 'Sending…' : 'Send brief →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

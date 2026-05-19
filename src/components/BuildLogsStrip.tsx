import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBuildLogs, BuildLog } from '../lib/supabase';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });

const BuildLogsStrip = () => {
  const [logs, setLogs] = useState<BuildLog[]>([]);

  useEffect(() => {
    fetchBuildLogs(3).then(setLogs);
  }, []);

  if (!logs.length) return null;

  return (
    <section
      style={{
        padding: 'clamp(64px, 11vw, 100px) 0 clamp(72px, 12vw, 120px)',
        background: 'var(--paper-soft)',
        borderTop: '1px solid var(--rule)',
      }}
    >
      <div className="container-ed">
        <div className="editorial-grid" style={{ marginBottom: 48 }}>
          <div style={{ gridColumn: 'span 8' }}>
            <div className="hairline">03 / Build Logs</div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5.6vw, 4.6rem)',
              marginTop: 18,
              letterSpacing: '-0.03em',
              lineHeight: 0.98,
            }}>
              Lately<span style={{ color: 'var(--ember)' }}>,</span>{' '}
              <em style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>
                what broke & what shipped.
              </em>
            </h2>
          </div>
          <div style={{ gridColumn: 'span 4', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <Link to="/writing?tab=build-logs" className="ed-link">All build logs →</Link>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--rule)' }}>
          {logs.map((log, i) => (
            <Link
              key={log.id}
              to={`/logs/${log.slug}`}
              className="log-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto 44px',
                gap: 24,
                padding: '24px 0',
                borderBottom: '1px solid var(--rule)',
                alignItems: 'center',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
              }}>
                {formatDate(log.created_at)}
              </span>
              <div>
                <h3 style={{
                  fontSize: 'clamp(1.25rem, 2.4vw, 1.9rem)',
                  fontWeight: 400,
                  fontStyle: i % 2 ? 'italic' : 'normal',
                  letterSpacing: '-0.015em',
                  margin: 0,
                }}>
                  {log.title}
                </h3>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {log.tags.slice(0, 2).map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    border: '1px solid var(--rule)',
                    padding: '3px 7px',
                    borderRadius: 999,
                  }}>{t}</span>
                ))}
              </div>
              <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--ember)' }}>→</span>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .log-row {
            grid-template-columns: 1fr 28px !important;
            gap: 8px 12px !important;
          }
          .log-row > span:first-child {
            grid-column: 1 / -1;
            font-size: 9px !important;
          }
          .log-row > div:nth-child(3) { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default BuildLogsStrip;

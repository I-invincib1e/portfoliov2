import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

const Footer = () => {
  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: '120px 0 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-ed">
        <div className="editorial-grid" style={{ marginBottom: 80 }}>
          <div style={{ gridColumn: 'span 7' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 18 }}>
              Let's make something
            </div>
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: 'var(--paper)',
            }}>
              Have a brief?<br />
              <em style={{ color: '#e26a3d' }}>Let's talk.</em>
            </h2>
            <Link
              to="/contact"
              className="btn-outline"
              style={{ marginTop: 36, color: 'var(--paper)', borderColor: 'rgba(239,233,223,0.5)' }}
              data-magnetic
            >
              Begin a project →
            </Link>
          </div>

          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'flex-end' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 8 }}>Email</div>
              <a href={`mailto:${siteConfig.email}`} style={{ color: 'var(--paper)', textDecoration: 'none', fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic' }}>
                {siteConfig.email}
              </a>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 8 }}>Elsewhere</div>
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                {[
                  ['GitHub', siteConfig.social.github],
                  ['LinkedIn', siteConfig.social.linkedin],
                  ['Instagram', siteConfig.social.instagram],
                  ['Telegram', siteConfig.social.telegram],
                ].map(([n, u]) => (
                  <a key={n} href={u} target="_blank" rel="noopener noreferrer" className="ed-link" style={{ color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    {n}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(239,233,223,0.18)', paddingTop: 32 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(5rem, 22vw, 22rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.05em',
            whiteSpace: 'nowrap',
          }}>
            Rushikesh<span style={{ color: '#e26a3d' }}>.</span>
          </div>
        </div>

        <div style={{
          marginTop: 40,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: 0.5,
        }}>
          <span>© {new Date().getFullYear()} Rushikesh Pawar — All rights reserved</span>
          <span>Set in Fraunces, Inter Tight, JetBrains Mono</span>
          <span>Mumbai / 19.0760°N · 72.8777°E</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

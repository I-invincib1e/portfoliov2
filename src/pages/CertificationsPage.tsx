import { certificates } from '../config/siteConfig';
import Footer from '../components/Footer';

const CertificationsPage = () => {
  return (
    <main>
      <section style={{ padding: '160px 0 60px' }}>
        <div className="container-ed">
          <div className="hairline">03 / Archive</div>
          <h1 style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginTop: 18, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            Library <em style={{ color: 'var(--ember)' }}>index.</em>
          </h1>
          <p style={{ marginTop: 18, maxWidth: 520, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 }}>
            Certifications, courses and accreditations — a quiet record of
            ongoing study.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 0 140px' }}>
        <div className="container-ed">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '60px 2fr 1.4fr 1fr 90px',
            gap: 24,
            padding: '14px 0',
            borderTop: '1px solid var(--rule)',
            borderBottom: '1px solid var(--rule)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--ink-muted)',
          }}>
            <span>№</span><span>Programme</span><span>Issuer</span><span>Year</span><span style={{ textAlign: 'right' }}>Verify</span>
          </div>

          {certificates.map((c, i) => (
            <a
              key={c.title}
              href={c.credentialURL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 2fr 1.4fr 1fr 90px',
                gap: 24,
                padding: '32px 0',
                borderBottom: '1px solid var(--rule)',
                alignItems: 'baseline',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <span className="numtag">/{String(i + 1).padStart(2, '0')}</span>
              <h3 style={{
                fontSize: 'clamp(1.3rem, 2.4vw, 2rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                fontStyle: i % 2 ? 'italic' : 'normal',
              }}>
                {c.title}
              </h3>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--ink-soft)' }}>
                {c.organization}
              </span>
              <span className="tabular" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-muted)' }}>
                {c.date}
              </span>
              <span style={{ textAlign: 'right', color: 'var(--ember)', fontSize: 16 }}>↗</span>
            </a>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default CertificationsPage;

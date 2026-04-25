import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useSeo } from '../lib/seo';

const NotFoundPage = () => {
  useSeo({
    title: '404 — page not found',
    description: 'This page is missing from the edition.',
    path: '/404',
  });

  return (
    <main id="main">
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(120px, 16vw, 180px) 0 80px',
      }}>
        <div className="container-ed">
          <div className="hairline">404 / Off the page</div>
          <h1 style={{
            fontSize: 'clamp(2.6rem, 10vw, 9rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            marginTop: 18,
          }}>
            Not in <em style={{ color: 'var(--ember)' }}>this edition.</em>
          </h1>
          <p style={{ marginTop: 18, maxWidth: 520, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.6 }}>
            The page you were trying to read isn&apos;t here — maybe it
            shipped to a future issue, maybe it was retired. Either way,
            here are the doors that work.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/" className="btn-ink">Index</Link>
            <Link to="/projects" className="btn-outline">Selected work</Link>
            <Link to="/journal" className="btn-outline">Field notes</Link>
            <Link to="/contact" className="btn-outline">Contact</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default NotFoundPage;

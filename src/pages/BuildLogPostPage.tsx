import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBuildLog, BuildLog } from '../lib/supabase';
import Footer from '../components/Footer';
import NewsletterCTA from '../components/NewsletterCTA';
import { useSeo, SITE_URL } from '../lib/seo';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

function inlineFormat(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__|_[^_]+_)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const m = match[0];
    if (m.startsWith('`')) {
      parts.push(
        <code key={key++} style={{ background: 'var(--paper-deep)', padding: '2px 6px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: '0.88em' }}>
          {m.slice(1, -1)}
        </code>
      );
    } else if (m.startsWith('**') || m.startsWith('__')) {
      parts.push(<strong key={key++}>{m.slice(2, -2)}</strong>);
    } else {
      parts.push(<em key={key++}>{m.slice(1, -1)}</em>);
    }
    last = match.index + m.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function renderMarkdown(md: string): ReactNode[] {
  const blocks: ReactNode[] = [];
  const lines = md.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <div key={blocks.length} style={{ marginBottom: 28 }}>
          {lang && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 8 }}>
              {lang}
            </div>
          )}
          <pre style={{ background: 'var(--ink)', color: '#efe9df', padding: '20px 22px', borderRadius: 4, overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      continue;
    }

    if (/^#{1,3}\s/.test(line)) {
      const level = line.match(/^(#+)/)?.[1].length ?? 1;
      const text = line.replace(/^#+\s*/, '');
      const sizes = { 1: 'clamp(1.6rem, 3vw, 2.4rem)', 2: 'clamp(1.3rem, 2.4vw, 1.8rem)', 3: 'clamp(1.1rem, 2vw, 1.4rem)' };
      const Tag = `h${level}` as 'h1' | 'h2' | 'h3';
      blocks.push(
        <Tag key={blocks.length} style={{ fontSize: sizes[level as 1|2|3] ?? sizes[3], letterSpacing: '-0.02em', marginBottom: 16, marginTop: 40, fontWeight: 400, lineHeight: 1.15 }}>
          {inlineFormat(text)}
        </Tag>
      );
      i++;
      continue;
    }

    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <blockquote key={blocks.length} style={{ borderLeft: '2px solid var(--ember)', paddingLeft: 22, marginBottom: 24, marginTop: 0, marginLeft: 0, marginRight: 0 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', lineHeight: 1.4, color: 'var(--ink)', margin: 0 }}>
            {inlineFormat(quoteLines.join(' '))}
          </p>
        </blockquote>
      );
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s*/, ''));
        i++;
      }
      blocks.push(
        <ul key={blocks.length} style={{ paddingLeft: 22, marginBottom: 24, marginTop: 0, color: 'var(--ink)' }}>
          {items.map((item, j) => (
            <li key={j} style={{ marginBottom: 8, lineHeight: 1.65, fontSize: 'clamp(1rem, 1.4vw, 1.1rem)' }}>
              {inlineFormat(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s*/, ''));
        i++;
      }
      blocks.push(
        <ol key={blocks.length} style={{ paddingLeft: 22, marginBottom: 24, marginTop: 0, color: 'var(--ink)' }}>
          {items.map((item, j) => (
            <li key={j} style={{ marginBottom: 8, lineHeight: 1.65, fontSize: 'clamp(1rem, 1.4vw, 1.1rem)' }}>
              {inlineFormat(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    if (line === '---' || line === '***') {
      blocks.push(<hr key={blocks.length} style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '32px 0' }} />);
      i++;
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{1,3}\s|```|>\s|[-*]\s|\d+\.\s|---|[*]{3})/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={blocks.length} style={{ fontSize: 'clamp(1rem, 1.4vw, 1.12rem)', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: 24, marginTop: 0 }}>
        {inlineFormat(paraLines.join(' '))}
      </p>
    );
  }

  return blocks;
}

const BuildLogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [log, setLog] = useState<BuildLog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchBuildLog(slug).then((row) => {
      setLog(row);
      setLoading(false);
    });
  }, [slug]);

  useSeo({
    title: log ? `${log.title} — Build Log` : 'Build Log — Rushikesh Pawar',
    description: log ? log.body_md.split('\n')[0].slice(0, 160) : 'Build log entry.',
    path: `/logs/${slug ?? ''}`,
    type: 'article',
    jsonLd: log ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: log.title,
      datePublished: log.created_at,
      author: { '@type': 'Person', name: 'Rushikesh Pawar' },
      url: `${SITE_URL}/logs/${log.slug}`,
    } : undefined,
  });

  if (loading) {
    return (
      <main id="main" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.2em' }}>
          LOADING…
        </span>
      </main>
    );
  }

  if (!log) {
    return (
      <main id="main" style={{ padding: '160px 0', textAlign: 'center' }}>
        <div className="container-ed">
          <h1 style={{ fontSize: '3rem' }}>Not found</h1>
          <Link to="/writing?tab=build-logs" className="ed-link">← All build logs</Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main">
      <article style={{ padding: '140px 0 80px', background: 'var(--paper)' }}>
        <div className="container-ed" style={{ maxWidth: 760 }}>
          <Link to="/writing?tab=build-logs" className="ed-link" style={{ fontSize: 12 }}>← Build logs</Link>

          <div style={{ marginTop: 24, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
            }}>
              {formatDate(log.created_at)}
            </span>
            {log.tags.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ember)',
                border: '1px solid var(--ember)',
                padding: '3px 7px',
                borderRadius: 999,
              }}>{t}</span>
            ))}
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.4rem)',
            letterSpacing: '-0.035em',
            lineHeight: 1.02,
            margin: '24px 0 40px',
          }}>
            {log.title}
          </h1>

          <div className="log-body" style={{ maxWidth: 680 }}>
            {renderMarkdown(log.body_md)}
          </div>
        </div>
      </article>

      <NewsletterCTA />
      <Footer />
    </main>
  );
};

export default BuildLogPostPage;

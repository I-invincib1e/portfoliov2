import { type ReactNode } from 'react';

export function inlineFormat(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__|_[^_]+_)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const m = match[0];
    if (m.startsWith('[')) {
      const linkText = match[2];
      const href = match[3];
      parts.push(
        <a key={key++} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ color: 'var(--ember)', textDecoration: 'none', borderBottom: '1px solid var(--ember)' }}>
          {linkText}
        </a>
      );
    } else if (m.startsWith('`')) {
      parts.push(
        <code key={key++} style={{ background: 'rgba(20,17,13,0.06)', padding: '2px 6px', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: '0.88em' }}>
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

export function renderMarkdown(md: string): ReactNode[] {
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

    if (line.startsWith('![')) {
      const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
      if (imgMatch) {
        blocks.push(
          <figure key={blocks.length} style={{ margin: '0 0 28px' }}>
            <img
              src={imgMatch[2]}
              alt={imgMatch[1]}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', display: 'block', borderRadius: 4, border: '1px solid var(--rule)' }}
            />
            {imgMatch[1] && (
              <figcaption style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                {imgMatch[1]}
              </figcaption>
            )}
          </figure>
        );
        i++;
        continue;
      }
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
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{1,3}\s|```|>\s|[-*]\s|\d+\.\s|---|[*]{3}|!\[)/.test(lines[i])) {
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

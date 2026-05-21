import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { renderMarkdown } from '../utils/renderMarkdown';
import {
  fetchPost,
  fetchPosts,
  fetchPostsBySeries,
  incrementPostView,
  subscribeNewsletter,
  Post,
  PostSection,
  PostChapterKind,
} from '../lib/supabase';
import Footer from '../components/Footer';
import { siteConfig } from '../config/siteConfig';
import { useSeo, SITE_URL, breadcrumbJsonLd } from '../lib/seo';

const CHAPTER_LABELS: Record<PostChapterKind, { num: string; label: string; tone: string }> = {
  premise:    { num: '01', label: 'Premise',    tone: 'var(--ember)' },
  stakes:     { num: '02', label: 'Stakes',     tone: 'var(--ink)' },
  hypothesis: { num: '03', label: 'Hypothesis', tone: 'var(--moss)' },
  friction:   { num: '04', label: 'Friction',   tone: '#a14b2a' },
  resolution: { num: '05', label: 'Resolution', tone: 'var(--moss)' },
  field_note: { num: '06', label: 'Field Note', tone: 'var(--ink)' },
};

const CHAPTER_KINDS = new Set<string>(Object.keys(CHAPTER_LABELS));

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) : '';

const slugifyChapter = (kind: PostChapterKind, idx: number) => `${kind}-${idx}`;

type ToCEntry = { id: string; label: string; kind: PostChapterKind };

const buildToc = (sections: PostSection[]): ToCEntry[] =>
  sections
    .map((s, i) => (CHAPTER_KINDS.has(s.kind) ? { id: slugifyChapter(s.kind as PostChapterKind, i), label: CHAPTER_LABELS[s.kind as PostChapterKind].label, kind: s.kind as PostChapterKind } : null))
    .filter(Boolean) as ToCEntry[];

const SectionBlock = ({ section, idx, anchor }: { section: PostSection; idx: number; anchor?: string }) => {
  const k = section.kind;

  if (k === 'image') {
    return (
      <figure className="fn-section" style={{ margin: 0 }}>
        <img
          src={section.src}
          alt={section.alt ?? ''}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', display: 'block', borderRadius: 4, border: '1px solid var(--rule)' }}
        />
        {section.caption && (
          <figcaption style={{
            marginTop: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
          }}>
            Fig. {String(idx + 1).padStart(2, '0')} — {section.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (k === 'code') {
    return (
      <div className="fn-section">
        {section.filename && (
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            marginBottom: 8,
          }}>
            {section.filename}{section.language ? ` · ${section.language}` : ''}
          </div>
        )}
        <pre style={{
          background: 'var(--ink)',
          color: '#efe9df',
          padding: '20px 22px',
          borderRadius: 4,
          overflowX: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          lineHeight: 1.65,
          margin: 0,
        }}><code>{section.body}</code></pre>
      </div>
    );
  }

  if (k === 'quote') {
    return (
      <blockquote className="fn-section" style={{
        borderLeft: '2px solid var(--ember)',
        paddingLeft: 22,
        margin: 0,
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
          lineHeight: 1.4,
          margin: 0,
          color: 'var(--ink)',
        }}>
          “{section.body}”
        </p>
        {section.attribution && (
          <cite style={{
            display: 'block',
            marginTop: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            fontStyle: 'normal',
          }}>
            — {section.attribution}
          </cite>
        )}
      </blockquote>
    );
  }

  if (k === 'list') {
    return (
      <ul className="fn-section" style={{ paddingLeft: 22, margin: 0, color: 'var(--ink)' }}>
        {(section.items ?? []).map((item, i) => (
          <li key={i} style={{ marginBottom: 8, lineHeight: 1.65, fontSize: 'clamp(1rem, 1.4vw, 1.1rem)' }}>{item}</li>
        ))}
      </ul>
    );
  }

  if (k === 'callout') {
    const tones: Record<string, { bg: string; bar: string; label: string }> = {
      note: { bg: 'rgba(20,17,13,0.04)', bar: 'var(--ink)', label: 'Note' },
      warn: { bg: 'rgba(161,75,42,0.06)', bar: '#a14b2a', label: 'Watch out' },
      tip:  { bg: 'rgba(76,113,89,0.08)', bar: 'var(--moss, #4c7159)', label: 'Tip' },
    };
    const t = tones[section.tone ?? 'note'];
    return (
      <aside className="fn-section" style={{
        background: t.bg,
        borderLeft: `2px solid ${t.bar}`,
        padding: '20px 24px',
        borderRadius: 4,
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: t.bar,
          marginBottom: 8,
        }}>{t.label}</div>
        <p style={{ margin: 0, lineHeight: 1.65, fontSize: 'clamp(1rem, 1.3vw, 1.1rem)' }}>{section.body}</p>
      </aside>
    );
  }

  if (k === 'divider') {
    return <hr className="fn-section" style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: 0 }} />;
  }

  if (k === 'paragraph') {
    return (
      <p className="fn-section" style={{
        fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
        lineHeight: 1.65,
        color: 'var(--ink)',
        margin: 0,
        maxWidth: 680,
      }}>
        {section.body}
      </p>
    );
  }

  // Chapter blocks
  const chapter = CHAPTER_LABELS[k as PostChapterKind];
  const isFriction = k === 'friction';
  const isPremise = k === 'premise';
  const isHypothesis = k === 'hypothesis';
  const conf = section.confidence ?? null;

  return (
    <section
      id={anchor}
      className="fn-section fn-chapter"
      style={{
        padding: isFriction ? '32px clamp(20px, 4vw, 40px)' : 0,
        background: isFriction ? 'rgba(20,17,13,0.04)' : 'transparent',
        borderLeft: isFriction ? '2px solid var(--ember)' : 'none',
        borderRadius: 4,
      }}
    >
      <div className="chapter-head">
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: chapter.tone,
          display: 'inline-flex',
          gap: 12,
          alignItems: 'baseline',
        }}>
          <span style={{ opacity: 0.55 }}>{chapter.num}</span>
          <span>{chapter.label}</span>
          {anchor && (
            <a
              href={`#${anchor}`}
              className="anchor-link"
              aria-label={`Copy link to ${chapter.label}`}
              onClick={e => {
                e.preventDefault();
                const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
                history.replaceState(null, '', `#${anchor}`);
                navigator.clipboard?.writeText(url);
              }}
            >#</a>
          )}
        </div>
      </div>

      {isHypothesis && conf !== null && (
        <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center', marginTop: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
            Confidence
          </span>
          <span style={{ display: 'inline-flex', gap: 4 }}>
            {[1,2,3,4,5].map(n => (
              <span
                key={n}
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: n <= (conf ?? 0) ? 'var(--ember)' : 'transparent',
                  border: `1px solid ${n <= (conf ?? 0) ? 'var(--ember)' : 'var(--rule)'}`,
                }}
              />
            ))}
          </span>
        </div>
      )}

      <p style={{
        fontFamily: isPremise ? 'var(--font-display)' : 'var(--font-sans)',
        fontStyle: isPremise ? 'italic' : 'normal',
        fontSize: isPremise
          ? 'clamp(1.4rem, 3.4vw, 2.2rem)'
          : 'clamp(1rem, 1.4vw, 1.15rem)',
        lineHeight: isPremise ? 1.25 : 1.65,
        color: 'var(--ink)',
        margin: '14px 0 0',
        maxWidth: isPremise ? 720 : 680,
      }}>
        {section.body}
      </p>
    </section>
  );
};

const ShareKit = ({ post }: { post: Post }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const url = typeof window !== 'undefined' ? `${window.location.origin}/journal/${post.slug}` : `${SITE_URL}/journal/${post.slug}`;
  const premise = post.sections.find(s => s.kind === 'premise')?.body ?? post.excerpt;
  const linkedinSummary = `${post.title}\n\n${premise}\n\nFull note → ${url}`;
  const xThread = [
    `Field Note → ${post.title}`,
    premise,
    `Full breakdown — premise, friction, resolution: ${url}`,
  ].join('\n\n---\n\n');

  const copy = async (label: string, value: string) => {
    await navigator.clipboard?.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1400);
  };

  return (
    <div style={{ marginTop: 56, border: '1px solid var(--rule)', borderRadius: 4, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '18px 22px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 14,
          color: 'var(--ink)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          Share kit {copied && <span style={{ color: 'var(--ember)', marginLeft: 8 }}>· {copied} copied</span>}
        </span>
        <span style={{ color: 'var(--ember)', fontSize: 18 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div style={{ padding: '0 22px 22px', display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid var(--rule)' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
            <button className="btn-outline" onClick={() => copy('Link', url)}>Copy link</button>
            <button className="btn-outline" onClick={() => copy('LinkedIn summary', linkedinSummary)}>Copy LinkedIn summary</button>
            <button className="btn-outline" onClick={() => copy('X thread', xThread)}>Copy X thread</button>
            {post.cover_url && (
              <a className="btn-outline" href={post.cover_url} target="_blank" rel="noopener noreferrer">Open cover</a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const NewsletterCapture = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setState('sending');
    const { error } = await subscribeNewsletter(email.trim());
    if (error && !/duplicate|unique/i.test(error.message)) setState('error');
    else { setState('sent'); setEmail(''); }
  };

  return (
    <div style={{
      marginTop: 40,
      padding: '28px clamp(20px, 3vw, 32px)',
      border: '1px solid var(--rule)',
      borderRadius: 4,
      background: 'rgba(20,17,13,0.02)',
    }}>
      <div className="hairline" style={{ marginBottom: 10 }}>Field Notes by email</div>
      <p style={{ margin: '0 0 16px', maxWidth: 540, color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.6 }}>
        One new note when one ships. No marketing, no recap emails, no tracking pixels.
      </p>
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@inbox.com"
          style={{
            flex: '1 1 240px',
            padding: '12px 14px',
            background: 'var(--paper)',
            border: '1px solid var(--rule)',
            borderRadius: 4,
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            color: 'var(--ink)',
          }}
        />
        <button type="submit" className="btn-ink" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : state === 'sent' ? 'Subscribed ✓' : 'Subscribe →'}
        </button>
      </form>
      {state === 'error' && (
        <p style={{ marginTop: 10, color: '#a14b2a', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
          Something went wrong — try again in a minute.
        </p>
      )}
    </div>
  );
};

const AuthorBio = () => (
  <div style={{
    marginTop: 40,
    padding: '24px 0',
    borderTop: '1px solid var(--rule)',
    borderBottom: '1px solid var(--rule)',
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  }}>
    <div style={{
      width: 56, height: 56, borderRadius: '50%',
      background: 'var(--ink)', color: 'var(--paper)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24,
      flexShrink: 0,
    }}>R<span style={{ color: '#e26a3d' }}>.</span></div>
    <div style={{ flex: '1 1 300px' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{siteConfig.name}</div>
      <p style={{ margin: '4px 0 12px', color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.55, maxWidth: 520 }}>
        I build small, fast products in the open from {siteConfig.location}. Field notes
        are the unedited middle — what worked, what broke, what I&apos;d redo.
      </p>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="ed-link">GitHub</a>
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="ed-link">LinkedIn</a>
        <Link to="/contact" className="ed-link">Hire</Link>
      </div>
    </div>
  </div>
);

const JournalPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const ref = useRef<HTMLElement>(null);
  const [post, setPost] = useState<Post | null | undefined>(undefined);
  const [siblings, setSiblings] = useState<Post[]>([]);
  const [related, setRelated] = useState<Post[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!slug) return;
    setPost(undefined);
    fetchPost(slug).then(p => setPost(p));
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    incrementPostView(post.slug).catch(() => {});
    if (post.series_slug) {
      fetchPostsBySeries(post.series_slug).then(setSiblings);
    } else {
      setSiblings([]);
    }
    fetchPosts().then(all => {
      const tagSet = new Set(post.tags);
      const ranked = all
        .filter(p => p.slug !== post.slug)
        .map(p => ({ p, score: p.tags.filter(t => tagSet.has(t)).length + (p.series_slug && p.series_slug === post.series_slug ? 2 : 0) }))
        .sort((a, b) => b.score - a.score)
        .filter(r => r.score > 0)
        .slice(0, 3)
        .map(r => r.p);
      setRelated(ranked);
    });
  }, [post]);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const total = el.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      setProgress(ratio);

      const headings = Array.from(el.querySelectorAll<HTMLElement>('.fn-chapter[id]'));
      const y = window.scrollY + 140;
      let current = headings[0]?.id ?? '';
      for (const h of headings) if (h.offsetTop <= y) current = h.id;
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [post]);

  useEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.fn-section', { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.05,
      });
    }, ref);
    return () => ctx.revert();
  }, [post]);

  useSeo({
    title: post ? `${post.title} — Field Notes / Rushikesh Pawar` : 'Field Note — Rushikesh Pawar',
    description: post?.excerpt ?? 'A field note from Rushikesh Pawar.',
    path: `/journal/${slug ?? ''}`,
    image: post?.cover_url,
    type: 'article',
    keywords: post?.tags,
    jsonLd: post
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.cover_url,
            datePublished: post.published_at,
            dateModified: post.published_at,
            author: { '@id': `${SITE_URL}/#person` },
            mainEntityOfPage: `${SITE_URL}/journal/${post.slug}`,
            keywords: post.tags.join(', '),
            articleSection: post.series || 'Field Notes',
          },
          breadcrumbJsonLd([
            { name: 'Home', url: `${SITE_URL}/` },
            { name: 'Field Notes', url: `${SITE_URL}/journal` },
            { name: post.title, url: `${SITE_URL}/journal/${post.slug}` },
          ]),
        ]
      : undefined,
  });

  const toc = useMemo(() => (post ? buildToc(post.sections) : []), [post]);

  const seriesIdx = useMemo(() => {
    if (!post || siblings.length === 0) return -1;
    return siblings.findIndex(s => s.slug === post.slug);
  }, [post, siblings]);
  const prev = seriesIdx > 0 ? siblings[seriesIdx - 1] : null;
  const next = seriesIdx >= 0 && seriesIdx < siblings.length - 1 ? siblings[seriesIdx + 1] : null;

  if (post === undefined) {
    return (
      <main id="main" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
          Loading note…
        </span>
      </main>
    );
  }

  if (post === null) {
    return (
      <main id="main" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '120px 24px' }}>
        <div className="hairline">404 / Field Note</div>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', textAlign: 'center', letterSpacing: '-0.03em' }}>
          This <em style={{ color: 'var(--ember)' }}>page</em> hasn&apos;t been written yet.
        </h1>
        <Link to="/writing?tab=field-notes" className="btn-outline">Back to all field notes</Link>
      </main>
    );
  }

  return (
    <main ref={ref} id="main">
      <div
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0, height: 2,
          width: `${progress * 100}%`,
          background: 'var(--ember)', zIndex: 60,
          transition: 'width 0.1s linear',
        }}
      />

      <article style={{ padding: 'clamp(120px, 16vw, 180px) 0 60px' }}>
        <div className="post-shell">
          {toc.length > 0 && !post.body_md && (
            <aside className="chapter-rail" aria-label="Chapter navigation">
              <div className="hairline" style={{ marginBottom: 14 }}>Chapters</div>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {toc.map(t => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      onClick={e => {
                        e.preventDefault();
                        const el = document.getElementById(t.id);
                        if (el) {
                          const y = window.scrollY + el.getBoundingClientRect().top - 100;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                          history.replaceState(null, '', `#${t.id}`);
                        }
                      }}
                      style={{
                        textDecoration: 'none',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: activeId === t.id ? 'var(--ink)' : 'var(--ink-muted)',
                        display: 'flex',
                        gap: 10,
                        alignItems: 'baseline',
                      }}
                    >
                      <span style={{ width: 14, height: 1, background: activeId === t.id ? 'var(--ember)' : 'var(--rule)', marginTop: 7 }} />
                      <span>{CHAPTER_LABELS[t.kind].num}</span>
                      <span>{t.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}

          <div className="post-column">
            <Link to="/writing?tab=field-notes" className="ed-link" style={{ fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              ← Field Notes
            </Link>

            <header style={{ marginTop: 40 }}>
              <div className="post-meta">
                {post.series && post.series_slug && (
                  <>
                    <Link to={`/journal/series/${post.series_slug}`} className="ed-link" style={{ color: 'inherit' }}>{post.series}</Link>
                    <span aria-hidden>·</span>
                  </>
                )}
                {post.series && !post.series_slug && (<><span>{post.series}</span><span aria-hidden>·</span></>)}
                <span>{fmtDate(post.published_at)}</span>
                <span aria-hidden>·</span>
                <span>{post.reading_time_min} min</span>
                <span aria-hidden>·</span>
                <span>Stage / {post.stage}</span>
                <span aria-hidden>·</span>
                <span>Confidence / {post.confidence}/5</span>
              </div>
              <h1 style={{
                fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.04em',
                lineHeight: 0.98,
                margin: '24px 0 18px',
              }}>
                {post.title}
              </h1>
              <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', color: 'var(--ink-soft)', lineHeight: 1.55, maxWidth: 640 }}>
                {post.excerpt}
              </p>
              {post.tags.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
                  {post.tags.map(t => (
                    <Link key={t} to={`/journal/tag/${encodeURIComponent(t)}`} className="tag-chip" style={{ textDecoration: 'none' }}>
                      {t}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            {post.cover_url && (
              <div style={{ margin: '60px 0', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--rule)' }}>
                <img
                  src={post.cover_url}
                  alt=""
                  loading="eager"
                  decoding="async"
                  style={{ width: '100%', display: 'block', aspectRatio: '16 / 9', objectFit: 'cover' }}
                />
              </div>
            )}

            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: post.body_md ? 0 : 56 }}>
              {post.body_md ? (
                renderMarkdown(post.body_md)
              ) : (
                post.sections.map((s, i) => (
                  <SectionBlock
                    key={i}
                    section={s}
                    idx={i}
                    anchor={CHAPTER_KINDS.has(s.kind) ? slugifyChapter(s.kind as PostChapterKind, i) : undefined}
                  />
                ))
              )}
            </div>

            <ShareKit post={post} />

            {(prev || next) && (
              <nav style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="series-nav">
                {prev ? (
                  <Link to={`/journal/${prev.slug}`} className="series-nav-card" data-side="prev">
                    <span className="hairline">← Previous in series</span>
                    <span className="series-nav-title">{prev.title}</span>
                  </Link>
                ) : <span />}
                {next ? (
                  <Link to={`/journal/${next.slug}`} className="series-nav-card" data-side="next">
                    <span className="hairline">Next in series →</span>
                    <span className="series-nav-title">{next.title}</span>
                  </Link>
                ) : <span />}
              </nav>
            )}

            {related.length > 0 && (
              <section style={{ marginTop: 64 }}>
                <div className="hairline" style={{ marginBottom: 18 }}>Related field notes</div>
                <div className="related-grid">
                  {related.map(r => (
                    <Link key={r.id} to={`/journal/${r.slug}`} className="related-card">
                      <div className="post-meta" style={{ marginBottom: 8 }}>
                        {r.series && <span>{r.series}</span>}
                        {r.series && <span aria-hidden>·</span>}
                        <span>{r.reading_time_min} min</span>
                      </div>
                      <h3 style={{ fontSize: 18, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.2 }}>{r.title}</h3>
                      <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.55, margin: '8px 0 0' }}>{r.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <AuthorBio />
            <NewsletterCapture />

            <footer style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--rule)' }}>
              <div className="hairline" style={{ marginBottom: 12 }}>Sign-off</div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                color: 'var(--ink-soft)',
                lineHeight: 1.4,
                margin: 0,
              }}>
                Rushikesh Pawar — written from Mumbai, {fmtDate(post.published_at)}.
              </p>
              <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/writing?tab=field-notes" className="btn-outline">All field notes</Link>
                <Link to="/contact" className="btn-ink">Start a project →</Link>
              </div>
            </footer>
          </div>
        </div>
      </article>

      <Footer />

      <style>{`
        .post-shell {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 40px);
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          gap: clamp(24px, 5vw, 80px);
        }
        .post-column { max-width: 720px; min-width: 0; }
        .chapter-rail {
          position: sticky;
          top: 110px;
          align-self: start;
          padding-top: 6px;
        }
        .post-meta {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-muted);
          display: inline-flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }
        .tag-chip {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-muted);
          border: 1px solid var(--rule);
          padding: 4px 10px;
          border-radius: 999px;
          transition: color 0.3s var(--ease-out), border-color 0.3s var(--ease-out);
        }
        .tag-chip:hover { color: var(--ink); border-color: var(--ink); }
        .anchor-link {
          color: var(--ink-muted);
          opacity: 0;
          transition: opacity 0.3s var(--ease-out);
          text-decoration: none;
        }
        .fn-chapter:hover .anchor-link { opacity: 1; }
        .series-nav-card {
          border: 1px solid var(--rule);
          border-radius: 4;
          padding: 18px 20px;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: border-color 0.3s var(--ease-out);
        }
        .series-nav-card[data-side="next"] { text-align: right; }
        .series-nav-card:hover { border-color: var(--ember); }
        .series-nav-title {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          line-height: 1.2;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .related-card {
          border: 1px solid var(--rule);
          border-radius: 4;
          padding: 18px 20px;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: transform 0.4s var(--ease-out), border-color 0.3s var(--ease-out);
        }
        .related-card:hover { transform: translateY(-2px); border-color: var(--ember); }

        @media (max-width: 980px) {
          .post-shell { grid-template-columns: 1fr; }
          .chapter-rail { display: none; }
          .related-grid { grid-template-columns: 1fr; }
          .series-nav { grid-template-columns: 1fr !important; }
          .series-nav-card[data-side="next"] { text-align: left; }
        }
      `}</style>
    </main>
  );
};

export default JournalPostPage;

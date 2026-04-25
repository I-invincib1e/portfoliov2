import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchPostsByTag, Post } from '../lib/supabase';
import JournalList from '../components/JournalList';
import Footer from '../components/Footer';
import { useSeo, SITE_URL, breadcrumbJsonLd } from '../lib/seo';

const JournalTagPage = () => {
  const { tag } = useParams<{ tag: string }>();
  const decoded = decodeURIComponent(tag ?? '');
  const [posts, setPosts] = useState<Post[] | null>(null);

  useSeo({
    title: `Field Notes tagged "${decoded}" — Rushikesh Pawar`,
    description: `Field notes tagged ${decoded}.`,
    path: `/journal/tag/${tag}`,
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Field Notes', url: `${SITE_URL}/journal` },
        { name: decoded, url: `${SITE_URL}/journal/tag/${tag}` },
      ]),
    ],
  });

  useEffect(() => {
    if (!decoded) return;
    fetchPostsByTag(decoded).then(setPosts);
  }, [decoded]);

  return (
    <main id="main">
      <section style={{ padding: 'clamp(120px, 16vw, 180px) 0 60px' }}>
        <div className="container-ed">
          <Link to="/journal" className="ed-link" style={{ fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            ← Field Notes
          </Link>
          <div className="hairline" style={{ marginTop: 28 }}>Tag</div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 8vw, 6rem)', marginTop: 18, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            Notes tagged <em style={{ color: 'var(--ember)' }}>{decoded}.</em>
          </h1>
        </div>
      </section>
      <section style={{ padding: '40px 0 120px' }}>
        <div className="container-ed">
          <JournalList posts={posts} empty={`No notes tagged "${decoded}" yet.`} />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default JournalTagPage;

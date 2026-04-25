import Hero from '../components/Hero';
import About from '../components/About';
import Work from '../components/Work';
import Footer from '../components/Footer';
import { useSeo, SITE_URL } from '../lib/seo';

type Props = { ready?: boolean };

const HomePage = ({ ready }: Props) => {
  useSeo({
    title: 'Rushikesh Pawar — Frontend & AI Engineer | Portfolio',
    description: 'Editorial portfolio of Rushikesh Pawar — frontend engineer in Mumbai building React, TypeScript and LLM-driven interfaces. Selected work, certifications and a way to commission projects.',
    path: '/',
    keywords: ['Rushikesh Pawar', 'frontend developer Mumbai', 'React engineer', 'AI engineer', 'LangChain', 'Groq', 'TypeScript portfolio', 'GSAP'],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/#home`,
      name: 'Rushikesh Pawar — Portfolio',
      url: `${SITE_URL}/`,
      about: { '@id': `${SITE_URL}/#person` },
    },
  });
  return (
    <main id="main">
      <Hero ready={ready} />
      <About />
      <Work />
      <Footer />
    </main>
  );
};

export default HomePage;

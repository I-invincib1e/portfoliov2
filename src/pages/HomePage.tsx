import Hero from '../components/Hero';
import ProofStrip from '../components/ProofStrip';
import FeaturedProjects from '../components/FeaturedProjects';
import Adloom from '../components/Adloom';
import BuildLogsStrip from '../components/BuildLogsStrip';
import About from '../components/About';
import Work from '../components/Work';
import NewsletterCTA from '../components/NewsletterCTA';
import Footer from '../components/Footer';
import { useSeo, SITE_URL } from '../lib/seo';

type Props = { ready?: boolean };

const HomePage = ({ ready }: Props) => {
  useSeo({
    title: 'Rushikesh Pawar — AI Product Engineer & Builder',
    description: 'I build AI-powered products, automation workflows, and product experiments using React, Python, Supabase, and modern AI tools.',
    path: '/',
    keywords: [
      'Rushikesh Pawar',
      'AI Product Engineer',
      'AI agents builder',
      'SaaS developer',
      'automation tools',
      'React engineer',
      'AI agents',
      'builder notes',
      'technical founder',
      'Mumbai developer',
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Rushikesh Pawar',
        jobTitle: 'AI Product Engineer',
        url: SITE_URL,
        sameAs: [
          'https://github.com/I-invincib1e',
          'https://www.linkedin.com/in/devrex/',
          'https://www.instagram.com/i_invincib1e/',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Rushikesh Pawar — AI Product Engineer & Builder',
        publisher: { '@id': `${SITE_URL}/#person` },
      },
    ],
  });
  return (
    <main id="main">
      <Hero ready={ready} />
      <ProofStrip />
      <FeaturedProjects />
      <Adloom />
      <Work />
      <BuildLogsStrip />
      <About />
      <NewsletterCTA />
      <Footer />
    </main>
  );
};

export default HomePage;

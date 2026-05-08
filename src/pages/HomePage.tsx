import Hero from '../components/Hero';
import ProofStrip from '../components/ProofStrip';
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
    title: 'Rushikesh Pawar — AI Product Engineer',
    description: 'Rushikesh Pawar — AI Product Engineer building SaaS, voice AI systems and automation tools. Shopify app shipped, voice AI infrastructure in progress.',
    path: '/',
    keywords: ['Rushikesh Pawar', 'AI Product Engineer', 'Shopify app developer', 'Adloom', 'Voice AI', 'React engineer', 'automation tools', 'technical founder'],
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
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Rushikesh Pawar',
        publisher: { '@id': `${SITE_URL}/#person` },
      },
    ],
  });
  return (
    <main id="main">
      <Hero ready={ready} />
      <ProofStrip />
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

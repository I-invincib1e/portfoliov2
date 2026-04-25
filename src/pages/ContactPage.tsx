import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useSeo, SITE_URL, breadcrumbJsonLd } from '../lib/seo';

const ContactPage = () => {
  useSeo({
    title: 'Contact — Rushikesh Pawar | Commission a project',
    description: 'Start a conversation with Rushikesh Pawar about React, TypeScript or AI/LLM engagements. Replies usually within 48 hours from Mumbai.',
    path: '/contact',
    keywords: ['hire frontend developer', 'React contractor', 'AI engineer Mumbai', 'commission React project', 'Rushikesh Pawar contact'],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        url: `${SITE_URL}/contact`,
        about: { '@id': `${SITE_URL}/#person` },
      },
      breadcrumbJsonLd([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Contact', url: `${SITE_URL}/contact` },
      ]),
    ],
  });
  return (
    <main id="main">
      <Contact />
      <Footer />
    </main>
  );
};

export default ContactPage;

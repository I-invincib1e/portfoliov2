import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useSeo, SITE_URL, breadcrumbJsonLd } from '../lib/seo';

const ContactPage = () => {
  useSeo({
    title: 'Contact — Rushikesh Pawar | AI Product Builds, Voice AI, SaaS MVPs',
    description: 'Work with Rushikesh Pawar on AI product builds, voice AI systems, automation workflows, SaaS MVPs, and collaborations. Replies within 48 hours from Mumbai.',
    path: '/contact',
    keywords: ['hire AI product engineer', 'voice AI developer', 'SaaS MVP builder', 'automation consultant', 'Rushikesh Pawar contact'],
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

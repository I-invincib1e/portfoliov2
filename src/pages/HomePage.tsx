import Hero from '../components/Hero';
import About from '../components/About';
import Work from '../components/Work';
import Footer from '../components/Footer';

type Props = { ready?: boolean };

const HomePage = ({ ready }: Props) => (
  <main>
    <Hero ready={ready} />
    <About />
    <Work />
    <Footer />
  </main>
);

export default HomePage;

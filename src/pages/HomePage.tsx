import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Work from '../components/Work';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Footer />
    </main>
  );
};

export default HomePage;
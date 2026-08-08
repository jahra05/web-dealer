import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import ProductShowcase from './ProductShowcase';
import CreditSimulation from './CreditSimulation';
import FAQ from './FAQ';
import Footer from './Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import Testimonials from './Testimonials';


const HomePage = () => {
  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-4">
        <Hero />
        <Features />
        <ProductShowcase />
        <CreditSimulation />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;

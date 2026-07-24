import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductShowcase from '../components/ProductShowcase';
import CreditSimulation from '../components/CreditSimulation';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

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

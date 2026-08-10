import React from 'react';
import ProductShowcase from './customer/ProductShowcase';
import CreditSimulation from './customer/CreditSimulation';
import Testimonials from './customer/Testimonials';
import Hero from './customer/Hero';
import Feature from './customer/Features';
import Navbar from './customer/Navbar';
import FAQ from './customer/FAQ';
import Footer from './customer/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-4">
        <Hero />
        <Feature />
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

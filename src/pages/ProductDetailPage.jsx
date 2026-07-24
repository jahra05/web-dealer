import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductDetail from '../components/ProductDetail';
import WhatsAppButton from '../components/WhatsAppButton';

const ProductDetailPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <ProductDetail />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetailPage;

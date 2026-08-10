import React from 'react';
import Navbar from './customer/Navbar';
import Footer from './customer/Footer';
import ProductDetail from './customer/ProductDetail';
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

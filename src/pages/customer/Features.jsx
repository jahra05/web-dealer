import React from 'react';
import { FaClock, FaTruck, FaWallet } from 'react-icons/fa6';
import { IoShieldCheckmark } from 'react-icons/io5';

const Features = () => {
  const features = [
    {
      icon: <FaTruck className="text-primary" size={24} />,
      title: "Pengiriman Aman",
      desc: "Seluruh Indonesia"
    },
    {
      icon: <FaWallet className="text-primary" size={24} />,
      title: "DP Ringan",
      desc: "Mulai 500 Ribu"
    },
    {
      icon: <FaClock className="text-primary" size={24} />,
      title: "Proses Mudah",
      desc: "1-3 Hari Kerja"
    },
    {
      icon: <IoShieldCheckmark className="text-primary" size={24} />,
      title: "Garansi Resmi",
      desc: "Motor Terjamin"
    }
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          {features.map((f, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="bg-red-50 p-3 rounded-xl">
                {f.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{f.title}</h4>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

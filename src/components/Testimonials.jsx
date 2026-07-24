import React, { useEffect, useState } from 'react';
import { testimonials } from '../data/siteData';
import { IoMdStar } from 'react-icons/io';

const Testimonials = () => {
  const [testimoni, setTestimoni] = useState([])
  const getTestimoni = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/testimoni");
      const data = await response.json();

      if (data.success) {
        setTestimoni(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTestimoni();
  }, []);
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-gray-900 mb-12">Testimoni Pembeli</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimoni.map((item) => (
            <div key={item.id_testimoni} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex text-yellow-400 mb-4">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <span key={index}>⭐</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm italic mb-8 leading-relaxed">
                "{item.isi_testimoni}"
              </p>
              <div className="flex items-center space-x-4">
                <img src={`http://localhost:3000/uploads/${item.foto}`}
                  alt={item.nama} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{item.nama}</h4>
                  <p className="text-[10px] font-bold text-gray-400">{item.pekerjaan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 space-x-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

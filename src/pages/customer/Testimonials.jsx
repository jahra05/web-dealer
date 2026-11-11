import React, { useEffect, useState } from 'react';
// import { testimonials } from '../data/siteData';
import { IoMdStar } from 'react-icons/io';
import { motion } from 'framer-motion';
import SectionReveal from '../../components/SectionReveal';
import { getFunctionUrl, getSupabaseHeaders, } from "../../config/supabase";


const Testimonials = () => {
  const [testimoni, setTestimoni] = useState([])

  const getTestimoni = async () => {
    try {
      const response = await fetch(getFunctionUrl("testimoni"), {
        headers: {
          ...getSupabaseHeaders(),
        },
      });

      const data = await response.json();
      console.log(data.data)

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
    <SectionReveal>
      <section className="bg-gray-50 py-20 rounded-[40px]" id='testimoni'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-black text-gray-900 mb-12">Testimoni Pembeli</motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
            {testimoni.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 35, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                key={item.id_testimoni} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">

                <div className='flex justify-between items-center'>
                  <div className="flex items-center space-x-4">
                    <motion.img initial={{ opacity: 0, scale: 0 }} whileHover={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.07 + 0.1 }} src={`${item.foto}`}
                      alt={item.nama} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.nama}</h4>
                      <p className="text-[10px] font-bold text-gray-400">{item.pekerjaan}</p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.07 + 0.2, ease: "easeOut" }}
                    className="flex text-yellow-400 mb-4">
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ duration: 0.25, delay: index * 0.04 }}
                        key={index} className='text-sm'>⭐</motion.span>
                    ))}
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ direction: 0.5, delay: index * 0.07 + 0.25 }}
                  className="text-gray-600 text-sm italic mt-4 leading-relaxed">
                  "{item.isi_testimoni}"
                </motion.p>

              </motion.div>
            ))}
          </div>
        </div>
      </section >
    </SectionReveal>
  );
};

export default Testimonials;

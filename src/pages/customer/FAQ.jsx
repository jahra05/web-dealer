import React, { useEffect, useState } from 'react';
// import { faqs } from '../data/siteData';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from '../../components/SectionReveal';
import { getFunctionUrl, getSupabaseHeaders, } from "../../config/supabase";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [faq, setFaq] = useState([])
  const getFaq = async () => {
    try {
      const response = await fetch(getFunctionUrl("faq"), {
        headers: {
          ...getSupabaseHeaders(),
        },
      });
      const data = await response.json()

      if (data.success) {
        setFaq(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFaq()
  }, [])

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-1 gap-12">
          {/* FAQ Accordion */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl font-black text-gray-900 mb-12">FAQ</motion.h2>

            <div className="space-y-4">
              {faq.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  key={item.id_faq} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => setOpenIndex(openIndex === item ? -1 : item)}
                    className="w-full py-6 flex justify-between items-center text-left group"
                  >
                    <span className={`font-bold transition-colors ${openIndex === item ? 'hover:text-[#4B5563]' : 'text-gray-700 group-hover:text-[#004A7C]'}`}>
                      {item.pertanyaan}
                    </span>
                    <motion.div animate={{ rotate: openIndex === item ? 45 : 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className='flex-shrink-0 ml-4'>
                      <FaPlus size={18} className={openIndex === item ? 'text-gray-700' : 'text-gray-400'} />
                    </motion.div>
                    {/* {openIndex === item ? <FaMinus size={18} className="hover:text-[#4B5563]" /> : <FaPlus size={18} className="text-gray-400" />} */}
                  </button>
                  <AnimatePresence initial={false}>
                    {openIndex === item && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2 } }} className="pb-6">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.jawaban}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

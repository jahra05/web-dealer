import React, { useEffect, useState } from 'react';
import { faqs } from '../data/siteData';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [faq, setFaq] = useState([])
  const getFaq = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/faq");
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
            <h2 className="text-3xl font-black text-gray-900 mb-12">Pertanyaan yang Sering Diajukan</h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <div key={item.id_faq} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => setOpenIndex(openIndex === item ? -1 : item)}
                    className="w-full py-6 flex justify-between items-center text-left group"
                  >
                    <span className={`font-bold transition-colors ${openIndex === item ? 'text-primary' : 'text-gray-700 group-hover:text-primary'}`}>
                      {item.pertanyaan}
                    </span>
                    {openIndex === item ? <FaMinus size={18} className="text-primary" /> : <FaPlus size={18} className="text-gray-400" />}
                  </button>
                  {openIndex === item && (
                    <div className="pb-6">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.jawaban}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

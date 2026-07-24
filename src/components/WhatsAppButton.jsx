import React from 'react';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[60] group">
      <div className="absolute bottom-full right-0 mb-4 bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
        <p className="text-sm font-black text-gray-900">Chat WhatsApp</p>
        <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-white border-r border-b border-gray-100 rotate-45"></div>
      </div>
      <a 
        href="https://wa.me/6287769084385" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-200 hover:scale-110 transition-transform active:scale-95 border-4 border-white"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-8 h-8 brightness-0 invert" alt="WA" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">1</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LeadModal from '../../components/LeadModal';
import CustomAlert from '../../components/CustomAlert'

const Navbar = () => {
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [infoStore, setInfoStore] = useState([])
  const [logo, setLogo] = useState(null)
  console.log('isi store', infoStore)



  const getDataStore = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/footer`);

      const data = await response.json();
      console.log('data footer', data)

      setInfoStore(data.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDataStore()
  }, [])
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_hp: "",
    subjek: "",
    pesan: ""
  });
  const [alert, setAlert] = useState(null)



  const openModal = () => {
    setIsModalOpen(true);
    setFormData({
      nama: "",
      email: "",
      no_hp: "",
      subjek: "",
      pesan: ""
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setAlert({ type: 'success', message: data.message || 'Pesan berhasil dikirim.' })
        setFormData({ nama: "", email: "", no_hp: "", subjek: "", pesan: "" });
        setIsModalOpen(false)
      } else {
        setAlert({ type: 'error', message: data.message })
        setIsModalOpen(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleScrollTo = (id) => {
    setIsDrawerOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMenuClick = (action) => {
    setIsDrawerOpen(false);
    action();
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Produk', id: 'produk' },
    { label: 'Simulasi Kredit', id: 'simulasi-kredit' },
    { label: 'Testimonials', id: 'kontak' },
  ];


  return (
    <>
      {alert && <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div className='flex items-center gap-4'>
              <img className='w-18 h-14 object-cover ml-10'
                src={logo ? URL.createObjectURL(logo) : `${infoStore.logo}`} />
              <div className="leading-tight min-w-0">
                <h2 className="text-lg font-bold text-gray-900 truncate">{infoStore.nama_dealer}</h2>
                <p className="text-[10px] text-gray-500">{infoStore.title}</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className="text-gray-700 hover:text-[#002446] font-bold text-sm transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={openModal}
                className="text-white font-bold text-sm bg-[#002446]  hover:bg-[#00345F]  px-5 py-2.5 rounded-full transition-colors"
              >
                Contact Us
              </button>
            </div>

            {/* Hamburger Button (mobile/tablet) */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </button>
          </div>
        </div >

        {/* ── Contact Modal ── */}

      </nav >

      {/* ── Mobile/Tablet Off-Canvas Drawer ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 md:hidden ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 left-0 z-[70] h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-100">
          <Link to="/" onClick={() => setIsDrawerOpen(false)} className="flex items-center space-x-2">
            <div className='flex items-center gap-4 ml-6'>
              <img className='w-18 h-14'
                src={logo ? URL.createObjectURL(logo) : `${infoStore.logo}`} />
              <div className="leading-tight min-w-0">
                <h2 className="text-lg font-bold text-gray-900 truncate">{infoStore.nama_dealer}</h2>
                <p className="text-[10px] text-gray-500">{infoStore.title}</p>
              </div>
            </div>
          </Link>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        {/* Drawer Menu Items */}
        <nav className="flex flex-col p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="w-full text-left px-4 py-3.5 rounded-xl text-gray-700 hover:text-[#002446] hover:bg-blue-50 font-bold text-sm transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3">
            <button
              onClick={() => handleMenuClick(openModal)}
              className="w-full text-white font-bold text-sm bg-[#002446]  hover:bg-[#00345F] px-4 py-3.5 rounded-xl transition-colors"
            >
              Contact Us
            </button>
          </div>
        </nav>
      </aside>
      {
        isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6" onClick={closeModal}>
            <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-slate-900">Contact Us</p>
                  <p className="mt-1 text-sm text-slate-500">Silahkan kontak Kami dengan isi form dibawah!</p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-50"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-sm font-medium text-slate-700">Nama</p>
                  <input type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder='Nama'
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-indigo-400" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-slate-700">Email</p>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email'
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-indigo-400" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-slate-700">No Headphone</p>
                  <input type="number" name="no_hp" value={formData.no_hp} onChange={handleChange} placeholder='No Headphone'
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-indigo-400" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-slate-700">Subjek</p>
                  <input type="text" name="subjek" value={formData.subjek} onChange={handleChange} placeholder='Subjek'
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-indigo-400" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-slate-700">Message</p>
                  <textarea type="text" name="pesan" value={formData.pesan} onChange={handleChange} placeholder='Message'
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-indigo-400" />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">Batal</button>
                <button type="button" onClick={handleSubmit} className="rounded-full bg-[#002446]  hover:bg-[#00345F] px-4 py-2 text-sm font-medium text-white transition">kirim</button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Navbar;

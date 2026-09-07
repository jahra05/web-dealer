import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Admin/Login';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import KelolaProduk from './pages/Admin/KelolaProduk';
import PengajuanKredit from './pages/Admin/PengajuanKredit';
import Exam from './pages/Admin/Exam';
import ProtectedRoute from './components/ProtectedRoute';
import Testimoni from './pages/Admin/Testimoni';
import FaqAdmin from './pages/Admin/FaqAdmin';
import PageMessage from './pages/Admin/PageMessage';
// import SimulasiKredit from './pages/Admin/SimulasiKredit';
import Spesifikasi from './pages/Admin/Spesifikasi';
import Setting from './pages/Admin/setting/Setting';
import PageForgatPassword from './pages/Admin/PageForgatPassword';
import SettingProfileDealer from './pages/Admin/setting/SettingProfileDealer';
import SettingProfileAdmin from './pages/Admin/setting/SettingProfileAdmin';
import HeroSetting from './pages/Admin/setting/HeroSetting';
import Footer from './pages/Admin/setting/Footer';
import Kategori from './pages/Admin/setting/Kategori';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" />
      <Routes>
        {/* Public routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/forgatPassword" element={<PageForgatPassword />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        {/* Admin routes grouped under AdminLayout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="kelolaProduk" element={<KelolaProduk />} />
          <Route path="spesifikasi" element={<Spesifikasi />} />
          <Route path="pengajuanKredit" element={<PengajuanKredit />} />
          {/* <Route path="simulasiKredit" element={<SimulasiKredit />} /> */}
          <Route path="pagemessage" element={<PageMessage />} />
          <Route path="testimoni" element={<Testimoni />} />
          <Route path="faq" element={<FaqAdmin />} />
          <Route path="exam" element={<Exam />} />
          <Route path="setting" element={<Setting />} />
          <Route path="setting/profile-dealer" element={<SettingProfileDealer />} />
          <Route path="setting/profile-admin" element={<SettingProfileAdmin />} />
          <Route path="setting/hero" element={<HeroSetting />} />
          <Route path="setting/footer" element={<Footer />} />
          <Route path="setting/kategori" element={<Kategori />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;

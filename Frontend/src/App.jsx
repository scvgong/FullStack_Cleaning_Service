import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import BizLayout from "./layouts/BizLayout";

import AdminQuoteList from "./pages/admin/AdminQuoteList";
import AdminQuoteDetail from "./pages/admin/AdminQuoteDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";

// 추가된 페이지 컴포넌트
import MoveInCleaning from "./pages/cleaning/MoveInCleaning";
import InteriorCleaning from "./pages/cleaning/InteriorCleaning";
import ConstructionCleaning from "./pages/cleaning/ConstructionCleaning";
import CarpetCleaning from "./pages/cleaning/CarpetCleaning";
import WallCleaning from "./pages/cleaning/WallCleaning";
import QuoteRequest from "./pages/contact/QuoteRequest";
import Gallery from "./pages/Gallery";

import AuthLogin from "./pages/admin/AuthLogin";
import AdminRegister from "./pages/admin/AdminRegister";

import BusinessDashboard from "./pages/business/BusinessDashboard";
import BusinessQuoteList from "./pages/business/BusinessQuoteList";
import BusinessQuoteDetail from "./pages/business/BusinessQuoteDetail";

import FaqCreate from "./pages/admin/FaqCreate";
import FaqList from "./pages/admin/FaqList";

function App() {
  return (
    <Router>
      <Routes>
        {/* 고객용 Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="home-cleaning/move-in" element={<MoveInCleaning />} />
          <Route path="home-cleaning/interior" element={<InteriorCleaning />} />
          <Route
            path="business-cleaning/construction"
            element={<ConstructionCleaning />}
          />
          <Route path="special-cleaning/carpet" element={<CarpetCleaning />} />
          <Route path="special-cleaning/wall" element={<WallCleaning />} />
          <Route path="contact/quote" element={<QuoteRequest />} />
          <Route path="gallery" element={<Gallery />} />
          {/* 로그인 링크도 여기로 */}
          <Route path="admin/login" element={<AuthLogin />} />
        </Route>

        {/* 관리자용용 Routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="login" element={<AuthLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="quotes" element={<AdminQuoteList />} />
          <Route path="quotes/:id" element={<AdminQuoteDetail />} />
          <Route path="register" element={<AdminRegister />} />
          <Route path="faqs" element={<FaqList />} />
          <Route path="faqs/create" element={<FaqCreate />} />
        </Route>

        {/* 사업자용 Routes */}
        <Route path="business" element={<BizLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="/business/login" element={<AuthLogin />} />
          <Route path="dashboard" element={<BusinessDashboard />} />
          <Route path="quotes" element={<BusinessQuoteList />} />
          <Route path="quotes/:id" element={<BusinessQuoteDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

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
import AdminUserPendingPage from "./pages/admin/AdminUserPendingPage";
import AdminUserListPage from "./pages/admin/AdminUserListPage";

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
import BusinessRegister from "./pages/business/BusinessRegister";

import BusinessDashboard from "./pages/business/BusinessDashboard";
import BusinessQuoteList from "./pages/business/BusinessQuoteList";
import BusinessQuoteDetail from "./pages/business/BusinessQuoteDetail";
import BusinessInquiryList from "./pages/business/BusinessInquiryList";
import BusinessInquiryDetail from "./pages/business/BusinessInquiryDetail";
import BusinessInquiryCreate from "./pages/business/BusinessInquiryCreate";
import BusinessMyPage from "./pages/business/BusinessMyPage";

import FaqCreate from "./pages/admin/FaqCreate";
import FaqList from "./pages/admin/FaqList";
import FaqEdit from "./pages/admin/FaqEdit";
import FaqDetail from "./pages/admin/FaqDetail";
import AdminInquiryList from "./pages/admin/AdminInquiryList";
import AdminInquiryDetail from "./pages/admin/AdminInquiryDetail";
import AdminInquiryCompletedList from "./pages/admin/AdminInquiryCompletedList";

import MemberRegister from "./pages/member/MemberRegister";
import MemberLogin from "./pages/member/MemberLogin";
import ProtectedMemberRoute from "./components/ProtectedMemberRoute";

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
          <Route path="business-cleaning/construction" element={<ConstructionCleaning />}/>
          <Route path="special-cleaning/carpet" element={<CarpetCleaning />} />
          <Route path="special-cleaning/wall" element={<WallCleaning />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="member/register" element={<MemberRegister />} />
          <Route path="member/login" element={<MemberLogin />} />
          {/* 로그인 링크도 여기로 */}
          <Route path="admin/login" element={<AuthLogin />} />
          {/* 견적요청: 로그인 필요하도록 보호 */}
          <Route path="contact/quote" element={
              <ProtectedMemberRoute>
                <Route path="contact/quote" element={<QuoteRequest />} />
              </ProtectedMemberRoute>
            }
          />
        </Route>

        {/* 관리자용용 Routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route path="register" element={<AdminRegister />}/>
          <Route index element={<AdminDashboard />} />
          <Route path="login" element={<AuthLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="quotes" element={<AdminQuoteList />} />
          <Route path="quotes/:id" element={<AdminQuoteDetail />} />
          <Route path="faqs" element={<FaqList />} />
          <Route path="faqs/create" element={<FaqCreate />} />
          <Route path="faqs/:id" element={<FaqDetail />} />
          <Route path="faqs/:id/edit" element={<FaqEdit />} />
          <Route path="inquiries" element={<AdminInquiryList />} />
          <Route path="inquiries/:id" element={<AdminInquiryDetail />} />
          <Route path="inquiries/completed" element={<AdminInquiryCompletedList />} />
          <Route path="users/pending" element={<AdminUserPendingPage/>} />  
          <Route path="users" element={<AdminUserListPage />} />
        </Route>

        {/* 사업자용 Routes */}
        <Route path="business" element={<BizLayout />}>
          <Route path="register" element={<BusinessRegister />} />
          <Route path="mypage" element={<BusinessMyPage />} />
          <Route path="login" element={<AuthLogin />} />
          <Route path="/business/login" element={<AuthLogin />} />
          <Route path="dashboard" element={<BusinessDashboard />} />
          <Route path="quotes" element={<BusinessQuoteList />} />
          <Route path="quotes/:id" element={<BusinessQuoteDetail />} />
          <Route path="inquiries" element={<BusinessInquiryList />} />
          <Route path="inquiries/:id" element={<BusinessInquiryDetail />} />
          <Route path="inquiries/create" element={<BusinessInquiryCreate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

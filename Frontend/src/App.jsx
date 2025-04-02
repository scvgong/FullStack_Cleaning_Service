import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MainLayout from "./layouts/MainLayout";

// 추가된 페이지 컴포넌트
import MoveInCleaning from "./pages/cleaning/MoveInCleaning";
import InteriorCleaning from "./pages/cleaning/InteriorCleaning";
import ConstructionCleaning from "./pages/cleaning/ConstructionCleaning";
import CarpetCleaning from "./pages/cleaning/CarpetCleaning";
import WallCleaning from "./pages/cleaning/WallCleaning";
import QuoteRequest from "./pages/contact/QuoteRequest";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/home-cleaning/move-in" element={<MoveInCleaning />} />
          <Route
            path="/home-cleaning/interior"
            element={<InteriorCleaning />}
          />
          <Route
            path="/business-cleaning/construction"
            element={<ConstructionCleaning />}
          />
          <Route path="/special-cleaning/carpet" element={<CarpetCleaning />} />
          <Route path="/special-cleaning/wall" element={<WallCleaning />} />
          <Route path="/contact/quote" element={<QuoteRequest />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

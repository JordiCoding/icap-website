import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import PlaceholderPage from './pages/PlaceholderPage';
import CalculatorPage from './pages/CalculatorPage';
import RealEstate from './pages/RealEstate';
import Brokerage from './pages/Brokerage';
import NewsDetailPage from './pages/NewsDetailPage';
import PromotionModal from './components/common/PromotionModal';
import { usePromotionPopup } from './hooks/usePromotionPopup';
import './utils/i18n'; // Initialize i18n

function App() {
  const { popup, isVisible, closePopup, loading, error } = usePromotionPopup();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brokerage" element={<Brokerage />} />
        <Route path="/about" element={<PlaceholderPage title="About Us" />} />
        <Route path="/investment-banking" element={<PlaceholderPage title="Investment Banking" />} />
        <Route path="/real-estate" element={<RealEstate />} />
        <Route path="/newsroom" element={<PlaceholderPage title="Newsroom" />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
      </Routes>
      
      {/* Promotion Popup */}
      {popup && (
        <PromotionModal
          popup={popup}
          isVisible={isVisible}
          onClose={closePopup}
        />
      )}
    </Layout>
  );
}

export default App;

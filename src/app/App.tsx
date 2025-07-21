import { Routes, Route } from 'react-router-dom';
import { Layout } from '../shared/components/layout';
import HomePage from '../modules/home/pages';
import BrokeragePage from '../modules/brokerage/pages';
import LocalMarketPage from '../modules/brokerage/pages/local-market';
import PlaceholderPage from '../shared/pages/PlaceholderPage';
import CalculatorPage from '../modules/calculator/pages';
import RealEstate from '../modules/real-estate/pages';
import NewsDetailPage from '../shared/pages/NewsDetailPage';
import PromotionModal from '../shared/components/PromotionModal';
import { usePromotionPopup } from '../shared/hooks';
import '../shared/utils/i18n'; // Initialize i18n

function App() {
  const { popup, isVisible, closePopup, loading, error } = usePromotionPopup();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brokerage" element={<BrokeragePage />} />
        <Route path="/local-market" element={<LocalMarketPage />} />
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

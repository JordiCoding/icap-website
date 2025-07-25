import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import PlaceholderPage from './pages/PlaceholderPage';
import CalculatorPage from './pages/CalculatorPage';
import './utils/i18n'; // Initialize i18n

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<PlaceholderPage title="About Us" />} />
        <Route path="/investment-banking" element={<PlaceholderPage title="Investment Banking" />} />
        <Route path="/real-estate" element={<PlaceholderPage title="Real Estate" />} />
        <Route path="/newsroom" element={<PlaceholderPage title="Newsroom" />} />
        <Route path="/calculator" element={<CalculatorPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

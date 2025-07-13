import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Determine header styling based on route
  const isNewsDetailPage = location.pathname.startsWith('/news/');
  const headerProps = isNewsDetailPage 
    ? { background: '#341D00', position: 'relative' as const }
    : {};

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...headerProps} />
      <main className={`flex-grow ${isNewsDetailPage ? '' : ''}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout; 
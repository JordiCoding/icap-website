import { useState, useEffect } from 'react';
import { gql } from 'graphql-request';
import { hygraphClient } from '../utils/hygraph';
import type { PromotionPopup } from '../types/promotion';

interface PromotionPopupResponse {
  promotionPopups: PromotionPopup[];
}

const GET_PROMOTION_POPUP = gql`
  query GetPromotionPopup {
    promotionPopups(where: { enabled: true }) {
      id
      title
      description
      ctaText
      ctaLink
      enabled
      image {
        url
      }
    }
  }
`;

export const usePromotionPopup = () => {
  const [popup, setPopup] = useState<PromotionPopup | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromotionPopup = async () => {
      try {
        setLoading(true);
        setError(null);
        const data: PromotionPopupResponse = await hygraphClient.request(GET_PROMOTION_POPUP);
        
        if (data?.promotionPopups && data.promotionPopups.length > 0) {
          const activePopup = data.promotionPopups[0]; // Get the first enabled popup
          if (activePopup.enabled) {
            // Check if popup has been shown this session (optional - comment out for testing)
            // const hasShownPopup = localStorage.getItem('promoShown');
            // if (hasShownPopup) return;
            
            setPopup(activePopup);
            // Show popup after a short delay for better UX
            const timer = setTimeout(() => {
              setIsVisible(true);
              // Mark as shown (optional - uncomment for production)
              // localStorage.setItem('promoShown', 'true');
            }, 1000);
            
            return () => clearTimeout(timer);
          }
        }
      } catch (err) {
        console.error('Failed to fetch promotion popup:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch promotion popup');
      } finally {
        setLoading(false);
      }
    };

    fetchPromotionPopup();
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  return {
    popup,
    isVisible,
    closePopup,
    loading,
    error
  };
}; 
export interface PromotionPopup {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  enabled: boolean;
  image?: {
    url: string;
  };
} 
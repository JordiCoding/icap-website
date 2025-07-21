// CMS Content Types for Hygraph

export interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  backgroundImage?: {
    url: string;
    alt?: string;
  };
  language: 'en' | 'ar';
}

export interface CmsData {
  heroContent?: HeroContent;
}

// GraphQL Query Responses
export interface HeroContentResponse {
  heroContents: HeroContent[];
} 
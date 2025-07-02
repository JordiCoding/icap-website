import { useState, useEffect } from 'react';
import { gql } from 'graphql-request';
import { hygraphClient } from '../utils/hygraph';
import type { HeroContent, HeroContentResponse } from '../types/cms';
import { useLanguage } from './useLanguage';
import { useTranslation } from 'react-i18next';

const GET_HERO_CONTENT = gql`
  query GetHeroContent($locale: Locale!) {
    heroContents(locales: [$locale]) {
      id
      title
      subtitle
      ctaPrimary
      ctaSecondary
      backgroundImage {
        url
      }
    }
  }
`;

export const useCmsData = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as 'en' | 'ar';

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data: HeroContentResponse = await hygraphClient.request(
          GET_HERO_CONTENT,
          { locale: currentLanguage }
        );
        console.log('Hygraph data for', currentLanguage, data);
        const content = data.heroContents?.[0] || null;
        setHeroContent(content);
      } catch (err) {
        console.error('Failed to fetch CMS data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch CMS data');
      } finally {
        setLoading(false);
      }
    };
    fetchHeroContent();
  }, [currentLanguage, i18n.language]);

  return {
    data: { hero: heroContent },
    loading,
    error,
  };
}; 
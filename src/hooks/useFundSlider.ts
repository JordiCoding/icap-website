import { useEffect, useState } from 'react';
import { hygraphClient } from '../utils/hygraph';
import { GET_FUND_SLIDER_SECTION } from '../utils/queries';
import type { FundCardProps } from '../components/mutual-funds/MutualFundSlider/types';
import { useTranslation } from 'react-i18next';

interface FundSliderData {
  title: string;
  subtitle: string;
  funds: FundCardProps[];
}

interface HygraphResponse {
  fundSliderSections: FundSliderData[];
}

export function useFundSlider() {
  const [data, setData] = useState<FundSliderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as 'en' | 'ar';

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await hygraphClient.request<HygraphResponse>(
          GET_FUND_SLIDER_SECTION,
          { locale: currentLanguage }
        );
        console.log('Hygraph fund slider data for', currentLanguage, result);
        if (result.fundSliderSections && result.fundSliderSections.length > 0 && result.fundSliderSections[0].funds && result.fundSliderSections[0].funds.length > 0) {
          setData(result.fundSliderSections[0]);
        } else {
          setData(null);
          setError('No mutual funds available.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch fund data');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [currentLanguage, i18n.language]);

  return { data, isLoading, error };
} 
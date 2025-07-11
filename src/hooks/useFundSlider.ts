import { useEffect, useState } from 'react';
import { hygraphClient } from '../utils/hygraph';
import { GET_FUND_SLIDER_SECTION } from '../utils/queries';
import type { FundCardProps } from '../components/mutual-funds/MutualFundSlider/types';

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

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await hygraphClient.request<HygraphResponse>(GET_FUND_SLIDER_SECTION);
        
        if (result.fundSliderSections?.[0]) {
          setData(result.fundSliderSections[0]);
        } else {
          setError('No fund slider section found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch fund data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
} 
import { create } from 'zustand';
import type { MarketData } from '../types/market';

interface MarketState {
  marketData: MarketData[];
  isLoading: boolean;
  error: string | null;
  fetchAllData: () => Promise<void>;
}

export const useMarketStore = create<MarketState>((set) => ({
  marketData: [],
  isLoading: true,
  error: null,
  fetchAllData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/market-data');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch market data from API');
      }
      const data: MarketData[] = await response.json();
      set({ marketData: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching from /api/market-data:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      set({ error: errorMessage, isLoading: false, marketData: [] });
    }
  },
})); 
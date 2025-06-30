import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { MarketData, MarketStore } from '../types/market';

// Initial placeholder data for all six markets
const initialMarkets: MarketData[] = [
  {
    symbol: 'TASI',
    name: 'Saudi Stock Exchange Index',
    price: 11567.89,
    change: 234.56,
    changePercent: 2.07,
    lastUpdated: new Date().toISOString(),
    isPositive: true,
    dataSource: 'mock',
    marketType: 'index',
    region: 'saudi',
  },
  {
    symbol: 'MT30',
    name: 'Saudi Blue-Chip Index',
    price: 2345.67,
    change: -45.23,
    changePercent: -1.89,
    lastUpdated: new Date().toISOString(),
    isPositive: false,
    dataSource: 'mock',
    marketType: 'index',
    region: 'saudi',
  },
  {
    symbol: 'SP500',
    name: 'S&P 500',
    price: 4592.34,
    change: 45.67,
    changePercent: 1.00,
    lastUpdated: new Date().toISOString(),
    isPositive: true,
    dataSource: 'mock',
    marketType: 'index',
    region: 'us',
  },
  {
    symbol: 'NASDAQ',
    name: 'NASDAQ Composite',
    price: 14321.56,
    change: -123.45,
    changePercent: -0.85,
    lastUpdated: new Date().toISOString(),
    isPositive: false,
    dataSource: 'mock',
    marketType: 'index',
    region: 'us',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.67,
    change: 1250.34,
    changePercent: 2.98,
    lastUpdated: new Date().toISOString(),
    isPositive: true,
    dataSource: 'mock',
    marketType: 'crypto',
    region: 'global',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2650.89,
    change: -45.67,
    changePercent: -1.69,
    lastUpdated: new Date().toISOString(),
    isPositive: false,
    dataSource: 'mock',
    marketType: 'crypto',
    region: 'global',
  },
];

function mergeMarkets(base: MarketData[], updates: MarketData[]): MarketData[] {
  // Merge by symbol, keeping all base markets
  return base.map((market) => {
    const update = updates.find((m) => m.symbol === market.symbol);
    return update ? { ...market, ...update } : market;
  });
}

// API base URL - will be different in production vs development
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-vercel-domain.vercel.app/api' 
  : '/api';

export const useMarketStore = create<MarketStore>()(
  devtools(
    (set, get) => ({
      markets: initialMarkets,
      isLoading: false,
      error: null,
      lastUpdated: null,

      setMarkets: (markets) => set({ markets }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setLastUpdated: (timestamp) => set({ lastUpdated: timestamp }),

      fetchSaudiData: async () => {
        set({ isLoading: true, error: null });
        try {
          // For now, using mock data for Saudi markets
          // TODO: Replace with real Saudi market API when available
          const saudiMarkets: MarketData[] = [
            {
              symbol: 'TASI',
              name: 'Saudi Stock Exchange Index',
              price: 11567.89 + (Math.random() - 0.5) * 100, // Add some variation
              change: 234.56 + (Math.random() - 0.5) * 50,
              changePercent: 2.07 + (Math.random() - 0.5) * 2,
              lastUpdated: new Date().toISOString(),
              isPositive: Math.random() > 0.5,
              dataSource: 'mock',
              marketType: 'index',
              region: 'saudi',
            },
            {
              symbol: 'MT30',
              name: 'Saudi Blue-Chip Index',
              price: 2345.67 + (Math.random() - 0.5) * 50,
              change: -45.23 + (Math.random() - 0.5) * 30,
              changePercent: -1.89 + (Math.random() - 0.5) * 1.5,
              lastUpdated: new Date().toISOString(),
              isPositive: Math.random() > 0.5,
              dataSource: 'mock',
              marketType: 'index',
              region: 'saudi',
            },
          ];
          set({
            markets: mergeMarkets(get().markets, saudiMarkets),
            isLoading: false,
            lastUpdated: new Date().toISOString(),
          });
        } catch (error) {
          console.error('Error fetching Saudi data:', error);
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch Saudi data',
            isLoading: false,
          });
        }
      },

      fetchCryptoData: async () => {
        // This function is now handled by the cached API
        // Keeping for backward compatibility but it will be called via fetchAllData
        console.log('fetchCryptoData called - use fetchAllData instead');
      },

      fetchStockData: async () => {
        // This function is now handled by the cached API
        // Keeping for backward compatibility but it will be called via fetchAllData
        console.log('fetchStockData called - use fetchAllData instead');
      },

      fetchAllData: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/market-data`);
          
          if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
          }
          
          const result = await response.json();
          
          if (result.error) {
            throw new Error(result.error);
          }
          
          // Update markets with the cached data
          set({
            markets: result.data,
            isLoading: false,
            lastUpdated: result.timestamp || new Date().toISOString(),
          });
          
          console.log(`Market data fetched successfully (cached: ${result.cached})`);
        } catch (error) {
          console.error('Error fetching market data from API:', error);
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch market data',
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'market-store',
    }
  )
); 
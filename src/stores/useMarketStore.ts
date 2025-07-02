import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { MarketData, MarketStore, TwelveDataResponse } from '../types/market';

// Initial placeholder data for all six markets
const initialMarkets: MarketData[] = [
  {
    symbol: 'TASI',
    name: 'Saudi Stock Exchange Index',
    price: 0,
    change: 0,
    changePercent: 0,
    lastUpdated: '',
    isPositive: true,
    dataSource: 'mock',
    marketType: 'index',
    region: 'saudi',
  },
  {
    symbol: 'MT30',
    name: 'Saudi Blue-Chip Index',
    price: 0,
    change: 0,
    changePercent: 0,
    lastUpdated: '',
    isPositive: true,
    dataSource: 'mock',
    marketType: 'index',
    region: 'saudi',
  },
  {
    symbol: 'SP500',
    name: 'S&P 500',
    price: 0,
    change: 0,
    changePercent: 0,
    lastUpdated: '',
    isPositive: true,
    dataSource: 'mock',
    marketType: 'index',
    region: 'us',
  },
  {
    symbol: 'NASDAQ',
    name: 'NASDAQ Composite',
    price: 0,
    change: 0,
    changePercent: 0,
    lastUpdated: '',
    isPositive: true,
    dataSource: 'mock',
    marketType: 'index',
    region: 'us',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 0,
    change: 0,
    changePercent: 0,
    lastUpdated: '',
    isPositive: true,
    dataSource: 'mock',
    marketType: 'crypto',
    region: 'global',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 0,
    change: 0,
    changePercent: 0,
    lastUpdated: '',
    isPositive: true,
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

const TWELVE_DATA_API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;
const TWELVE_DATA_BASE_URL = 'https://api.twelvedata.com';

async function fetchTwelveDataQuote(symbol: string): Promise<TwelveDataResponse | undefined> {
  if (!TWELVE_DATA_API_KEY) {
    console.warn('Twelve Data API key not found');
    return undefined;
  }
  
  const url = `${TWELVE_DATA_BASE_URL}/quote?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 404) {
      console.warn(`Symbol ${symbol} not found in Twelve Data`);
      return undefined;
    }
    throw new Error(`Twelve Data API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Check if we got a valid response
  if (data.status === 'error') {
    console.warn(`Twelve Data API error for ${symbol}:`, data.message);
    return undefined;
  }
  
  return data;
}

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

      fetchCryptoData: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true'
          );
          if (!response.ok) throw new Error('Failed to fetch crypto data');
          const data = await response.json();
          const cryptoMarkets: MarketData[] = [
            {
              symbol: 'BTC',
              name: 'Bitcoin',
              price: data.bitcoin.usd,
              change: data.bitcoin.usd_24h_change,
              changePercent: data.bitcoin.usd_24h_change,
              lastUpdated: new Date(data.bitcoin.last_updated_at * 1000).toISOString(),
              isPositive: data.bitcoin.usd_24h_change > 0,
              dataSource: 'live',
              marketType: 'crypto',
              region: 'global',
            },
            {
              symbol: 'ETH',
              name: 'Ethereum',
              price: data.ethereum.usd,
              change: data.ethereum.usd_24h_change,
              changePercent: data.ethereum.usd_24h_change,
              lastUpdated: new Date(data.ethereum.last_updated_at * 1000).toISOString(),
              isPositive: data.ethereum.usd_24h_change > 0,
              dataSource: 'live',
              marketType: 'crypto',
              region: 'global',
            },
          ];
          set({
            markets: mergeMarkets(get().markets, cryptoMarkets),
            isLoading: false,
            lastUpdated: new Date().toISOString(),
          });
        } catch (error) {
          set({
            markets: mergeMarkets(get().markets, []), // fallback to previous/placeholder
            error: error instanceof Error ? error.message : 'Failed to fetch crypto data',
            isLoading: false,
          });
        }
      },

      fetchStockData: async () => {
        set({ isLoading: true, error: null });
        try {
          const [sp500Raw, nasdaqRaw] = await Promise.all([
            fetchTwelveDataQuote('SPY:NASDAQ'),
            fetchTwelveDataQuote('QQQ:NASDAQ'),
          ]);
          // If either is missing, fallback to mock data
          if (!sp500Raw || !sp500Raw.close || !nasdaqRaw || !nasdaqRaw.close) {
            throw new Error('Twelve Data returned incomplete data');
          }
          const sp500: MarketData = {
            symbol: 'SP500',
            name: 'S&P 500',
            price: parseFloat(sp500Raw.close || '0'),
            change: parseFloat(sp500Raw.change || '0'),
            changePercent: parseFloat((sp500Raw.percent_change || '0').replace('%', '')),
            lastUpdated: sp500Raw.datetime || new Date().toISOString(),
            isPositive: parseFloat(sp500Raw.change || '0') >= 0,
            dataSource: 'live',
            marketType: 'index',
            region: 'us',
          };
          const nasdaq: MarketData = {
            symbol: 'NASDAQ',
            name: 'NASDAQ Composite',
            price: parseFloat(nasdaqRaw.close || '0'),
            change: parseFloat(nasdaqRaw.change || '0'),
            changePercent: parseFloat((nasdaqRaw.percent_change || '0').replace('%', '')),
            lastUpdated: nasdaqRaw.datetime || new Date().toISOString(),
            isPositive: parseFloat(nasdaqRaw.change || '0') >= 0,
            dataSource: 'live',
            marketType: 'index',
            region: 'us',
          };
          set({
            markets: mergeMarkets(get().markets, [sp500, nasdaq]),
            isLoading: false,
            lastUpdated: new Date().toISOString(),
          });
        } catch (error) {
          // Fallback to mock data if API fails or is incomplete
          const mockMessage = 'Live data unavailable. Showing mock data.';
          const mockUSData: MarketData[] = [
            {
              symbol: 'SP500',
              name: 'S&P 500',
              price: 4592.34,
              change: 45.67,
              changePercent: 1.00,
              lastUpdated: mockMessage,
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
              lastUpdated: mockMessage,
              isPositive: false,
              dataSource: 'mock',
              marketType: 'index',
              region: 'us',
            },
          ];
          set({
            markets: mergeMarkets(get().markets, mockUSData),
            isLoading: false,
            // Do not set error here, just fallback to mock data
          });
        }
      },

      fetchSaudiData: async () => {
        set({ isLoading: true, error: null });
        // Always use mock data for TASI and MT30
        const now = new Date();
        const saudiMockMessage = 'Live data unavailable. Showing mock data.';
        const mockSaudiData: MarketData[] = [
          {
            symbol: 'TASI',
            name: 'Saudi Stock Exchange Index',
            price: 12345.67,
            change: 123.45,
            changePercent: 1.00,
            lastUpdated: saudiMockMessage,
            isPositive: true,
            dataSource: 'mock',
            marketType: 'index',
            region: 'saudi',
          },
          {
            symbol: 'MT30',
            name: 'Saudi Blue-Chip Index',
            price: 23456.78,
            change: -12.34,
            changePercent: -0.50,
            lastUpdated: saudiMockMessage,
            isPositive: false,
            dataSource: 'mock',
            marketType: 'index',
            region: 'saudi',
          },
        ];
        set({
          markets: mergeMarkets(get().markets, mockSaudiData),
          isLoading: false,
          lastUpdated: now.toISOString(),
          saudiMockMessage,
        });
      },

      fetchAllData: async () => {
        set({ isLoading: true, error: null });
        try {
          await Promise.all([
            get().fetchCryptoData(),
            get().fetchStockData(),
            get().fetchSaudiData(),
          ]);
          set({ isLoading: false });
        } catch (error) {
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
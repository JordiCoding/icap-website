import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { MarketData, MarketStore } from '../types/market';

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

const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

async function fetchAlphaVantageQuote(symbol: string) {
  const url = `${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Alpha Vantage API error');
  const data = await response.json();
  // Defensive: Return undefined if 'Global Quote' is missing or empty
  if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) return undefined;
  return data['Global Quote'];
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
            fetchAlphaVantageQuote('SPY'),
            fetchAlphaVantageQuote('QQQ'),
          ]);
          // If either is missing, fallback to mock data
          if (!sp500Raw || !sp500Raw['05. price'] || !nasdaqRaw || !nasdaqRaw['05. price']) {
            throw new Error('Alpha Vantage returned incomplete data');
          }
          const sp500: MarketData = {
            symbol: 'SP500',
            name: 'S&P 500',
            price: parseFloat(sp500Raw['05. price'] || '0'),
            change: parseFloat(sp500Raw['09. change'] || '0'),
            changePercent: parseFloat((sp500Raw['10. change percent'] || '0').replace('%', '')),
            lastUpdated: sp500Raw['07. latest trading day'] || new Date().toISOString(),
            isPositive: parseFloat(sp500Raw['09. change'] || '0') >= 0,
            dataSource: 'live',
            marketType: 'index',
            region: 'us',
          };
          const nasdaq: MarketData = {
            symbol: 'NASDAQ',
            name: 'NASDAQ Composite',
            price: parseFloat(nasdaqRaw['05. price'] || '0'),
            change: parseFloat(nasdaqRaw['09. change'] || '0'),
            changePercent: parseFloat((nasdaqRaw['10. change percent'] || '0').replace('%', '')),
            lastUpdated: nasdaqRaw['07. latest trading day'] || new Date().toISOString(),
            isPositive: parseFloat(nasdaqRaw['09. change'] || '0') >= 0,
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
          const mockUSData: MarketData[] = [
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
          ];
          set({
            markets: mergeMarkets(get().markets, mockUSData),
            error: error instanceof Error ? error.message : 'Failed to fetch stock data',
            isLoading: false,
          });
        }
      },

      fetchAllData: async () => {
        set({ isLoading: true, error: null });
        try {
          await Promise.all([
            get().fetchCryptoData(),
            get().fetchStockData(),
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
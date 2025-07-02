// Market data types for the ICAP website

export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
  isPositive: boolean;
  dataSource: 'live' | 'delayed' | 'mock';
  marketType: 'crypto' | 'stock' | 'index';
  region: 'saudi' | 'us' | 'global';
}

export interface MarketCardProps {
  data: MarketData;
  isLoading?: boolean;
  error?: string;
}

export interface MarketStore {
  // State
  markets: MarketData[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  saudiMockMessage?: string;
  
  // Actions
  setMarkets: (markets: MarketData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLastUpdated: (timestamp: string) => void;
  
  // Async actions
  fetchCryptoData: () => Promise<void>;
  fetchStockData: () => Promise<void>;
  fetchSaudiData: () => Promise<void>;
  fetchAllData: () => Promise<void>;
}

// API Response types
export interface CoinGeckoResponse {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  last_updated: string;
}

export interface TwelveDataResponse {
  symbol: string;
  name: string;
  close: string;
  change: string;
  percent_change: string;
  datetime: string;
  currency: string;
  exchange: string;
}

// Market symbols configuration for Twelve Data API
export const MARKET_SYMBOLS = {
  TASI: { symbol: 'TASI:XSAU', name: 'Tadawul All Share Index', region: 'saudi' as const, marketType: 'index' as const },
  MT30: { symbol: 'MT30:XSAU', name: 'Saudi Blue-Chip Index', region: 'saudi' as const, marketType: 'index' as const },
  SP500: { symbol: 'SPY:NASDAQ', name: 'S&P 500 ETF (SPY)', region: 'us' as const, marketType: 'index' as const },
  NASDAQ: { symbol: 'QQQ:NASDAQ', name: 'NASDAQ-100 ETF (QQQ)', region: 'us' as const, marketType: 'index' as const },
  BTC: { symbol: 'bitcoin', name: 'Bitcoin', region: 'global' as const, marketType: 'crypto' as const },
  ETH: { symbol: 'ethereum', name: 'Ethereum', region: 'global' as const, marketType: 'crypto' as const },
} as const;

export type MarketSymbol = keyof typeof MARKET_SYMBOLS; 
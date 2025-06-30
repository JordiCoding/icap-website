// api/lib/market.ts
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
  
  // Actions
  setMarkets: (markets: MarketData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLastUpdated: (timestamp: string) => void;
  
  // Async actions
  fetchSaudiData: () => Promise<void>;
  fetchCryptoData: () => Promise<void>;
  fetchStockData: () => Promise<void>;
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

export interface AlphaVantageResponse {
  'Global Quote': {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
  };
}

// Market symbols configuration
export const MARKET_SYMBOLS = {
  TASI: { symbol: 'TASI', name: 'Saudi Stock Exchange Index', region: 'saudi' as const, marketType: 'index' as const },
  MT30: { symbol: 'MT30', name: 'Saudi Blue-Chip Index', region: 'saudi' as const, marketType: 'index' as const },
  SP500: { symbol: 'SPY', name: 'S&P 500 ETF (SPY)', region: 'us' as const, marketType: 'index' as const },
  NASDAQ: { symbol: 'QQQ', name: 'NASDAQ-100 ETF (QQQ)', region: 'us' as const, marketType: 'index' as const },
  BTC: { symbol: 'bitcoin', name: 'Bitcoin', region: 'global' as const, marketType: 'crypto' as const },
  ETH: { symbol: 'ethereum', name: 'Ethereum', region: 'global' as const, marketType: 'crypto' as const },
} as const;

export type MarketSymbol = keyof typeof MARKET_SYMBOLS; 
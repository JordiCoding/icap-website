import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const CACHE_KEY = 'market_data';
const CACHE_DURATION = 10 * 60; // 10 minutes in seconds

// Import the same functions from the main endpoint
async function fetchAlphaVantageQuote(symbol: string) {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (!apiKey) {
      throw new Error('Alpha Vantage API key not configured');
    }

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Alpha Vantage API error for ${symbol}:`, response.status, response.statusText);
      return undefined;
    }
    
    const data = await response.json();
    
    if (data['Error Message']) {
      console.error(`Alpha Vantage API error for ${symbol}:`, data['Error Message']);
      return undefined;
    }
    
    if (data['Note']) {
      console.warn(`Alpha Vantage API note for ${symbol}:`, data['Note']);
      return undefined;
    }
    
    if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
      console.warn(`Alpha Vantage returned empty Global Quote for ${symbol}`);
      return undefined;
    }
    
    return data['Global Quote'];
  } catch (error) {
    console.error(`Error fetching Alpha Vantage data for ${symbol}:`, error);
    return undefined;
  }
}

async function fetchCryptoData() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto data');
    }
    
    const data = await response.json();
    
    if (!data.bitcoin || !data.ethereum) {
      throw new Error('CoinGecko returned incomplete crypto data');
    }
    
    return [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: data.bitcoin.usd || 0,
        change: data.bitcoin.usd_24h_change || 0,
        changePercent: data.bitcoin.usd_24h_change || 0,
        lastUpdated: new Date((data.bitcoin.last_updated_at || Date.now() / 1000) * 1000).toISOString(),
        isPositive: (data.bitcoin.usd_24h_change || 0) > 0,
        dataSource: 'live',
        marketType: 'crypto',
        region: 'global',
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        price: data.ethereum.usd || 0,
        change: data.ethereum.usd_24h_change || 0,
        changePercent: data.ethereum.usd_24h_change || 0,
        lastUpdated: new Date((data.ethereum.last_updated_at || Date.now() / 1000) * 1000).toISOString(),
        isPositive: (data.ethereum.usd_24h_change || 0) > 0,
        dataSource: 'live',
        marketType: 'crypto',
        region: 'global',
      },
    ];
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [
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
  }
}

async function fetchStockData() {
  try {
    const [sp500Raw, nasdaqRaw] = await Promise.all([
      fetchAlphaVantageQuote('SPY'),
      fetchAlphaVantageQuote('QQQ'),
    ]);
    
    if (!sp500Raw || !nasdaqRaw) {
      throw new Error('Alpha Vantage returned incomplete data');
    }
    
    const sp500Price = sp500Raw['05. price'];
    const sp500Change = sp500Raw['09. change'];
    const sp500ChangePercent = sp500Raw['10. change percent'];
    const sp500LastUpdated = sp500Raw['07. latest trading day'];
    
    const nasdaqPrice = nasdaqRaw['05. price'];
    const nasdaqChange = nasdaqRaw['09. change'];
    const nasdaqChangePercent = nasdaqRaw['10. change percent'];
    const nasdaqLastUpdated = nasdaqRaw['07. latest trading day'];
    
    if (!sp500Price || !nasdaqPrice) {
      throw new Error('Alpha Vantage returned incomplete price data');
    }
    
    return [
      {
        symbol: 'SP500',
        name: 'S&P 500',
        price: parseFloat(sp500Price),
        change: parseFloat(sp500Change || '0'),
        changePercent: parseFloat((sp500ChangePercent || '0').replace('%', '')),
        lastUpdated: sp500LastUpdated || new Date().toISOString(),
        isPositive: parseFloat(sp500Change || '0') >= 0,
        dataSource: 'live',
        marketType: 'index',
        region: 'us',
      },
      {
        symbol: 'NASDAQ',
        name: 'NASDAQ Composite',
        price: parseFloat(nasdaqPrice),
        change: parseFloat(nasdaqChange || '0'),
        changePercent: parseFloat((nasdaqChangePercent || '0').replace('%', '')),
        lastUpdated: nasdaqLastUpdated || new Date().toISOString(),
        isPositive: parseFloat(nasdaqChange || '0') >= 0,
        dataSource: 'live',
        marketType: 'index',
        region: 'us',
      },
    ];
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [
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
  }
}

function getSaudiData() {
  return [
    {
      symbol: 'TASI',
      name: 'Saudi Stock Exchange Index',
      price: 11567.89 + (Math.random() - 0.5) * 100,
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
}

async function fetchAllMarketData() {
  try {
    const [cryptoData, stockData] = await Promise.all([
      fetchCryptoData(),
      fetchStockData(),
    ]);
    
    const saudiData = getSaudiData();
    
    return [...saudiData, ...stockData, ...cryptoData];
  } catch (error) {
    console.error('Error fetching all market data:', error);
    return [
      ...getSaudiData(),
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
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Refreshing market data cache');
    
    // Fetch fresh data
    const marketData = await fetchAllMarketData();
    
    // Update the cache
    await kv.setex(CACHE_KEY, CACHE_DURATION, marketData);
    
    console.log('Market data cache refreshed successfully');
    
    return res.status(200).json({
      success: true,
      message: 'Market data cache refreshed',
      timestamp: new Date().toISOString(),
      dataCount: marketData.length,
    });
  } catch (error) {
    console.error('Error refreshing market data cache:', error);
    return res.status(500).json({
      error: 'Failed to refresh market data cache',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
} 
import type { MarketData } from '../../src/types/market';

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

async function fetchAlphaVantageQuote(symbol: string) {
  try {
    if (!ALPHA_VANTAGE_API_KEY) {
      throw new Error('Alpha Vantage API key not configured');
    }

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Alpha Vantage API error for ${symbol}:`, response.status, response.statusText);
      return undefined;
    }

    const data = await response.json();

    if (data['Error Message'] || data['Note']) {
      console.warn(`Alpha Vantage API message for ${symbol}:`, data['Error Message'] || data['Note']);
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

export async function fetchAlphaVantageData(): Promise<MarketData[]> {
    const symbols = ['SPY', 'QQQ'];
    const results = await Promise.all(symbols.map(fetchAlphaVantageQuote));
    const data: MarketData[] = [];

    const sp500Raw = results[0];
    if (sp500Raw && sp500Raw['05. price']) {
        const price = parseFloat(sp500Raw['05. price']);
        const change = parseFloat(sp500Raw['09. change'] || '0');
        data.push({
            symbol: 'SP500',
            name: 'S&P 500',
            price,
            change,
            changePercent: parseFloat((sp500Raw['10. change percent'] || '0%').replace('%', '')),
            lastUpdated: sp500Raw['07. latest trading day'] || new Date().toISOString(),
            isPositive: change >= 0,
            dataSource: 'live',
            marketType: 'index',
            region: 'us',
        });
    }

    const nasdaqRaw = results[1];
    if (nasdaqRaw && nasdaqRaw['05. price']) {
        const price = parseFloat(nasdaqRaw['05. price']);
        const change = parseFloat(nasdaqRaw['09. change'] || '0');
        data.push({
            symbol: 'NASDAQ',
            name: 'NASDAQ Composite',
            price,
            change,
            changePercent: parseFloat((nasdaqRaw['10. change percent'] || '0%').replace('%', '')),
            lastUpdated: nasdaqRaw['07. latest trading day'] || new Date().toISOString(),
            isPositive: change >= 0,
            dataSource: 'live',
            marketType: 'index',
            region: 'us',
        });
    }
    return data;
}

export async function fetchCoinGeckoData(): Promise<MarketData[]> {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true');
        if (!response.ok) throw new Error('Failed to fetch crypto data');
        const data = await response.json();

        return [
            {
                symbol: 'BTC',
                name: 'Bitcoin',
                price: data.bitcoin.usd,
                change: data.bitcoin.usd_24h_change,
                changePercent: data.bitcoin.usd_24h_change,
                lastUpdated: new Date().toISOString(),
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
                lastUpdated: new Date().toISOString(),
                isPositive: data.ethereum.usd_24h_change > 0,
                dataSource: 'live',
                marketType: 'crypto',
                region: 'global',
            }
        ];
    } catch (error) {
        console.error("Failed to fetch CoinGecko data:", error);
        return []; // Return empty array on failure
    }
}

export async function fetchSaudiData(): Promise<MarketData[]> {
    // Mock data for Saudi markets
    return [
        {
            symbol: 'TASI',
            name: 'Tadawul All Share',
            price: 11500.45,
            change: 50.12,
            changePercent: 0.44,
            lastUpdated: new Date().toISOString(),
            isPositive: true,
            dataSource: 'mock',
            marketType: 'index',
            region: 'saudi',
        },
        {
            symbol: 'MT30',
            name: 'MSCI Tadawul 30',
            price: 1550.78,
            change: -5.55,
            changePercent: -0.36,
            lastUpdated: new Date().toISOString(),
            isPositive: false,
            dataSource: 'mock',
            marketType: 'index',
            region: 'saudi',
        }
    ];
} 
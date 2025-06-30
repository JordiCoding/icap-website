import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchAlphaVantageData, fetchCoinGeckoData, fetchSaudiData } from '../lib/apiClient.js';
import type { MarketData } from '../lib/market.js';

const CACHE_KEY = 'market-data';
const CACHE_TTL_SECONDS = 600; // 10 minutes

const handler = async (_req: VercelRequest, res: VercelResponse) => {
  try {
    // Try to get data from cache
    const cachedData = await kv.get<MarketData[]>(CACHE_KEY);
    if (cachedData) {
      console.log('Cache hit');
      return res.status(200).json(cachedData);
    }

    console.log('Cache miss, fetching fresh data');
    // If not in cache, fetch fresh data
    const [alphaVantageData, coinGeckoData, saudiData] = await Promise.all([
      fetchAlphaVantageData(),
      fetchCoinGeckoData(),
      fetchSaudiData(),
    ]);

    const allData = [...alphaVantageData, ...coinGeckoData, ...saudiData];

    // Store in cache
    await kv.set(CACHE_KEY, allData, { ex: CACHE_TTL_SECONDS });
    console.log('Data cached successfully');

    res.status(200).json(allData);
  } catch (error) {
    console.error('Error fetching market data:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to fetch market data', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export default handler; 
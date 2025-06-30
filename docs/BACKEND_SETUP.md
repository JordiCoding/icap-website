# Backend Setup Guide

This document explains how to set up and deploy the backend caching layer for the ICAP website.

## Overview

The backend consists of Vercel Functions that:
1. **Cache market data** from external APIs (Alpha Vantage, CoinGecko)
2. **Serve cached data** to all frontend users
3. **Refresh cache** every 10 minutes to keep data fresh
4. **Handle API failures** gracefully with fallback data

## Architecture

```
Frontend (React) → Vercel Function → Vercel KV Cache → External APIs
                     ↓
                Store in Vercel KV (Redis-like)
```

## Setup Steps

### 1. Install Dependencies

```bash
npm install vercel @vercel/kv
```

### 2. Environment Variables

Create a `.env.local` file with your Alpha Vantage API key:

```env
ALPHA_VANTAGE_API_KEY=your_api_key_here
```

### 3. Vercel KV Setup

1. Install Vercel CLI: `npm i -g vercel`
2. Login to Vercel: `vercel login`
3. Link your project: `vercel link`
4. Create KV database: `vercel kv create`
5. Add KV environment variables: `vercel env add KV_URL` and `vercel env add KV_REST_API_URL`

### 4. Deploy to Vercel

```bash
vercel --prod
```

## API Endpoints

### GET `/api/market-data`
- **Purpose**: Fetch cached market data
- **Response**: JSON with market data, cache status, and timestamp
- **Cache**: 10 minutes

### POST `/api/market-data/refresh`
- **Purpose**: Manually refresh the cache
- **Response**: Success status and data count
- **Use Case**: Cron jobs, webhooks, manual updates

## Development

### Local Development

1. Start the Vercel development server:
   ```bash
   vercel dev
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```

3. The frontend will proxy API calls to the Vercel dev server

### Testing the API

Test the endpoints locally:

```bash
# Test market data endpoint
curl http://localhost:3000/api/market-data

# Test refresh endpoint
curl -X POST http://localhost:3000/api/market-data/refresh
```

## Production Deployment

### 1. Update Production URL

Update the `API_BASE_URL` in `src/stores/useMarketStore.ts`:

```typescript
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-actual-domain.vercel.app/api' 
  : '/api';
```

### 2. Set Environment Variables

In Vercel dashboard:
1. Go to your project settings
2. Add environment variables:
   - `ALPHA_VANTAGE_API_KEY`
   - `KV_URL`
   - `KV_REST_API_URL`

### 3. Deploy

```bash
vercel --prod
```

## Monitoring

### Vercel Dashboard
- Monitor function execution times
- Check error rates
- View API usage

### Logs
- Function logs are available in Vercel dashboard
- Check for API errors and cache hits/misses

## Future Enhancements

### 1. Cron Jobs
Set up automatic cache refresh every 10 minutes:

```bash
# Using Vercel Cron
vercel cron add "*/10 * * * *" /api/market-data/refresh
```

### 2. Additional Data Sources
- Saudi market APIs (TASI, MT30)
- More crypto currencies
- Commodities data

### 3. Analytics
- Track API usage
- Monitor cache hit rates
- Performance metrics

## Troubleshooting

### Common Issues

1. **KV Connection Errors**
   - Check KV environment variables
   - Verify KV database exists

2. **API Rate Limits**
   - Check Alpha Vantage usage
   - Implement exponential backoff

3. **CORS Errors**
   - Verify CORS headers in API functions
   - Check frontend proxy configuration

### Debug Commands

```bash
# Check Vercel environment
vercel env ls

# View function logs
vercel logs

# Test KV connection
vercel kv get market_data
```

## Cost Considerations

### Vercel Free Tier Limits
- **Functions**: 100GB-hours/month
- **KV Storage**: 100MB
- **Bandwidth**: 100GB/month

### Estimated Usage
- **Market data**: ~1KB per request
- **Cache refresh**: Every 10 minutes = 144 times/day
- **Total**: ~150KB/day = ~4.5MB/month

This is well within the free tier limits for a demo project. 
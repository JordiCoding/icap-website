# Market Ticker Exploration

## Overview

The Market Ticker is an experimental feature that displays live market data from the Saudi Stock Exchange (Tadawul) and other global markets. It's implemented as a horizontally scrolling ticker that shows real-time price information, changes, and percentage movements.

## Purpose

- **Real-time Market Data**: Display live TASI, NOMUC, and SUKUK indices
- **Visual Indicators**: Green/red colors and arrows for positive/negative changes
- **Continuous Scrolling**: Smooth horizontal marquee animation
- **Responsive Design**: Works across all device sizes

## Implementation Details

### Technology Stack
- **API**: Twelve Data (financial data provider)
- **Animation**: CSS keyframes for smooth scrolling
- **Icons**: Heroicons for visual indicators
- **State Management**: React hooks (useState, useEffect)

### Key Components

#### MarketTicker.tsx
```typescript
interface MarketData {
  name: string;
  symbol: string;
  price: string;
  change: string;
  percent_change: string;
}
```

#### Features
- **Real-time Data Fetching**: Uses Twelve Data API with environment variables
- **Error Handling**: Graceful fallbacks for missing symbols
- **Loading States**: Shows loading message while fetching data
- **Duplicate Content**: Creates seamless infinite scroll effect

### CSS Animation
```css
@keyframes marquee-infinite {
  from { transform: translateX(0%); }
  to { transform: translateX(-50%); }
}

.animate-marquee-infinite {
  animation: marquee-infinite 25s linear infinite;
}
```

## Branch Management Strategy

### Current Branches
- **`main`**: Stable, production-ready code
- **`feature/market-ticker-exploration`**: Experimental market ticker feature

### Workflow
1. **Development**: Work on `feature/market-ticker-exploration` branch
2. **Testing**: Test features without affecting main branch
3. **Integration**: Merge to main when feature is production-ready

### Commands
```bash
# Switch to exploration branch
git checkout feature/market-ticker-exploration

# Switch back to main
git checkout main

# Merge feature when ready
git checkout main
git merge feature/market-ticker-exploration
```

## Setup Instructions

### 1. Environment Variables
Create `.env.local` file in project root:
```env
VITE_TWELVE_DATA_API_KEY=your_api_key_here
```

### 2. API Key Setup
1. Sign up at [Twelve Data](https://twelvedata.com/)
2. Get your free API key
3. Add to `.env.local` file

### 3. Dependencies
```bash
npm install @heroicons/react clsx
```

### 4. Activate Feature
```bash
# Switch to exploration branch
git checkout feature/market-ticker-exploration

# Start development server
npm run dev
```

## API Integration

### Twelve Data Endpoints
- **Quote Endpoint**: `/quote` for real-time price data
- **Symbols**: 
  - `TASI:XSAU` (Tadawul All Share Index)
  - `IXIC:NASDAQ` (NASDAQ Composite - placeholder)
  - `SUKUK:SOME_EXCHANGE` (placeholder for Sukuk index)

### Response Format
```json
{
  "symbol": "TASI",
  "name": "Tadawul All Share Index",
  "close": "12345.67",
  "change": "123.45",
  "percent_change": "1.01"
}
```

## Styling

### Color Scheme
- **Background**: `bg-icap-primary` (dark theme)
- **Positive Changes**: `text-green-400`
- **Negative Changes**: `text-red-500`
- **Separators**: `text-gray-500`

### Layout
- **Container**: Full-width with overflow hidden
- **Content**: Flexbox with gap spacing
- **Animation**: 25-second linear infinite scroll

## Error Handling

### API Errors
- **404 Not Found**: Symbol not available, shows "N/A"
- **Rate Limiting**: Handled gracefully with console warnings
- **Network Issues**: Fallback to loading state

### Missing Data
- **No API Key**: Component doesn't render
- **Empty Response**: Shows loading state
- **Invalid Data**: Filters out null results

## Future Enhancements

### Planned Features
1. **More Indices**: Add NOMUC and SUKUK with correct symbols
2. **WebSocket**: Real-time updates instead of polling
3. **Customization**: Configurable symbols and refresh rates
4. **Charts**: Mini sparkline charts for trend visualization
5. **Localization**: Arabic text support

### Technical Improvements
1. **Caching**: Implement data caching to reduce API calls
2. **Optimization**: Virtual scrolling for large datasets
3. **Accessibility**: ARIA labels and keyboard navigation
4. **Testing**: Unit tests for data fetching and display logic

## Troubleshooting

### Common Issues

#### Component Not Visible
- Check if on correct branch: `git branch`
- Verify API key in `.env.local`
- Check browser console for errors

#### No Data Loading
- Verify API key is valid
- Check network connectivity
- Review API rate limits

#### Animation Issues
- Ensure CSS is properly loaded
- Check for conflicting styles
- Verify Tailwind CSS configuration

### Debug Commands
```bash
# Check current branch
git branch

# View environment variables
cat .env.local

# Check API response
curl "https://api.twelvedata.com/quote?symbol=TASI:XSAU&apikey=YOUR_KEY"
```

## Security Considerations

### API Key Protection
- **Environment Variables**: Never commit API keys to version control
- **Git Ignore**: `.env.local` is excluded from Git
- **Production**: Use secure environment variable management

### Data Validation
- **Input Sanitization**: Validate API responses
- **Type Safety**: TypeScript interfaces for data structures
- **Error Boundaries**: React error boundaries for component failures

## Performance Considerations

### Optimization
- **Debouncing**: Limit API calls to prevent rate limiting
- **Memoization**: Cache API responses
- **Lazy Loading**: Load component only when needed

### Monitoring
- **API Usage**: Track API call frequency
- **Error Rates**: Monitor failed requests
- **Performance**: Measure animation smoothness

---

## Quick Reference

### File Structure
```
src/
├── components/home/
│   └── MarketTicker.tsx
├── pages/
│   └── Home.tsx
└── index.css
```

### Key Commands
```bash
# Development
git checkout feature/market-ticker-exploration
npm run dev

# Production
git checkout main
npm run build
```

### API Documentation
- [Twelve Data API Docs](https://twelvedata.com/docs)
- [Quote Endpoint](https://twelvedata.com/docs#quote)
- [Symbol Search](https://twelvedata.com/docs#symbol-search) 
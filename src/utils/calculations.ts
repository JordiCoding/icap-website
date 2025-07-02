// Type definitions
export interface NavEntry {
  date: string; // YYYY-MM-DD
  nav: number;
}

export interface CagrResult {
  period: string;
  startDate: string;
  endDate: string;
  startNav: number;
  endNav: number;
  years: number;
  cagr: number;
}

// Calculate CAGR for a period
export function calculateCAGR(startNav: number, endNav: number, years: number): number {
  if (startNav <= 0 || years <= 0) return 0;
  return Math.pow(endNav / startNav, 1 / years) - 1;
}

// Get CAGR for standard periods (1Y, 3Y, 5Y, 10Y, Inception)
export function getCagrForPeriods(navs: NavEntry[]): CagrResult[] {
  if (!navs.length) return [];
  const periods = [1, 3, 5, 10];
  const results: CagrResult[] = [];
  const sorted = [...navs].sort((a, b) => a.date.localeCompare(b.date));
  const end = sorted[sorted.length - 1];
  const endDate = end.date;
  const endNav = end.nav;
  const inception = sorted[0];
  // From Inception
  results.push({
    period: 'Inception',
    startDate: inception.date,
    endDate,
    startNav: inception.nav,
    endNav,
    years: (new Date(endDate).getTime() - new Date(inception.date).getTime()) / (365.25 * 24 * 3600 * 1000),
    cagr: calculateCAGR(inception.nav, endNav, (new Date(endDate).getTime() - new Date(inception.date).getTime()) / (365.25 * 24 * 3600 * 1000)),
  });
  // Standard periods
  for (const n of periods) {
    const startIdx = sorted.findIndex(e => new Date(e.date) >= new Date(new Date(endDate).setFullYear(new Date(endDate).getFullYear() - n)));
    if (startIdx !== -1) {
      const start = sorted[startIdx];
      const years = n;
      results.push({
        period: `${n}Y`,
        startDate: start.date,
        endDate,
        startNav: start.nav,
        endNav,
        years,
        cagr: calculateCAGR(start.nav, endNav, years),
      });
    }
  }
  return results;
}

// Projected value for lump sum
export function projectValue(initial: number, cagr: number, years: number): number {
  return initial * Math.pow(1 + cagr, years);
}

// Stub: Sum dividends for a period
export function sumDividends(/*dividends: DividendEntry[], startDate: string, endDate: string*/) {
  return 0; // To be implemented
} 
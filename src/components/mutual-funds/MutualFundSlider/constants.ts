import type { Fund } from './types';

export const INITIAL_FUNDS: Fund[] = [
  {
    id: 'diversified-fund',
    title: 'Diversified Fund',
    description: 'A diversified mix of Sharia-compliant Sukuk, fixed income, trade finance, money market instruments, and similar funds',
    riskLevel: 'low',
    isShariaCompliant: true,
    icon: '/icons/cube.svg'
  },
  {
    id: 'mena-equity-fund',
    title: 'MENA Equity Fund',
    description: 'A diversified portfolio of listed equities, IPOs, REITs, ETFs, short-term instruments, and trade finance products',
    riskLevel: 'medium',
    isShariaCompliant: true,
    icon: '/icons/pyramid.svg'
  },
  {
    id: 'freestyle-equity-fund',
    title: 'Freestyle Equity Fund',
    description: 'A balanced mix of Saudi equities, public offerings, short-term Islamic instruments, trade finance, and similar funds',
    riskLevel: 'high',
    isShariaCompliant: true,
    icon: '/icons/hexagon.svg'
  },
  {
    id: 'global-sukuk-fund',
    title: 'Global Sukuk Fund',
    description: 'International Sharia-compliant fixed income securities and Sukuk investments across various markets',
    riskLevel: 'low',
    isShariaCompliant: true,
    icon: '/icons/cube.svg'
  },
  {
    id: 'money-market-fund',
    title: 'Money Market Fund',
    description: 'Short-term, highly liquid Sharia-compliant investments in money market instruments and trade finance',
    riskLevel: 'low',
    isShariaCompliant: true,
    icon: '/icons/pyramid.svg'
  },
  {
    id: 'real-estate-fund',
    title: 'Real Estate Fund',
    description: 'Direct and indirect investments in premium real estate assets and REITs across the MENA region',
    riskLevel: 'medium',
    isShariaCompliant: true,
    icon: '/icons/hexagon.svg'
  },
  {
    id: 'balanced-fund',
    title: 'Balanced Fund',
    description: 'Strategic allocation across multiple asset classes including equities, Sukuk, and alternative investments',
    riskLevel: 'medium',
    isShariaCompliant: true,
    icon: '/icons/cube.svg'
  },
  {
    id: 'growth-fund',
    title: 'Growth Fund',
    description: 'Aggressive growth strategy focusing on emerging opportunities in the MENA region and beyond',
    riskLevel: 'high',
    isShariaCompliant: true,
    icon: '/icons/pyramid.svg'
  }
];

export const SLIDES_PER_VIEW = {
  default: 3
} as const; 
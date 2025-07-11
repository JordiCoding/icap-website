export type RiskLevel = 'low' | 'medium' | 'high';

interface IconAsset {
  url: string;
}

export interface FundCardProps {
  id: string;
  title: string;
  description: string;
  riskLevel: RiskLevel;
  isShariaCompliant: boolean;
  icon: IconAsset;
  className?: string;
}

export interface MutualFundSliderProps {
  className?: string;
} 
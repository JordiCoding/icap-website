export type RiskLevel = 'low' | 'medium' | 'high';

export interface FundCardProps {
  id: string;
  title: string;
  description: string;
  riskLevel: RiskLevel;
  isShariaCompliant: boolean;
  icon: string;
  className?: string;
}

export interface MutualFundSliderProps {
  className?: string;
} 
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypography } from '../../hooks/useTypography';
import DepositInput from './DepositInput';
import TimeframeSelector from './TimeframeSelector';
import ResultsPanel from './ResultsPanel';
import GrowthChart from './GrowthChart';
import { getCagrForPeriods, projectValue } from '../../utils/calculations';
import navsData from '../../data/navs.json';
import dividendsData from '../../data/dividends.json';

const TIMEFRAME_OPTIONS = [
  { label: '1Y', value: '1Y' },
  { label: '3Y', value: '3Y' },
  { label: '5Y', value: '5Y' },
  { label: '10Y', value: '10Y' },
  { label: 'Inception', value: 'Inception' },
];

const DEFAULT_DEPOSIT = 50000;

const Calculator: React.FC = () => {
  const { t } = useTranslation();
  const { getTypographyClasses } = useTypography();
  const [deposit, setDeposit] = useState(DEFAULT_DEPOSIT);
  const [timeframe, setTimeframe] = useState('10Y');
  const [cagr, setCagr] = useState(0);
  const [periodLabel, setPeriodLabel] = useState('10Y');
  const [projected, setProjected] = useState(0);
  const [dividends, setDividends] = useState(0);
  const [chartData, setChartData] = useState<{ date: string; nav: number }[]>([]);

  useEffect(() => {
    // Calculate CAGR for all periods
    const cagrResults = getCagrForPeriods(navsData);
    const selected = cagrResults.find(r => r.period === timeframe);
    if (selected) {
      setCagr(selected.cagr);
      setPeriodLabel(selected.period === 'Inception' ? 'since inception' : `${selected.period}`);
      setProjected(projectValue(deposit, selected.cagr, selected.years));
      // Chart data: filter navs from startDate to endDate
      const chart = navsData.filter(e => e.date >= selected.startDate && e.date <= selected.endDate);
      setChartData(chart);
      // Dividends: sum for the period (stub/fake for now)
      const divSum = dividendsData
        .filter(d => d.date >= selected.startDate && d.date <= selected.endDate)
        .reduce((sum, d) => sum + d.amount, 0);
      setDividends(divSum);
    }
  }, [deposit, timeframe]);

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl mb-4 ${getTypographyClasses('title')}`}>
            <span style={{ color: '#A44F17' }}>Project</span>{' '}
            <span className="text-gray-900">your future potential</span>
          </h1>
          <p className={`text-gray-600 text-lg max-w-2xl mx-auto ${getTypographyClasses('body')}`}>
            See how small, regular investments can turn into significant savings with the power of compounding — try our calculator now.
          </p>
        </div>
        
        {/* Main content - 2 column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 mb-8">
          {/* Left column - Controls */}
          <div className="space-y-6">
            {/* Input and Controls Container - unified width */}
            <div className="max-w-md">
              <DepositInput value={deposit} onChange={setDeposit} />
              
              <div className="mt-6">
                <TimeframeSelector
                  value={timeframe}
                  onChange={setTimeframe}
                  options={TIMEFRAME_OPTIONS}
                />
              </div>
              
              {/* Calculate Button */}
              <button
                className={`mt-6 px-8 py-3 rounded-full text-gray-900 transition-all duration-200 hover:opacity-90 ${getTypographyClasses('body')}`}
                style={{ backgroundColor: '#EECA60' }}
                type="button"
                onClick={() => {
                  // Trigger recalculation - the useEffect will handle it
                  setDeposit(deposit);
                }}
              >
                Calculate
              </button>
            </div>
          </div>
          
          {/* Right column - Results */}
          <div className="bg-[#FBF7F1] p-6 rounded-lg">
            <div className="mb-6">
              <div className={`text-5xl text-gray-900 mb-2 ${getTypographyClasses('title')}`}>
                SAR {projected.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              
              {/* Description */}
              <div className="text-gray-600 text-base mb-6">
                Fund is calculated on {periodLabel} past average return
              </div>
              
              {/* Average annual return */}
              <div className="mb-4">
                <div className="text-gray-600 text-sm mb-1">Average annual return</div>
                <div className={`text-2xl font-bold text-gray-900 ${getTypographyClasses('title')}`}>
                  {(cagr * 100).toFixed(2)}%
                </div>
              </div>
            </div>
            
            {/* Chart section */}
            <div className="h-80">
              {(() => {
                // Reduce chartData to one entry per year (last entry for each year)
                const yearlyDataMap = new Map();
                chartData.forEach(d => yearlyDataMap.set(d.date.slice(0, 4), d));
                const yearlyData = Array.from(yearlyDataMap.values()).map(d => ({ year: d.date.slice(0, 4), value: d.nav }));
                return <GrowthChart data={yearlyData} />;
              })()}
            </div>
          </div>
        </div>
        
        {/* Bottom section - Summary cards - will add in step 8 */}
        
        {/* Disclaimer - will add in step 9 */}
      </div>
    </div>
  );
};

export default Calculator; 
import React, { useEffect, useState } from 'react';
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
    <section className="w-full flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-4">Mutual Fund Calculator</h2>
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl flex flex-col gap-4">
        <DepositInput value={deposit} onChange={setDeposit} />
        <TimeframeSelector
          value={timeframe}
          onChange={setTimeframe}
          options={TIMEFRAME_OPTIONS}
        />
        <ResultsPanel value={projected} cagr={cagr} dividends={dividends} period={periodLabel} showDividends={false} />
        <GrowthChart data={chartData} period={periodLabel} />
      </div>
    </section>
  );
};

export default Calculator; 
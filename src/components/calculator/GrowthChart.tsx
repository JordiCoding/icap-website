import React from 'react';
import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts';
import { useTypography } from '../../hooks/useTypography';

interface GrowthChartProps {
  data: Array<{ year: string; value: number }>;
}

function getKeyYears(data: Array<{ year: string }>) {
  // Get unique years in order
  const years = Array.from(new Set(data.map(d => d.year)));
  const n = years.length;
  if (n <= 2) return years; // 1Y: show both
  if (n <= 4) return years; // 3Y: show all
  // For 5Y or more, show start, end, and a few in between
  const result = [years[0]];
  const steps = Math.min(4, n - 2); // up to 4 in between
  for (let i = 1; i <= steps; i++) {
    const idx = Math.round((i * (n - 1)) / (steps + 1));
    if (!result.includes(years[idx])) result.push(years[idx]);
  }
  if (!result.includes(years[n - 1])) result.push(years[n - 1]);
  return result;
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  const { getTypographyClasses } = useTypography();
  const keyYears = getKeyYears(data);

  return (
    <div className="w-full h-full">
      <div className="mb-4">
        <p className={`text-sm text-gray-900 ${getTypographyClasses('body')}`}>
          Investment Growth Over Time
        </p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EFE1C9" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#EFE1C9" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="year" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            tickFormatter={year => keyYears.includes(year) ? year : ''}
            interval={0}
            padding={{ left: 20, right: 20 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#DFCAA5"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart; 
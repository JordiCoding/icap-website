import React from 'react';
import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts';
import { useTypography } from '../../hooks/useTypography';

interface GrowthChartProps {
  data: Array<{ year: string; value: number }>;
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  const { getTypographyClasses } = useTypography();

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
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface GrowthChartProps {
  data: { date: string; nav: number }[];
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded shadow p-4 w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" minTickGap={30} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} domain={['auto', 'auto']} />
          <Tooltip formatter={(value: number) => value.toFixed(2)} labelFormatter={(label: string) => `Date: ${label}`} />
          <Line type="monotone" dataKey="nav" stroke="#111" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart; 
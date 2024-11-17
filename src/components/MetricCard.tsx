import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format, parseISO } from 'date-fns';
import { Metric } from '../types/metrics';

interface MetricCardProps {
  metric: Metric;
}

const formatValue = (value: number, format: string): string => {
  switch (format) {
    case 'percentage':
      return `${(value * 100).toFixed(1)}%`;
    case 'duration':
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value % 60);
      return `${minutes}m ${seconds}s`;
    default:
      return value.toLocaleString();
  }
};

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const latestValue = metric.data[metric.data.length - 1]?.value || 0;
  const firstValue = metric.data[0]?.value || 0;
  const percentChange = ((latestValue - firstValue) / firstValue) * 100;

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-white">{metric.name}</h3>
          <p className="text-sm text-gray-400">{metric.description}</p>
        </div>
        {metric.goal && (
          <div className="text-sm px-2 py-1 rounded bg-gray-700">
            Goal: {formatValue(metric.goal, metric.format)}
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-white">
            {formatValue(latestValue, metric.format)}
          </span>
          <span className={`text-sm ${percentChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {percentChange >= 0 ? '↑' : '↓'} {Math.abs(percentChange).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="h-32 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metric.data}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => format(parseISO(timestamp), 'MMM')}
              stroke="#6B7280"
            />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
              labelFormatter={(timestamp) => format(parseISO(timestamp as string), 'MMM dd, yyyy')}
              formatter={(value: number) => [formatValue(value, metric.format)]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={metric.goal && latestValue >= metric.goal ? '#F97316' : '#3B82F6'}
              strokeWidth={2}
              dot={false}
            />
            {metric.goal && (
              <Line
                type="monotone"
                dataKey={() => metric.goal}
                stroke="#F97316"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricCard;
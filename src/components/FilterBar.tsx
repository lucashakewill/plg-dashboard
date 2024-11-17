import React from 'react';
import { FilterState, UserSegment, UserPlan } from '../types/metrics';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const timeRanges = [
    { value: '1M', label: 'Last Month' },
    { value: '3M', label: 'Last 3 Months' },
    { value: '6M', label: 'Last 6 Months' },
  ];

  const segments: { value: UserSegment; label: string }[] = [
    { value: 'Teacher', label: 'Teachers' },
    { value: 'Student', label: 'Students' },
    { value: 'Developer', label: 'Developers' },
    { value: 'Other', label: 'Others' },
  ];

  const plans: { value: UserPlan; label: string }[] = [
    { value: 'Free', label: 'Free Users' },
    { value: 'Paid', label: 'Paid Users' },
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 flex flex-wrap gap-4">
      <div className="flex items-center space-x-4">
        <label className="text-gray-400">Time Range:</label>
        <div className="flex bg-gray-700 rounded-lg">
          {timeRanges.map(({ value, label }) => (
            <button
              key={value}
              className={`px-3 py-1 rounded-lg text-sm ${
                filters.timeRange === value
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => onFilterChange({ ...filters, timeRange: value as '1M' | '3M' | '6M' })}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="text-gray-400">Segment:</label>
        <select
          className="bg-gray-700 text-white rounded-lg px-3 py-1 text-sm"
          value={filters.segment || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              segment: e.target.value as UserSegment | undefined,
            })
          }
        >
          <option value="">All Segments</option>
          {segments.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <label className="text-gray-400">Plan:</label>
        <select
          className="bg-gray-700 text-white rounded-lg px-3 py-1 text-sm"
          value={filters.plan || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              plan: e.target.value as UserPlan | undefined,
            })
          }
        >
          <option value="">All Plans</option>
          {plans.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
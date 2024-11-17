import { useState } from 'react';
import { FilterState } from './types/metrics';
import { useMetricsData } from './hooks/useMetricsData';
import FilterBar from './components/FilterBar';
import MetricCard from './components/MetricCard';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    timeRange: '6M',
  });

  const { metrics, loading } = useMetricsData(filters);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-40 bg-gray-700 rounded col-span-1"></div>
                  <div className="h-40 bg-gray-700 rounded col-span-1"></div>
                  <div className="h-40 bg-gray-700 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">PLG Metrics Dashboard</h1>
          <p className="text-gray-400">Track and analyze your product-led growth metrics</p>
        </div>

        <FilterBar filters={filters} onFilterChange={setFilters} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

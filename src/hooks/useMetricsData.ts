import { useState, useEffect } from 'react';
import { Metric, FilterState, MetricData } from '../types/metrics';
import { generateMockMetrics } from '../utils/mockDataGenerator';
import { subMonths, parseISO } from 'date-fns';

const filterDataByTimeRange = (data: MetricData[], months: number) => {
  const cutoffDate = subMonths(new Date(), months);
  return data.filter(item => parseISO(item.timestamp) >= cutoffDate);
};

const filterDataBySegment = (data: MetricData[], segment?: string) => {
  if (!segment) return data;
  return data.filter(item => item.segment === segment);
};

const filterDataByPlan = (data: MetricData[], plan?: string) => {
  if (!plan) return data;
  return data.filter(item => item.plan === plan);
};

export const useMetricsData = (filters: FilterState) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const mockData = generateMockMetrics();
      setMetrics(mockData);
      setLoading(false);
    };

    loadData();
  }, []);

  const filteredMetrics = metrics.map(metric => ({
    ...metric,
    data: filterDataByPlan(
      filterDataBySegment(
        filterDataByTimeRange(
          metric.data,
          filters.timeRange === '1M' ? 1 : filters.timeRange === '3M' ? 3 : 6
        ),
        filters.segment
      ),
      filters.plan
    ),
  }));

  return { metrics: filteredMetrics, loading };
};
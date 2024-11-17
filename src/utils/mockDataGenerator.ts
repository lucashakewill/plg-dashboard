import { addMonths, format, subMonths } from 'date-fns';
import { MetricData, METRICS, UserSegment, UserPlan, Metric } from '../types/metrics';

const SEGMENT_DISTRIBUTION = {
  Teacher: 0.05,
  Student: 0.70,
  Developer: 0.15,
  Other: 0.10,
};

const generateRandomValue = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const generateTimeSeriesData = (
  months: number,
  baseValue: number,
  volatility: number,
  trend: number,
  segments = false,
  plans = false
): MetricData[] => {
  const data: MetricData[] = [];
  const now = new Date();

  for (let i = months; i >= 0; i--) {
    const date = subMonths(now, i);
    const trendFactor = 1 + (trend * (months - i)) / months;
    const randomFactor = 1 + (Math.random() - 0.5) * volatility;
    const value = baseValue * trendFactor * randomFactor;

    if (segments && plans) {
      Object.entries(SEGMENT_DISTRIBUTION).forEach(([segment, distribution]) => {
        ['Free', 'Paid'].forEach((plan) => {
          const planMultiplier = plan === 'Paid' ? 0.05 : 0.95;
          data.push({
            timestamp: format(date, 'yyyy-MM-dd'),
            value: value * distribution * planMultiplier,
            segment: segment as UserSegment,
            plan: plan as UserPlan,
          });
        });
      });
    } else if (segments) {
      Object.entries(SEGMENT_DISTRIBUTION).forEach(([segment, distribution]) => {
        data.push({
          timestamp: format(date, 'yyyy-MM-dd'),
          value: value * distribution,
          segment: segment as UserSegment,
        });
      });
    } else if (plans) {
      ['Free', 'Paid'].forEach((plan) => {
        const planMultiplier = plan === 'Paid' ? 0.05 : 0.95;
        data.push({
          timestamp: format(date, 'yyyy-MM-dd'),
          value: value * planMultiplier,
          plan: plan as UserPlan,
        });
      });
    } else {
      data.push({
        timestamp: format(date, 'yyyy-MM-dd'),
        value,
      });
    }
  }

  return data;
};

export const generateMockMetrics = (): Metric[] => {
  return [
    {
      id: METRICS.FREE_TO_PAID,
      name: 'Free to Paid Conversion Rate',
      description: 'Percentage of free users converting to paid plans',
      format: 'percentage',
      data: generateTimeSeriesData(6, 0.03, 0.2, 0.1, true),
      goal: 0.05,
    },
    {
      id: METRICS.PAID_CHURN,
      name: 'Paid User Churn Rate',
      description: 'Rate at which paid users downgrade to free plan',
      format: 'percentage',
      data: generateTimeSeriesData(6, 0.02, 0.15, -0.05, true),
    },
    {
      id: METRICS.USER_CHURN,
      name: 'User Churn Rate',
      description: 'Rate at which active users become inactive',
      format: 'percentage',
      data: generateTimeSeriesData(6, 0.08, 0.2, -0.1, true, true),
    },
    {
      id: METRICS.ORGANIC_TRAFFIC,
      name: 'Organic Search Traffic',
      description: 'Number of visitors from search engines',
      format: 'number',
      data: generateTimeSeriesData(6, 5000, 0.3, 0.2),
    },
    {
      id: METRICS.DIRECT_TRAFFIC,
      name: 'Direct Traffic',
      description: 'Number of direct website visitors',
      format: 'number',
      data: generateTimeSeriesData(6, 3000, 0.25, 0.15),
    },
    {
      id: METRICS.REFERRAL_TRAFFIC,
      name: 'Referral Traffic',
      description: 'Number of visitors from referral links',
      format: 'number',
      data: generateTimeSeriesData(6, 2000, 0.35, 0.25),
    },
    {
      id: METRICS.TOTAL_USERS,
      name: 'Monthly Total Users',
      description: 'Total number of registered users',
      format: 'number',
      data: generateTimeSeriesData(6, 10000, 0.1, 0.2, true, true),
    },
    {
      id: METRICS.ACTIVE_USERS,
      name: 'Monthly Active Users',
      description: 'Number of users who performed any action',
      format: 'number',
      data: generateTimeSeriesData(6, 7000, 0.15, 0.15, true, true),
    },
    {
      id: METRICS.NEW_USERS,
      name: 'Monthly New Users',
      description: 'Number of new user registrations',
      format: 'number',
      data: generateTimeSeriesData(6, 1000, 0.25, 0.1, true),
    },
    {
      id: METRICS.RETURNING_USERS,
      name: 'Monthly Returning Users',
      description: 'Number of users who returned to the platform',
      format: 'number',
      data: generateTimeSeriesData(6, 6000, 0.15, 0.1, true),
    },
    {
      id: METRICS.DAU_MAU,
      name: 'DAU/MAU Ratio',
      description: 'Daily Active Users / Monthly Active Users',
      format: 'percentage',
      data: generateTimeSeriesData(6, 0.3, 0.1, 0.05),
    },
    {
      id: METRICS.WAU_MAU,
      name: 'WAU/MAU Ratio',
      description: 'Weekly Active Users / Monthly Active Users',
      format: 'percentage',
      data: generateTimeSeriesData(6, 0.6, 0.1, 0.05),
    },
    {
      id: METRICS.SESSION_DURATION,
      name: 'Average Session Duration',
      description: 'Average time users spend per session',
      format: 'duration',
      data: generateTimeSeriesData(6, 900, 0.2, 0.1, true),
    },
    {
      id: METRICS.IDE_VISITS,
      name: 'IDE Visits',
      description: 'Number of visits to the IDE',
      format: 'number',
      data: generateTimeSeriesData(6, 5000, 0.2, 0.15, true),
    },
    {
      id: METRICS.CODE_EXECUTIONS_USERS,
      name: 'Users Executing Code',
      description: 'Number of users who executed code',
      format: 'number',
      data: generateTimeSeriesData(6, 3000, 0.25, 0.2, true),
    },
    {
      id: METRICS.TOTAL_CODE_EXECUTIONS,
      name: 'Total Code Executions',
      description: 'Total number of code executions',
      format: 'number',
      data: generateTimeSeriesData(6, 15000, 0.3, 0.25),
    },
    {
      id: METRICS.JDROID_USERS,
      name: 'JDroid Logged Users',
      description: 'Number of users logged into JDroid',
      format: 'number',
      data: generateTimeSeriesData(6, 2000, 0.2, 0.3, true),
    },
    {
      id: METRICS.JDROID_QUERIES,
      name: 'JDroid Queries',
      description: 'Total number of JDroid queries',
      format: 'number',
      data: generateTimeSeriesData(6, 8000, 0.25, 0.35),
    },
    {
      id: METRICS.ACCOUNT_CREATION,
      name: 'Account Creation',
      description: 'Number of new accounts created',
      format: 'number',
      data: generateTimeSeriesData(6, 1000, 0.3, 0.2, true),
    },
    {
      id: METRICS.PROJECT_SAVES,
      name: 'Project Saves',
      description: 'Number of unique users saving projects',
      format: 'number',
      data: generateTimeSeriesData(6, 4000, 0.2, 0.15, true),
    },
    {
      id: METRICS.PLATFORM_UPGRADES,
      name: 'Platform Plan Upgrades',
      description: 'Number of upgrades to Platform plan',
      format: 'number',
      data: generateTimeSeriesData(6, 100, 0.35, 0.25),
    },
  ];
};
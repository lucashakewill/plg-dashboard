export type UserSegment = 'Teacher' | 'Student' | 'Developer' | 'Other';
export type UserPlan = 'Free' | 'Paid';

export interface MetricData {
  timestamp: string;
  value: number;
  segment?: UserSegment;
  plan?: UserPlan;
}

export interface Metric {
  id: string;
  name: string;
  description: string;
  format: 'number' | 'percentage' | 'duration';
  data: MetricData[];
  goal?: number;
}

export interface FilterState {
  timeRange: '1M' | '3M' | '6M';
  segment?: UserSegment;
  plan?: UserPlan;
}

export const METRICS = {
  FREE_TO_PAID: 'free_to_paid_conversion',
  PAID_CHURN: 'paid_churn_rate',
  USER_CHURN: 'user_churn_rate',
  ORGANIC_TRAFFIC: 'organic_search_traffic',
  DIRECT_TRAFFIC: 'direct_traffic',
  REFERRAL_TRAFFIC: 'referral_traffic',
  TOTAL_USERS: 'monthly_total_users',
  ACTIVE_USERS: 'monthly_active_users',
  NEW_USERS: 'monthly_new_users',
  RETURNING_USERS: 'monthly_returning_users',
  DAU_MAU: 'dau_mau_ratio',
  WAU_MAU: 'wau_mau_ratio',
  SESSION_DURATION: 'avg_session_duration',
  IDE_VISITS: 'ide_visits',
  CODE_EXECUTIONS_USERS: 'code_execution_users',
  TOTAL_CODE_EXECUTIONS: 'total_code_executions',
  JDROID_USERS: 'jdroid_users',
  JDROID_QUERIES: 'jdroid_queries',
  ACCOUNT_CREATION: 'account_creation',
  PROJECT_SAVES: 'project_saves',
  PLATFORM_UPGRADES: 'platform_upgrades',
} as const;

export type MetricId = typeof METRICS[keyof typeof METRICS];
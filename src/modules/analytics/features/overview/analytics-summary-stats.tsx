import { StatCard } from "@/components/shared/stat-card";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { AnalyticsOverview } from "@/types";

interface AnalyticsSummaryStatsProps {
  analytics: AnalyticsOverview;
}

export function AnalyticsSummaryStats({ analytics }: AnalyticsSummaryStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard title="Revenue" value={formatCurrency(analytics.revenue)} detail="Paid order revenue" />
      <StatCard title="AOV" value={formatCurrency(analytics.aov)} detail="Average order value" />
      <StatCard title="Orders" value={formatNumber(analytics.orders)} detail="Total orders tracked" />
    </div>
  );
}

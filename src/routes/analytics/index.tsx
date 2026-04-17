import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsOverview } from "@/api/analytics";
import { SimpleBarChart } from "@/components/charts/simple-bar-chart";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { formatAnalyticsMonth, formatAnalyticsWeek } from "@/utils/analytics-date";

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: fetchAnalyticsOverview,
  });

  if (isLoading || !data) {
    return <LoadingState label="Loading analytics..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Simple overview metrics and lightweight trend placeholders." />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Revenue" value={formatCurrency(data.revenue)} detail="Paid order revenue" />
        <StatCard title="AOV" value={formatCurrency(data.aov)} detail="Average order value" />
        <StatCard title="Orders" value={formatNumber(data.orders)} detail="Total orders tracked" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarChart
              items={data.revenueTrend.map((item) => ({ ...item, label: formatAnalyticsMonth(item.label) }))}
              formatter={formatCurrency}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversion Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarChart
              items={data.conversionTrend.map((item) => ({ ...item, label: formatAnalyticsWeek(item.label) }))}
              formatter={(value) => `${value}%`}
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleBarChart items={data.topCategories} formatter={(value) => `${value} units`} />
        </CardContent>
      </Card>
    </div>
  );
}

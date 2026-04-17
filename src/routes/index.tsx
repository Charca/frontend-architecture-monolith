import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, DollarSign, ShoppingCart, Users } from "lucide-react";
import { fetchDashboardSummary } from "@/api/dashboard";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: fetchDashboardSummary,
  });

  if (isLoading || !data) {
    return <LoadingState label="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of revenue, order flow, customer activity, and inventory risk."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Revenue" value={formatCurrency(data.revenue)} detail="Paid orders to date" icon={<DollarSign className="h-4 w-4" />} />
        <StatCard title="Orders" value={formatNumber(data.orders)} detail="Across all statuses" icon={<ShoppingCart className="h-4 w-4" />} />
        <StatCard title="Customers" value={formatNumber(data.customers)} detail="Tracked customer records" icon={<Users className="h-4 w-4" />} />
        <StatCard title="Low Stock" value={formatNumber(data.lowStockItems)} detail="Inventory rows below threshold" icon={<AlertTriangle className="h-4 w-4" />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Link to="/orders/$orderId" params={{ orderId: order.id }} className="font-medium text-primary hover:underline">
                        {order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell className="table-cell-muted">{formatDate(order.date)}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="text-sm font-medium">Low Stock</div>
              {data.notifications.lowStock.map((item) => (
                <div key={item.id} className="rounded-md border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium">{item.productName}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.location} · reorder at {item.reorderThreshold}
                      </div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="text-sm font-medium">Expiring Discounts</div>
              {data.notifications.expiringDiscounts.map((discount) => (
                <div key={discount.id} className="rounded-md border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium">{discount.code}</div>
                      <div className="text-sm text-muted-foreground">
                        Ends {formatDate(discount.endDate)}
                      </div>
                    </div>
                    <StatusBadge status={discount.active ? "active" : "inactive"} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {data.topProducts.map((product) => (
            <div key={product.productId} className="rounded-md border p-4">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-muted-foreground">{product.unitsSold} units sold</div>
              <div className="mt-3 text-sm font-medium">{formatCurrency(product.revenue)}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

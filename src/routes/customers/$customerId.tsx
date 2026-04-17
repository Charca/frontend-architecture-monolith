import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomer } from "@/api/customers";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CustomerDetailPage() {
  const { customerId } = useParams({ from: "/customers/$customerId" });
  const { data, isLoading } = useQuery({
    queryKey: ["customers", customerId],
    queryFn: () => fetchCustomer(customerId),
  });

  if (isLoading || !data) {
    return <LoadingState label="Loading customer..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={data.name}
        description={data.email}
        actions={
          <Link to="/customers">
            <Button variant="outline">Back to customers</Button>
          </Link>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1.3fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.orderHistory.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell className="table-cell-muted">{formatDate(order.date)}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{data.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Segment</span>
                <StatusBadge status={data.segment} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tags</span>
                <span>{data.tags.join(", ")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Lifetime spend</span>
                <span>{formatCurrency(data.lifetimeSpend)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Joined</span>
                <span>{formatDate(data.joinedAt)}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{data.notes}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomer } from "@/api/customers";
import { LoadingState } from "@/components/feedback/loading-state";
import { KeyValueList } from "@/components/shared/key-value-list";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
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
        <SectionCard title="Order History">
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
        </SectionCard>
        <div className="space-y-6">
          <SectionCard title="Profile">
            <KeyValueList
              items={[
                { label: "Email", value: data.email },
                { label: "Segment", value: <StatusBadge status={data.segment} /> },
                { label: "Tags", value: data.tags.join(", ") },
                { label: "Price list", value: data.priceList?.name ?? "Retail default" },
                { label: "Lifetime spend", value: formatCurrency(data.lifetimeSpend) },
                { label: "Joined", value: formatDate(data.joinedAt) },
              ]}
            />
          </SectionCard>
          <SectionCard title="Notes" contentClassName="text-sm text-muted-foreground">
            {data.notes}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

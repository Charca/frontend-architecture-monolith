import { Link, useParams } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrder, updateOrder } from "@/api/orders";
import type { Order } from "@/types";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function OrderDetailPage() {
  const { orderId } = useParams({ from: "/orders/$orderId" });
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => fetchOrder(orderId),
  });

  const mutation = useMutation({
    mutationFn: (payload: Partial<Order>) => updateOrder(orderId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      await queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
    },
  });

  if (isLoading || !data) {
    return <LoadingState label="Loading order..." />;
  }

  async function runAction(payload: Partial<Order>) {
    await mutation.mutateAsync(payload);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={data.orderNumber}
        description={`Placed on ${formatDate(data.date)} by ${data.customerName}.`}
        actions={
          <>
            <Link to="/orders">
              <Button variant="outline">Back to orders</Button>
            </Link>
            <Button variant="outline" onClick={() => void runAction({ status: "fulfilled" })}>
              Mark fulfilled
            </Button>
            <Button variant="outline" onClick={() => void runAction({ status: "cancelled", paymentStatus: "refunded" })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => void runAction({ status: "refunded", paymentStatus: "refunded" })}>
              Refund
            </Button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[2fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Line Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.lineItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell>{formatCurrency(item.quantity * item.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Order status</span>
                <StatusBadge status={data.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payment</span>
                <StatusBadge status={data.paymentStatus} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Customer</span>
                <span>{data.customerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span>{formatCurrency(data.total)}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div>{data.shippingAddress.name}</div>
              <div>{data.shippingAddress.line1}</div>
              <div>
                {data.shippingAddress.city}, {data.shippingAddress.region} {data.shippingAddress.postalCode}
              </div>
              <div>{data.shippingAddress.country}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{data.notes || "No notes available."}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

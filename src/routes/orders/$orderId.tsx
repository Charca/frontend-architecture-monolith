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
      await queryClient.invalidateQueries({ queryKey: ["analytics", "overview"] });
    },
  });

  if (isLoading || !data) {
    return <LoadingState label="Loading order..." />;
  }

  async function runAction(payload: Partial<Order>) {
    await mutation.mutateAsync(payload);
  }

  const refundedAmount = data.refunds.reduce((sum, refund) => sum + refund.amount, 0);

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
            <Button
              variant="outline"
              onClick={() =>
                void runAction({
                  refunds: [
                    ...data.refunds,
                    {
                      id: `refund_${data.refunds.length + 1}`,
                      amount: Math.min(20, data.total),
                      reason: "Partial appeasement refund",
                      createdAt: "2026-04-16",
                    },
                  ],
                })
              }
            >
              Partial refund
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                void runAction({
                  returns: [
                    ...data.returns,
                    {
                      id: `return_${data.returns.length + 1}`,
                      productName: data.lineItems[0]?.productName ?? "Order item",
                      quantity: 1,
                      status: "requested",
                      createdAt: "2026-04-16",
                    },
                  ],
                })
              }
            >
              Start return
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                void runAction({
                  exchanges: [
                    ...data.exchanges,
                    {
                      id: `exchange_${data.exchanges.length + 1}`,
                      originalProductName: data.lineItems[0]?.productName ?? "Order item",
                      replacementProductName: `${data.lineItems[0]?.productName ?? "Order item"} replacement`,
                      status: "pending",
                      createdAt: "2026-04-16",
                    },
                  ],
                })
              }
            >
              Create exchange
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
                <span className="text-muted-foreground">Price list</span>
                <span>{data.appliedPriceListName ?? "Retail default"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span>{formatCurrency(data.total)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Refunded</span>
                <span>{formatCurrency(refundedAmount)}</span>
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
              <CardTitle>Shipment Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Carrier</span>
                <span>{data.shipment.carrier}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tracking</span>
                <span>{data.shipment.trackingNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipment status</span>
                <StatusBadge status={data.shipment.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipped</span>
                <span>{data.shipment.shippedAt ? formatDate(data.shipment.shippedAt) : "Not shipped yet"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Estimated delivery</span>
                <span>{data.shipment.estimatedDelivery ? formatDate(data.shipment.estimatedDelivery) : "Pending"}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Returns and Refunds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="space-y-2">
                <div className="font-medium">Refunds</div>
                {data.refunds.length ? data.refunds.map((refund) => (
                  <div key={refund.id} className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <span>{refund.reason}</span>
                      <span>{formatCurrency(refund.amount)}</span>
                    </div>
                    <div className="text-muted-foreground">{formatDate(refund.createdAt)}</div>
                  </div>
                )) : <div className="text-muted-foreground">No refunds recorded.</div>}
              </div>
              <div className="space-y-2">
                <div className="font-medium">Returns</div>
                {data.returns.length ? data.returns.map((entry) => (
                  <div key={entry.id} className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <span>{entry.productName}</span>
                      <StatusBadge status={entry.status} />
                    </div>
                    <div className="text-muted-foreground">
                      Qty {entry.quantity} · {formatDate(entry.createdAt)}
                    </div>
                  </div>
                )) : <div className="text-muted-foreground">No returns recorded.</div>}
              </div>
              <div className="space-y-2">
                <div className="font-medium">Exchanges</div>
                {data.exchanges.length ? data.exchanges.map((entry) => (
                  <div key={entry.id} className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <span>{entry.originalProductName}</span>
                      <StatusBadge status={entry.status} />
                    </div>
                    <div className="text-muted-foreground">
                      For {entry.replacementProductName} · {formatDate(entry.createdAt)}
                    </div>
                  </div>
                )) : <div className="text-muted-foreground">No exchanges recorded.</div>}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{data.notes || "No notes available."}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(data.activityHistory ?? []).map((entry) => (
                <div key={entry.id} className="rounded-md border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{entry.action.replace(/_/g, " ")}</span>
                    <span className="text-muted-foreground">{entry.timestamp}</span>
                  </div>
                  <div className="text-muted-foreground">{entry.summary}</div>
                  <div className="text-xs text-muted-foreground">by {entry.actor}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

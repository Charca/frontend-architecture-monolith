import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/api/orders";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { OrdersTable } from "@/modules/orders/features/order-list/orders-table";

export function OrdersScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return <LoadingState label="Loading orders..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description="Review order flow, fulfillment status, and customer purchases." />
      <OrdersTable orders={data ?? []} />
    </div>
  );
}

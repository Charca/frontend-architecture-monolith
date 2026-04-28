import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { OrderHistoryOrderLink } from "@/modules/customers/components/order-history-order-link";
import type { Order } from "@/types";

interface CustomerOrderHistoryProps {
  orders: Order[];
}

export function CustomerOrderHistory({ orders }: CustomerOrderHistoryProps) {
  return (
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
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <OrderHistoryOrderLink order={order} />
              </TableCell>
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
  );
}

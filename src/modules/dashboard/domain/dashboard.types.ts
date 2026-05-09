import type { Discount } from "@/modules/discounts";
import type { InventoryItem } from "@/modules/inventory";
import type { Order, OrderStatus } from "@/modules/orders";

export interface DashboardSummary {
  revenue: number;
  orders: number;
  customers: number;
  lowStockItems: number;
  recentOrderRevenueTrend: Array<{ label: string; revenue: number; orders: number }>;
  orderDistribution: Array<{ label: OrderStatus; value: number }>;
  recentOrders: Order[];
  notifications: {
    lowStock: InventoryItem[];
    expiringDiscounts: Discount[];
  };
  topProducts: Array<{
    productId: string;
    name: string;
    unitsSold: number;
    revenue: number;
  }>;
}

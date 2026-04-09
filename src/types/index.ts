export type ProductStatus = "active" | "draft" | "archived";
export type InventoryStatus = "healthy" | "low" | "out_of_stock";
export type OrderStatus = "pending" | "processing" | "fulfilled" | "cancelled" | "refunded";
export type PaymentStatus = "paid" | "pending" | "refunded";
export type DiscountType = "percentage" | "fixed_amount" | "free_shipping";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  price: number;
  status: ProductStatus;
  inventory: number;
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  location: string;
  stockQuantity: number;
  reorderThreshold: number;
  status: InventoryStatus;
}

export interface OrderLineItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  notes: string;
  shippingAddress: {
    name: string;
    line1: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  lineItems: OrderLineItem[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  tags: string[];
  lifetimeSpend: number;
  notes: string;
  joinedAt: string;
}

export interface Discount {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  active: boolean;
  usageCount: number;
  startDate: string;
  endDate: string;
}

export interface DashboardSummary {
  revenue: number;
  orders: number;
  customers: number;
  lowStockItems: number;
  recentOrders: Order[];
  topProducts: Array<{
    productId: string;
    name: string;
    unitsSold: number;
    revenue: number;
  }>;
}

export interface AnalyticsOverview {
  revenue: number;
  aov: number;
  orders: number;
  conversionTrend: Array<{ label: string; value: number }>;
  revenueTrend: Array<{ label: string; value: number }>;
  topCategories: Array<{ label: string; value: number }>;
}

export interface SettingsData {
  storeProfile: {
    storeName: string;
    supportEmail: string;
    currency: string;
    timezone: string;
  };
  shipping: {
    defaultCarrier: string;
    standardRate: number;
    expressRate: number;
  };
  taxes: {
    pricesIncludeTax: boolean;
    nexusRegion: string;
    defaultRate: number;
  };
  userRoles: {
    admins: number;
    managers: number;
    support: number;
  };
  notifications: {
    lowStock: boolean;
    orderAlerts: boolean;
    weeklyDigest: boolean;
  };
}

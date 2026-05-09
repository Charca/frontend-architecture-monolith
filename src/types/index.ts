import type { PriceList } from "@/modules/catalog";
import type { Order, OrderStatus } from "@/modules/orders";

export type {
  BundleComponent,
  Collection,
  PriceList,
  PriceListPrice,
  Product,
  ProductKind,
  ProductStatus,
  ProductVariant,
} from "@/modules/catalog";

export type {
  Order,
  OrderExchange,
  OrderLineItem,
  OrderRefund,
  OrderReturn,
  OrderStatus,
  PaymentStatus,
  ShipmentStatus,
} from "@/modules/orders";

export type InventoryStatus = "healthy" | "low" | "out_of_stock";
export type DiscountType = "percentage" | "fixed_amount" | "free_shipping";
export type CustomerSegment = "VIP" | "Wholesale" | "At Risk" | "New" | "Repeat";
export type RoleKey = "account_owner" | "admin" | "user";
export type PermissionKey =
  | "dashboard.view"
  | "catalog.view"
  | "catalog.edit"
  | "inventory.view"
  | "inventory.edit"
  | "orders.view"
  | "orders.manage"
  | "orders.refund"
  | "customers.view"
  | "discounts.view"
  | "discounts.manage"
  | "analytics.view"
  | "settings.view"
  | "settings.account_profile.manage"
  | "settings.shipping.manage"
  | "settings.tax.manage"
  | "settings.notifications.manage"
  | "settings.users.manage"
  | "settings.permissions.manage";

export interface DiscountRule {
  minimumSpend: number;
  eligibleSegments: CustomerSegment[];
  eligibleCategories: string[];
}

export interface AuditLogEntry {
  id: string;
  entityType: "product" | "order" | "discount";
  entityId: string;
  action: string;
  actor: string;
  timestamp: string;
  summary: string;
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

export interface Customer {
  id: string;
  name: string;
  email: string;
  segment: CustomerSegment;
  tags: string[];
  priceListId?: string | null;
  priceList?: PriceList | null;
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
  rules: DiscountRule;
  activityHistory?: AuditLogEntry[];
}

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

export interface AnalyticsOverview {
  revenue: number;
  aov: number;
  orders: number;
  performanceTrend: Array<{ label: string; revenue: number; orders: number }>;
  conversionTrend: Array<{ label: string; value: number }>;
  categoryRevenue: Array<{ label: string; value: number }>;
  customerSegments: Array<{ label: CustomerSegment; value: number }>;
  orderStatusMix: Array<{ label: OrderStatus; value: number }>;
}

export interface AccountProfile {
  storeName: string;
  supportEmail: string;
  currency: string;
  timezone: string;
}

export interface Account {
  id: string;
  name: string;
  slug: string;
  profile: AccountProfile;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  title: string;
  initials: string;
  avatarUrl?: string | null;
}

export interface AccountMember {
  userId: string;
  name: string;
  email: string;
  title: string;
  initials: string;
  avatarUrl?: string | null;
  role: RoleKey;
  status: "active" | "inactive";
  lastActiveAt: string;
}

export interface AccountPermissionPolicy {
  account_owner: PermissionKey[];
  admin: PermissionKey[];
  user: PermissionKey[];
}

export interface SessionMembership {
  account: Account;
  role: RoleKey;
  permissions: PermissionKey[];
}

export interface AuthSession {
  token: string;
  user: AuthUser;
  activeAccount: Account;
  activeRole: RoleKey;
  activePermissions: PermissionKey[];
  memberships: SessionMembership[];
}

export interface SettingsData {
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
  notifications: {
    lowStock: boolean;
    orderAlerts: boolean;
    weeklyDigest: boolean;
  };
}

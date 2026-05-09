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

export type { InventoryItem, InventoryStatus } from "@/modules/inventory";
export type { Customer, CustomerDetail, CustomerSegment } from "@/modules/customers";
export type { Discount, DiscountRule, DiscountType } from "@/modules/discounts";
export type { AnalyticsOverview } from "@/modules/analytics";
export type { DashboardSummary } from "@/modules/dashboard";
export type { Account, AccountProfile, SettingsData } from "@/modules/settings";
export type {
  AccountMember,
  AccountPermissionPolicy,
  AuthSession,
  AuthUser,
  PermissionKey,
  RoleKey,
  SessionMembership,
} from "@/modules/identity";
export type { AuditLogEntry } from "@/shared/domain/audit-log.types";

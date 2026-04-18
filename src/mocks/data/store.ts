import { ALL_PERMISSIONS, DEFAULT_PERMISSION_POLICY } from "@/lib/auth";
import type {
  Account,
  AccountMember,
  AccountPermissionPolicy,
  AnalyticsOverview,
  AuditLogEntry,
  AuthSession,
  AuthUser,
  Collection,
  Customer,
  DashboardSummary,
  Discount,
  InventoryItem,
  Order,
  PermissionKey,
  PriceList,
  Product,
  RoleKey,
  SettingsData,
} from "@/types";

const DEMO_PASSWORD = "demo123";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const collections: Collection[] = [
  { id: "col_1", name: "Seasonal Essentials", description: "Core products for the current merchandising calendar." },
  { id: "col_2", name: "Workspace", description: "Desk and home office products with higher AOV." },
  { id: "col_3", name: "Travel", description: "Portable daily-carry and outdoor items." },
];

const priceLists: PriceList[] = [
  { id: "price_1", name: "Wholesale Core", segment: "Wholesale" },
  { id: "price_2", name: "VIP Retention", segment: "VIP" },
];

const accountsById: Record<string, Account> = {
  acct_northstar: {
    id: "acct_northstar",
    name: "Northstar Outfitters",
    slug: "northstar",
    profile: {
      storeName: "Northstar Outfitters",
      supportEmail: "support@northstar.demo",
      currency: "USD",
      timezone: "America/Los_Angeles",
    },
  },
  acct_atelier: {
    id: "acct_atelier",
    name: "Atelier Goods",
    slug: "atelier",
    profile: {
      storeName: "Atelier Goods",
      supportEmail: "hello@atelier.demo",
      currency: "USD",
      timezone: "America/New_York",
    },
  },
};

const usersById: Record<string, AuthUser & { password: string }> = {
  user_owner: {
    id: "user_owner",
    name: "Avery Stone",
    email: "owner@northstar.demo",
    title: "Founder",
    initials: "AS",
    avatarUrl: null,
    password: DEMO_PASSWORD,
  },
  user_admin: {
    id: "user_admin",
    name: "Jordan Kim",
    email: "admin@northstar.demo",
    title: "Operations Admin",
    initials: "JK",
    avatarUrl: null,
    password: DEMO_PASSWORD,
  },
  user_member: {
    id: "user_member",
    name: "Riley Brooks",
    email: "user@atelier.demo",
    title: "Support User",
    initials: "RB",
    avatarUrl: null,
    password: DEMO_PASSWORD,
  },
};

let memberships: Array<{
  userId: string;
  accountId: string;
  role: RoleKey;
  status: "active" | "inactive";
  lastActiveAt: string;
}> = [
  { userId: "user_owner", accountId: "acct_northstar", role: "account_owner", status: "active", lastActiveAt: "2026-04-18" },
  { userId: "user_owner", accountId: "acct_atelier", role: "account_owner", status: "active", lastActiveAt: "2026-04-18" },
  { userId: "user_admin", accountId: "acct_northstar", role: "admin", status: "active", lastActiveAt: "2026-04-17" },
  { userId: "user_member", accountId: "acct_atelier", role: "user", status: "active", lastActiveAt: "2026-04-16" },
];

const permissionPoliciesByAccountId: Record<string, AccountPermissionPolicy> = {
  acct_northstar: {
    account_owner: [...ALL_PERMISSIONS],
    admin: [...DEFAULT_PERMISSION_POLICY.admin, "settings.users.manage"],
    user: [...DEFAULT_PERMISSION_POLICY.user],
  },
  acct_atelier: {
    account_owner: [...ALL_PERMISSIONS],
    admin: [...DEFAULT_PERMISSION_POLICY.admin, "settings.tax.manage", "settings.users.manage", "settings.permissions.manage"],
    user: [...DEFAULT_PERMISSION_POLICY.user, "settings.view"],
  },
};

interface TenantData {
  products: Product[];
  inventory: InventoryItem[];
  customers: Customer[];
  orders: Order[];
  discounts: Discount[];
  settings: SettingsData;
  auditLog: AuditLogEntry[];
}

function buildTenantData({
  codePrefix,
  categoryAccent,
  supportCarrier,
  lowStockEnabled,
  priceDelta,
}: {
  codePrefix: string;
  categoryAccent: string;
  supportCarrier: string;
  lowStockEnabled: boolean;
  priceDelta: number;
}): TenantData {
  const products: Product[] = [
    {
      id: `${codePrefix}_prod_1`,
      name: `${categoryAccent} Tee`,
      sku: `${codePrefix.toUpperCase()}-TSH-001`,
      category: "Apparel",
      description: "Soft cotton tee designed for daily wear.",
      kind: "standard",
      price: 32 + priceDelta,
      status: "active",
      inventory: 112,
      collectionIds: ["col_1"],
      priceListPrices: [
        { priceListId: "price_1", priceListName: "Wholesale Core", price: 27 + priceDelta },
        { priceListId: "price_2", priceListName: "VIP Retention", price: 29 + priceDelta },
      ],
      variants: [
        { id: `${codePrefix}_var_1`, name: "Heather Gray / S", sku: `${codePrefix.toUpperCase()}-TSH-001-S`, price: 32 + priceDelta, inventory: 34, status: "healthy" },
        { id: `${codePrefix}_var_2`, name: "Heather Gray / M", sku: `${codePrefix.toUpperCase()}-TSH-001-M`, price: 32 + priceDelta, inventory: 42, status: "healthy" },
        { id: `${codePrefix}_var_3`, name: "Heather Gray / L", sku: `${codePrefix.toUpperCase()}-TSH-001-L`, price: 34 + priceDelta, inventory: 36, status: "healthy" },
      ],
    },
    {
      id: `${codePrefix}_prod_2`,
      name: `${categoryAccent} Hoodie`,
      sku: `${codePrefix.toUpperCase()}-HDY-002`,
      category: "Apparel",
      description: "Midweight fleece hoodie with a brushed interior.",
      kind: "standard",
      price: 68 + priceDelta,
      status: "active",
      inventory: 44,
      collectionIds: ["col_1"],
      variants: [
        { id: `${codePrefix}_var_4`, name: "Bone / M", sku: `${codePrefix.toUpperCase()}-HDY-002-M`, price: 68 + priceDelta, inventory: 19, status: "healthy" },
        { id: `${codePrefix}_var_5`, name: "Graphite / XL", sku: `${codePrefix.toUpperCase()}-HDY-002-XL`, price: 72 + priceDelta, inventory: 25, status: "low" },
      ],
    },
    {
      id: `${codePrefix}_prod_3`,
      name: `${categoryAccent} Tote`,
      sku: `${codePrefix.toUpperCase()}-BAG-003`,
      category: "Accessories",
      description: "Structured tote with reinforced straps.",
      kind: "standard",
      price: 28 + priceDelta,
      status: "active",
      inventory: 76,
      collectionIds: ["col_3"],
      variants: [
        { id: `${codePrefix}_var_6`, name: "Natural", sku: `${codePrefix.toUpperCase()}-BAG-003-NAT`, price: 28 + priceDelta, inventory: 44, status: "healthy" },
        { id: `${codePrefix}_var_7`, name: "Olive", sku: `${codePrefix.toUpperCase()}-BAG-003-OLV`, price: 30 + priceDelta, inventory: 32, status: "healthy" },
      ],
    },
    {
      id: `${codePrefix}_prod_4`,
      name: `${categoryAccent} Lamp`,
      sku: `${codePrefix.toUpperCase()}-HOM-004`,
      category: "Home",
      description: "Powder-coated desk lamp with warm light tone.",
      kind: "standard",
      price: 84 + priceDelta,
      status: "active",
      inventory: 14,
      collectionIds: ["col_2"],
      variants: [
        { id: `${codePrefix}_var_8`, name: "Cream", sku: `${codePrefix.toUpperCase()}-HOM-004-CRM`, price: 84 + priceDelta, inventory: 6, status: "low" },
        { id: `${codePrefix}_var_9`, name: "Black", sku: `${codePrefix.toUpperCase()}-HOM-004-BLK`, price: 84 + priceDelta, inventory: 8, status: "low" },
      ],
    },
    {
      id: `${codePrefix}_prod_5`,
      name: `${categoryAccent} Carry Kit`,
      sku: `${codePrefix.toUpperCase()}-KIT-005`,
      category: "Bundles",
      description: "Bundle pairing a tee, tote, and lamp for gifting.",
      kind: "bundle",
      price: 126 + priceDelta,
      status: "active",
      inventory: 12,
      collectionIds: ["col_1", "col_3"],
      bundleComponents: [
        { productId: `${codePrefix}_prod_1`, productName: `${categoryAccent} Tee`, quantity: 1 },
        { productId: `${codePrefix}_prod_3`, productName: `${categoryAccent} Tote`, quantity: 1 },
        { productId: `${codePrefix}_prod_4`, productName: `${categoryAccent} Lamp`, quantity: 1 },
      ],
      variants: [],
    },
  ];

  const inventory: InventoryItem[] = [
    { id: `${codePrefix}_inv_1`, productId: `${codePrefix}_prod_1`, productName: `${categoryAccent} Tee`, sku: `${codePrefix.toUpperCase()}-TSH-001`, location: "West Warehouse", stockQuantity: 52, reorderThreshold: 20, status: "healthy" },
    { id: `${codePrefix}_inv_2`, productId: `${codePrefix}_prod_1`, productName: `${categoryAccent} Tee`, sku: `${codePrefix.toUpperCase()}-TSH-001`, location: "East Warehouse", stockQuantity: 60, reorderThreshold: 20, status: "healthy" },
    { id: `${codePrefix}_inv_3`, productId: `${codePrefix}_prod_2`, productName: `${categoryAccent} Hoodie`, sku: `${codePrefix.toUpperCase()}-HDY-002`, location: "West Warehouse", stockQuantity: 19, reorderThreshold: 15, status: "healthy" },
    { id: `${codePrefix}_inv_4`, productId: `${codePrefix}_prod_2`, productName: `${categoryAccent} Hoodie`, sku: `${codePrefix.toUpperCase()}-HDY-002`, location: "East Warehouse", stockQuantity: 25, reorderThreshold: 15, status: "healthy" },
    { id: `${codePrefix}_inv_5`, productId: `${codePrefix}_prod_4`, productName: `${categoryAccent} Lamp`, sku: `${codePrefix.toUpperCase()}-HOM-004`, location: "West Warehouse", stockQuantity: 6, reorderThreshold: 8, status: "low" },
    { id: `${codePrefix}_inv_6`, productId: `${codePrefix}_prod_4`, productName: `${categoryAccent} Lamp`, sku: `${codePrefix.toUpperCase()}-HOM-004`, location: "East Warehouse", stockQuantity: 8, reorderThreshold: 8, status: "healthy" },
  ];

  const customers: Customer[] = [
    { id: `${codePrefix}_cust_1`, name: "Ava Johnson", email: `ava+${codePrefix}@example.com`, segment: "VIP", tags: ["VIP"], priceListId: "price_2", lifetimeSpend: 5820 + priceDelta * 10, notes: "High value repeat buyer.", joinedAt: "2026-01-04" },
    { id: `${codePrefix}_cust_2`, name: "Noah Martinez", email: `noah+${codePrefix}@example.com`, segment: "Wholesale", tags: ["Wholesale"], priceListId: "price_1", lifetimeSpend: 3020 + priceDelta * 10, notes: "Wholesale reorder every quarter.", joinedAt: "2025-08-14" },
    { id: `${codePrefix}_cust_3`, name: "Sophia Lee", email: `sophia+${codePrefix}@example.com`, segment: "New", tags: ["New"], lifetimeSpend: 280 + priceDelta * 4, notes: "Recent first-time buyer.", joinedAt: "2026-03-11" },
    { id: `${codePrefix}_cust_4`, name: "Benjamin Hall", email: `ben+${codePrefix}@example.com`, segment: "At Risk", tags: ["Newsletter"], lifetimeSpend: 760 + priceDelta * 6, notes: "Responds well to offers.", joinedAt: "2025-09-20" },
  ];

  const orders: Order[] = [
    {
      id: `${codePrefix}_ord_1`,
      orderNumber: `#${codePrefix === "north" ? "2001" : "3001"}`,
      customerId: `${codePrefix}_cust_1`,
      customerName: "Ava Johnson",
      date: "2026-04-07",
      status: "processing",
      paymentStatus: "paid",
      total: 244 + priceDelta * 2,
      notes: "Gift wrap requested.",
      shippingAddress: { name: "Ava Johnson", line1: "44 Market Street", city: "San Francisco", region: "CA", postalCode: "94105", country: "USA" },
      shipment: { carrier: supportCarrier, trackingNumber: `TRK-${codePrefix}-1001`, status: "in_transit", shippedAt: "2026-04-08", estimatedDelivery: "2026-04-12" },
      refunds: [],
      returns: [],
      exchanges: [],
      lineItems: [
        { id: `${codePrefix}_li_1`, productId: `${codePrefix}_prod_1`, productName: `${categoryAccent} Tee`, quantity: 4, price: 32 + priceDelta },
        { id: `${codePrefix}_li_2`, productId: `${codePrefix}_prod_3`, productName: `${categoryAccent} Tote`, quantity: 2, price: 28 + priceDelta },
      ],
    },
    {
      id: `${codePrefix}_ord_2`,
      orderNumber: `#${codePrefix === "north" ? "2002" : "3002"}`,
      customerId: `${codePrefix}_cust_2`,
      customerName: "Noah Martinez",
      date: "2026-04-06",
      status: "fulfilled",
      paymentStatus: "paid",
      total: 560 + priceDelta * 4,
      notes: "Wholesale reorder for retail floor.",
      shippingAddress: { name: "Noah Martinez", line1: "710 Commerce Blvd", city: "Denver", region: "CO", postalCode: "80202", country: "USA" },
      shipment: { carrier: supportCarrier, trackingNumber: `TRK-${codePrefix}-1002`, status: "delivered", shippedAt: "2026-04-06", estimatedDelivery: "2026-04-10" },
      refunds: [],
      returns: [],
      exchanges: [],
      lineItems: [
        { id: `${codePrefix}_li_3`, productId: `${codePrefix}_prod_1`, productName: `${categoryAccent} Tee`, quantity: 10, price: 32 + priceDelta },
        { id: `${codePrefix}_li_4`, productId: `${codePrefix}_prod_3`, productName: `${categoryAccent} Tote`, quantity: 5, price: 28 + priceDelta },
      ],
    },
    {
      id: `${codePrefix}_ord_3`,
      orderNumber: `#${codePrefix === "north" ? "2003" : "3003"}`,
      customerId: `${codePrefix}_cust_3`,
      customerName: "Sophia Lee",
      date: "2026-04-04",
      status: "cancelled",
      paymentStatus: "refunded",
      total: 84 + priceDelta,
      notes: "Customer requested cancellation.",
      shippingAddress: { name: "Sophia Lee", line1: "82 River St", city: "Chicago", region: "IL", postalCode: "60601", country: "USA" },
      shipment: { carrier: supportCarrier, trackingNumber: `TRK-${codePrefix}-1003`, status: "delayed", shippedAt: null, estimatedDelivery: null },
      refunds: [{ id: `${codePrefix}_refund_1`, amount: 84 + priceDelta, reason: "Customer cancellation", createdAt: "2026-04-04" }],
      returns: [],
      exchanges: [],
      lineItems: [{ id: `${codePrefix}_li_5`, productId: `${codePrefix}_prod_4`, productName: `${categoryAccent} Lamp`, quantity: 1, price: 84 + priceDelta }],
    },
  ];

  const discounts: Discount[] = [
    {
      id: `${codePrefix}_disc_1`,
      code: `${codePrefix.toUpperCase()}10`,
      type: "percentage",
      value: 10,
      active: true,
      usageCount: 112,
      startDate: "2026-03-01",
      endDate: "2026-06-30",
      rules: { minimumSpend: 0, eligibleSegments: ["New"], eligibleCategories: [] },
    },
    {
      id: `${codePrefix}_disc_2`,
      code: `${codePrefix.toUpperCase()}SHIP`,
      type: "free_shipping",
      value: 0,
      active: lowStockEnabled,
      usageCount: 74,
      startDate: "2026-03-15",
      endDate: "2026-07-15",
      rules: { minimumSpend: 50, eligibleSegments: [], eligibleCategories: ["Apparel"] },
    },
  ];

  const settings: SettingsData = {
    shipping: {
      defaultCarrier: supportCarrier,
      standardRate: 8 + priceDelta / 2,
      expressRate: 18 + priceDelta / 2,
    },
    taxes: {
      pricesIncludeTax: codePrefix === "atelier",
      nexusRegion: codePrefix === "atelier" ? "New York" : "California",
      defaultRate: codePrefix === "atelier" ? 8.875 : 8.25,
    },
    notifications: {
      lowStock: lowStockEnabled,
      orderAlerts: true,
      weeklyDigest: codePrefix === "atelier",
    },
  };

  const auditLog: AuditLogEntry[] = [
    { id: `${codePrefix}_log_1`, entityType: "product", entityId: `${codePrefix}_prod_5`, action: "created", actor: "Merch Team", timestamp: "2026-04-11", summary: "Bundle product launched for seasonal promotion." },
    { id: `${codePrefix}_log_2`, entityType: "discount", entityId: `${codePrefix}_disc_2`, action: "updated", actor: "Growth Team", timestamp: "2026-04-15", summary: "Shipping promotion extended after campaign review." },
    { id: `${codePrefix}_log_3`, entityType: "order", entityId: `${codePrefix}_ord_3`, action: "refunded", actor: "Support Ops", timestamp: "2026-04-16", summary: "Refund issued after customer cancellation request." },
  ];

  return { products, inventory, customers, orders, discounts, settings, auditLog };
}

const tenantDataByAccountId: Record<string, TenantData> = {
  acct_northstar: buildTenantData({
    codePrefix: "north",
    categoryAccent: "Summit",
    supportCarrier: "UPS",
    lowStockEnabled: true,
    priceDelta: 0,
  }),
  acct_atelier: buildTenantData({
    codePrefix: "atelier",
    categoryAccent: "Studio",
    supportCarrier: "FedEx",
    lowStockEnabled: false,
    priceDelta: 6,
  }),
};

function getTenant(accountId: string) {
  const tenant = tenantDataByAccountId[accountId];
  if (!tenant) {
    throw new Error("Account not found");
  }
  return tenant;
}

function getMembership(userId: string, accountId: string) {
  return memberships.find((membership) => membership.userId === userId && membership.accountId === accountId && membership.status === "active") ?? null;
}

function getPermissionsForRole(accountId: string, role: RoleKey) {
  const policy = permissionPoliciesByAccountId[accountId];
  return role === "account_owner" ? [...ALL_PERMISSIONS] : [...policy[role]];
}

function deriveInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function buildSession(userId: string, accountId: string): AuthSession {
  const user = usersById[userId];
  const activeMembership = getMembership(userId, accountId);
  if (!user || !activeMembership) {
    throw new Error("Invalid session");
  }

  const activePermissions = getPermissionsForRole(accountId, activeMembership.role);
  const session: AuthSession = {
    token: `session:${userId}:${accountId}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      title: user.title,
      initials: user.initials,
      avatarUrl: user.avatarUrl ?? null,
    },
    activeAccount: clone(accountsById[accountId]),
    activeRole: activeMembership.role,
    activePermissions,
    memberships: memberships
      .filter((membership) => membership.userId === userId && membership.status === "active")
      .map((membership) => ({
        account: clone(accountsById[membership.accountId]),
        role: membership.role,
        permissions: getPermissionsForRole(membership.accountId, membership.role),
      })),
  };

  return session;
}

export function authenticateUser(email: string, password: string) {
  const user = Object.values(usersById).find((entry) => entry.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return null;
  }

  const membership = memberships.find((entry) => entry.userId === user.id && entry.status === "active");
  if (!membership) {
    return null;
  }

  return buildSession(user.id, membership.accountId);
}

export function getSessionFromToken(token: string | null) {
  if (!token?.startsWith("session:")) return null;
  const [, userId, accountId] = token.split(":");
  if (!userId || !accountId) return null;
  try {
    return buildSession(userId, accountId);
  } catch {
    return null;
  }
}

export function switchSessionAccount(token: string | null, accountId: string) {
  const session = getSessionFromToken(token);
  if (!session) return null;
  const membership = getMembership(session.user.id, accountId);
  if (!membership) return null;
  return buildSession(session.user.id, accountId);
}

export function hasPermission(session: AuthSession, permission: PermissionKey) {
  return session.activeRole === "account_owner" || session.activePermissions.includes(permission);
}

function getCollectionsForProduct(product: Product) {
  return product.collectionIds.flatMap((collectionId) => {
    const collection = collections.find((entry) => entry.id === collectionId);
    return collection ? [collection] : [];
  });
}

function getActivityHistory(accountId: string, entityType: AuditLogEntry["entityType"], entityId: string) {
  return getTenant(accountId).auditLog.filter((entry) => entry.entityType === entityType && entry.entityId === entityId);
}

function getCustomerPriceList(customerId: string) {
  const customer = Object.values(tenantDataByAccountId)
    .flatMap((tenant) => tenant.customers)
    .find((entry) => entry.id === customerId);
  if (!customer?.priceListId) return null;
  return priceLists.find((entry) => entry.id === customer.priceListId) ?? null;
}

function summarizeProduct(product: Product) {
  if (product.kind === "bundle" && product.bundleComponents?.length) {
    const bundleInventory = product.bundleComponents.reduce((lowest, component) => {
      const sourceProduct = Object.values(tenantDataByAccountId)
        .flatMap((tenant) => tenant.products)
        .find((entry) => entry.id === component.productId);
      if (!sourceProduct) return 0;
      return Math.min(lowest, Math.floor(sourceProduct.inventory / component.quantity));
    }, Number.POSITIVE_INFINITY);

    return { ...product, inventory: Number.isFinite(bundleInventory) ? bundleInventory : 0 };
  }

  if (!product.variants.length) return product;
  return {
    ...product,
    price: Math.min(...product.variants.map((variant) => variant.price)),
    inventory: product.variants.reduce((sum, variant) => sum + variant.inventory, 0),
  };
}

function recordAuditEntry(accountId: string, entry: Omit<AuditLogEntry, "id">) {
  const tenant = getTenant(accountId);
  tenant.auditLog = [
    { id: `${accountId}_log_${tenant.auditLog.length + 1}`, ...entry },
    ...tenant.auditLog,
  ];
}

function syncProductInventory(accountId: string, productId: string) {
  const tenant = getTenant(accountId);
  const total = tenant.inventory.filter((item) => item.productId === productId).reduce((sum, item) => sum + item.stockQuantity, 0);
  tenant.products = tenant.products.map((product) => (product.id === productId ? { ...product, inventory: total } : product));
}

function deriveInventoryStatus(stockQuantity: number, reorderThreshold: number) {
  if (stockQuantity <= 0) return "out_of_stock" as const;
  if (stockQuantity < reorderThreshold) return "low" as const;
  return "healthy" as const;
}

export function getDashboardSummary(accountId: string): DashboardSummary {
  const tenant = getTenant(accountId);
  const revenue = tenant.orders.filter((order) => order.paymentStatus === "paid").reduce((sum, order) => sum + order.total, 0);
  const lowStockItems = tenant.inventory.filter((item) => item.status !== "healthy").length;
  const topProductsMap = new Map<string, { productId: string; name: string; unitsSold: number; revenue: number }>();

  for (const order of tenant.orders) {
    for (const lineItem of order.lineItems) {
      const existing = topProductsMap.get(lineItem.productId);
      if (existing) {
        existing.unitsSold += lineItem.quantity;
        existing.revenue += lineItem.quantity * lineItem.price;
      } else {
        topProductsMap.set(lineItem.productId, {
          productId: lineItem.productId,
          name: lineItem.productName,
          unitsSold: lineItem.quantity,
          revenue: lineItem.quantity * lineItem.price,
        });
      }
    }
  }

  return clone({
    revenue,
    orders: tenant.orders.length,
    customers: tenant.customers.length,
    lowStockItems,
    notifications: {
      lowStock: tenant.inventory.filter((item) => item.status !== "healthy").slice(0, 4),
      expiringDiscounts: tenant.discounts.filter((discount) => discount.active).slice(0, 4),
    },
    recentOrders: [...tenant.orders].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6),
    topProducts: [...topProductsMap.values()].sort((a, b) => b.unitsSold - a.unitsSold).slice(0, 5),
  });
}

export function listProducts(accountId: string) {
  return clone(getTenant(accountId).products.map((product) => ({
    ...summarizeProduct(product),
    collections: getCollectionsForProduct(product),
  })));
}

export function getProduct(accountId: string, id: string) {
  const product = getTenant(accountId).products.find((entry) => entry.id === id);
  if (!product) return null;
  return clone({
    ...summarizeProduct(product),
    activityHistory: getActivityHistory(accountId, "product", id),
    collections: getCollectionsForProduct(product),
  });
}

export function updateProduct(accountId: string, id: string, payload: Partial<Product>) {
  const tenant = getTenant(accountId);
  tenant.products = tenant.products.map((product) =>
    product.id === id
      ? summarizeProduct({
          ...product,
          ...payload,
          variants: payload.variants ?? product.variants,
          collectionIds: payload.collectionIds ?? product.collectionIds,
        })
      : product,
  );
  recordAuditEntry(accountId, {
    entityType: "product",
    entityId: id,
    action: "updated",
    actor: "Catalog Team",
    timestamp: "2026-04-18",
    summary: "Product details updated.",
  });
  return getProduct(accountId, id);
}

export function listInventory(accountId: string) {
  return clone(getTenant(accountId).inventory);
}

export function updateInventory(accountId: string, id: string, payload: Partial<InventoryItem>) {
  const tenant = getTenant(accountId);
  let updatedProductId = "";
  tenant.inventory = tenant.inventory.map((item) => {
    if (item.id !== id) return item;
    updatedProductId = item.productId;
    const stockQuantity = payload.stockQuantity ?? item.stockQuantity;
    const reorderThreshold = payload.reorderThreshold ?? item.reorderThreshold;
    return {
      ...item,
      ...payload,
      stockQuantity,
      reorderThreshold,
      status: deriveInventoryStatus(stockQuantity, reorderThreshold),
    };
  });
  if (updatedProductId) syncProductInventory(accountId, updatedProductId);
  return clone(tenant.inventory.find((item) => item.id === id) ?? null);
}

export function listOrders(accountId: string) {
  return clone(
    [...getTenant(accountId).orders]
      .map((order) => ({
        ...order,
        appliedPriceListName: getCustomerPriceList(order.customerId)?.name ?? null,
      }))
      .sort((a, b) => b.date.localeCompare(a.date)),
  );
}

export function getOrder(accountId: string, id: string) {
  const order = getTenant(accountId).orders.find((entry) => entry.id === id);
  if (!order) return null;
  return clone({
    ...order,
    appliedPriceListName: getCustomerPriceList(order.customerId)?.name ?? null,
    activityHistory: getActivityHistory(accountId, "order", id),
  });
}

export function updateOrder(accountId: string, id: string, payload: Partial<Order>) {
  const tenant = getTenant(accountId);
  tenant.orders = tenant.orders.map((order) => (order.id === id ? { ...order, ...payload } : order));
  const action =
    payload.refunds ? "refunded" :
    payload.returns ? "return_started" :
    payload.exchanges ? "exchange_started" :
    "updated";
  recordAuditEntry(accountId, {
    entityType: "order",
    entityId: id,
    action,
    actor: "Support Ops",
    timestamp: "2026-04-18",
    summary: "Order workflow updated.",
  });
  return getOrder(accountId, id);
}

export function listCustomers(accountId: string) {
  return clone(getTenant(accountId).customers.map((customer) => ({
    ...customer,
    priceList: customer.priceListId ? getCustomerPriceList(customer.id) : null,
  })));
}

export function getCustomer(accountId: string, id: string) {
  const customer = getTenant(accountId).customers.find((entry) => entry.id === id);
  if (!customer) return null;
  return clone({
    ...customer,
    priceList: customer.priceListId ? getCustomerPriceList(customer.id) : null,
    orderHistory: getTenant(accountId).orders.filter((order) => order.customerId === id).sort((a, b) => b.date.localeCompare(a.date)),
  });
}

export function listDiscounts(accountId: string) {
  return clone(getTenant(accountId).discounts);
}

export function getDiscount(accountId: string, id: string) {
  const discount = getTenant(accountId).discounts.find((entry) => entry.id === id);
  if (!discount) return null;
  return clone({
    ...discount,
    activityHistory: getActivityHistory(accountId, "discount", id),
  });
}

export function createDiscount(accountId: string, payload: Omit<Discount, "id" | "usageCount">) {
  const tenant = getTenant(accountId);
  const next: Discount = {
    id: `${accountId}_disc_${tenant.discounts.length + 1}`,
    usageCount: 0,
    ...payload,
  };
  tenant.discounts = [next, ...tenant.discounts];
  recordAuditEntry(accountId, {
    entityType: "discount",
    entityId: next.id,
    action: "created",
    actor: "Growth Team",
    timestamp: "2026-04-18",
    summary: "New rule-based discount created.",
  });
  return clone(next);
}

export function updateDiscount(accountId: string, id: string, payload: Partial<Discount>) {
  const tenant = getTenant(accountId);
  tenant.discounts = tenant.discounts.map((discount) => (discount.id === id ? { ...discount, ...payload } : discount));
  recordAuditEntry(accountId, {
    entityType: "discount",
    entityId: id,
    action: "updated",
    actor: "Growth Team",
    timestamp: "2026-04-18",
    summary: "Discount settings updated.",
  });
  return getDiscount(accountId, id);
}

export function getAnalyticsOverview(accountId: string): AnalyticsOverview {
  const tenant = getTenant(accountId);
  const paidOrders = tenant.orders.filter((order) => order.paymentStatus === "paid");
  const revenue = paidOrders.reduce((sum, order) => sum + order.total, 0);
  const aov = paidOrders.length ? revenue / paidOrders.length : 0;
  const categoryTotals = new Map<string, number>();

  for (const order of paidOrders) {
    for (const item of order.lineItems) {
      const product = tenant.products.find((productEntry) => productEntry.id === item.productId);
      const category = product?.category ?? "Other";
      categoryTotals.set(category, (categoryTotals.get(category) ?? 0) + item.quantity);
    }
  }

  return clone({
    revenue,
    aov,
    orders: tenant.orders.length,
    conversionTrend: [
      { label: "2026-03-10", value: accountId === "acct_atelier" ? 2.8 : 2.3 },
      { label: "2026-03-17", value: accountId === "acct_atelier" ? 3.0 : 2.7 },
      { label: "2026-03-24", value: accountId === "acct_atelier" ? 3.2 : 2.5 },
      { label: "2026-03-31", value: accountId === "acct_atelier" ? 3.5 : 3.1 },
    ],
    revenueTrend: [
      { label: "2026-01-01", value: accountId === "acct_atelier" ? 14100 : 12200 },
      { label: "2026-02-01", value: accountId === "acct_atelier" ? 15250 : 14750 },
      { label: "2026-03-01", value: accountId === "acct_atelier" ? 16880 : 16100 },
      { label: "2026-04-01", value: accountId === "acct_atelier" ? 18120 : 17350 },
    ],
    topCategories: [...categoryTotals.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 5),
  });
}

export function getAccount(accountId: string) {
  return clone(accountsById[accountId]);
}

export function updateAccount(accountId: string, payload: Partial<Account>) {
  const current = accountsById[accountId];
  accountsById[accountId] = {
    ...current,
    ...payload,
    profile: {
      ...current.profile,
      ...payload.profile,
    },
  };
  return clone(accountsById[accountId]);
}

export function getSettings(accountId: string) {
  return clone(getTenant(accountId).settings);
}

export function updateSettings(accountId: string, payload: Partial<SettingsData>) {
  const tenant = getTenant(accountId);
  tenant.settings = {
    ...tenant.settings,
    ...payload,
    shipping: { ...tenant.settings.shipping, ...payload.shipping },
    taxes: { ...tenant.settings.taxes, ...payload.taxes },
    notifications: { ...tenant.settings.notifications, ...payload.notifications },
  };
  return clone(tenant.settings);
}

export function getAccountUsers(accountId: string): AccountMember[] {
  return memberships
    .filter((membership) => membership.accountId === accountId)
    .map((membership) => {
      const user = usersById[membership.userId];
      return {
        userId: membership.userId,
        name: user.name,
        email: user.email,
        title: user.title,
        initials: user.initials,
        avatarUrl: user.avatarUrl ?? null,
        role: membership.role,
        status: membership.status,
        lastActiveAt: membership.lastActiveAt,
      };
    });
}

export function getAccountUser(accountId: string, userId: string) {
  return getAccountUsers(accountId).find((member) => member.userId === userId) ?? null;
}

export function updateAccountUser(accountId: string, userId: string, payload: Partial<AccountMember>) {
  const currentUser = usersById[userId];
  if (currentUser) {
    const nextName = payload.name ?? currentUser.name;
    usersById[userId] = {
      ...currentUser,
      name: nextName,
      email: payload.email ?? currentUser.email,
      title: payload.title ?? currentUser.title,
      avatarUrl: payload.avatarUrl ?? currentUser.avatarUrl ?? null,
      initials: payload.initials ?? deriveInitials(nextName),
    };
  }

  memberships = memberships.map((membership) =>
    membership.accountId === accountId && membership.userId === userId
      ? {
          ...membership,
          role: payload.role ?? membership.role,
          status: payload.status ?? membership.status,
        }
      : membership,
  );
  const updated = getAccountUser(accountId, userId);
  return updated ? clone(updated) : null;
}

export function getCurrentUser(userId: string) {
  const user = usersById[userId];
  if (!user) return null;
  return clone({
    id: user.id,
    name: user.name,
    email: user.email,
    title: user.title,
    initials: user.initials,
    avatarUrl: user.avatarUrl ?? null,
  });
}

export function updateCurrentUser(userId: string, payload: Partial<AuthUser>) {
  const current = usersById[userId];
  if (!current) return null;
  const nextName = payload.name ?? current.name;
  usersById[userId] = {
    ...current,
    name: nextName,
    email: payload.email ?? current.email,
    title: payload.title ?? current.title,
    avatarUrl: payload.avatarUrl ?? current.avatarUrl ?? null,
    initials: payload.initials ?? deriveInitials(nextName),
  };
  return getCurrentUser(userId);
}

export function getAccountPermissions(accountId: string) {
  return clone(permissionPoliciesByAccountId[accountId]);
}

export function updateAccountPermissions(accountId: string, payload: Partial<AccountPermissionPolicy>) {
  permissionPoliciesByAccountId[accountId] = {
    ...permissionPoliciesByAccountId[accountId],
    ...payload,
    account_owner: [...ALL_PERMISSIONS],
    admin: payload.admin ? [...payload.admin] : [...permissionPoliciesByAccountId[accountId].admin],
    user: payload.user ? [...payload.user] : [...permissionPoliciesByAccountId[accountId].user],
  };
  return clone(permissionPoliciesByAccountId[accountId]);
}

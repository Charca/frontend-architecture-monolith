import type {
  AnalyticsOverview,
  Collection,
  Customer,
  DashboardSummary,
  Discount,
  InventoryItem,
  Order,
  Product,
  SettingsData,
} from "@/types";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const collections: Collection[] = [
  { id: "col_1", name: "Spring Layers", description: "Lightweight apparel and accessories for shoulder season drops." },
  { id: "col_2", name: "Desk Refresh", description: "Home office items with higher AOV and gifting appeal." },
  { id: "col_3", name: "Weekend Carry", description: "Everyday bags, bottles, and mobile essentials." },
  { id: "col_4", name: "Wholesale Favorites", description: "Consistent performers often reordered by wholesale buyers." },
];

const priceLists = [
  { id: "price_1", name: "Wholesale Core", segment: "Wholesale" },
  { id: "price_2", name: "VIP Retention", segment: "VIP" },
  { id: "price_3", name: "Noah Martinez Custom", segment: "Custom" },
] as const;

let products: Product[] = [
  {
    id: "prod_1",
    name: "Everyday Tee",
    sku: "TSH-001",
    category: "Apparel",
    description: "Soft cotton tee designed for daily wear.",
    kind: "standard",
    price: 32,
    status: "active",
    inventory: 118,
    collectionIds: ["col_1", "col_4"],
    priceListPrices: [
      { priceListId: "price_1", priceListName: "Wholesale Core", price: 27 },
      { priceListId: "price_2", priceListName: "VIP Retention", price: 29 },
      { priceListId: "price_3", priceListName: "Noah Martinez Custom", price: 26 },
    ],
    variants: [
      { id: "var_1", name: "Heather Gray / S", sku: "TSH-001-GRY-S", price: 32, inventory: 34, status: "healthy" },
      { id: "var_2", name: "Heather Gray / M", sku: "TSH-001-GRY-M", price: 32, inventory: 46, status: "healthy" },
      { id: "var_3", name: "Heather Gray / L", sku: "TSH-001-GRY-L", price: 34, inventory: 38, status: "healthy" },
    ],
  },
  {
    id: "prod_2",
    name: "Relaxed Hoodie",
    sku: "HDY-002",
    category: "Apparel",
    description: "Midweight fleece hoodie with brushed interior.",
    kind: "standard",
    price: 68,
    status: "active",
    inventory: 42,
    collectionIds: ["col_1"],
    priceListPrices: [
      { priceListId: "price_1", priceListName: "Wholesale Core", price: 58 },
      { priceListId: "price_2", priceListName: "VIP Retention", price: 62 },
    ],
    variants: [
      { id: "var_4", name: "Bone / M", sku: "HDY-002-BNE-M", price: 68, inventory: 16, status: "healthy" },
      { id: "var_5", name: "Bone / L", sku: "HDY-002-BNE-L", price: 68, inventory: 14, status: "low" },
      { id: "var_6", name: "Graphite / XL", sku: "HDY-002-GPH-XL", price: 72, inventory: 12, status: "low" },
    ],
  },
  {
    id: "prod_3",
    name: "Canvas Tote",
    sku: "BAG-003",
    category: "Accessories",
    description: "Structured tote with inside pocket and reinforced straps.",
    kind: "standard",
    price: 28,
    status: "active",
    inventory: 81,
    collectionIds: ["col_3", "col_4"],
    priceListPrices: [
      { priceListId: "price_1", priceListName: "Wholesale Core", price: 23 },
      { priceListId: "price_2", priceListName: "VIP Retention", price: 25 },
      { priceListId: "price_3", priceListName: "Noah Martinez Custom", price: 22 },
    ],
    variants: [
      { id: "var_7", name: "Natural", sku: "BAG-003-NAT", price: 28, inventory: 51, status: "healthy" },
      { id: "var_8", name: "Olive", sku: "BAG-003-OLV", price: 30, inventory: 30, status: "healthy" },
    ],
  },
  {
    id: "prod_4",
    name: "Stoneware Mug",
    sku: "HOM-004",
    category: "Home",
    description: "Hand-finished mug in a matte glaze.",
    kind: "standard",
    price: 24,
    status: "active",
    inventory: 25,
    collectionIds: ["col_2"],
    variants: [
      { id: "var_9", name: "Sand", sku: "HOM-004-SND", price: 24, inventory: 13, status: "healthy" },
      { id: "var_10", name: "Charcoal", sku: "HOM-004-CHR", price: 24, inventory: 12, status: "healthy" },
    ],
  },
  {
    id: "prod_5",
    name: "Trail Cap",
    sku: "ACC-005",
    category: "Accessories",
    description: "Lightweight five-panel cap with adjustable closure.",
    kind: "standard",
    price: 30,
    status: "active",
    inventory: 17,
    collectionIds: ["col_1", "col_3"],
    variants: [
      { id: "var_11", name: "Forest", sku: "ACC-005-FRS", price: 30, inventory: 9, status: "low" },
      { id: "var_12", name: "Stone", sku: "ACC-005-STN", price: 30, inventory: 8, status: "low" },
    ],
  },
  {
    id: "prod_6",
    name: "Minimal Notebook",
    sku: "STN-006",
    category: "Stationery",
    description: "Lay-flat dotted notebook with recycled stock.",
    kind: "standard",
    price: 18,
    status: "draft",
    inventory: 54,
    collectionIds: ["col_2"],
    variants: [
      { id: "var_13", name: "Clay Cover", sku: "STN-006-CLY", price: 18, inventory: 24, status: "healthy" },
      { id: "var_14", name: "Slate Cover", sku: "STN-006-SLT", price: 18, inventory: 30, status: "healthy" },
    ],
  },
  {
    id: "prod_7",
    name: "Cloud Socks",
    sku: "APP-007",
    category: "Apparel",
    description: "Cushioned ribbed socks sold as a two-pack.",
    kind: "standard",
    price: 16,
    status: "active",
    inventory: 92,
    collectionIds: ["col_1", "col_4"],
    variants: [
      { id: "var_15", name: "Oat / S-M", sku: "APP-007-OAT-SM", price: 16, inventory: 40, status: "healthy" },
      { id: "var_16", name: "Oat / L-XL", sku: "APP-007-OAT-LX", price: 16, inventory: 28, status: "healthy" },
      { id: "var_17", name: "Coal / L-XL", sku: "APP-007-COL-LX", price: 18, inventory: 24, status: "healthy" },
    ],
  },
  {
    id: "prod_8",
    name: "Desk Lamp",
    sku: "HOM-008",
    category: "Home",
    description: "Powder-coated desk lamp with warm light tone.",
    kind: "standard",
    price: 84,
    status: "active",
    inventory: 12,
    collectionIds: ["col_2"],
    priceListPrices: [
      { priceListId: "price_1", priceListName: "Wholesale Core", price: 73 },
      { priceListId: "price_2", priceListName: "VIP Retention", price: 78 },
    ],
    variants: [
      { id: "var_18", name: "Cream", sku: "HOM-008-CRM", price: 84, inventory: 5, status: "low" },
      { id: "var_19", name: "Black", sku: "HOM-008-BLK", price: 84, inventory: 7, status: "low" },
    ],
  },
  {
    id: "prod_9",
    name: "Travel Bottle",
    sku: "OUT-009",
    category: "Outdoor",
    description: "Double-wall stainless bottle with leakproof lid.",
    kind: "standard",
    price: 36,
    status: "active",
    inventory: 63,
    collectionIds: ["col_3"],
    priceListPrices: [
      { priceListId: "price_1", priceListName: "Wholesale Core", price: 31 },
      { priceListId: "price_2", priceListName: "VIP Retention", price: 33 },
    ],
    variants: [
      { id: "var_20", name: "24 oz / Sage", sku: "OUT-009-SAG", price: 36, inventory: 31, status: "healthy" },
      { id: "var_21", name: "24 oz / Slate", sku: "OUT-009-SLT", price: 38, inventory: 32, status: "healthy" },
    ],
  },
  {
    id: "prod_10",
    name: "Wool Blanket",
    sku: "HOM-010",
    category: "Home",
    description: "Soft wool blend throw blanket in neutral tones.",
    kind: "standard",
    price: 96,
    status: "archived",
    inventory: 8,
    collectionIds: ["col_2"],
    variants: [
      { id: "var_22", name: "Oatmeal", sku: "HOM-010-OAT", price: 96, inventory: 3, status: "low" },
      { id: "var_23", name: "Charcoal", sku: "HOM-010-CHR", price: 96, inventory: 5, status: "healthy" },
    ],
  },
  {
    id: "prod_11",
    name: "Leather Card Holder",
    sku: "ACC-011",
    category: "Accessories",
    description: "Slim vegetable-tanned card holder with four slots.",
    kind: "standard",
    price: 48,
    status: "active",
    inventory: 37,
    collectionIds: ["col_3"],
    variants: [
      { id: "var_24", name: "Chestnut", sku: "ACC-011-CHS", price: 48, inventory: 19, status: "healthy" },
      { id: "var_25", name: "Black", sku: "ACC-011-BLK", price: 48, inventory: 18, status: "healthy" },
    ],
  },
  {
    id: "prod_12",
    name: "Ceramic Planter",
    sku: "HOM-012",
    category: "Home",
    description: "Medium ceramic planter with drainage tray.",
    kind: "standard",
    price: 42,
    status: "active",
    inventory: 29,
    collectionIds: ["col_2"],
    variants: [
      { id: "var_26", name: "Moss", sku: "HOM-012-MOS", price: 42, inventory: 14, status: "healthy" },
      { id: "var_27", name: "Sand", sku: "HOM-012-SND", price: 44, inventory: 15, status: "healthy" },
    ],
  },
  {
    id: "prod_13",
    name: "Weekend Carry Kit",
    sku: "KIT-013",
    category: "Bundles",
    description: "A merchandised bundle built from the tote, travel bottle, and trail cap.",
    kind: "bundle",
    price: 88,
    status: "active",
    inventory: 17,
    collectionIds: ["col_3", "col_4"],
    priceListPrices: [
      { priceListId: "price_1", priceListName: "Wholesale Core", price: 74 },
      { priceListId: "price_3", priceListName: "Noah Martinez Custom", price: 71 },
    ],
    variants: [],
    bundleComponents: [
      { productId: "prod_3", productName: "Canvas Tote", quantity: 1 },
      { productId: "prod_5", productName: "Trail Cap", quantity: 1 },
      { productId: "prod_9", productName: "Travel Bottle", quantity: 1 },
    ],
  },
  {
    id: "prod_14",
    name: "Desk Reset Bundle",
    sku: "KIT-014",
    category: "Bundles",
    description: "A higher-AOV bundle pairing the lamp, notebook, and planter.",
    kind: "bundle",
    price: 132,
    status: "active",
    inventory: 12,
    collectionIds: ["col_2"],
    priceListPrices: [
      { priceListId: "price_1", priceListName: "Wholesale Core", price: 118 },
      { priceListId: "price_2", priceListName: "VIP Retention", price: 122 },
    ],
    variants: [],
    bundleComponents: [
      { productId: "prod_8", productName: "Desk Lamp", quantity: 1 },
      { productId: "prod_6", productName: "Minimal Notebook", quantity: 1 },
      { productId: "prod_12", productName: "Ceramic Planter", quantity: 1 },
    ],
  },
];

let inventory: InventoryItem[] = [
  { id: "inv_1", productId: "prod_1", productName: "Everyday Tee", sku: "TSH-001", location: "West Warehouse", stockQuantity: 62, reorderThreshold: 20, status: "healthy" },
  { id: "inv_2", productId: "prod_1", productName: "Everyday Tee", sku: "TSH-001", location: "East Warehouse", stockQuantity: 56, reorderThreshold: 20, status: "healthy" },
  { id: "inv_3", productId: "prod_2", productName: "Relaxed Hoodie", sku: "HDY-002", location: "West Warehouse", stockQuantity: 18, reorderThreshold: 15, status: "healthy" },
  { id: "inv_4", productId: "prod_2", productName: "Relaxed Hoodie", sku: "HDY-002", location: "East Warehouse", stockQuantity: 24, reorderThreshold: 15, status: "healthy" },
  { id: "inv_5", productId: "prod_3", productName: "Canvas Tote", sku: "BAG-003", location: "West Warehouse", stockQuantity: 31, reorderThreshold: 10, status: "healthy" },
  { id: "inv_6", productId: "prod_3", productName: "Canvas Tote", sku: "BAG-003", location: "East Warehouse", stockQuantity: 50, reorderThreshold: 10, status: "healthy" },
  { id: "inv_7", productId: "prod_4", productName: "Stoneware Mug", sku: "HOM-004", location: "West Warehouse", stockQuantity: 9, reorderThreshold: 12, status: "low" },
  { id: "inv_8", productId: "prod_4", productName: "Stoneware Mug", sku: "HOM-004", location: "East Warehouse", stockQuantity: 16, reorderThreshold: 12, status: "healthy" },
  { id: "inv_9", productId: "prod_5", productName: "Trail Cap", sku: "ACC-005", location: "West Warehouse", stockQuantity: 7, reorderThreshold: 10, status: "low" },
  { id: "inv_10", productId: "prod_5", productName: "Trail Cap", sku: "ACC-005", location: "East Warehouse", stockQuantity: 10, reorderThreshold: 10, status: "healthy" },
  { id: "inv_11", productId: "prod_8", productName: "Desk Lamp", sku: "HOM-008", location: "West Warehouse", stockQuantity: 4, reorderThreshold: 8, status: "low" },
  { id: "inv_12", productId: "prod_8", productName: "Desk Lamp", sku: "HOM-008", location: "East Warehouse", stockQuantity: 8, reorderThreshold: 8, status: "healthy" },
  { id: "inv_13", productId: "prod_10", productName: "Wool Blanket", sku: "HOM-010", location: "West Warehouse", stockQuantity: 0, reorderThreshold: 5, status: "out_of_stock" },
  { id: "inv_14", productId: "prod_10", productName: "Wool Blanket", sku: "HOM-010", location: "East Warehouse", stockQuantity: 8, reorderThreshold: 5, status: "healthy" },
];

const customers: Customer[] = [
  { id: "cust_1", name: "Ava Johnson", email: "ava@example.com", segment: "VIP", tags: ["VIP", "Wholesale"], priceListId: "price_2", lifetimeSpend: 5820, notes: "Frequently requests early access to launches.", joinedAt: "2026-01-04" },
  { id: "cust_2", name: "Liam Carter", email: "liam@example.com", segment: "Repeat", tags: ["Repeat"], lifetimeSpend: 1640, notes: "Prefers express shipping.", joinedAt: "2025-11-18" },
  { id: "cust_3", name: "Mia Thompson", email: "mia@example.com", segment: "At Risk", tags: ["Newsletter"], lifetimeSpend: 920, notes: "Interested in home category drops.", joinedAt: "2025-12-03" },
  { id: "cust_4", name: "Noah Martinez", email: "noah@example.com", segment: "Wholesale", tags: ["Wholesale"], priceListId: "price_3", lifetimeSpend: 3020, notes: "Bulk orders every quarter.", joinedAt: "2025-08-14" },
  { id: "cust_5", name: "Emma Davis", email: "emma@example.com", segment: "VIP", tags: ["VIP"], priceListId: "price_2", lifetimeSpend: 4410, notes: "High lifetime spend across apparel.", joinedAt: "2025-05-29" },
  { id: "cust_6", name: "James Wilson", email: "james@example.com", segment: "Repeat", tags: ["Repeat"], lifetimeSpend: 1210, notes: "Usually responds quickly to support.", joinedAt: "2025-10-09" },
  { id: "cust_7", name: "Sophia Lee", email: "sophia@example.com", segment: "New", tags: ["New"], lifetimeSpend: 280, notes: "Recent first-time buyer.", joinedAt: "2026-03-11" },
  { id: "cust_8", name: "Benjamin Hall", email: "benjamin@example.com", segment: "At Risk", tags: ["Newsletter"], lifetimeSpend: 760, notes: "Strong engagement with discount campaigns.", joinedAt: "2025-09-20" },
  { id: "cust_9", name: "Olivia Young", email: "olivia@example.com", segment: "VIP", tags: ["VIP"], lifetimeSpend: 3890, notes: "Often buys giftable products.", joinedAt: "2025-06-30" },
  { id: "cust_10", name: "Lucas King", email: "lucas@example.com", segment: "Repeat", tags: ["Repeat"], lifetimeSpend: 1435, notes: "Mostly purchases accessories.", joinedAt: "2025-12-22" },
];

type OrderSeed = Omit<Order, "shipment" | "refunds" | "returns" | "exchanges"> & {
  shipment?: Order["shipment"];
  refunds?: Order["refunds"];
  returns?: Order["returns"];
  exchanges?: Order["exchanges"];
};

function buildShipment(status: Order["status"], index: number): Order["shipment"] {
  if (status === "fulfilled") {
    return {
      carrier: index % 2 === 0 ? "UPS" : "FedEx",
      trackingNumber: `1Z-DEM-${1000 + index}`,
      status: "delivered",
      shippedAt: `2026-04-${String(Math.max(1, 8 - index)).padStart(2, "0")}`,
      estimatedDelivery: `2026-04-${String(Math.max(2, 10 - index)).padStart(2, "0")}`,
    };
  }

  if (status === "processing") {
    return {
      carrier: index % 2 === 0 ? "UPS" : "USPS",
      trackingNumber: `TRK-${1000 + index}`,
      status: index % 3 === 0 ? "label_created" : "in_transit",
      shippedAt: index % 3 === 0 ? null : `2026-04-${String(Math.max(1, 7 - index)).padStart(2, "0")}`,
      estimatedDelivery: `2026-04-${String(Math.max(3, 12 - index)).padStart(2, "0")}`,
    };
  }

  if (status === "cancelled" || status === "refunded") {
    return {
      carrier: "UPS",
      trackingNumber: `VOID-${1000 + index}`,
      status: "delayed",
      shippedAt: null,
      estimatedDelivery: null,
    };
  }

  return {
    carrier: "UPS",
    trackingNumber: `PEND-${1000 + index}`,
    status: "label_created",
    shippedAt: null,
    estimatedDelivery: null,
  };
}

let orders: Order[] = ([
  { id: "ord_1", orderNumber: "#1001", customerId: "cust_1", customerName: "Ava Johnson", date: "2026-04-07", status: "processing", paymentStatus: "paid", total: 244, notes: "Gift wrap requested.", shippingAddress: { name: "Ava Johnson", line1: "44 Market Street", city: "San Francisco", region: "CA", postalCode: "94105", country: "USA" }, lineItems: [{ id: "li_1", productId: "prod_1", productName: "Everyday Tee", quantity: 4, price: 32 }, { id: "li_2", productId: "prod_3", productName: "Canvas Tote", quantity: 2, price: 28 }, { id: "li_3", productId: "prod_11", productName: "Leather Card Holder", quantity: 1, price: 48 }] },
  { id: "ord_2", orderNumber: "#1002", customerId: "cust_2", customerName: "Liam Carter", date: "2026-04-07", status: "fulfilled", paymentStatus: "paid", total: 104, notes: "Leave at side entrance.", shippingAddress: { name: "Liam Carter", line1: "892 Cedar Ave", city: "Portland", region: "OR", postalCode: "97205", country: "USA" }, lineItems: [{ id: "li_4", productId: "prod_4", productName: "Stoneware Mug", quantity: 2, price: 24 }, { id: "li_5", productId: "prod_5", productName: "Trail Cap", quantity: 1, price: 30 }, { id: "li_6", productId: "prod_7", productName: "Cloud Socks", quantity: 1, price: 16 }] },
  { id: "ord_3", orderNumber: "#1003", customerId: "cust_5", customerName: "Emma Davis", date: "2026-04-06", status: "pending", paymentStatus: "pending", total: 136, notes: "Awaiting payment confirmation.", shippingAddress: { name: "Emma Davis", line1: "12 Orange Lane", city: "Austin", region: "TX", postalCode: "73301", country: "USA" }, lineItems: [{ id: "li_7", productId: "prod_2", productName: "Relaxed Hoodie", quantity: 2, price: 68 }] },
  { id: "ord_4", orderNumber: "#1004", customerId: "cust_4", customerName: "Noah Martinez", date: "2026-04-06", status: "processing", paymentStatus: "paid", total: 560, notes: "Wholesale reorder for retail floor.", shippingAddress: { name: "Noah Martinez", line1: "710 Commerce Blvd", city: "Denver", region: "CO", postalCode: "80202", country: "USA" }, lineItems: [{ id: "li_8", productId: "prod_1", productName: "Everyday Tee", quantity: 10, price: 32 }, { id: "li_9", productId: "prod_3", productName: "Canvas Tote", quantity: 5, price: 28 }, { id: "li_10", productId: "prod_7", productName: "Cloud Socks", quantity: 5, price: 16 }] },
  { id: "ord_5", orderNumber: "#1005", customerId: "cust_3", customerName: "Mia Thompson", date: "2026-04-05", status: "fulfilled", paymentStatus: "paid", total: 126, notes: "Include printed receipt.", shippingAddress: { name: "Mia Thompson", line1: "19 Pine Road", city: "Seattle", region: "WA", postalCode: "98101", country: "USA" }, lineItems: [{ id: "li_11", productId: "prod_8", productName: "Desk Lamp", quantity: 1, price: 84 }, { id: "li_12", productId: "prod_6", productName: "Minimal Notebook", quantity: 1, price: 18 }, { id: "li_13", productId: "prod_7", productName: "Cloud Socks", quantity: 1, price: 16 }] },
  { id: "ord_6", orderNumber: "#1006", customerId: "cust_6", customerName: "James Wilson", date: "2026-04-05", status: "fulfilled", paymentStatus: "paid", total: 96, notes: "Standard shipping.", shippingAddress: { name: "James Wilson", line1: "610 Harbor St", city: "Boston", region: "MA", postalCode: "02108", country: "USA" }, lineItems: [{ id: "li_14", productId: "prod_10", productName: "Wool Blanket", quantity: 1, price: 96 }] },
  { id: "ord_7", orderNumber: "#1007", customerId: "cust_7", customerName: "Sophia Lee", date: "2026-04-04", status: "processing", paymentStatus: "paid", total: 60, notes: "First order.", shippingAddress: { name: "Sophia Lee", line1: "82 River St", city: "Chicago", region: "IL", postalCode: "60601", country: "USA" }, lineItems: [{ id: "li_15", productId: "prod_3", productName: "Canvas Tote", quantity: 1, price: 28 }, { id: "li_16", productId: "prod_5", productName: "Trail Cap", quantity: 1, price: 30 }] },
  { id: "ord_8", orderNumber: "#1008", customerId: "cust_8", customerName: "Benjamin Hall", date: "2026-04-04", status: "cancelled", paymentStatus: "refunded", total: 84, notes: "Customer requested cancellation after purchase.", shippingAddress: { name: "Benjamin Hall", line1: "245 Birch Dr", city: "Phoenix", region: "AZ", postalCode: "85004", country: "USA" }, refunds: [{ id: "refund_1", amount: 84, reason: "Customer cancellation", createdAt: "2026-04-04" }], lineItems: [{ id: "li_17", productId: "prod_8", productName: "Desk Lamp", quantity: 1, price: 84 }] },
  { id: "ord_9", orderNumber: "#1009", customerId: "cust_9", customerName: "Olivia Young", date: "2026-04-03", status: "fulfilled", paymentStatus: "paid", total: 138, notes: "Requested reusable packaging.", shippingAddress: { name: "Olivia Young", line1: "980 King Street", city: "Miami", region: "FL", postalCode: "33101", country: "USA" }, lineItems: [{ id: "li_18", productId: "prod_11", productName: "Leather Card Holder", quantity: 1, price: 48 }, { id: "li_19", productId: "prod_12", productName: "Ceramic Planter", quantity: 1, price: 42 }, { id: "li_20", productId: "prod_5", productName: "Trail Cap", quantity: 1, price: 30 }] },
  { id: "ord_10", orderNumber: "#1010", customerId: "cust_10", customerName: "Lucas King", date: "2026-04-03", status: "refunded", paymentStatus: "refunded", total: 36, notes: "Refunded due to damaged package.", shippingAddress: { name: "Lucas King", line1: "501 Maple Ave", city: "Atlanta", region: "GA", postalCode: "30303", country: "USA" }, refunds: [{ id: "refund_2", amount: 36, reason: "Damaged package", createdAt: "2026-04-04" }], returns: [{ id: "return_1", productName: "Travel Bottle", quantity: 1, status: "received", createdAt: "2026-04-04" }], lineItems: [{ id: "li_21", productId: "prod_9", productName: "Travel Bottle", quantity: 1, price: 36 }] },
  { id: "ord_11", orderNumber: "#1011", customerId: "cust_1", customerName: "Ava Johnson", date: "2026-04-02", status: "fulfilled", paymentStatus: "paid", total: 128, notes: "Restock request.", shippingAddress: { name: "Ava Johnson", line1: "44 Market Street", city: "San Francisco", region: "CA", postalCode: "94105", country: "USA" }, lineItems: [{ id: "li_22", productId: "prod_1", productName: "Everyday Tee", quantity: 4, price: 32 }] },
  { id: "ord_12", orderNumber: "#1012", customerId: "cust_2", customerName: "Liam Carter", date: "2026-04-02", status: "processing", paymentStatus: "paid", total: 84, notes: "Requested delayed shipping.", shippingAddress: { name: "Liam Carter", line1: "892 Cedar Ave", city: "Portland", region: "OR", postalCode: "97205", country: "USA" }, exchanges: [{ id: "exchange_1", originalProductName: "Desk Lamp", replacementProductName: "Desk Lamp - Black", status: "approved", createdAt: "2026-04-03" }], lineItems: [{ id: "li_23", productId: "prod_8", productName: "Desk Lamp", quantity: 1, price: 84 }] },
  { id: "ord_13", orderNumber: "#1013", customerId: "cust_5", customerName: "Emma Davis", date: "2026-04-01", status: "fulfilled", paymentStatus: "paid", total: 88, notes: "Bundle order.", shippingAddress: { name: "Emma Davis", line1: "12 Orange Lane", city: "Austin", region: "TX", postalCode: "73301", country: "USA" }, lineItems: [{ id: "li_24", productId: "prod_13", productName: "Weekend Carry Kit", quantity: 1, price: 88 }] },
  { id: "ord_14", orderNumber: "#1014", customerId: "cust_6", customerName: "James Wilson", date: "2026-04-01", status: "pending", paymentStatus: "pending", total: 58, notes: "Waiting on card retry.", shippingAddress: { name: "James Wilson", line1: "610 Harbor St", city: "Boston", region: "MA", postalCode: "02108", country: "USA" }, lineItems: [{ id: "li_25", productId: "prod_3", productName: "Canvas Tote", quantity: 1, price: 28 }, { id: "li_26", productId: "prod_6", productName: "Minimal Notebook", quantity: 1, price: 18 }, { id: "li_27", productId: "prod_7", productName: "Cloud Socks", quantity: 1, price: 16 }] },
  { id: "ord_15", orderNumber: "#1015", customerId: "cust_4", customerName: "Noah Martinez", date: "2026-03-31", status: "fulfilled", paymentStatus: "paid", total: 300, notes: "Retail floor replenishment.", shippingAddress: { name: "Noah Martinez", line1: "710 Commerce Blvd", city: "Denver", region: "CO", postalCode: "80202", country: "USA" }, lineItems: [{ id: "li_28", productId: "prod_5", productName: "Trail Cap", quantity: 10, price: 30 }] },
  { id: "ord_16", orderNumber: "#1016", customerId: "cust_8", customerName: "Benjamin Hall", date: "2026-03-30", status: "fulfilled", paymentStatus: "paid", total: 72, notes: "Discount code applied.", shippingAddress: { name: "Benjamin Hall", line1: "245 Birch Dr", city: "Phoenix", region: "AZ", postalCode: "85004", country: "USA" }, lineItems: [{ id: "li_29", productId: "prod_9", productName: "Travel Bottle", quantity: 2, price: 36 }] },
  { id: "ord_17", orderNumber: "#1017", customerId: "cust_9", customerName: "Olivia Young", date: "2026-03-29", status: "fulfilled", paymentStatus: "paid", total: 84, notes: "Gift purchase.", shippingAddress: { name: "Olivia Young", line1: "980 King Street", city: "Miami", region: "FL", postalCode: "33101", country: "USA" }, lineItems: [{ id: "li_30", productId: "prod_8", productName: "Desk Lamp", quantity: 1, price: 84 }] },
  { id: "ord_18", orderNumber: "#1018", customerId: "cust_10", customerName: "Lucas King", date: "2026-03-28", status: "fulfilled", paymentStatus: "paid", total: 48, notes: "Upsell from newsletter campaign.", shippingAddress: { name: "Lucas King", line1: "501 Maple Ave", city: "Atlanta", region: "GA", postalCode: "30303", country: "USA" }, lineItems: [{ id: "li_31", productId: "prod_11", productName: "Leather Card Holder", quantity: 1, price: 48 }] },
  { id: "ord_19", orderNumber: "#1019", customerId: "cust_3", customerName: "Mia Thompson", date: "2026-03-28", status: "processing", paymentStatus: "paid", total: 132, notes: "Home refresh bundle.", shippingAddress: { name: "Mia Thompson", line1: "19 Pine Road", city: "Seattle", region: "WA", postalCode: "98101", country: "USA" }, lineItems: [{ id: "li_32", productId: "prod_14", productName: "Desk Reset Bundle", quantity: 1, price: 132 }] },
  { id: "ord_20", orderNumber: "#1020", customerId: "cust_7", customerName: "Sophia Lee", date: "2026-03-27", status: "fulfilled", paymentStatus: "paid", total: 96, notes: "Second order after first purchase.", shippingAddress: { name: "Sophia Lee", line1: "82 River St", city: "Chicago", region: "IL", postalCode: "60601", country: "USA" }, lineItems: [{ id: "li_35", productId: "prod_10", productName: "Wool Blanket", quantity: 1, price: 96 }] },
] as OrderSeed[]).map((order, index) => ({
  ...order,
  shipment: order.shipment ?? buildShipment(order.status, index),
  refunds: order.refunds ?? [],
  returns: order.returns ?? [],
  exchanges: order.exchanges ?? [],
}));

let discounts: Discount[] = [
  { id: "disc_1", code: "WELCOME10", type: "percentage", value: 10, active: true, usageCount: 112, startDate: "2026-01-01", endDate: "2026-12-31", rules: { minimumSpend: 0, eligibleSegments: ["New"], eligibleCategories: [] } },
  { id: "disc_2", code: "SPRING15", type: "percentage", value: 15, active: true, usageCount: 84, startDate: "2026-03-01", endDate: "2026-05-31", rules: { minimumSpend: 75, eligibleSegments: ["VIP", "Repeat"], eligibleCategories: ["Apparel"] } },
  { id: "disc_3", code: "FREESHIP", type: "free_shipping", value: 0, active: true, usageCount: 201, startDate: "2026-01-15", endDate: "2026-07-31", rules: { minimumSpend: 50, eligibleSegments: [], eligibleCategories: [] } },
  { id: "disc_4", code: "VIP25", type: "fixed_amount", value: 25, active: true, usageCount: 26, startDate: "2026-02-10", endDate: "2026-09-30", rules: { minimumSpend: 120, eligibleSegments: ["VIP"], eligibleCategories: ["Accessories", "Bundles"] } },
  { id: "disc_5", code: "HOME20", type: "percentage", value: 20, active: false, usageCount: 39, startDate: "2025-11-01", endDate: "2026-02-28", rules: { minimumSpend: 80, eligibleSegments: [], eligibleCategories: ["Home"] } },
  { id: "disc_6", code: "BUNDLE5", type: "fixed_amount", value: 5, active: true, usageCount: 61, startDate: "2026-03-15", endDate: "2026-06-15", rules: { minimumSpend: 90, eligibleSegments: ["Wholesale", "VIP"], eligibleCategories: ["Bundles"] } },
];

let settings: SettingsData = {
  storeProfile: {
    storeName: "CommerceOS Demo Store",
    supportEmail: "support@commerceos.local",
    currency: "USD",
    timezone: "America/Los_Angeles",
  },
  shipping: {
    defaultCarrier: "UPS",
    standardRate: 8,
    expressRate: 18,
  },
  taxes: {
    pricesIncludeTax: false,
    nexusRegion: "California",
    defaultRate: 8.25,
  },
  userRoles: {
    admins: 2,
    managers: 4,
    support: 3,
  },
  notifications: {
    lowStock: true,
    orderAlerts: true,
    weeklyDigest: false,
  },
};

function syncProductInventory(productId: string) {
  const total = inventory
    .filter((item) => item.productId === productId)
    .reduce((sum, item) => sum + item.stockQuantity, 0);
  products = products.map((product) => (product.id === productId ? { ...product, inventory: total } : product));
}

function deriveInventoryStatus(stockQuantity: number, reorderThreshold: number) {
  if (stockQuantity <= 0) return "out_of_stock";
  if (stockQuantity < reorderThreshold) return "low";
  return "healthy";
}

function getBundleInventory(product: Product) {
  if (product.kind !== "bundle" || !product.bundleComponents?.length) return product.inventory;

  return product.bundleComponents.reduce((lowest, component) => {
    const sourceProduct = products.find((entry) => entry.id === component.productId);
    if (!sourceProduct) return 0;
    const availableBundles = Math.floor(sourceProduct.inventory / component.quantity);
    return Math.min(lowest, availableBundles);
  }, Number.POSITIVE_INFINITY);
}

function getCustomerPriceList(customerId: string) {
  const customer = customers.find((entry) => entry.id === customerId);
  if (!customer?.priceListId) return null;
  return priceLists.find((entry) => entry.id === customer.priceListId) ?? null;
}

function summarizeProduct(product: Product): Product {
  if (product.kind === "bundle") {
    return {
      ...product,
      inventory: Number.isFinite(getBundleInventory(product)) ? getBundleInventory(product) : 0,
    };
  }

  if (!product.variants.length) return product;

  return {
    ...product,
    price: Math.min(...product.variants.map((variant) => variant.price)),
    inventory: product.variants.reduce((sum, variant) => sum + variant.inventory, 0),
  };
}

export function getDashboardSummary(): DashboardSummary {
  const revenue = orders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.total, 0);
  const lowStockItems = inventory.filter((item) => item.status !== "healthy").length;
  const expiringDiscounts = discounts
    .filter((discount) => discount.active && discount.endDate <= "2026-06-30")
    .sort((a, b) => a.endDate.localeCompare(b.endDate))
    .slice(0, 4);
  const topProductsMap = new Map<string, { productId: string; name: string; unitsSold: number; revenue: number }>();

  for (const order of orders) {
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
    orders: orders.length,
    customers: customers.length,
    lowStockItems,
    notifications: {
      lowStock: inventory.filter((item) => item.status !== "healthy").slice(0, 4),
      expiringDiscounts,
    },
    recentOrders: [...orders].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6),
    topProducts: [...topProductsMap.values()].sort((a, b) => b.unitsSold - a.unitsSold).slice(0, 5),
  });
}

export function listProducts() {
  return clone(products.map((product) => ({
    ...summarizeProduct(product),
    collections: product.collectionIds.flatMap((collectionId) => {
      const collection = collections.find((entry) => entry.id === collectionId);
      return collection ? [collection] : [];
    }),
  })));
}

export function getProduct(id: string) {
  const product = products.find((entry) => entry.id === id);
  if (!product) return null;
  return clone({
    ...summarizeProduct(product),
    collections: product.collectionIds.flatMap((collectionId) => {
      const collection = collections.find((entry) => entry.id === collectionId);
      return collection ? [collection] : [];
    }),
  });
}

export function updateProduct(id: string, payload: Partial<Product>) {
  products = products.map((product) => {
    if (product.id !== id) return product;
    return summarizeProduct({
      ...product,
      ...payload,
      variants: payload.variants ?? product.variants,
      collectionIds: payload.collectionIds ?? product.collectionIds,
    });
  });
  return getProduct(id);
}

export function listInventory() {
  return clone(inventory);
}

export function updateInventory(id: string, payload: Partial<InventoryItem>) {
  let updatedProductId = "";
  inventory = inventory.map((item) => {
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
  if (updatedProductId) syncProductInventory(updatedProductId);
  return clone(inventory.find((item) => item.id === id) ?? null);
}

export function listOrders() {
  return clone([...orders]
    .map((order) => ({
      ...order,
      appliedPriceListName: getCustomerPriceList(order.customerId)?.name ?? null,
    }))
    .sort((a, b) => b.date.localeCompare(a.date)));
}

export function getOrder(id: string) {
  const order = orders.find((entry) => entry.id === id);
  if (!order) return null;
  return clone({
    ...order,
    appliedPriceListName: getCustomerPriceList(order.customerId)?.name ?? null,
  });
}

export function updateOrder(id: string, payload: Partial<Order>) {
  orders = orders.map((order) => (order.id === id ? { ...order, ...payload } : order));
  return getOrder(id);
}

export function listCustomers() {
  return clone(customers.map((customer) => ({
    ...customer,
    priceList: customer.priceListId ? getCustomerPriceList(customer.id) : null,
  })));
}

export function getCustomer(id: string) {
  const customer = customers.find((entry) => entry.id === id);
  if (!customer) return null;
  return clone({
    ...customer,
    priceList: customer.priceListId ? getCustomerPriceList(customer.id) : null,
    orderHistory: orders.filter((order) => order.customerId === id).sort((a, b) => b.date.localeCompare(a.date)),
  });
}

export function listDiscounts() {
  return clone(discounts);
}

export function getDiscount(id: string) {
  return clone(discounts.find((discount) => discount.id === id) ?? null);
}

export function createDiscount(payload: Omit<Discount, "id" | "usageCount">) {
  const next: Discount = {
    id: `disc_${discounts.length + 1}`,
    usageCount: 0,
    ...payload,
  };
  discounts = [next, ...discounts];
  return clone(next);
}

export function updateDiscount(id: string, payload: Partial<Discount>) {
  discounts = discounts.map((discount) => (discount.id === id ? { ...discount, ...payload } : discount));
  return getDiscount(id);
}

export function getAnalyticsOverview(): AnalyticsOverview {
  const paidOrders = orders.filter((order) => order.paymentStatus === "paid");
  const revenue = paidOrders.reduce((sum, order) => sum + order.total, 0);
  const aov = paidOrders.length ? revenue / paidOrders.length : 0;

  const categoryTotals = new Map<string, number>();
  for (const order of paidOrders) {
    for (const item of order.lineItems) {
      const product = products.find((productEntry) => productEntry.id === item.productId);
      const category = product?.category ?? "Other";
      categoryTotals.set(category, (categoryTotals.get(category) ?? 0) + item.quantity);
    }
  }

  return clone({
    revenue,
    aov,
    orders: orders.length,
    conversionTrend: [
      { label: "2026-03-10", value: 2.3 },
      { label: "2026-03-17", value: 2.7 },
      { label: "2026-03-24", value: 2.5 },
      { label: "2026-03-31", value: 3.1 },
    ],
    revenueTrend: [
      { label: "2026-01-01", value: 12200 },
      { label: "2026-02-01", value: 14750 },
      { label: "2026-03-01", value: 16100 },
      { label: "2026-04-01", value: 17350 },
    ],
    topCategories: [...categoryTotals.entries()]
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5),
  });
}

export function getSettings() {
  return clone(settings);
}

export function updateSettings(payload: Partial<SettingsData>) {
  settings = {
    ...settings,
    ...payload,
    storeProfile: { ...settings.storeProfile, ...payload.storeProfile },
    shipping: { ...settings.shipping, ...payload.shipping },
    taxes: { ...settings.taxes, ...payload.taxes },
    userRoles: { ...settings.userRoles, ...payload.userRoles },
    notifications: { ...settings.notifications, ...payload.notifications },
  };
  return clone(settings);
}

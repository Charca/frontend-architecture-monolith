import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  ChartColumn,
  Cog,
  CreditCard,
  FilePlus2,
  LayoutDashboard,
  Package,
  PackageSearch,
  Receipt,
  Search,
  Settings,
  Truck,
  Users,
} from "lucide-react";
import { fetchCustomers } from "@/api/customers";
import { fetchOrders } from "@/api/orders";
import { fetchProducts } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CommandItem {
  id: string;
  label: string;
  section: string;
  subtitle: string;
  keywords: string;
  icon: LucideIcon;
  run: () => Promise<void> | void;
}

const settingsSections = [
  {
    id: "store-profile",
    label: "Store Profile",
    subtitle: "Store name, support email, currency, and timezone",
    keywords: "settings store profile support email currency timezone",
    icon: Cog,
  },
  {
    id: "shipping",
    label: "Shipping",
    subtitle: "Default carrier and shipping rates",
    keywords: "settings shipping carrier standard express rate",
    icon: Truck,
  },
  {
    id: "taxes",
    label: "Taxes",
    subtitle: "Tax region, default rate, and inclusive pricing",
    keywords: "settings taxes nexus region default rate prices include tax",
    icon: CreditCard,
  },
  {
    id: "user-roles",
    label: "User Roles",
    subtitle: "Admin, manager, and support team counts",
    keywords: "settings roles users admins managers support",
    icon: Users,
  },
  {
    id: "notifications",
    label: "Notifications",
    subtitle: "Low-stock, order alert, and digest preferences",
    keywords: "settings notifications low stock order alerts weekly digest",
    icon: Settings,
  },
] as const;

function matchesQuery(item: Pick<CommandItem, "label" | "subtitle" | "keywords">, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;
  return `${item.label} ${item.subtitle} ${item.keywords}`.toLowerCase().includes(normalizedQuery);
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    enabled: open,
    staleTime: 60_000,
  });
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    enabled: open,
    staleTime: 60_000,
  });
  const { data: customers = [] } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
    enabled: open,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
      return;
    }

    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const items = useMemo(() => {
    const navigateAndClose = async (callback: () => Promise<void>) => {
      onOpenChange(false);
      await callback();
    };

    const baseItems: CommandItem[] = [
      {
        id: "go-dashboard",
        label: "Go to Dashboard",
        section: "Navigate",
        subtitle: "Overview of revenue, orders, customers, and alerts",
        keywords: "home dashboard summary overview",
        icon: LayoutDashboard,
        run: () => navigateAndClose(() => navigate({ to: "/" })),
      },
      {
        id: "go-catalog",
        label: "Go to Catalog",
        section: "Navigate",
        subtitle: "Browse products, pricing, and merchandising state",
        keywords: "catalog products inventory merchandise",
        icon: Package,
        run: () => navigateAndClose(() => navigate({ to: "/catalog" })),
      },
      {
        id: "go-inventory",
        label: "Go to Inventory",
        section: "Navigate",
        subtitle: "Review warehouse quantities and stock health",
        keywords: "inventory stock warehouse low stock",
        icon: PackageSearch,
        run: () => navigateAndClose(() => navigate({ to: "/inventory" })),
      },
      {
        id: "go-orders",
        label: "Go to Orders",
        section: "Navigate",
        subtitle: "Track order flow, fulfillment, and aftercare",
        keywords: "orders fulfillment shipment returns refunds",
        icon: Receipt,
        run: () => navigateAndClose(() => navigate({ to: "/orders" })),
      },
      {
        id: "go-customers",
        label: "Go to Customers",
        section: "Navigate",
        subtitle: "Browse customer profiles, segments, and spend",
        keywords: "customers people buyers segments spend",
        icon: Users,
        run: () => navigateAndClose(() => navigate({ to: "/customers" })),
      },
      {
        id: "go-discounts",
        label: "Go to Discounts",
        section: "Navigate",
        subtitle: "Manage active and archived discount rules",
        keywords: "discounts promotions coupons offers",
        icon: CreditCard,
        run: () => navigateAndClose(() => navigate({ to: "/discounts" })),
      },
      {
        id: "go-analytics",
        label: "Go to Analytics",
        section: "Navigate",
        subtitle: "View revenue, AOV, conversion, and category trends",
        keywords: "analytics revenue charts reports",
        icon: ChartColumn,
        run: () => navigateAndClose(() => navigate({ to: "/analytics" })),
      },
      {
        id: "go-settings",
        label: "Go to Settings",
        section: "Navigate",
        subtitle: "Open store configuration and operations settings",
        keywords: "settings configuration preferences store profile shipping taxes",
        icon: Settings,
        run: () => navigateAndClose(() => navigate({ to: "/settings" })),
      },
      {
        id: "new-discount",
        label: "Create Discount",
        section: "Create",
        subtitle: "Open the new discount flow",
        keywords: "create new add discount promotion coupon",
        icon: FilePlus2,
        run: () => navigateAndClose(() => navigate({ to: "/discounts/new" })),
      },
      ...settingsSections.map((section) => ({
        id: `settings-${section.id}`,
        label: `Open ${section.label}`,
        section: "Settings",
        subtitle: section.subtitle,
        keywords: section.keywords,
        icon: section.icon,
        run: () => navigateAndClose(() => navigate({ to: "/settings", hash: section.id })),
      })),
    ];

    const productItems: CommandItem[] = products.map((product) => ({
      id: `product-${product.id}`,
      label: product.name,
      section: "Products",
      subtitle: `${product.sku} · ${product.category} · ${formatCurrency(product.price)}`,
      keywords: `product ${product.name} ${product.sku} ${product.category} ${product.status}`,
      icon: Package,
      run: () => navigateAndClose(() => navigate({ to: "/catalog/$productId", params: { productId: product.id } })),
    }));

    const orderItems: CommandItem[] = orders.map((order) => ({
      id: `order-${order.id}`,
      label: `${order.orderNumber} · ${order.customerName}`,
      section: "Orders",
      subtitle: `${formatDate(order.date)} · ${order.status} · ${formatCurrency(order.total)}`,
      keywords: `order ${order.orderNumber} ${order.customerName} ${order.status} ${order.paymentStatus} ${order.shipment.carrier}`,
      icon: Receipt,
      run: () => navigateAndClose(() => navigate({ to: "/orders/$orderId", params: { orderId: order.id } })),
    }));

    const customerItems: CommandItem[] = customers.map((customer) => ({
      id: `customer-${customer.id}`,
      label: customer.name,
      section: "Customers",
      subtitle: `${customer.email} · ${customer.segment} · ${formatCurrency(customer.lifetimeSpend)}`,
      keywords: `customer ${customer.name} ${customer.email} ${customer.segment} ${customer.tags.join(" ")}`,
      icon: Users,
      run: () => navigateAndClose(() => navigate({ to: "/customers/$customerId", params: { customerId: customer.id } })),
    }));

    const filteredBaseItems = baseItems.filter((item) => matchesQuery(item, query));
    const filteredProductItems = productItems.filter((item) => matchesQuery(item, query)).slice(0, query ? 6 : 4);
    const filteredOrderItems = orderItems.filter((item) => matchesQuery(item, query)).slice(0, query ? 6 : 4);
    const filteredCustomerItems = customerItems.filter((item) => matchesQuery(item, query)).slice(0, query ? 6 : 4);

    return [
      ...filteredBaseItems,
      ...filteredProductItems,
      ...filteredOrderItems,
      ...filteredCustomerItems,
    ];
  }, [customers, navigate, onOpenChange, orders, products, query]);

  useEffect(() => {
    if (!items.length) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex((current) => Math.min(current, items.length - 1));
  }, [items]);

  const groupedItems = useMemo(() => {
    const groups = new Map<string, CommandItem[]>();
    for (const item of items) {
      const currentGroup = groups.get(item.section) ?? [];
      currentGroup.push(item);
      groups.set(item.section, currentGroup);
    }
    return [...groups.entries()];
  }, [items]);

  const handleSelect = async (item: CommandItem) => {
    await item.run();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-2xl">
        <div className="border-b px-4 py-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActiveIndex((current) => Math.min(current + 1, items.length - 1));
                }
                if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActiveIndex((current) => Math.max(current - 1, 0));
                }
                if (event.key === "Enter" && items[activeIndex]) {
                  event.preventDefault();
                  void handleSelect(items[activeIndex]);
                }
              }}
              placeholder="Search products, orders, customers, settings, and actions..."
              className="h-11 border-0 pl-10 pr-24 text-base shadow-none focus-visible:ring-0"
            />
            <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 md:flex">
              <span className="rounded border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">↑↓</span>
              <span className="rounded border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">↵</span>
            </div>
          </div>
        </div>

        <div className="max-h-[28rem] overflow-y-auto p-2">
          {groupedItems.length ? (
            groupedItems.map(([section, sectionItems]) => (
              <div key={section} className="pb-2">
                <div className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {section}
                </div>
                <div className="space-y-1">
                  {sectionItems.map((item) => {
                    const itemIndex = items.findIndex((entry) => entry.id === item.id);
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        type="button"
                        variant="ghost"
                        onMouseEnter={() => setActiveIndex(itemIndex)}
                        onClick={() => void handleSelect(item)}
                        className={cn(
                          "h-auto w-full justify-start rounded-lg px-3 py-3 text-left",
                          itemIndex === activeIndex && "bg-accent text-accent-foreground",
                        )}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-background">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">{item.label}</span>
                          <span className="block truncate text-xs text-muted-foreground">{item.subtitle}</span>
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-10 text-center">
              <div className="text-sm font-medium">No matching commands</div>
              <div className="mt-1 text-sm text-muted-foreground">Try a product name, order number, customer email, or a setting like shipping.</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

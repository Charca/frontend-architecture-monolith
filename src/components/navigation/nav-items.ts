import {
  BarChart3,
  LayoutDashboard,
  Package,
  PackageSearch,
  Receipt,
  Settings,
  Tags,
  Users,
} from "lucide-react";

export const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/catalog", label: "Catalog", icon: Package },
  { to: "/inventory", label: "Inventory", icon: PackageSearch },
  { to: "/orders", label: "Orders", icon: Receipt },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/discounts", label: "Discounts", icon: Tags },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

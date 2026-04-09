import { Link, useRouterState } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { navItems } from "@/components/navigation/nav-items";
import { cn } from "@/lib/utils";

export function SidebarNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-3 py-4">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Store className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold">CommerceOS</div>
          <div className="text-xs text-muted-foreground">Admin</div>
        </div>
      </div>
      <nav className="mt-4 flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                isActive && "bg-accent text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
        Workshop starter app with route-oriented screens, MSW-backed APIs, and mock store operations.
      </div>
    </div>
  );
}

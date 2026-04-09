import { Menu, Search } from "lucide-react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { SidebarNav } from "@/components/navigation/sidebar-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/components/navigation/nav-items";

function getPageTitle(pathname: string) {
  if (pathname === "/") return "Dashboard";
  const matched = navItems.find((item) => item.to !== "/" && pathname.startsWith(item.to));
  return matched?.label ?? "CommerceOS Admin";
}

export function AppShell() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r bg-card p-4 lg:block">
          <SidebarNav />
        </aside>
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center gap-3 px-4 py-3 lg:px-8">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="lg:hidden">
                  <SidebarNav />
                </SheetContent>
              </Sheet>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-muted-foreground">CommerceOS Admin</div>
                <div className="truncate text-lg font-semibold">{getPageTitle(pathname)}</div>
              </div>
              <div className="hidden w-full max-w-sm items-center gap-2 md:flex">
                <Search className="absolute ml-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products, orders, customers..." className="pl-9" />
              </div>
              <div className="rounded-full bg-secondary px-3 py-1 text-sm font-medium">Merchant Ops</div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

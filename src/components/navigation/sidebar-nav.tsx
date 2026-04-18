import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { CircleUserRound, EllipsisVertical, LogOut, Store } from "lucide-react";
import { useAuth } from "@/app/providers/use-auth";
import { navItems } from "@/components/navigation/nav-items";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ROLE_LABELS } from "@/lib/auth";

export function SidebarNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const { session, hasPermission, logout } = useAuth();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-3 py-4">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Store className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold">CommerceOS</div>
          <div className="text-xs text-muted-foreground">
            {session ? `${session.activeAccount.name} · ${ROLE_LABELS[session.activeRole]}` : "Admin"}
          </div>
        </div>
      </div>
      <nav className="mt-4 flex-1 space-y-1">
        {navItems.filter((item) => hasPermission(item.permission)).map((item) => {
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
      {session ? (
        <div className="rounded-2xl border bg-card p-2 shadow-sm">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            {session.user.avatarUrl ? (
              <img src={session.user.avatarUrl} alt={session.user.name} className="h-12 w-12 rounded-full object-cover" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                {session.user.initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{session.user.name}</div>
              <div className="truncate text-sm text-muted-foreground">{session.user.email}</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <EllipsisVertical className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[19rem] p-0">
                <DropdownMenuLabel className="flex items-center gap-3 rounded-t-3xl px-5 py-5">
                  {session.user.avatarUrl ? (
                    <img src={session.user.avatarUrl} alt={session.user.name} className="h-14 w-14 rounded-2xl object-cover" />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-base font-semibold">
                      {session.user.initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-2xl font-semibold leading-none">{session.user.name}</div>
                    <div className="mt-2 truncate text-lg text-muted-foreground">{session.user.email}</div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <DropdownMenuItem
                    onClick={() => void navigate({ to: "/profile" })}
                    className="text-[1.05rem]"
                  >
                    <CircleUserRound className="h-5 w-5 text-muted-foreground" />
                    <span>Account</span>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <DropdownMenuItem
                    onClick={() => void logout()}
                    className="text-[1.05rem]"
                  >
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="px-2 pb-1 text-xs text-muted-foreground">
            {session.activeAccount.name} · {ROLE_LABELS[session.activeRole]}
          </div>
        </div>
      ) : null}
    </div>
  );
}

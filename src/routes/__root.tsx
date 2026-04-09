import { AppShell } from "@/components/app-shell/app-shell";

export function RootComponent() {
  return <AppShell />;
}

export function NotFoundComponent() {
  return <div className="rounded-lg border bg-card p-8">Page not found.</div>;
}

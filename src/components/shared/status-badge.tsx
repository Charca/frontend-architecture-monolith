import { Badge } from "@/components/ui/badge";

type Tone = "default" | "success" | "warning" | "danger" | "info";

const statusToneMap: Record<string, Tone> = {
  active: "success",
  draft: "default",
  archived: "warning",
  low: "warning",
  healthy: "success",
  out_of_stock: "danger",
  pending: "warning",
  paid: "success",
  processing: "info",
  fulfilled: "success",
  cancelled: "danger",
  refunded: "warning",
  vip: "info",
  inactive: "default",
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase().replace(/\s+/g, "_");
  return <Badge variant={statusToneMap[normalized] ?? "default"}>{status.replace(/_/g, " ")}</Badge>;
}

import type { DashboardSummary } from "@/types";
import { apiClient } from "@/shared/api/client";

export function fetchDashboardSummary() {
  return apiClient.get<DashboardSummary>("/api/dashboard/summary");
}

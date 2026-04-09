import type { Customer, Order } from "@/types";
import { apiClient } from "@/api/client";

export interface CustomerDetail extends Customer {
  orderHistory: Order[];
}

export function fetchCustomers() {
  return apiClient.get<Customer[]>("/api/customers");
}

export function fetchCustomer(customerId: string) {
  return apiClient.get<CustomerDetail>(`/api/customers/${customerId}`);
}

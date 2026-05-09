export { fetchCustomer, fetchCustomers, updateCustomer } from "./api/customers.api";
export { OrderHistoryOrderLink } from "./components/order-history-order-link";
export { default as CustomerDetailPage } from "./routes/customers.detail";
export { default as CustomersPage } from "./routes/customers.index";
export type { Customer, CustomerDetail, CustomerSegment } from "./domain/customers.types";

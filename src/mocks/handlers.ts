import { delay, http, HttpResponse } from "msw";
import {
  createDiscount,
  getAnalyticsOverview,
  getCustomer,
  getDashboardSummary,
  getDiscount,
  getOrder,
  getProduct,
  getSettings,
  listCustomers,
  listDiscounts,
  listInventory,
  listOrders,
  listProducts,
  updateDiscount,
  updateInventory,
  updateOrder,
  updateProduct,
  updateSettings,
} from "@/mocks/data/store";
import type { Discount, InventoryItem, Order, Product, SettingsData } from "@/types";

export const handlers = [
  http.get("/api/dashboard/summary", async () => {
    await delay(200);
    return HttpResponse.json(getDashboardSummary());
  }),
  http.get("/api/products", async () => {
    await delay(200);
    return HttpResponse.json(listProducts());
  }),
  http.get("/api/products/:id", async ({ params }) => {
    await delay(150);
    const product = getProduct(String(params.id));
    return product ? HttpResponse.json(product) : HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),
  http.patch("/api/products/:id", async ({ params, request }) => {
    const payload = (await request.json()) as Partial<Product>;
    await delay(250);
    return HttpResponse.json(updateProduct(String(params.id), payload));
  }),
  http.get("/api/inventory", async () => {
    await delay(200);
    return HttpResponse.json(listInventory());
  }),
  http.patch("/api/inventory/:id", async ({ params, request }) => {
    const payload = (await request.json()) as Partial<InventoryItem>;
    await delay(250);
    return HttpResponse.json(updateInventory(String(params.id), payload));
  }),
  http.get("/api/orders", async () => {
    await delay(200);
    return HttpResponse.json(listOrders());
  }),
  http.get("/api/orders/:id", async ({ params }) => {
    await delay(150);
    const order = getOrder(String(params.id));
    return order ? HttpResponse.json(order) : HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),
  http.patch("/api/orders/:id", async ({ params, request }) => {
    const payload = (await request.json()) as Partial<Order>;
    await delay(250);
    return HttpResponse.json(updateOrder(String(params.id), payload));
  }),
  http.get("/api/customers", async () => {
    await delay(200);
    return HttpResponse.json(listCustomers());
  }),
  http.get("/api/customers/:id", async ({ params }) => {
    await delay(150);
    const customer = getCustomer(String(params.id));
    return customer ? HttpResponse.json(customer) : HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),
  http.get("/api/discounts", async () => {
    await delay(200);
    return HttpResponse.json(listDiscounts());
  }),
  http.post("/api/discounts", async ({ request }) => {
    const payload = (await request.json()) as Omit<Discount, "id" | "usageCount">;
    await delay(250);
    return HttpResponse.json(createDiscount(payload), { status: 201 });
  }),
  http.patch("/api/discounts/:id", async ({ params, request }) => {
    const payload = (await request.json()) as Partial<Discount>;
    await delay(250);
    return HttpResponse.json(updateDiscount(String(params.id), payload));
  }),
  http.get("/api/discounts/:id", async ({ params }) => {
    await delay(150);
    const discount = getDiscount(String(params.id));
    return discount ? HttpResponse.json(discount) : HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),
  http.get("/api/analytics/overview", async () => {
    await delay(200);
    return HttpResponse.json(getAnalyticsOverview());
  }),
  http.get("/api/settings", async () => {
    await delay(180);
    return HttpResponse.json(getSettings());
  }),
  http.patch("/api/settings", async ({ request }) => {
    const payload = (await request.json()) as Partial<SettingsData>;
    await delay(250);
    return HttpResponse.json(updateSettings(payload));
  }),
];

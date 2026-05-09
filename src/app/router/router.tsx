import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, createRoute, createRouter } from "@tanstack/react-router";
import { NotFoundComponent, RootComponent } from "@/app/router/root";
import { DashboardPage } from "@/modules/dashboard";
import {
  LoginPage,
  ProfilePage,
  RolesPermissionsPage,
  UserDetailPage,
  UsersPage,
} from "@/modules/identity";
import { CatalogPage, NewProductPage, ProductDetailPage } from "@/modules/catalog";
import { InventoryPage } from "@/modules/inventory";
import { OrderDetailPage, OrdersPage } from "@/modules/orders";
import { CustomerDetailPage, CustomersPage } from "@/modules/customers";
import { DiscountDetailPage, DiscountsPage, NewDiscountPage } from "@/modules/discounts";
import { AnalyticsPage } from "@/modules/analytics";
import { SettingsPage } from "@/modules/settings";

export interface RouterContext {
  queryClient: QueryClient;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/catalog",
  component: CatalogPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/catalog/$productId",
  component: ProductDetailPage,
});

const newProductRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/catalog/new",
  component: NewProductPage,
});

const inventoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inventory",
  component: InventoryPage,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: OrdersPage,
});

const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$orderId",
  component: OrderDetailPage,
});

const customersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customers",
  component: CustomersPage,
});

const customerDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customers/$customerId",
  component: CustomerDetailPage,
});

const discountsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discounts",
  component: DiscountsPage,
});

const newDiscountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discounts/new",
  component: NewDiscountPage,
});

const discountDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discounts/$discountId",
  component: DiscountDetailPage,
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: AnalyticsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users",
  component: UsersPage,
});

const userDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users/$userId",
  component: UserDetailPage,
});

const rolesPermissionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users/roles-permissions",
  component: RolesPermissionsPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  catalogRoute,
  newProductRoute,
  productRoute,
  inventoryRoute,
  ordersRoute,
  orderDetailRoute,
  customersRoute,
  customerDetailRoute,
  discountsRoute,
  newDiscountRoute,
  discountDetailRoute,
  analyticsRoute,
  usersRoute,
  userDetailRoute,
  rolesPermissionsRoute,
  profileRoute,
  settingsRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    queryClient: new QueryClient(),
  },
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

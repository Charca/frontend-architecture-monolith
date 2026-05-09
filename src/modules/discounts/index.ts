export { createDiscount, fetchDiscount, fetchDiscounts, updateDiscount } from "./api/discounts.api";
export { DiscountForm } from "./components/discount-form";
export { default as DiscountDetailPage } from "./routes/discounts.detail";
export { default as DiscountsPage } from "./routes/discounts.index";
export { default as NewDiscountPage } from "./routes/discounts.new";
export { normalizeDiscountValues, serializeDiscountValues } from "./utils/discounts";
export type { Discount, DiscountRule, DiscountType } from "./domain/discounts.types";
export type { DiscountFormValues } from "./components/discount-form";

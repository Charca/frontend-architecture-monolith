import type { Discount } from "@/types";
import type { DiscountFormValues } from "@/components/forms/discount-form";

export function normalizeDiscountValues(discount?: Discount): DiscountFormValues {
  if (!discount) {
    return {
      code: "",
      type: "percentage",
      value: 10,
      startDate: "2026-04-01",
      endDate: "2026-06-30",
      active: true,
    };
  }

  return {
    code: discount.code,
    type: discount.type,
    value: discount.value,
    startDate: discount.startDate,
    endDate: discount.endDate,
    active: discount.active,
  };
}

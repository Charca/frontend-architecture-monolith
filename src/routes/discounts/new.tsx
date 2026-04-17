import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiscount } from "@/api/discounts";
import { DiscountForm, type DiscountFormValues } from "@/components/forms/discount-form";
import { PageHeader } from "@/components/shared/page-header";

export default function NewDiscountPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: DiscountFormValues) => createDiscount(values),
    onSuccess: async (created) => {
      await queryClient.invalidateQueries({ queryKey: ["discounts"] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
      await navigate({ to: "/discounts/$discountId", params: { discountId: created.id } });
    },
  });

  return (
    <div className="space-y-6">
      <PageHeader title="New Discount" description="Create a mock discount offer for workshop flows." />
      <DiscountForm
        submitLabel={mutation.isPending ? "Saving..." : "Create discount"}
        onSubmit={async (values) => {
          await mutation.mutateAsync(values);
        }}
      />
    </div>
  );
}

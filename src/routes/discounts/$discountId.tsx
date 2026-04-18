import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDiscount, updateDiscount } from "@/api/discounts";
import { DiscountForm, type DiscountFormValues } from "@/components/forms/discount-form";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Discount } from "@/types";
import { normalizeDiscountValues, serializeDiscountValues } from "@/utils/discounts";

export default function DiscountDetailPage() {
  const { discountId } = useParams({ from: "/discounts/$discountId" });
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["discounts", discountId],
    queryFn: () => fetchDiscount(discountId),
  });
  const [initialValues, setInitialValues] = useState<DiscountFormValues | undefined>(undefined);

  useEffect(() => {
    if (data) setInitialValues(normalizeDiscountValues(data));
  }, [data]);

  const mutation = useMutation({
    mutationFn: (payload: Partial<Discount>) => updateDiscount(discountId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["discounts"] });
      await queryClient.invalidateQueries({ queryKey: ["discounts", discountId] });
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "summary"] });
    },
  });

  if (isLoading || !initialValues) {
    return <LoadingState label="Loading discount..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={data?.code ?? "Discount"}
        description="Edit placeholder promotion details."
        actions={
          <Link to="/discounts">
            <Button variant="outline">Back to discounts</Button>
          </Link>
        }
      />
      <DiscountForm
        submitLabel={mutation.isPending ? "Saving..." : "Save discount"}
        initialValues={initialValues}
        onSubmit={async (values) => {
          await mutation.mutateAsync(serializeDiscountValues(values));
        }}
      />
      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(data?.activityHistory ?? []).map((entry) => (
            <div key={entry.id} className="rounded-md border p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium capitalize">{entry.action.replace(/_/g, " ")}</span>
                <span className="text-muted-foreground">{entry.timestamp}</span>
              </div>
              <div className="text-muted-foreground">{entry.summary}</div>
              <div className="text-xs text-muted-foreground">by {entry.actor}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "@/api/customers";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { CustomersTable } from "@/modules/customers/features/customer-list/customers-table";

export function CustomersScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  if (isLoading) {
    return <LoadingState label="Loading customers..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Browse customer records, spend, and order activity." />
      <CustomersTable customers={data ?? []} />
    </div>
  );
}

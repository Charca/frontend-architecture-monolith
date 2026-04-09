import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "@/api/customers";
import { EmptyState } from "@/components/feedback/empty-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CustomersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      (data ?? []).filter((customer) =>
        `${customer.name} ${customer.email}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [data, search],
  );

  if (isLoading) {
    return <LoadingState label="Loading customers..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Browse customer records, spend, and order activity." />
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="max-w-sm">
            <Input placeholder="Search by customer name or email" value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          {filtered.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Lifetime Spend</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <Link to="/customers/$customerId" params={{ customerId: customer.id }} className="font-medium text-primary hover:underline">
                        {customer.name}
                      </Link>
                    </TableCell>
                    <TableCell className="table-cell-muted">{customer.email}</TableCell>
                    <TableCell>{customer.tags.join(", ")}</TableCell>
                    <TableCell>{formatCurrency(customer.lifetimeSpend)}</TableCell>
                    <TableCell>{formatDate(customer.joinedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState title="No customers found" description="Try a different search query." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

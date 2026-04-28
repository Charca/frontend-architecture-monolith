import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products";
import { useAuth } from "@/app/providers/use-auth";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/modules/catalog/features/product-list/products-table";

export function CatalogScreen() {
  const { hasPermission } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <LoadingState label="Loading catalog..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Catalog"
        description="Manage product details, pricing, and merchandising status."
        actions={
          hasPermission("catalog.edit") ? (
            <Link to="/catalog/new">
              <Button>New Product</Button>
            </Link>
          ) : null
        }
      />
      <ProductsTable products={data} />
    </div>
  );
}

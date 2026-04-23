import type { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { InventoryItem } from "@/types";

interface InventoryTableProps {
  canEditInventory: boolean;
  inventory: InventoryItem[];
  mutation: UseMutationResult<unknown, Error, { itemId: string; stockQuantity: number }>;
}

export function InventoryTable({ canEditInventory, inventory, mutation }: InventoryTableProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [nextQuantity, setNextQuantity] = useState<number>(0);

  return (
    <SectionCard>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Reorder</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow
              key={item.id}
              className={
                item.status !== "healthy"
                  ? "bg-amber-50/60 hover:bg-amber-50 dark:bg-amber-500/10 dark:hover:bg-amber-500/14"
                  : undefined
              }
            >
              <TableCell className="font-medium">{item.productName}</TableCell>
              <TableCell className="table-cell-muted">{item.sku}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.stockQuantity}</TableCell>
              <TableCell>{item.reorderThreshold}</TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedItem(item);
                        setNextQuantity(item.stockQuantity);
                      }}
                      disabled={!canEditInventory}
                    >
                      Adjust
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adjust stock</DialogTitle>
                      <DialogDescription>
                        Update stock quantity for {item.productName} in {item.location}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="stockQuantity">Stock quantity</Label>
                        <Input
                          id="stockQuantity"
                          type="number"
                          value={selectedItem?.id === item.id ? nextQuantity : item.stockQuantity}
                          onChange={(event) => setNextQuantity(Number(event.target.value))}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          onClick={() => void mutation.mutateAsync({ itemId: item.id, stockQuantity: nextQuantity })}
                          disabled={mutation.isPending || !canEditInventory}
                        >
                          {mutation.isPending ? "Saving..." : "Save adjustment"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionCard>
  );
}

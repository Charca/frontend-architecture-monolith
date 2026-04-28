import { SectionCard } from "@/components/shared/section-card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Customer } from "@/types";

interface CustomerNotesCardProps {
  canEditCustomer: boolean;
  form: Customer;
  onFormChange: (form: Customer) => void;
}

export function CustomerNotesCard({ canEditCustomer, form, onFormChange }: CustomerNotesCardProps) {
  return (
    <SectionCard title="Notes" contentClassName="space-y-2">
      <Label htmlFor="notes">Notes</Label>
      <Textarea id="notes" disabled={!canEditCustomer} value={form.notes} onChange={(event) => onFormChange({ ...form, notes: event.target.value })} />
    </SectionCard>
  );
}

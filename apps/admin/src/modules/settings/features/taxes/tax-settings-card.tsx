import type { UseMutationResult } from "@tanstack/react-query";
import { SectionCard } from "@/components/shared/section-card";
import { ToggleSettingRow } from "@/components/shared/toggle-setting-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SettingsData } from "@/types";

interface TaxSettingsCardProps {
  canManageTaxes: boolean;
  mutation: UseMutationResult<unknown, Error, Partial<SettingsData>>;
  settings: SettingsData;
  onSettingsChange: (settings: SettingsData) => void;
}

export function TaxSettingsCard({ canManageTaxes, mutation, settings, onSettingsChange }: TaxSettingsCardProps) {
  return (
    <SectionCard id="taxes" title="Taxes" contentClassName="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nexus">Nexus region</Label>
        <Input
          id="nexus"
          disabled={!canManageTaxes}
          value={settings.taxes.nexusRegion}
          onChange={(event) => onSettingsChange({ ...settings, taxes: { ...settings.taxes, nexusRegion: event.target.value } })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="taxRate">Default rate</Label>
        <Input
          id="taxRate"
          type="number"
          disabled={!canManageTaxes}
          value={settings.taxes.defaultRate}
          onChange={(event) => onSettingsChange({ ...settings, taxes: { ...settings.taxes, defaultRate: Number(event.target.value) } })}
        />
      </div>
      <ToggleSettingRow
        title="Prices include tax"
        description="Toggle inclusive pricing for storefront display."
        disabled={!canManageTaxes}
        checked={settings.taxes.pricesIncludeTax}
        onCheckedChange={(checked) => onSettingsChange({ ...settings, taxes: { ...settings.taxes, pricesIncludeTax: checked } })}
      />
      <div className="flex justify-end">
        <Button disabled={!canManageTaxes || mutation.isPending} onClick={() => void mutation.mutateAsync({ taxes: settings.taxes })}>
          {mutation.isPending ? "Saving..." : "Save tax settings"}
        </Button>
      </div>
    </SectionCard>
  );
}

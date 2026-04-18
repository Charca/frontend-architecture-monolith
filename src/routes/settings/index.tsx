import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSettings, updateSettings } from "@/api/settings";
import type { SettingsData } from "@/types";
import { LoadingState } from "@/components/feedback/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });
  const [form, setForm] = useState<SettingsData | null>(null);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: (payload: Partial<SettingsData>) => updateSettings(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  if (isLoading || !form) {
    return <LoadingState label="Loading settings..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Store configuration for profile, shipping, taxes, roles, and notifications."
        actions={
          <Button onClick={() => void mutation.mutateAsync(form)} disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save settings"}
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card id="store-profile">
          <CardHeader>
            <CardTitle>Store Profile</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store name</Label>
              <Input
                id="storeName"
                value={form.storeProfile.storeName}
                onChange={(event) =>
                  setForm({ ...form, storeProfile: { ...form.storeProfile, storeName: event.target.value } })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support email</Label>
              <Input
                id="supportEmail"
                value={form.storeProfile.supportEmail}
                onChange={(event) =>
                  setForm({ ...form, storeProfile: { ...form.storeProfile, supportEmail: event.target.value } })
                }
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={form.storeProfile.currency}
                  onChange={(event) =>
                    setForm({ ...form, storeProfile: { ...form.storeProfile, currency: event.target.value } })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value={form.storeProfile.timezone}
                  onChange={(event) =>
                    setForm({ ...form, storeProfile: { ...form.storeProfile, timezone: event.target.value } })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="shipping">
          <CardHeader>
            <CardTitle>Shipping</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="carrier">Default carrier</Label>
              <Input
                id="carrier"
                value={form.shipping.defaultCarrier}
                onChange={(event) => setForm({ ...form, shipping: { ...form.shipping, defaultCarrier: event.target.value } })}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="standardRate">Standard rate</Label>
                <Input
                  id="standardRate"
                  type="number"
                  value={form.shipping.standardRate}
                  onChange={(event) =>
                    setForm({ ...form, shipping: { ...form.shipping, standardRate: Number(event.target.value) } })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expressRate">Express rate</Label>
                <Input
                  id="expressRate"
                  type="number"
                  value={form.shipping.expressRate}
                  onChange={(event) =>
                    setForm({ ...form, shipping: { ...form.shipping, expressRate: Number(event.target.value) } })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="taxes">
          <CardHeader>
            <CardTitle>Taxes</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="nexus">Nexus region</Label>
              <Input
                id="nexus"
                value={form.taxes.nexusRegion}
                onChange={(event) => setForm({ ...form, taxes: { ...form.taxes, nexusRegion: event.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">Default rate</Label>
              <Input
                id="taxRate"
                type="number"
                value={form.taxes.defaultRate}
                onChange={(event) => setForm({ ...form, taxes: { ...form.taxes, defaultRate: Number(event.target.value) } })}
              />
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <div className="font-medium">Prices include tax</div>
                <div className="text-sm text-muted-foreground">Toggle inclusive pricing for storefront display.</div>
              </div>
              <Switch
                checked={form.taxes.pricesIncludeTax}
                onCheckedChange={(checked) => setForm({ ...form, taxes: { ...form.taxes, pricesIncludeTax: checked } })}
              />
            </div>
          </CardContent>
        </Card>

        <Card id="user-roles">
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="admins">Admins</Label>
              <Input
                id="admins"
                type="number"
                value={form.userRoles.admins}
                onChange={(event) => setForm({ ...form, userRoles: { ...form.userRoles, admins: Number(event.target.value) } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managers">Managers</Label>
              <Input
                id="managers"
                type="number"
                value={form.userRoles.managers}
                onChange={(event) => setForm({ ...form, userRoles: { ...form.userRoles, managers: Number(event.target.value) } })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support">Support</Label>
              <Input
                id="support"
                type="number"
                value={form.userRoles.support}
                onChange={(event) => setForm({ ...form, userRoles: { ...form.userRoles, support: Number(event.target.value) } })}
              />
            </div>
          </CardContent>
        </Card>

        <Card id="notifications" className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <div className="font-medium">Low stock</div>
                <div className="text-sm text-muted-foreground">Alert merchants when inventory dips below thresholds.</div>
              </div>
              <Switch
                checked={form.notifications.lowStock}
                onCheckedChange={(checked) =>
                  setForm({ ...form, notifications: { ...form.notifications, lowStock: checked } })
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <div className="font-medium">Order alerts</div>
                <div className="text-sm text-muted-foreground">Send updates for new and delayed orders.</div>
              </div>
              <Switch
                checked={form.notifications.orderAlerts}
                onCheckedChange={(checked) =>
                  setForm({ ...form, notifications: { ...form.notifications, orderAlerts: checked } })
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <div className="font-medium">Weekly digest</div>
                <div className="text-sm text-muted-foreground">Summarize operational activity each week.</div>
              </div>
              <Switch
                checked={form.notifications.weeklyDigest}
                onCheckedChange={(checked) =>
                  setForm({ ...form, notifications: { ...form.notifications, weeklyDigest: checked } })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

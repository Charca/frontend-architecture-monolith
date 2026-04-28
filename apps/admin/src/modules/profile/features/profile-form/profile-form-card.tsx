import type { UseMutationResult } from "@tanstack/react-query";
import { SectionCard } from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarField } from "@/modules/users/components/avatar-field";
import type { AuthUser } from "@/types";

import { ProfileScreen } from "../../screens/profile-screen";

console.log(ProfileScreen);

interface ProfileFormCardProps {
  form: AuthUser;
  mutation: UseMutationResult<unknown, Error, Partial<AuthUser>>;
  onFormChange: (form: AuthUser) => void;
}

export function ProfileFormCard({ form, mutation, onFormChange }: ProfileFormCardProps) {
  return (
    <SectionCard title="Your Profile" contentClassName="space-y-6">
      <AvatarField avatarUrl={form.avatarUrl} initials={form.initials} onChange={(avatarUrl) => onFormChange({ ...form, avatarUrl })} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(event) => onFormChange({ ...form, name: event.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={form.title} onChange={(event) => onFormChange({ ...form, title: event.target.value })} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={form.email} onChange={(event) => onFormChange({ ...form, email: event.target.value })} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button disabled={mutation.isPending} onClick={() => void mutation.mutateAsync(form)}>
          {mutation.isPending ? "Saving..." : "Save profile"}
        </Button>
      </div>
    </SectionCard>
  );
}

import type { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";

interface AvatarFieldProps {
  avatarUrl?: string | null;
  initials: string;
  disabled?: boolean;
  onChange: (value: string | null) => void;
}

export function AvatarField({ avatarUrl, initials, disabled = false, onChange }: AvatarFieldProps) {
  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange(typeof reader.result === "string" ? reader.result : null);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      {avatarUrl ? (
        <img src={avatarUrl} alt="User avatar" className="h-20 w-20 rounded-full border object-cover" />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-secondary text-lg font-semibold">
          {initials}
        </div>
      )}
      <div className="space-y-2">
        <input
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={(event) => void handleFileChange(event)}
          className="block text-sm file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium"
        />
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" disabled={disabled || !avatarUrl} onClick={() => onChange(null)}>
            Remove avatar
          </Button>
        </div>
      </div>
    </div>
  );
}

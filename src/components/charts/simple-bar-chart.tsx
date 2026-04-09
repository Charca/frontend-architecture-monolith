import { cn } from "@/lib/utils";

interface Item {
  label: string;
  value: number;
}

interface SimpleBarChartProps {
  items: Item[];
  formatter?: (value: number) => string;
}

export function SimpleBarChart({ items, formatter = (value) => String(value) }: SimpleBarChartProps) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{item.label}</span>
            <span className="text-muted-foreground">{formatter(item.value)}</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div className={cn("h-2 rounded-full bg-primary")} style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

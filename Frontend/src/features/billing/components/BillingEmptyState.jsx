import { ScanLine } from "lucide-react";

export default function BillingEmptyState() {
  return (
    <div className="grid place-items-center px-6 py-20 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-surface-muted">
        <ScanLine className="size-6 text-muted-foreground" />
      </div>

      <p className="mt-4 text-sm font-medium">No items yet</p>

      <p className="mt-1 max-w-[36ch] text-xs text-muted-foreground">
        Use your QR reader or type a SKU above. Try{" "}
        <span className="font-mono">VNY-CUR-221</span>.
      </p>
    </div>
  );
}

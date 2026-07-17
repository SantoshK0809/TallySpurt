import { Plus, ScanLine } from "lucide-react";

export default function SKUScanner({ value, onChange, onSubmit, inputRef }) {
  return (
    <form onSubmit={onSubmit} className="card-soft flex items-center p-1.5">
      <div className="flex flex-1 items-center gap-3 px-4">
        <ScanLine className="size-4 shrink-0 text-muted-foreground" />

        <input
          ref={inputRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Scan QR / barcode or type SKU (e.g. VNY-CUR-221)…"
          className="min-w-0 flex-1 bg-transparent py-3 font-mono text-sm placeholder:font-sans placeholder:text-muted-foreground focus:outline-none"
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-[12px] bg-foreground py-2.5 pl-2 pr-3 text-sm font-medium text-background hover:bg-foreground/90"
      >
        <Plus className="size-4" />
        Add
      </button>
    </form>
  );
}

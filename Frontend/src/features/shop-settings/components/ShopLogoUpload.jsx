import { useRef, useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";

export default function ShopLogoUpload({ initialLogo = null, onChange }) {
  const [preview, setPreview] = useState(initialLogo);
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPG, PNG or WebP image.");
      return;
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Logo must be smaller than 2 MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);

    onChange?.(file);
  };

  const handleRemove = () => {
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onChange?.(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-muted">
          {preview ? (
            <img
              src={preview}
              alt="Shop logo preview"
              className="size-full object-cover"
            />
          ) : (
            <ImagePlus className="size-7 text-muted-foreground" />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium">Shop Logo</p>

          <p className="mt-1 text-xs text-muted-foreground">
            JPG, PNG or WebP. Maximum 2 MB.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
            >
              <Upload className="size-3.5" />

              {preview ? "Change Logo" : "Upload Logo"}
            </button>

            {preview && (
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-danger transition-colors hover:bg-danger/10"
              >
                <Trash2 className="size-3.5" />
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
import SupabaseClient from "@/Client_apis/Supabase_client";
import { Upload, X, Image as ImageIcon, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageDropzoneProps {
  value: string | null;
  onChange: (url: string | null) => void;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

const ImageDropzone = ({
  value,
  onChange,
  label,
  required = false,
  disabled = false,
}: ImageDropzoneProps) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  // UPLOAD LOGIC
  const uploadFile=async (file: File) => {
    try {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Use PNG/JPEG/JPG/WebP");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File too large. Max 5MB.");
        return;
      }

      setUploading(true);

      const FileExt=file.name.split(".").pop();
      const FileName=`BobbysRefurbished-${Date.now()}.${FileExt}`;
      const FilePath=FileName;

      const { error: UploadError } = await SupabaseClient.storage
        .from("Laptops-Images")
        .upload(FilePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (UploadError) throw new Error(UploadError.message);

      const { data: { publicUrl } } = SupabaseClient.storage
        .from("Laptops-Images")
        .getPublicUrl(FilePath);

      onChange(publicUrl);
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
      setDragging(false);
    }
  };

  // DRAG
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  // CLICK SELECT
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative group rounded-lg border-2 border-dashed transition-all duration-200 cursor-pointer",
          dragging && "border-primary bg-primary/10 scale-[1.02]",
          value ? "border-primary/60 bg-primary/5" : "border-muted-foreground/30",
          disabled && "opacity-70 cursor-not-allowed",
        )}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          disabled={disabled || uploading}
          className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
        />

        {value ? (
          <div className="relative aspect-video">
            <img
              src={value}
              className="w-full h-full object-cover rounded-lg"
              alt="Uploaded"
            />
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 bg-destructive rounded-full shadow hover:bg-destructive/90 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <Loader2 className="w-6 h-6 animate-spin text-white" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <div className="p-3 rounded-full bg-primary/10 mb-3">
              {uploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              ) : dragging ? (
                <ImageIcon className="w-6 h-6 text-primary" />
              ) : (
                <Upload className="w-6 h-6 text-primary" />
              )}
            </div>

            <p className="text-sm font-medium text-foreground mb-1">
              {uploading
                ? "Uploading..."
                : dragging
                ? "Drop image here"
                : "Drag & drop or click"}
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or WebP, max 5MB
            </p>

            {uploading && <Check className="w-4 h-4 text-green-600 mt-2" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDropzone;

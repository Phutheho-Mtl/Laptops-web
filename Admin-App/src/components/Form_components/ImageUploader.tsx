import { useState } from "react";
import SupabaseClient from "@/Client_apis/Supabase_client";
import { Check } from "lucide-react"; // optional icon

interface ImageUploaderProps {
  value: string | null;
  setter: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageUploader=({value, setter }: ImageUploaderProps)=>{
  const [file, setFile]=useState<File | null>(null);
  const [uploading, setUploading]=useState(false);
  const [uploaded, setUploaded]=useState(false);

  const HandleFileChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile=e.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Invalid file type. Only PNG, JPEG, JPG, or SVG allowed.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File too large. Max 5MB.");
      return;
    }

    setFile(selectedFile);
    setUploaded(false);
  };

  const HandleUpload=async () => {
    if (!file) return alert("Select a file first!");

    setUploading(true);
    try {
      const FileExt = file.name.split(".").pop();
      const FileName = `BobbysRefurbished-${Date.now()}.${FileExt}`;
      const FilePath = FileName;

      const { data: UploadData, error: UploadError }=
        await SupabaseClient.storage
          .from("Laptops-Images")
          .upload(FilePath, file, { cacheControl: "3600", upsert: false });

      if (UploadError) throw new Error(UploadError.message);

      const { data: { publicUrl } }=SupabaseClient.storage.from("Laptops-Images").getPublicUrl(FilePath);

      setter(publicUrl);
      setUploaded(true);
    } catch (err: any) {
      alert("Error uploading image: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* File selector */}
      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition text-sm">
        {file ? file.name : "Select Image"}
        <input type="file" className="hidden" onChange={HandleFileChange} />
      </label>

      {/* Upload button */}
      <button
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold transition
          ${uploaded ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}
        `}
        onClick={HandleUpload}
        disabled={uploading || uploaded}
      >
        {uploaded && <Check className="w-4 h-4" />}
        {uploaded ? "Uploaded" : uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ImageUploader;



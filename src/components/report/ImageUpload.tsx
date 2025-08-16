
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImagePreview: (preview: string | null) => void;
}

const ImageUpload = ({ imagePreview, onImageChange, setImagePreview }: ImageUploadProps) => {
  return (
    <div className="space-y-2">
      <Label>Upload Image</Label>
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center">
        {imagePreview ? (
          <div className="relative w-full">
            <img
              src={imagePreview}
              alt="Preview"
              className="mx-auto max-h-48 object-contain mb-4"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-0 right-0"
              onClick={() => setImagePreview(null)}
            >
              Remove
            </Button>
          </div>
        ) : (
          <>
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag & drop image here or click to browse
            </p>
            <Input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("image")?.click()}
            >
              Browse Files
            </Button>
          </>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Uploading a clear image increases chances of identification by our AI system.
      </p>
    </div>
  );
};

export default ImageUpload;

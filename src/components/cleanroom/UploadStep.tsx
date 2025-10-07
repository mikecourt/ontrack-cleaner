import { useState, useRef } from "react";
import { Upload, File, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UploadStepProps = {
  onFileUpload: (fileName: string) => void;
};

const UploadStep = ({ onFileUpload }: UploadStepProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    onFileUpload(file.name);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Upload Your Contact Data
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Upload your OnTrack CRM export in CSV or XLSX format. We'll automatically
          detect and standardize your contact fields.
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "w-full max-w-2xl border-2 border-dashed rounded-xl p-12 transition-all duration-300",
          isDragging
            ? "border-primary bg-primary/5 scale-105"
            : "border-border bg-gradient-card hover:border-primary/50"
        )}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
            <Upload className="w-10 h-10 text-primary-foreground" />
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold text-foreground mb-2">
              Drop your file here
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
          />

          <Button
            onClick={() => fileInputRef.current?.click()}
            size="lg"
            className="bg-gradient-primary shadow-md hover:shadow-lg transition-all"
          >
            <FileSpreadsheet className="w-5 h-5 mr-2" />
            Choose File
          </Button>

          <div className="flex items-center gap-4 mt-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <File className="w-4 h-4" />
              CSV
            </div>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              XLSX
            </div>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              XLS
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-2xl w-full">
        <div className="bg-muted/30 rounded-lg p-4 border border-border">
          <h3 className="font-semibold text-sm text-foreground mb-2">
            What we'll clean for you:
          </h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Remove duplicate contacts</li>
            <li>• Standardize phone numbers and emails</li>
            <li>• Fix misspelled city names</li>
            <li>• Auto-fill missing location data</li>
            <li>• Merge partial records</li>
            <li>• Validate and format all fields</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadStep;

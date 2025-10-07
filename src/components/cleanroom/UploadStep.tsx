import { useState, useRef } from "react";
import { Upload, File, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UploadStepProps = {
  onFileUpload: (fileNames: string[]) => void;
};

const UploadStep = ({ onFileUpload }: UploadStepProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
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
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const validFiles = newFiles.filter(file => 
      validTypes.includes(file.type) || file.name.match(/\.(csv|xls|xlsx)$/i)
    );
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (files.length > 0) {
      onFileUpload(files.map(f => f.name));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Upload Your Contact Data
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Upload your OnTrack CRM exports in CSV or XLSX format. Multiple files will be combined automatically.
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
              Drop your files here
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <Button
            onClick={() => fileInputRef.current?.click()}
            size="lg"
            className="bg-gradient-primary shadow-md hover:shadow-lg transition-all"
          >
            <FileSpreadsheet className="w-5 h-5 mr-2" />
            Choose Files
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

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 w-full max-w-2xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Files ({files.length})
            </h3>
            <button
              onClick={() => setFiles([])}
              className="text-xs text-destructive hover:text-destructive/80 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto bg-muted/30 rounded-lg p-3 border border-border">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-card p-3 rounded-lg border border-border"
              >
                <span className="text-sm text-foreground truncate flex-1">
                  {file.name}
                </span>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove file"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <Button
          onClick={handleContinue}
          size="lg"
          className="mt-6 w-full max-w-2xl bg-gradient-primary shadow-md hover:shadow-lg"
        >
          Continue with {files.length} File{files.length !== 1 ? 's' : ''}
        </Button>
      )}

      <div className="mt-8 max-w-2xl w-full">
        <div className="bg-muted/30 rounded-lg p-4 border border-border">
          <h3 className="font-semibold text-sm text-foreground mb-2">
            What we'll clean for you:
          </h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Combine multiple files into one</li>
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

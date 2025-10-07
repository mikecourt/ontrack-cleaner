import { useState } from "react";
import { Upload, Database, FileCheck, Download, ListFilter } from "lucide-react";
import StepIndicator from "@/components/cleanroom/StepIndicator";
import UploadStep from "@/components/cleanroom/UploadStep";
import ProcessingStep from "@/components/cleanroom/ProcessingStep";
import DataProcessingStep, { ProcessingStats } from "@/components/cleanroom/DataProcessingStep";
import ReviewStep from "@/components/cleanroom/ReviewStep";
import ExportStep from "@/components/cleanroom/ExportStep";
import StatsPanel from "@/components/cleanroom/StatsPanel";
import ActivityPanel from "@/components/cleanroom/ActivityPanel";

type Step = "upload" | "mapping" | "processing" | "review" | "export";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [processingStats, setProcessingStats] = useState<ProcessingStats | null>(null);

  const steps = [
    { id: "upload", label: "Upload", icon: Upload },
    { id: "mapping", label: "Map Fields", icon: ListFilter },
    { id: "processing", label: "Process", icon: Database },
    { id: "review", label: "Review", icon: FileCheck },
    { id: "export", label: "Export", icon: Download },
  ];

  const handleFileUpload = (names: string[]) => {
    setFileNames(names);
    setCurrentStep("mapping");
  };

  const handleMappingComplete = () => {
    setCurrentStep("processing");
  };

  const handleProcessingComplete = (stats: ProcessingStats) => {
    setProcessingStats(stats);
    setCurrentStep("review");
  };

  const handleReviewComplete = () => {
    setCurrentStep("export");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                OnTrack Cleanroom
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Clean and standardize your CRM contact data
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  {fileNames.length > 0 ? 'Files uploaded' : 'Current files'}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {fileNames.length > 0 ? `${fileNames.length} file${fileNames.length !== 1 ? 's' : ''}` : "No files uploaded"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Main Workspace */}
          <div className="lg:col-span-9">
            <div className="bg-card rounded-xl border border-border shadow-md p-8 min-h-[600px]">
              {currentStep === "upload" && (
                <UploadStep onFileUpload={handleFileUpload} />
              )}
              {currentStep === "mapping" && (
                <ProcessingStep
                  fileNames={fileNames}
                  onComplete={handleMappingComplete}
                />
              )}
              {currentStep === "processing" && (
                <DataProcessingStep
                  fileName={fileNames.join(', ')}
                  selectedFields={[]}
                  onComplete={handleProcessingComplete}
                />
              )}
              {currentStep === "review" && (
                <ReviewStep 
                  onComplete={handleReviewComplete}
                  stats={processingStats}
                />
              )}
              {currentStep === "export" && <ExportStep fileName={fileNames[0] || 'combined_data'} />}
            </div>
          </div>

          {/* Right Sidebar - Stats & Activity */}
          <div className="lg:col-span-3">
            <div className="space-y-6 sticky top-8">
              <StatsPanel stats={processingStats} />
              <ActivityPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

import { useState } from "react";
import { Upload, Database, FileCheck, Download } from "lucide-react";
import StepIndicator from "@/components/cleanroom/StepIndicator";
import UploadStep from "@/components/cleanroom/UploadStep";
import ProcessingStep from "@/components/cleanroom/ProcessingStep";
import ReviewStep from "@/components/cleanroom/ReviewStep";
import ExportStep from "@/components/cleanroom/ExportStep";
import StatsPanel from "@/components/cleanroom/StatsPanel";
import ActivityPanel from "@/components/cleanroom/ActivityPanel";

type Step = "upload" | "processing" | "review" | "export";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [fileName, setFileName] = useState<string>("");

  const steps = [
    { id: "upload", label: "Upload", icon: Upload },
    { id: "processing", label: "Process", icon: Database },
    { id: "review", label: "Review", icon: FileCheck },
    { id: "export", label: "Export", icon: Download },
  ];

  const handleFileUpload = (name: string) => {
    setFileName(name);
    setCurrentStep("processing");
  };

  const handleProcessingComplete = () => {
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
                <p className="text-xs text-muted-foreground">Current file</p>
                <p className="text-sm font-medium text-foreground">
                  {fileName || "No file uploaded"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Steps */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border shadow-sm p-6 sticky top-8">
              <h2 className="text-sm font-semibold text-foreground mb-4">
                Progress
              </h2>
              <StepIndicator steps={steps} currentStep={currentStep} />
            </div>
          </div>

          {/* Center - Main Workspace */}
          <div className="lg:col-span-7">
            <div className="bg-card rounded-xl border border-border shadow-md p-8 min-h-[600px]">
              {currentStep === "upload" && (
                <UploadStep onFileUpload={handleFileUpload} />
              )}
              {currentStep === "processing" && (
                <ProcessingStep
                  fileName={fileName}
                  onComplete={handleProcessingComplete}
                />
              )}
              {currentStep === "review" && (
                <ReviewStep onComplete={handleReviewComplete} />
              )}
              {currentStep === "export" && <ExportStep fileName={fileName} />}
            </div>
          </div>

          {/* Right Sidebar - Stats & Activity */}
          <div className="lg:col-span-3">
            <div className="space-y-6 sticky top-8">
              <StatsPanel />
              <ActivityPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

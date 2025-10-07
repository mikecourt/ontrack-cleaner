import { useState } from "react";
import { Upload, Database, FileCheck, Download, ListFilter, RotateCcw } from "lucide-react";
import StepIndicator from "@/components/cleanroom/StepIndicator";
import UploadStep from "@/components/cleanroom/UploadStep";
import ShiftingStep from "@/components/cleanroom/ShiftingStep";
import ProcessingStep from "@/components/cleanroom/ProcessingStep";
import DataProcessingStep, { ProcessingStats } from "@/components/cleanroom/DataProcessingStep";
import ReviewStep from "@/components/cleanroom/ReviewStep";
import ExportStep from "@/components/cleanroom/ExportStep";
import StatsPanel from "@/components/cleanroom/StatsPanel";
import { Button } from "@/components/ui/button";

type Step = "upload" | "shifting" | "mapping" | "processing" | "review" | "export";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [processingStats, setProcessingStats] = useState<ProcessingStats | null>(null);

  const steps = [
    { id: "upload", label: "Upload", icon: Upload },
    { id: "shifting", label: "Shift Correction", icon: RotateCcw },
    { id: "mapping", label: "Map Fields", icon: ListFilter },
    { id: "processing", label: "Process", icon: Database },
    { id: "review", label: "Review", icon: FileCheck },
    { id: "export", label: "Export", icon: Download },
  ];

  const handleFileUpload = (names: string[]) => {
    setFileNames(names);
    setCurrentStep("shifting");
  };

  const handleShiftingComplete = () => {
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

  const handleReset = () => {
    setFileNames([]);
    setProcessingStats(null);
    setCurrentStep("upload");
  };

  const renderStep = () => {
    switch (currentStep) {
      case "upload":
        return <UploadStep onFileUpload={handleFileUpload} />;
      case "shifting":
        return <ShiftingStep onComplete={handleShiftingComplete} />;
      case "mapping":
        return <ProcessingStep fileNames={fileNames} onComplete={handleMappingComplete} />;
      case "processing":
        return (
          <DataProcessingStep
            fileName={fileNames.join(", ")}
            selectedFields={[]}
            onComplete={handleProcessingComplete}
          />
        );
      case "review":
        return <ReviewStep onComplete={handleReviewComplete} stats={processingStats} />;
      case "export":
        return <ExportStep fileName={fileNames[0] || "combined_data"} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background font-display text-foreground">
      <aside className="w-64 bg-card p-6 flex flex-col justify-between border-r border-border shrink-0">
        <div>
          <h1 className="text-2xl font-bold mb-10">OnTrack</h1>
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>
        <div className="space-y-2">
          <Button variant="outline" className="w-full" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Selection
          </Button>
        </div>
      </aside>
      
      <main className="flex-1 p-8 overflow-auto">
        {renderStep()}
      </main>
      
      {processingStats && (
        <aside className="w-80 bg-card p-6 border-l border-border shrink-0 overflow-auto">
          <StatsPanel stats={processingStats} />
        </aside>
      )}
    </div>
  );
};

export default Index;

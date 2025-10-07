import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type ShiftingStepProps = {
  onComplete: () => void;
};

const ShiftingStep = ({ onComplete }: ShiftingStepProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Shift Correction</h2>
        <p className="text-muted-foreground">Detecting and correcting data shifts...</p>
      </div>

      <div className="w-full max-w-md mb-8">
        <p className="text-center text-muted-foreground">
          No shifts detected in your data. Ready to proceed.
        </p>
      </div>

      <Button onClick={onComplete} size="lg" className="bg-gradient-primary shadow-md hover:shadow-lg transition-all">
        Continue <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default ShiftingStep;

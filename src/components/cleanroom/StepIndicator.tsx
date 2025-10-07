import { Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type StepIndicatorProps = {
  steps: Step[];
  currentStep: string;
};

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = step.id === currentStep;
        const isComplete = index < currentIndex;

        return (
          <div key={step.id} className="flex items-center gap-3">
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                isActive &&
                  "bg-gradient-primary shadow-md scale-110",
                isComplete &&
                  "bg-success shadow-sm",
                !isActive && !isComplete && "bg-muted"
              )}
            >
              {isComplete ? (
                <Check className="w-5 h-5 text-success-foreground" />
              ) : (
                <Icon
                  className={cn(
                    "w-5 h-5",
                    isActive && "text-primary-foreground",
                    !isActive && "text-muted-foreground"
                  )}
                />
              )}
            </div>
            <div>
              <p
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive && "text-primary",
                  isComplete && "text-success",
                  !isActive && !isComplete && "text-muted-foreground"
                )}
              >
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;

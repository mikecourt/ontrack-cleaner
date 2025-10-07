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
    <div className="space-y-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = step.id === currentStep;
        const isComplete = index < currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="relative">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 shrink-0",
                  isActive &&
                    "bg-gradient-primary border-primary shadow-lg scale-110",
                  isComplete &&
                    "bg-success border-success shadow-sm",
                  !isActive && !isComplete && "bg-card border-muted"
                )}
              >
                {isComplete ? (
                  <Check className="w-5 h-5 text-success-foreground" />
                ) : (
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isActive && "text-primary-foreground",
                      !isActive && !isComplete && "text-muted-foreground"
                    )}
                  />
                )}
              </div>
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
            
            {/* Vertical connecting line */}
            {!isLast && (
              <div className="absolute left-5 top-10 w-0.5 h-8 -translate-x-1/2">
                <div className="w-full h-full bg-muted" />
                <div
                  className={cn(
                    "absolute top-0 left-0 w-full bg-gradient-primary transition-all duration-500",
                    isComplete ? "h-full" : "h-0"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;

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
    <div className="bg-card rounded-xl border border-border shadow-sm p-6">
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-muted" />
        
        {/* Progress Bar Fill */}
        <div
          className="absolute top-5 left-0 h-1 bg-gradient-primary transition-all duration-500"
          style={{
            width: `${(currentIndex / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isComplete = index < currentIndex;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 z-10",
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
                    "text-xs font-medium transition-colors text-center",
                    isActive && "text-primary",
                    isComplete && "text-success",
                    !isActive && !isComplete && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animated Progress Bar Below */}
      <div className="mt-6 relative h-2 bg-muted rounded-full overflow-hidden">
        {/* Animated gradient bar */}
        <div
          className="h-full bg-gradient-to-r from-primary via-primary-glow to-primary rounded-full transition-all duration-700 ease-out relative overflow-hidden"
          style={{
            width: `${((currentIndex + 1) / steps.length) * 100}%`,
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[slide-in-right_2s_ease-in-out_infinite]" />
        </div>
        
        {/* Pulse effect on active section */}
        <div
          className="absolute top-0 h-full bg-primary/20 rounded-full transition-all duration-700 animate-pulse"
          style={{
            left: `${(currentIndex / steps.length) * 100}%`,
            width: `${100 / steps.length}%`,
          }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Database, Users, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type ProcessingStepProps = {
  fileName: string;
  onComplete: () => void;
};

type ProcessingTask = {
  id: string;
  label: string;
  icon: React.ReactNode;
  completed: boolean;
};

const ProcessingStep = ({ fileName, onComplete }: ProcessingStepProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [tasks, setTasks] = useState<ProcessingTask[]>([
    { id: "1", label: "Parsing file structure", icon: <Database className="w-4 h-4" />, completed: false },
    { id: "2", label: "Detecting duplicates", icon: <Users className="w-4 h-4" />, completed: false },
    { id: "3", label: "Validating emails", icon: <Mail className="w-4 h-4" />, completed: false },
    { id: "4", label: "Normalizing phone numbers", icon: <Phone className="w-4 h-4" />, completed: false },
    { id: "5", label: "Standardizing addresses", icon: <MapPin className="w-4 h-4" />, completed: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });

      setCurrentTaskIndex((prev) => {
        const newIndex = Math.floor((progress / 100) * tasks.length);
        if (newIndex < tasks.length && newIndex > prev) {
          setTasks((prevTasks) =>
            prevTasks.map((task, idx) =>
              idx < newIndex ? { ...task, completed: true } : task
            )
          );
        }
        return newIndex;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [progress, tasks.length]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Processing Your Data
        </h2>
        <p className="text-muted-foreground">
          Cleaning and standardizing {fileName}
        </p>
      </div>

      <div className="w-full max-w-md mb-8">
        <Progress value={progress} className="h-3" />
        <p className="text-sm text-muted-foreground text-center mt-2">
          {progress.toFixed(0)}% complete
        </p>
      </div>

      <div className="w-full max-w-lg space-y-3 mb-8">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
              task.completed
                ? "bg-success/10 border-success/30"
                : index === currentTaskIndex
                ? "bg-primary/5 border-primary/30"
                : "bg-muted/30 border-border"
            }`}
          >
            <div className="flex-shrink-0">
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : index === currentTaskIndex ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              ) : (
                <div className="text-muted-foreground">{task.icon}</div>
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                task.completed
                  ? "text-success"
                  : index === currentTaskIndex
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {task.label}
            </span>
          </div>
        ))}
      </div>

      {progress === 100 && (
        <Button
          onClick={onComplete}
          size="lg"
          className="bg-gradient-primary shadow-md hover:shadow-lg transition-all"
        >
          Continue to Review
        </Button>
      )}
    </div>
  );
};

export default ProcessingStep;

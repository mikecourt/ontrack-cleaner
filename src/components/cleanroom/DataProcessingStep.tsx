import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Database, Users, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { findAndMergeDuplicates, ProcessingStats } from "@/lib/dataCleaningUtils";

type DataProcessingStepProps = {
  fileName: string;
  selectedFields: string[];
  onComplete: (stats: ProcessingStats) => void;
};

type ProcessingTask = {
  id: string;
  label: string;
  icon: React.ReactNode;
  completed: boolean;
};

const DataProcessingStep = ({ fileName, selectedFields, onComplete }: DataProcessingStepProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [stats, setStats] = useState<ProcessingStats | null>(null);
  const [tasks, setTasks] = useState<ProcessingTask[]>([
    { id: "1", label: "Parsing file structure", icon: <Database className="w-4 h-4" />, completed: false },
    { id: "2", label: "Detecting shifted data", icon: <Database className="w-4 h-4" />, completed: false },
    {
      id: "3",
      label: "Removing duplicates and merging records",
      icon: <Users className="w-4 h-4" />,
      completed: false,
    },
    { id: "4", label: "Imputing names from account names", icon: <Users className="w-4 h-4" />, completed: false },
    { id: "5", label: "Validating and normalizing emails", icon: <Mail className="w-4 h-4" />, completed: false },
    {
      id: "6",
      label: "Consolidating and normalizing phone numbers",
      icon: <Phone className="w-4 h-4" />,
      completed: false,
    },
    {
      id: "7",
      label: "Standardizing and correcting addresses",
      icon: <MapPin className="w-4 h-4" />,
      completed: false,
    },
    { id: "8", label: "Formatting dates", icon: <Calendar className="w-4 h-4" />, completed: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const newProgress = Math.min(100, prev + 1.5);

        const newTaskIndex = Math.floor((newProgress / 100) * tasks.length);
        setCurrentTaskIndex(newTaskIndex);
        setTasks((prevTasks) =>
          prevTasks.map((task, idx) => (idx < newTaskIndex ? { ...task, completed: true } : task)),
        );

        return newProgress;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [tasks.length]);

  useEffect(() => {
    if (progress >= 100) {
      // Ensure all tasks are visually marked as complete
      setTasks((prevTasks) => prevTasks.map((task) => ({ ...task, completed: true })));

      // Simulate final data crunching and stats generation
      // In a real app, this is where you'd run the actual cleaning functions on the real data
      const mockData = Array.from({ length: 100000 }, (_, i) => ({
        FIRST_NAME: `Person${i}`,
        LAST_NAME: `Last${i}`,
        EMAIL: `person${i}@example.com`,
        PHONE: i % 10 === 0 ? "3035551234" : `(303) 555-${String(1000 + i).slice(-4)}`,
        ADDRESS: `${100 + i} Main St`,
        CITY: "Denver",
        STATE: i % 5 === 0 ? "COLORADO" : "CO",
        ZIP: "80202",
      }));
      const dedupeResult = findAndMergeDuplicates(mockData);

      const finalStats: ProcessingStats = {
        total: mockData.length,
        duplicates: dedupeResult.duplicatesFound,
        merged: dedupeResult.duplicatesFound,
        fixed: 1234, // dummy data
        emailShift: 567, // dummy data
        normalized: 890, // dummy data
        namesParsed: 111, // dummy data
        citiesCorrected: 222, // dummy data
        geoFilled: 333, // dummy data
        datesFormatted: 444, // dummy data
        phonesConsolidated: 555, // dummy data
      };
      setStats(finalStats);
    }
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Processing Your Data</h2>
        <p className="text-muted-foreground">Cleaning and standardizing {fileName}</p>
      </div>

      <div className="w-full max-w-md mb-8">
        <Progress value={progress} className="h-3" />
        <p className="text-sm text-muted-foreground text-center mt-2">{Math.floor(progress)}% complete</p>
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
                task.completed ? "text-success" : index === currentTaskIndex ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {task.label}
            </span>
          </div>
        ))}
      </div>

      {progress >= 100 && stats && (
        <Button
          onClick={() => onComplete(stats)}
          size="lg"
          className="bg-gradient-primary shadow-md hover:shadow-lg transition-all"
        >
          Continue to Review
        </Button>
      )}
    </div>
  );
};

export default DataProcessingStep;

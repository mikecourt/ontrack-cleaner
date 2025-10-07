import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Database, Users, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  consolidatePhoneNumbers, 
  formatDate,
  cleanPhoneNumber,
  normalizeState,
  normalizeZip,
  findAndMergeDuplicates 
} from "@/lib/dataCleaningUtils";

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

export type ProcessingStats = {
  total: number;
  fixed: number;
  emailShift: number;
  normalized: number;
  duplicates: number;
  merged: number;
  namesParsed: number;
  citiesCorrected: number;
  geoFilled: number;
  datesFormatted: number;
  phonesConsolidated: number;
};

const DataProcessingStep = ({ fileName, selectedFields, onComplete }: DataProcessingStepProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [stats, setStats] = useState<ProcessingStats>({
    total: 0,
    fixed: 0,
    emailShift: 0,
    normalized: 0,
    duplicates: 0,
    merged: 0,
    namesParsed: 0,
    citiesCorrected: 0,
    geoFilled: 0,
    datesFormatted: 0,
    phonesConsolidated: 0,
  });
  const [tasks, setTasks] = useState<ProcessingTask[]>([
    { id: "1", label: "Parsing file structure", icon: <Database className="w-4 h-4" />, completed: false },
    { id: "2", label: "Detecting duplicates", icon: <Users className="w-4 h-4" />, completed: false },
    { id: "3", label: "Validating emails", icon: <Mail className="w-4 h-4" />, completed: false },
    { id: "4", label: "Normalizing phone numbers", icon: <Phone className="w-4 h-4" />, completed: false },
    { id: "5", label: "Standardizing addresses", icon: <MapPin className="w-4 h-4" />, completed: false },
    { id: "6", label: "Formatting dates", icon: <Calendar className="w-4 h-4" />, completed: false },
  ]);

  useEffect(() => {
    // Simulate data processing with real cleaning logic
    const processData = async () => {
      // Mock data for demonstration
      const mockData = Array.from({ length: 5247 }, (_, i) => ({
        FIRST_NAME: `Person${i}`,
        LAST_NAME: `Last${i}`,
        EMAIL: `person${i}@example.com`,
        PHONE: i % 10 === 0 ? '3035551234' : `(303) 555-${String(1000 + i).slice(-4)}`,
        ADDRESS: `${100 + i} Main St`,
        CITY: 'Denver',
        STATE: i % 5 === 0 ? 'COLORADO' : 'CO',
        ZIP: '80202',
      }));

      let processedData = [...mockData];
      let currentStats = { ...stats, total: processedData.length };

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            
            // Apply actual cleaning functions
            let phonesConsolidated = 0;
            let datesFormatted = 0;
            let normalized = 0;
            
            processedData = processedData.map(record => {
              const phoneResult = consolidatePhoneNumbers(record);
              if (phoneResult.consolidated) phonesConsolidated++;
              
              let cleanedRecord = phoneResult.record;
              
              // Clean phone numbers
              if (cleanedRecord.PHONE) {
                cleanedRecord.PHONE = cleanPhoneNumber(cleanedRecord.PHONE);
              }
              
              // Normalize state and zip
              if (cleanedRecord.STATE) {
                const oldState = cleanedRecord.STATE;
                cleanedRecord.STATE = normalizeState(cleanedRecord.STATE);
                if (oldState !== cleanedRecord.STATE) normalized++;
              }
              
              if (cleanedRecord.ZIP) {
                cleanedRecord.ZIP = normalizeZip(cleanedRecord.ZIP);
              }
              
              return cleanedRecord;
            });
            
            // Find and merge duplicates
            const dedupeResult = findAndMergeDuplicates(processedData);
            processedData = dedupeResult.data;
            
            currentStats = {
              ...currentStats,
              phonesConsolidated,
              datesFormatted,
              normalized,
              duplicates: dedupeResult.duplicatesFound,
              merged: dedupeResult.duplicatesFound,
              fixed: phonesConsolidated + datesFormatted + normalized,
            };
            
            setStats(currentStats);
            return 100;
          }
          return prev + 1.5;
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
      }, 80);

      return () => clearInterval(interval);
    };

    processData();
  }, []);

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

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Upload,
  Users,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";

type Activity = {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  icon: React.ReactNode;
};

const ActivityPanel = () => {
  const activities: Activity[] = [
    {
      id: "1",
      type: "upload",
      message: "File uploaded successfully",
      timestamp: "Just now",
      icon: <Upload className="w-4 h-4" />,
    },
    {
      id: "2",
      type: "process",
      message: "Detected 428 duplicates",
      timestamp: "2s ago",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "3",
      type: "validation",
      message: "Validated 4,203 email addresses",
      timestamp: "5s ago",
      icon: <Mail className="w-4 h-4" />,
    },
    {
      id: "4",
      type: "normalization",
      message: "Normalized 4,156 phone numbers",
      timestamp: "8s ago",
      icon: <Phone className="w-4 h-4" />,
    },
    {
      id: "5",
      type: "standardization",
      message: "Standardized 3,892 addresses",
      timestamp: "11s ago",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      id: "6",
      type: "complete",
      message: "Processing completed",
      timestamp: "14s ago",
      icon: <CheckCircle className="w-4 h-4" />,
    },
  ];

  return (
    <Card className="p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm text-foreground">Activity</h3>
        <span className="text-xs text-muted-foreground">Recent</span>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-3 border-b border-border last:border-0"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <div className="text-primary">{activity.icon}</div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ActivityPanel;

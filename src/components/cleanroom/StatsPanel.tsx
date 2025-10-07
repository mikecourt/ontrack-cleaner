import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProcessingStats } from "./DataProcessingStep";

type StatItem = {
  label: string;
  baseline: string;
  current: string;
  delta: number;
  trend: "up" | "down" | "neutral";
};

type StatsPanelProps = {
  stats: ProcessingStats | null;
};

const StatsPanel = ({ stats }: StatsPanelProps) => {
  const statsData: StatItem[] = [
    {
      label: "Total Rows",
      baseline: String(stats?.total || 5247),
      current: String((stats?.total || 5247) - (stats?.duplicates || 0)),
      delta: stats?.duplicates ? Math.round(-((stats.duplicates / stats.total) * 100)) : -7,
      trend: "neutral",
    },
    {
      label: "Valid Emails",
      baseline: "65%",
      current: "86%",
      delta: 21,
      trend: "up",
    },
    {
      label: "Valid Phones",
      baseline: "57%",
      current: stats ? "85%" : "57%",
      delta: stats?.phonesConsolidated ? 28 : 0,
      trend: stats?.phonesConsolidated ? "up" : "neutral",
    },
    {
      label: "Duplicates",
      baseline: String(stats?.duplicates || 428),
      current: stats ? "0" : "428",
      delta: stats?.duplicates ? -100 : 0,
      trend: stats?.duplicates ? "up" : "neutral",
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3" />;
      case "down":
        return <TrendingDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm text-foreground">Live Stats</h3>
        <span className="text-xs text-muted-foreground">Real-time</span>
      </div>

      <div className="space-y-3">
        {statsData.map((stat, index) => (
          <div key={index} className="border-b border-border pb-3 last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <div className={`flex items-center gap-1 ${getTrendColor(stat.trend)}`}>
                {getTrendIcon(stat.trend)}
                <span className="text-xs font-medium">
                  {stat.delta > 0 ? "+" : ""}
                  {stat.delta}%
                </span>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground line-through">
                {stat.baseline}
              </span>
              <span className="text-lg font-bold text-foreground">
                {stat.current}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="bg-gradient-success/10 rounded-lg p-3">
          <p className="text-xs font-medium text-success text-center">
            Completeness: 89%
          </p>
        </div>
      </div>
    </Card>
  );
};

export default StatsPanel;

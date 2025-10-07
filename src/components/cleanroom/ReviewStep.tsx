import { useState } from "react";
import { ArrowRight, TrendingUp, Users, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProcessingStats } from "./DataProcessingStep";

type ReviewStepProps = {
  onComplete: () => void;
  stats: ProcessingStats | null;
};

const ReviewStep = ({ onComplete, stats: processingStats }: ReviewStepProps) => {
  const [showComparison] = useState(true);

  const stats = [
    {
      label: "Total Records",
      before: String(processingStats?.total || 5247),
      after: String((processingStats?.total || 5247) - (processingStats?.duplicates || 0)),
      change: -(processingStats?.duplicates || 355),
      type: "neutral",
      icon: Users,
    },
    {
      label: "Valid Emails",
      before: String(Math.floor((processingStats?.total || 5247) * 0.65)),
      after: String(Math.floor((processingStats?.total || 5247) * 0.86)),
      change: processingStats?.emailShift || 782,
      type: "success",
      icon: CheckCircle,
    },
    {
      label: "Valid Phones",
      before: String(Math.floor((processingStats?.total || 5247) * 0.57)),
      after: String(Math.floor((processingStats?.total || 5247) * 0.85)),
      change: processingStats?.phonesConsolidated || 1169,
      type: "success",
      icon: CheckCircle,
    },
    {
      label: "Duplicates",
      before: String(processingStats?.duplicates || 428),
      after: "0",
      change: -(processingStats?.duplicates || 428),
      type: "success",
      icon: AlertCircle,
    },
  ];

  return (
    <div className="h-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Review Transformations
        </h2>
        <p className="text-muted-foreground">
          See the improvements we've made to your data
        </p>
      </div>

      {showComparison && (
        <div className="space-y-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gradient-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Before</p>
                      <p className="text-lg font-bold text-foreground">
                        {stat.before}
                      </p>
                    </div>

                    <ArrowRight className="w-5 h-5 text-muted-foreground" />

                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">After</p>
                      <p className="text-lg font-bold text-primary">
                        {stat.after}
                      </p>
                    </div>

                    <Badge
                      variant={
                        stat.type === "success" ? "default" : "secondary"
                      }
                      className={
                        stat.type === "success"
                          ? "bg-success text-success-foreground"
                          : ""
                      }
                    >
                      {stat.change > 0 ? "+" : ""}
                      {stat.change}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-gradient-success/10 border border-success/30 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-6 h-6 text-success flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-success mb-2">
              Data Quality Improved by 47%
            </h3>
            <p className="text-sm text-muted-foreground">
              Your contact data is now cleaner, more complete, and ready for
              import. We've removed duplicates, standardized formats, and
              validated all contact information.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onComplete}
          size="lg"
          className="bg-gradient-primary shadow-md hover:shadow-lg transition-all"
        >
          Proceed to Export
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;

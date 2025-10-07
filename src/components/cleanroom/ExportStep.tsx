import { FileDown, FileSpreadsheet, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

type ExportStepProps = {
  fileName: string;
};

const ExportStep = ({ fileName }: ExportStepProps) => {
  const [includeAuditLog, setIncludeAuditLog] = useState(false);

  const handleExport = (format: string) => {
    toast.success(`Exporting as ${format}...`, {
      description: `Your cleaned data will download shortly.`,
    });
  };

  const exportOptions = [
    {
      format: "CSV",
      icon: FileSpreadsheet,
      description: "Comma-separated values, universal format",
      recommended: true,
    },
    {
      format: "XLSX",
      icon: FileSpreadsheet,
      description: "Excel format with formatting preserved",
      recommended: false,
    },
    {
      format: "XLS",
      icon: FileSpreadsheet,
      description: "Legacy Excel format for compatibility",
      recommended: false,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Export Clean Data
        </h2>
        <p className="text-muted-foreground">
          Choose your export format and download your cleaned contact list
        </p>
      </div>

      <div className="flex-1">
        <div className="space-y-3 mb-8">
          {exportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.format}
                className="group relative bg-gradient-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-gradient-primary transition-all">
                      <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">
                          {option.format}
                        </p>
                        {option.recommended && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleExport(option.format)}
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                  >
                    <FileDown className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-muted/30 border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileJson className="w-5 h-5 text-accent" />
              <div>
                <Label htmlFor="audit-log" className="font-semibold">
                  Include Audit Log
                </Label>
                <p className="text-sm text-muted-foreground">
                  JSON file with detailed transformation history
                </p>
              </div>
            </div>
            <Switch
              id="audit-log"
              checked={includeAuditLog}
              onCheckedChange={setIncludeAuditLog}
            />
          </div>

          {includeAuditLog && (
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                The audit log includes all changes made to each record, merge
                lineage, validation results, and rule applications.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-4">
        <p className="text-sm text-foreground text-center">
          <span className="font-semibold">Ready to import:</span> Your cleaned
          data file contains{" "}
          <span className="text-primary font-bold">4,892 valid contacts</span>{" "}
          with improved completeness and accuracy.
        </p>
      </div>
    </div>
  );
};

export default ExportStep;

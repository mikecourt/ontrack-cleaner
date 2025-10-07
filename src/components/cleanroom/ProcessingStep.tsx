import { useState } from "react";
import { Database, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProcessingStepProps = {
  fileName: string;
  onComplete: () => void;
};

type FieldMapping = {
  id: string;
  name: string;
  isSystemField: boolean;
  isIncluded: boolean;
  displayName: string;
};

const ProcessingStep = ({ fileName, onComplete }: ProcessingStepProps) => {
  const [fields, setFields] = useState<FieldMapping[]>([
    { id: "1", name: "first_name", isSystemField: true, isIncluded: true, displayName: "First Name" },
    { id: "2", name: "last_name", isSystemField: true, isIncluded: true, displayName: "Last Name" },
    { id: "3", name: "email", isSystemField: true, isIncluded: true, displayName: "Email" },
    { id: "4", name: "phone", isSystemField: true, isIncluded: true, displayName: "Phone" },
    { id: "5", name: "company", isSystemField: true, isIncluded: true, displayName: "Company" },
    { id: "6", name: "address", isSystemField: true, isIncluded: true, displayName: "Address" },
    { id: "7", name: "city", isSystemField: true, isIncluded: true, displayName: "City" },
    { id: "8", name: "state", isSystemField: true, isIncluded: true, displayName: "State" },
    { id: "9", name: "zip", isSystemField: true, isIncluded: true, displayName: "ZIP Code" },
    { id: "10", name: "custom_field_1", isSystemField: false, isIncluded: true, displayName: "Custom Field 1" },
    { id: "11", name: "custom_field_2", isSystemField: false, isIncluded: true, displayName: "Custom Field 2" },
    { id: "12", name: "notes", isSystemField: false, isIncluded: true, displayName: "Notes" },
  ]);

  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

  const toggleField = (fieldId: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId ? { ...field, isIncluded: !field.isIncluded } : field
      )
    );
  };

  const updateFieldName = (fieldId: string, newName: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId ? { ...field, displayName: newName } : field
      )
    );
  };

  const selectedCount = fields.filter((f) => f.isIncluded).length;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Map Fields
        </h2>
        <p className="text-muted-foreground">
          Select and configure the fields from {fileName} to include in processing
        </p>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Database className="w-4 h-4 text-primary" />
          <span className="text-foreground font-medium">
            {selectedCount} of {fields.length} fields selected
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-2">
        {fields.map((field) => (
          <div
            key={field.id}
            className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
              field.isIncluded
                ? "bg-card border-border shadow-sm"
                : "bg-muted/30 border-border opacity-60"
            }`}
          >
            <Checkbox
              id={field.id}
              checked={field.isIncluded}
              onCheckedChange={() => toggleField(field.id)}
              className="flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              {!field.isSystemField && editingFieldId === field.id ? (
                <Input
                  value={field.displayName}
                  onChange={(e) => updateFieldName(field.id, e.target.value)}
                  onBlur={() => setEditingFieldId(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEditingFieldId(null);
                  }}
                  autoFocus
                  className="h-8 text-sm"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor={field.id}
                    className={`text-sm font-medium cursor-pointer ${
                      field.isIncluded ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {field.displayName}
                  </Label>
                  {!field.isSystemField && field.isIncluded && (
                    <button
                      onClick={() => setEditingFieldId(field.id)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Edit field name"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-0.5">
                {field.isSystemField ? "System field" : "Custom field"} • {field.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <Button
          onClick={onComplete}
          size="lg"
          disabled={selectedCount === 0}
          className="w-full bg-gradient-primary shadow-md hover:shadow-lg transition-all"
        >
          Continue to Processing
        </Button>
      </div>
    </div>
  );
};

export default ProcessingStep;

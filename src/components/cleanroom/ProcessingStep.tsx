import { useState } from "react";
import { Database, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProcessingStepProps = {
  fileNames: string[];
  onComplete: () => void;
};

type FieldMapping = {
  id: string;
  name: string;
  group: string;
  isIncluded: boolean;
  displayName: string;
  isEditable: boolean;
};

type FieldGroup = {
  name: string;
  fields: FieldMapping[];
};

const ProcessingStep = ({ fileNames, onComplete }: ProcessingStepProps) => {
  const [fields, setFields] = useState<FieldMapping[]>([
    // Contact Information
    { id: "1", name: "first_name", group: "Contact Info", isIncluded: true, displayName: "First Name", isEditable: false },
    { id: "2", name: "last_name", group: "Contact Info", isIncluded: true, displayName: "Last Name", isEditable: false },
    { id: "3", name: "email", group: "Contact Info", isIncluded: true, displayName: "Email", isEditable: false },
    { id: "4", name: "phone", group: "Contact Info", isIncluded: true, displayName: "Phone", isEditable: false },
    { id: "5", name: "phone_2", group: "Contact Info", isIncluded: true, displayName: "Phone 2", isEditable: false },
    { id: "6", name: "phone_3", group: "Contact Info", isIncluded: true, displayName: "Phone 3", isEditable: false },
    { id: "7", name: "fax", group: "Contact Info", isIncluded: false, displayName: "Fax", isEditable: false },
    
    // Location
    { id: "8", name: "address", group: "Location", isIncluded: true, displayName: "Address", isEditable: false },
    { id: "9", name: "city", group: "Location", isIncluded: true, displayName: "City", isEditable: false },
    { id: "10", name: "state", group: "Location", isIncluded: true, displayName: "State", isEditable: false },
    { id: "11", name: "zip", group: "Location", isIncluded: true, displayName: "ZIP Code", isEditable: false },
    { id: "12", name: "county", group: "Location", isIncluded: true, displayName: "County", isEditable: false },
    
    // Business
    { id: "13", name: "account_name", group: "Business", isIncluded: true, displayName: "Account Name", isEditable: false },
    { id: "14", name: "business_name", group: "Business", isIncluded: true, displayName: "Business Name", isEditable: false },
    { id: "15", name: "company", group: "Business", isIncluded: true, displayName: "Company", isEditable: false },
    
    // Dates
    { id: "16", name: "last_invoice_date", group: "Dates", isIncluded: true, displayName: "Last Invoice Date", isEditable: false },
    { id: "17", name: "next_job_date", group: "Dates", isIncluded: true, displayName: "Next Job Date", isEditable: false },
    { id: "18", name: "acquisition_date", group: "Dates", isIncluded: false, displayName: "Acquisition Date", isEditable: false },
    
    // Additional
    { id: "19", name: "notes", group: "Additional", isIncluded: true, displayName: "Notes", isEditable: true },
    { id: "20", name: "custom_field_1", group: "Additional", isIncluded: false, displayName: "Custom Field 1", isEditable: true },
    { id: "21", name: "custom_field_2", group: "Additional", isIncluded: false, displayName: "Custom Field 2", isEditable: true },
  ]);

  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);

  const fieldGroups: FieldGroup[] = [
    { name: "Contact Info", fields: fields.filter(f => f.group === "Contact Info") },
    { name: "Location", fields: fields.filter(f => f.group === "Location") },
    { name: "Business", fields: fields.filter(f => f.group === "Business") },
    { name: "Dates", fields: fields.filter(f => f.group === "Dates") },
    { name: "Additional", fields: fields.filter(f => f.group === "Additional") },
  ];

  const toggleField = (fieldId: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === fieldId ? { ...field, isIncluded: !field.isIncluded } : field
      )
    );
  };

  const toggleGroupFields = (groupName: string, include: boolean) => {
    setFields((prev) =>
      prev.map((field) =>
        field.group === groupName ? { ...field, isIncluded: include } : field
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
          Select Fields
        </h2>
        <p className="text-muted-foreground">
          Choose which fields to include from {fileNames.length} file{fileNames.length !== 1 ? 's' : ''}
        </p>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Database className="w-4 h-4 text-primary" />
          <span className="text-foreground font-medium">
            {selectedCount} of {fields.length} fields selected
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fieldGroups.map((group) => (
            <div key={group.name} className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">{group.name}</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleGroupFields(group.name, true)}
                    className="text-xs text-primary hover:text-primary/80 transition-colors px-2 py-1"
                  >
                    All
                  </button>
                  <span className="text-xs text-muted-foreground">|</span>
                  <button
                    onClick={() => toggleGroupFields(group.name, false)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                  >
                    None
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {group.fields.map((field) => (
                  <div
                    key={field.id}
                    className={`flex items-start gap-2 p-2 rounded transition-all ${
                      field.isIncluded ? "bg-card" : "opacity-60"
                    }`}
                  >
                    <Checkbox
                      id={field.id}
                      checked={field.isIncluded}
                      onCheckedChange={() => toggleField(field.id)}
                      className="flex-shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      {field.isEditable && editingFieldId === field.id ? (
                        <Input
                          value={field.displayName}
                          onChange={(e) => updateFieldName(field.id, e.target.value)}
                          onBlur={() => setEditingFieldId(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setEditingFieldId(null);
                          }}
                          autoFocus
                          className="h-7 text-xs"
                        />
                      ) : (
                        <div className="flex items-center gap-1">
                          <Label
                            htmlFor={field.id}
                            className={`text-xs font-medium cursor-pointer ${
                              field.isIncluded ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {field.displayName}
                          </Label>
                          {field.isEditable && field.isIncluded && (
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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

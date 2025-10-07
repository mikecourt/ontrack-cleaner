import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type FieldMapping = {
  id: string;
  name: string;
  isIncluded: boolean;
  displayName: string;
};

type FieldGroup = {
  name: string;
  fields: FieldMapping[];
};

type ProcessingStepProps = {
  fileNames: string[];
  onComplete: () => void;
};

const ProcessingStep = ({ fileNames, onComplete }: ProcessingStepProps) => {
  const [fields, setFields] = useState<FieldMapping[]>([
    { id: "1", name: "contact_id", isIncluded: true, displayName: "Contact ID" },
    { id: "2", name: "account_id", isIncluded: true, displayName: "Account ID" },
    { id: "3", name: "first_name", isIncluded: true, displayName: "First Name" },
    { id: "4", name: "last_name", isIncluded: true, displayName: "Last Name" },
    { id: "5", name: "email", isIncluded: true, displayName: "Email" },
    { id: "6", name: "phone", isIncluded: true, displayName: "Phone" },
    { id: "7", name: "mobile_phone", isIncluded: false, displayName: "Mobile Phone" },
    { id: "8", name: "account_name", isIncluded: true, displayName: "Account Name" },
    { id: "9", name: "industry", isIncluded: false, displayName: "Industry" },
    { id: "10", name: "website", isIncluded: false, displayName: "Website" },
    { id: "11", name: "mailing_street", isIncluded: true, displayName: "Mailing Street" },
    { id: "12", name: "mailing_city", isIncluded: true, displayName: "Mailing City" },
    { id: "13", name: "mailing_state", isIncluded: true, displayName: "Mailing State/Province" },
    { id: "14", name: "mailing_zip", isIncluded: true, displayName: "Mailing Zip/Postal Code" },
    { id: "15", name: "mailing_country", isIncluded: false, displayName: "Mailing Country" },
    { id: "16", name: "created_date", isIncluded: true, displayName: "Created Date" },
    { id: "17", name: "last_modified_date", isIncluded: true, displayName: "Last Modified Date" },
    { id: "18", name: "last_activity_date", isIncluded: false, displayName: "Last Activity Date" },
    { id: "19", name: "lead_source", isIncluded: false, displayName: "Lead Source" },
    { id: "20", name: "total_spend", isIncluded: false, displayName: "Total Spend" },
    { id: "21", name: "subscription_tier", isIncluded: true, displayName: "Subscription_Tier__c" },
    { id: "22", name: "last_login_date", isIncluded: true, displayName: "Last_Login_Date__c" },
    { id: "23", name: "internal_notes", isIncluded: true, displayName: "Internal_Notes" },
    { id: "24", name: "legacy_crm_id", isIncluded: false, displayName: "Legacy_CRM_ID" },
  ]);

  const toggleField = (id: string) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, isIncluded: !f.isIncluded } : f)));
  };

  const toggleGroup = (groupFields: FieldMapping[], include: boolean) => {
    const fieldIds = groupFields.map((f) => f.id);
    setFields(fields.map((f) => (fieldIds.includes(f.id) ? { ...f, isIncluded: include } : f)));
  };

  const fieldGroups: FieldGroup[] = [
    { name: "Primary Identifiers", fields: fields.slice(0, 2) },
    { name: "Contact Information", fields: fields.slice(2, 7) },
    { name: "Account Details", fields: fields.slice(7, 10) },
    { name: "Address Information", fields: fields.slice(10, 15) },
    { name: "Operational / Activity", fields: fields.slice(15, 18) },
    { name: "Marketing / Totals", fields: fields.slice(18, 20) },
    { name: "Custom Fields (User-Defined)", fields: fields.slice(20) },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-secondary">Step 2 of 4</p>
        <h2 className="text-3xl font-bold mt-1">Select Columns for Processing</h2>
        <p className="text-secondary mt-2 max-w-3xl">
          Choose which columns from your uploaded file to include for processing. System fields are selected by default.
          You can uncheck any fields you wish to exclude. Custom fields can be renamed.
        </p>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-6">
          {fieldGroups.map((group, i) => (
            <div
              key={i}
              className={`bg-card rounded-lg border border-border ${i === fieldGroups.length - 1 ? "@5xl:col-span-3" : ""}`}
            >
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="text-lg font-semibold">{group.name}</h3>
                <div className="flex items-center space-x-4">
                  <button
                    className="text-sm font-semibold text-primary hover:underline"
                    onClick={() => toggleGroup(group.fields, true)}
                  >
                    Select All
                  </button>
                  <button
                    className="text-sm font-semibold text-primary hover:underline"
                    onClick={() => toggleGroup(group.fields, false)}
                  >
                    Select None
                  </button>
                </div>
              </div>
              <div className="p-6">
                <ul
                  className={`space-y-4 ${i === fieldGroups.length - 1 ? "grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-x-8 gap-y-4" : ""}`}
                >
                  {group.fields.map((field) => (
                    <li key={field.id} className="flex items-center space-x-3 group">
                      <Checkbox
                        id={field.id}
                        checked={field.isIncluded}
                        onCheckedChange={() => toggleField(field.id)}
                      />
                      <div className="flex-1">
                        {i === fieldGroups.length - 1 ? (
                          <Input
                            type="text"
                            defaultValue={field.displayName}
                            className={`w-full bg-transparent border-0 focus:ring-0 p-0 text-sm font-medium focus:bg-background rounded-sm px-1 -mx-1 ${!field.isIncluded ? "text-secondary" : ""}`}
                          />
                        ) : (
                          <label
                            htmlFor={field.id}
                            className={`text-sm font-medium ${!field.isIncluded ? "text-secondary" : ""}`}
                          >
                            {field.displayName}
                          </label>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button onClick={onComplete}>Next: Clean Data</Button>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStep;

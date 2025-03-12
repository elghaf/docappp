import React, { useState } from "react";
import { X, FileText, Download, Printer, Share2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TemplateSelector from "./TemplateSelector";
import ReportEditor from "./ReportEditor";

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: string;
  dob: string;
  diagnosis: string[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
  };
}

interface ReportBuilderModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  patientData?: PatientData;
  onSave?: (reportData: any) => void;
  onCancel?: () => void;
  onPreview?: () => void;
  onPrint?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

const ReportBuilderModal = ({
  open = true,
  onOpenChange = () => {},
  patientData = {
    id: "P12345",
    name: "Jane Doe",
    age: 45,
    gender: "Female",
    dob: "1979-05-15",
    diagnosis: ["Hypertension", "Type 2 Diabetes"],
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    ],
    vitals: {
      bloodPressure: "130/85",
      heartRate: 72,
      temperature: 98.6,
    },
  },
  onSave = () => {},
  onCancel = () => {},
  onPreview = () => {},
  onPrint = () => {},
  onDownload = () => {},
  onShare = () => {},
}: ReportBuilderModalProps) => {
  const [currentStep, setCurrentStep] = useState<
    "template" | "edit" | "preview"
  >("template");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [reportTitle, setReportTitle] = useState<string>("");
  const [reportContent, setReportContent] = useState<string>("");

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
  };

  const handleNextStep = () => {
    if (currentStep === "template") {
      setCurrentStep("edit");
    } else if (currentStep === "edit") {
      setCurrentStep("preview");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === "preview") {
      setCurrentStep("edit");
    } else if (currentStep === "edit") {
      setCurrentStep("template");
    }
  };

  const handleSaveReport = async () => {
    try {
      // Save report data to Supabase
      const { createReport } = await import("@/lib/supabase");

      const newReport = await createReport({
        patient_id: patientData.id,
        title: reportTitle,
        content: reportContent,
        template_id: selectedTemplateId,
        status: "draft",
        type: "medical",
      });

      // Call the onSave callback with the complete report data
      onSave({
        title: reportTitle,
        content: reportContent,
        templateId: selectedTemplateId,
        patientId: patientData.id,
        id: newReport.id,
        createdAt: new Date().toISOString(),
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving report data:", error);
      // You could add error handling UI here
    }
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col bg-white">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-xl">
                {currentStep === "template"
                  ? "Select Report Template"
                  : currentStep === "edit"
                    ? "Edit Report"
                    : "Preview Report"}
              </DialogTitle>
              <DialogDescription>
                {currentStep === "template"
                  ? "Choose a template for your report"
                  : currentStep === "edit"
                    ? "Customize the report content"
                    : "Review your report before finalizing"}
              </DialogDescription>
            </div>
            <Tabs value={currentStep} className="w-auto">
              <TabsList>
                <TabsTrigger
                  value="template"
                  onClick={() => setCurrentStep("template")}
                  disabled={currentStep === "preview"}
                >
                  1. Template
                </TabsTrigger>
                <TabsTrigger
                  value="edit"
                  onClick={() => setCurrentStep("edit")}
                  disabled={!selectedTemplateId || currentStep === "preview"}
                >
                  2. Edit
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  onClick={() => setCurrentStep("preview")}
                  disabled={currentStep === "template"}
                >
                  3. Preview
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {currentStep === "template" && (
            <div className="h-full overflow-y-auto p-6">
              <TemplateSelector
                onSelectTemplate={handleSelectTemplate}
                selectedTemplateId={selectedTemplateId}
              />
            </div>
          )}

          {currentStep === "edit" && (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b">
                <Label htmlFor="report-title" className="mb-2 block">
                  Report Title
                </Label>
                <Input
                  id="report-title"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="max-w-md"
                  placeholder="Enter report title"
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <ReportEditor
                  patientData={patientData}
                  content={reportContent}
                  onChange={setReportContent}
                  onSave={() => handleNextStep()}
                />
              </div>
            </div>
          )}

          {currentStep === "preview" && (
            <div className="h-full overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto bg-white shadow-sm border rounded-lg p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-2xl font-bold">{reportTitle}</h1>
                    <p className="text-gray-500 mt-1">
                      Generated on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={onPrint}
                    >
                      <Printer className="h-4 w-4" />
                      <span className="hidden sm:inline">Print</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={onDownload}
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={onShare}
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                  <h2 className="text-lg font-semibold mb-2">
                    Patient Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{patientData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Patient ID</p>
                      <p className="font-medium">{patientData.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{patientData.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{patientData.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{patientData.dob}</p>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: reportContent.replace(/\n/g, "<br />"),
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          {currentStep === "template" && (
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleNextStep} disabled={!selectedTemplateId}>
                Next: Edit Report
              </Button>
            </div>
          )}

          {currentStep === "edit" && (
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back: Select Template
              </Button>
              <Button onClick={handleNextStep}>Next: Preview Report</Button>
            </div>
          )}

          {currentStep === "preview" && (
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={handlePreviousStep}>
                Back: Edit Report
              </Button>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={onPreview}
                >
                  <Eye className="h-4 w-4" />
                  Full Preview
                </Button>
                <Button
                  onClick={handleSaveReport}
                  className="flex items-center gap-1"
                >
                  <FileText className="h-4 w-4" />
                  Save Report
                </Button>
              </div>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportBuilderModal;

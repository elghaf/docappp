import React, { useState } from "react";
import { X, UserPlus, Clipboard, Stethoscope, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

import PatientDetailsForm from "./PatientDetailsForm";
import MedicalHistoryForm from "./MedicalHistoryForm";
import SymptomsForm from "./SymptomsForm";

interface PatientDetailsData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
  bloodType?: string;
}

interface MedicalHistoryData {
  conditions?: Array<{
    name: string;
    diagnosedDate: string;
    status: "active" | "managed" | "resolved";
    notes?: string;
  }>;
  allergies?: Array<{
    allergen: string;
    severity: "mild" | "moderate" | "severe";
    reaction: string;
    diagnosedDate?: string;
  }>;
  surgeries?: Array<{
    procedure: string;
    date: string;
    hospital?: string;
    surgeon?: string;
    notes?: string;
  }>;
  familyHistory?: {
    heartDisease?: boolean;
    diabetes?: boolean;
    cancer?: boolean;
    hypertension?: boolean;
    stroke?: boolean;
    mentalHealth?: boolean;
    other?: string;
  };
  lifestyle?: {
    smoking?: "never" | "former" | "current";
    alcohol?: "none" | "occasional" | "moderate" | "heavy";
    exercise?: "none" | "light" | "moderate" | "heavy";
    diet?: string;
  };
}

interface Symptom {
  id: string;
  name: string;
  severity: number;
  duration: string;
  notes?: string;
}

interface AddPatientModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onPatientAdded?: (patientData: {
    details: PatientDetailsData;
    medicalHistory: MedicalHistoryData;
    symptoms: Symptom[];
  }) => void;
  trigger?: React.ReactNode;
}

const AddPatientModal = ({
  open = false,
  onOpenChange = () => {},
  onPatientAdded = () => {},
  trigger,
}: AddPatientModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(open);
  const [progress, setProgress] = useState(33);

  // Form data state
  const [patientDetails, setPatientDetails] =
    useState<PatientDetailsData | null>(null);
  const [medicalHistory, setMedicalHistory] =
    useState<MedicalHistoryData | null>(null);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Handle dialog open state changes
  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    onOpenChange(open);

    // Reset form when dialog is closed
    if (!open) {
      resetForm();
    }
  };

  // Reset the form to initial state
  const resetForm = () => {
    setCurrentStep(1);
    setProgress(33);
    setPatientDetails(null);
    setMedicalHistory(null);
    setSymptoms([]);
    setIsSubmitting(false);
    setIsComplete(false);
  };

  // Handle step navigation
  const goToNextStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setProgress(nextStep === 4 ? 100 : nextStep * 33);
  };

  const goToPreviousStep = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    setProgress(prevStep * 33);
  };

  // Handle form submissions for each step
  const handlePatientDetailsSubmit = (data: PatientDetailsData) => {
    setPatientDetails(data);
    goToNextStep();
  };

  const handleMedicalHistorySubmit = (data: MedicalHistoryData) => {
    setMedicalHistory(data);
    goToNextStep();
  };

  const handleSymptomsSubmit = (data: Symptom[]) => {
    setSymptoms(data);
    goToNextStep();
    finalizePatientCreation();
  };

  // Submit the complete patient data
  const finalizePatientCreation = async () => {
    setIsSubmitting(true);

    try {
      // In a real implementation, we would save to the database here
      // For now, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (patientDetails && medicalHistory) {
        // Call the onPatientAdded callback with the complete patient data
        onPatientAdded({
          details: patientDetails,
          medicalHistory: medicalHistory,
          symptoms: symptoms,
        });
        setIsComplete(true);
      }
    } catch (error) {
      console.error("Error creating patient:", error);
      // You could add error handling UI here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle completion - close dialog or reset form
  const handleComplete = () => {
    handleOpenChange(false);
  };

  // Get the active tab based on current step
  const getActiveTab = () => {
    switch (currentStep) {
      case 1:
        return "details";
      case 2:
        return "medical-history";
      case 3:
        return "symptoms";
      case 4:
        return "complete";
      default:
        return "details";
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold">
              {isComplete ? "Patient Added Successfully" : "Add New Patient"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleOpenChange(false)}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {!isComplete && (
            <DialogDescription>
              Complete the following steps to add a new patient to the system.
            </DialogDescription>
          )}
        </DialogHeader>

        {!isComplete ? (
          <div className="mt-4">
            <Progress value={progress} className="h-2 mb-6" />

            <Tabs value={getActiveTab()} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger
                  value="details"
                  className="flex items-center gap-2"
                  disabled
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Patient Details</span>
                </TabsTrigger>
                <TabsTrigger
                  value="medical-history"
                  className="flex items-center gap-2"
                  disabled
                >
                  <Clipboard className="h-4 w-4" />
                  <span>Medical History</span>
                </TabsTrigger>
                <TabsTrigger
                  value="symptoms"
                  className="flex items-center gap-2"
                  disabled
                >
                  <Stethoscope className="h-4 w-4" />
                  <span>Current Symptoms</span>
                </TabsTrigger>
                <TabsTrigger
                  value="complete"
                  className="flex items-center gap-2"
                  disabled
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Complete</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <PatientDetailsForm
                  onSubmit={handlePatientDetailsSubmit}
                  onNext={() => goToNextStep()}
                  defaultValues={patientDetails || undefined}
                />
              </TabsContent>

              <TabsContent value="medical-history">
                <MedicalHistoryForm
                  initialData={medicalHistory || undefined}
                  onSubmit={handleMedicalHistorySubmit}
                  onCancel={() => goToPreviousStep()}
                />
              </TabsContent>

              <TabsContent value="symptoms">
                <SymptomsForm
                  initialSymptoms={symptoms}
                  onSave={handleSymptomsSubmit}
                  onBack={() => goToPreviousStep()}
                  onNext={() => goToNextStep()}
                />
              </TabsContent>

              <TabsContent value="complete">
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  {isSubmitting ? (
                    <div className="space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                      <h3 className="text-xl font-medium">
                        Creating patient record...
                      </h3>
                      <p className="text-gray-500">
                        Please wait while we save the patient information.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold">
                        Patient Added Successfully
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        The patient information has been saved to the system.
                        You can now view the patient profile or add another
                        patient.
                      </p>
                      <div className="flex gap-4 justify-center mt-6">
                        <Button variant="outline" onClick={() => resetForm()}>
                          Add Another Patient
                        </Button>
                        <Button onClick={handleComplete}>
                          View Patient Profile
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mt-6">
              Patient Added Successfully
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mt-2">
              The patient information has been saved to the system. You can now
              view the patient profile or add another patient.
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Button variant="outline" onClick={() => resetForm()}>
                Add Another Patient
              </Button>
              <Button onClick={handleComplete}>View Patient Profile</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;

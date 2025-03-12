import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getPatientById,
  getMedicalHistoryByPatientId,
  getAppointmentsByPatientId,
  getReportsByPatientId,
} from "@/lib/supabase";

type PatientContextType = {
  patient: any | null;
  medicalHistory: any | null;
  appointments: any[];
  reports: any[];
  visits: any[];
  loading: boolean;
  error: string | null;
  refreshPatient: (id: string) => Promise<void>;
  refreshMedicalHistory: (patientId: string) => Promise<void>;
  refreshAppointments: (patientId: string) => Promise<void>;
  refreshReports: (patientId: string) => Promise<void>;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({
  children,
  patientId,
}: {
  children: ReactNode;
  patientId?: string;
}) {
  const [patient, setPatient] = useState<any | null>(null);
  const [medicalHistory, setMedicalHistory] = useState<any | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [visits, setVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPatient = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const patientData = await getPatientById(id);
      setPatient(patientData);
    } catch (err) {
      setError("Failed to load patient data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshMedicalHistory = async (patientId: string) => {
    try {
      setLoading(true);
      setError(null);
      const medicalHistoryData = await getMedicalHistoryByPatientId(patientId);
      setMedicalHistory(medicalHistoryData);
    } catch (err) {
      setError("Failed to load medical history");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshAppointments = async (patientId: string) => {
    try {
      setLoading(true);
      setError(null);
      const appointmentsData = await getAppointmentsByPatientId(patientId);
      setAppointments(appointmentsData);
    } catch (err) {
      setError("Failed to load appointments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshReports = async (patientId: string) => {
    try {
      setLoading(true);
      setError(null);
      const reportsData = await getReportsByPatientId(patientId);
      setReports(reportsData);
    } catch (err) {
      setError("Failed to load reports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      refreshPatient(patientId);
      refreshMedicalHistory(patientId);
      refreshAppointments(patientId);
      refreshReports(patientId);
    }
  }, [patientId]);

  return (
    <PatientContext.Provider
      value={{
        patient,
        medicalHistory,
        appointments,
        reports,
        visits,
        loading,
        error,
        refreshPatient,
        refreshMedicalHistory,
        refreshAppointments,
        refreshReports,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error("usePatient must be used within a PatientProvider");
  }
  return context;
}

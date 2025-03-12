import React, { useState } from "react";
import { format } from "date-fns";
import { Search, Filter, Plus, FileText, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Visit {
  id: string;
  date: Date;
  chiefComplaint: string;
  symptoms: string[];
  diagnosis: string;
  treatment: string;
  notes: string;
  followUp?: Date;
}

interface VisitsTabProps {
  patientId?: string;
  visits?: Visit[];
}

const VisitsTab = ({
  patientId = "123",
  visits: providedVisits,
}: VisitsTabProps) => {
  // Default mock data if no visits are provided
  const defaultVisits: Visit[] = [
    {
      id: "1",
      date: new Date(2023, 5, 15),
      chiefComplaint: "Persistent cough",
      symptoms: ["Cough", "Fatigue", "Mild fever"],
      diagnosis: "Acute bronchitis",
      treatment: "Prescribed antibiotics and cough suppressant",
      notes: "Patient advised to rest and increase fluid intake",
      followUp: new Date(2023, 5, 29),
    },
    {
      id: "2",
      date: new Date(2023, 3, 2),
      chiefComplaint: "Joint pain",
      symptoms: ["Pain in knees", "Stiffness", "Swelling"],
      diagnosis: "Osteoarthritis",
      treatment: "Prescribed anti-inflammatory medication and physical therapy",
      notes: "Recommended weight management and low-impact exercises",
      followUp: new Date(2023, 4, 2),
    },
    {
      id: "3",
      date: new Date(2023, 1, 10),
      chiefComplaint: "Headache and dizziness",
      symptoms: ["Severe headache", "Dizziness", "Nausea"],
      diagnosis: "Migraine",
      treatment:
        "Prescribed migraine medication and recommended stress management",
      notes: "Patient advised to keep a headache diary to identify triggers",
    },
  ];

  const [visits] = useState<Visit[]>(providedVisits || defaultVisits);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (visit: Visit) => {
    setSelectedVisit(visit);
    setIsDetailsOpen(true);
  };

  return (
    <div className="w-full h-full bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search visits..."
              className="pl-10 pr-4 py-2 border rounded-md w-[300px] focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Visit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visit History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Chief Complaint</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Treatment</TableHead>
                <TableHead>Follow-up</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell>{format(visit.date, "MMM d, yyyy")}</TableCell>
                  <TableCell>{visit.chiefComplaint}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{visit.diagnosis}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate">
                    {visit.treatment}
                  </TableCell>
                  <TableCell>
                    {visit.followUp
                      ? format(visit.followUp, "MMM d, yyyy")
                      : "None scheduled"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(visit)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Visit Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Visit Details</DialogTitle>
          </DialogHeader>
          {selectedVisit && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date</h4>
                  <p>{format(selectedVisit.date, "MMMM d, yyyy")}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Chief Complaint
                  </h4>
                  <p>{selectedVisit.chiefComplaint}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Symptoms</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedVisit.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="outline">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Diagnosis</h4>
                <p>{selectedVisit.diagnosis}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Treatment</h4>
                <p>{selectedVisit.treatment}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                <p className="text-sm">{selectedVisit.notes}</p>
              </div>

              {selectedVisit.followUp && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Follow-up Appointment
                  </h4>
                  <p>{format(selectedVisit.followUp, "MMMM d, yyyy")}</p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Generate Report</Button>
                <Button variant="outline">Edit Visit</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VisitsTab;

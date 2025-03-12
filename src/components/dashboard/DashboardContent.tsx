import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Users,
  Activity,
  TrendingUp,
  Calendar,
} from "lucide-react";

import AppointmentsSection from "./AppointmentsSection";
import QuickActionsSection from "./QuickActionsSection";

interface DashboardContentProps {
  onAddPatient?: () => void;
  onGenerateReport?: () => void;
  onScheduleAppointment?: () => void;
  onManageData?: () => void;
  onAISummary?: () => void;
  onViewAllPatients?: () => void;
  onViewAllAppointments?: () => void;
  onViewPatient?: (id: string) => void;
  onViewAppointment?: (id: string) => void;
}

const DashboardContent = ({
  onAddPatient = () => {},
  onGenerateReport = () => {},
  onScheduleAppointment = () => {},
  onManageData = () => {},
  onAISummary = () => {},
  onViewAllPatients = () => {},
  onViewAllAppointments = () => {},
  onViewPatient = () => {},
  onViewAppointment = () => {},
}: DashboardContentProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for statistics
  const statistics = [
    {
      title: "Total Patients",
      value: "0",
      change: "0%",
      trend: "up",
      period: "from last month",
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Appointments",
      value: "0",
      change: "0%",
      trend: "up",
      period: "this week",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Reports Generated",
      value: "0",
      change: "0%",
      trend: "up",
      period: "this month",
      icon: <Activity className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Patient Satisfaction",
      value: "0%",
      change: "0%",
      trend: "up",
      period: "from last quarter",
      icon: <TrendingUp className="h-5 w-5 text-amber-500" />,
    },
  ];

  // Mock data for recent patients
  const recentPatients = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-green-100 text-green-800 border-green-200";
      case "improving":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "monitoring":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statistics.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    <div className="flex items-center mt-1">
                      <span
                        className={`text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        {stat.period}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-gray-50">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Summary */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Patients</CardTitle>
                  <Button
                    variant="ghost"
                    className="text-sm flex items-center gap-1"
                    onClick={onViewAllPatients}
                  >
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="recent">Recent Patients</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="pt-4">
                    <div className="p-4 border rounded-md bg-gray-50 text-center">
                      <Activity className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium">Patient Overview</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Summary statistics and patient information will appear
                        here
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="recent" className="pt-4">
                    <div className="rounded-md border">
                      <div className="overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="py-3 px-4 text-left font-medium">
                                Name
                              </th>
                              <th className="py-3 px-4 text-left font-medium">
                                Age
                              </th>
                              <th className="py-3 px-4 text-left font-medium">
                                Last Visit
                              </th>
                              <th className="py-3 px-4 text-left font-medium">
                                Condition
                              </th>
                              <th className="py-3 px-4 text-left font-medium">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentPatients.map((patient) => (
                              <tr
                                key={patient.id}
                                className="border-b hover:bg-gray-50 cursor-pointer"
                                onClick={() => onViewPatient(patient.id)}
                              >
                                <td className="py-3 px-4">{patient.name}</td>
                                <td className="py-3 px-4">{patient.age}</td>
                                <td className="py-3 px-4">
                                  {new Date(
                                    patient.lastVisit,
                                  ).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">
                                  {patient.condition}
                                </td>
                                <td className="py-3 px-4">
                                  <Badge
                                    variant="outline"
                                    className={getStatusColor(patient.status)}
                                  >
                                    {patient.status.charAt(0).toUpperCase() +
                                      patient.status.slice(1)}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Appointments */}
          <div>
            <AppointmentsSection
              onViewAll={onViewAllAppointments}
              onViewAppointment={onViewAppointment}
              onScheduleAppointment={onScheduleAppointment}
            />
          </div>
        </div>

        {/* Quick Actions Section */}
        <QuickActionsSection
          onAddPatient={onAddPatient}
          onGenerateReport={onGenerateReport}
          onScheduleAppointment={onScheduleAppointment}
          onManageData={onManageData}
          onAISummary={onAISummary}
        />
      </div>
    </div>
  );
};

export default DashboardContent;

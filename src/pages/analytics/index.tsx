import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  Calendar,
  Users,
  Activity,
  TrendingUp,
  Download,
  Filter,
} from "lucide-react";

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");

  return (
    <DashboardLayout>
      <div className="w-full h-full bg-gray-50 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Analytics</h1>
              <p className="text-gray-500">
                Insights and statistics about your practice
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last 7 days</SelectItem>
                  <SelectItem value="month">Last 30 days</SelectItem>
                  <SelectItem value="quarter">Last 3 months</SelectItem>
                  <SelectItem value="year">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Patients
                    </p>
                    <h3 className="text-2xl font-bold mt-1">248</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium text-green-600">
                        +12%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        from last month
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-blue-50 text-blue-500">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Appointments
                    </p>
                    <h3 className="text-2xl font-bold mt-1">42</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium text-green-600">
                        +8%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        this week
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-purple-50 text-purple-500">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Reports Generated
                    </p>
                    <h3 className="text-2xl font-bold mt-1">18</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium text-red-600">
                        -5%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        this month
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-green-50 text-green-500">
                    <Activity className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Patient Satisfaction
                    </p>
                    <h3 className="text-2xl font-bold mt-1">94%</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium text-green-600">
                        +2%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        from last quarter
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-amber-50 text-amber-500">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Analytics Content */}
          <Card>
            <CardHeader className="pb-2">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="flex justify-between items-center">
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <TabsList>
                    <TabsTrigger
                      value="overview"
                      className="flex items-center gap-1"
                    >
                      <BarChart className="h-4 w-4" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="patients"
                      className="flex items-center gap-1"
                    >
                      <Users className="h-4 w-4" />
                      Patients
                    </TabsTrigger>
                    <TabsTrigger
                      value="appointments"
                      className="flex items-center gap-1"
                    >
                      <Calendar className="h-4 w-4" />
                      Appointments
                    </TabsTrigger>
                    <TabsTrigger
                      value="reports"
                      className="flex items-center gap-1"
                    >
                      <Activity className="h-4 w-4" />
                      Reports
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
              <CardDescription>
                {activeTab === "overview"
                  ? "Key performance metrics for your practice"
                  : activeTab === "patients"
                  ? "Patient demographics and trends"
                  : activeTab === "appointments"
                  ? "Appointment statistics and patterns"
                  : "Report generation and usage analytics"}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <TabsContent value="overview" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Patient Growth Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Patient Growth</CardTitle>
                      <CardDescription>
                        New patients over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Appointment Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Appointment Types
                      </CardTitle>
                      <CardDescription>
                        Distribution by appointment category
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Revenue Trends */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Revenue Trends</CardTitle>
                      <CardDescription>
                        Monthly revenue breakdown
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Patient Demographics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Patient Demographics
                      </CardTitle>
                      <CardDescription>
                        Age and gender distribution
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="patients" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Patient Age Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Age Distribution
                      </CardTitle>
                      <CardDescription>
                        Patients by age group
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Patient Gender Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Gender Distribution
                      </CardTitle>
                      <CardDescription>
                        Patients by gender
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Medical Conditions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Top Medical Conditions
                      </CardTitle>
                      <CardDescription>
                        Most common diagnoses
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Patient Retention */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Patient Retention
                      </CardTitle>
                      <CardDescription>
                        Return visit rates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="appointments" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Appointment Volume */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Appointment Volume
                      </CardTitle>
                      <CardDescription>
                        Appointments by day of week
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Appointment Types */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Appointment Types
                      </CardTitle>
                      <CardDescription>
                        Distribution by category
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* No-Show Rate */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">No-Show Rate</CardTitle>
                      <CardDescription>
                        Missed appointments over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Appointment Duration */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Appointment Duration
                      </CardTitle>
                      <CardDescription>
                        Average time by appointment type
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Report Generation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Report Generation
                      </CardTitle>
                      <CardDescription>
                        Reports created over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Report Types */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Report Types</CardTitle>
                      <CardDescription>
                        Distribution by category
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                          Chart visualization would appear here
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Usage */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">AI Usage</CardTitle>
                      <CardDescription>
                        AI-generated content metrics
                      </CardDescription>
                    </CardHeader>
                    <Car
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Download,
  Share2,
  Eye,
  Edit,
  Trash2,
  User,
} from "lucide-react";
import ReportBuilderModal from "@/components/reports/ReportBuilderModal";

interface Report {
  id: string;
  title: string;
  patient_id: string;
  patient_name?: string;
  created_at: string;
  updated_at?: string;
  type: string;
  status: "draft" | "final";
  template_id?: string;
}

const ReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isReportBuilderOpen, setIsReportBuilderOpen] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch from the API
      // const data = await getReports();
      // setReports(data || []);
      setReports(mockReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReportAdded = () => {
    fetchReports();
    setIsReportBuilderOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter reports based on search query
  };

  // Mock data for demonstration
  const mockReports: Report[] = [
    {
      id: "1",
      title: "Annual Physical Examination",
      patient_id: "1",
      patient_name: "Sarah Johnson",
      created_at: "2023-11-15T10:30:00Z",
      type: "physical",
      status: "final",
    },
    {
      id: "2",
      title: "Blood Work Analysis",
      patient_id: "2",
      patient_name: "Michael Chen",
      created_at: "2023-12-03T14:15:00Z",
      type: "lab",
      status: "final",
    },
    {
      id: "3",
      title: "Treatment Plan",
      patient_id: "3",
      patient_name: "Emily Rodriguez",
      created_at: "2024-01-10T09:00:00Z",
      type: "treatment",
      status: "draft",
    },
    {
      id: "4",
      title: "Medication Review",
      patient_id: "4",
      patient_name: "David Wilson",
      created_at: "2024-02-22T11:45:00Z",
      type: "medication",
      status: "final",
    },
    {
      id: "5",
      title: "Follow-up Consultation",
      patient_id: "5",
      patient_name: "Jessica Brown",
      created_at: "2024-03-05T15:30:00Z",
      type: "consultation",
      status: "draft",
    },
  ];

  const filteredReports =
    activeTab === "all"
      ? reports
      : activeTab === "draft"
        ? reports.filter((report) => report.status === "draft")
        : reports.filter((report) => report.status === "final");

  return (
    <DashboardLayout>
      <div className="w-full h-full bg-gray-50 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Reports</h1>
              <p className="text-gray-500">
                Generate and manage patient reports
              </p>
            </div>
            <Button
              onClick={() => setIsReportBuilderOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create New Report
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Report Library</CardTitle>
                <div className="flex items-center gap-2">
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2"
                  >
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search reports..."
                        className="pl-10 w-[300px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
              <CardDescription>
                View and manage all patient reports and documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="all">All Reports</TabsTrigger>
                  <TabsTrigger value="draft">Drafts</TabsTrigger>
                  <TabsTrigger value="final">Finalized</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                    </div>
                  ) : filteredReports.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Patient</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReports
                            .filter((report) =>
                              searchQuery
                                ? report.title
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()) ||
                                  report.patient_name
                                    ?.toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                                : true,
                            )
                            .map((report) => (
                              <TableRow key={report.id}>
                                <TableCell className="font-medium">
                                  {report.title}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                      <User className="h-4 w-4" />
                                    </div>
                                    <span>{report.patient_name}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {report.type.charAt(0).toUpperCase() +
                                      report.type.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {format(
                                    new Date(report.created_at),
                                    "MMM d, yyyy",
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={
                                      report.status === "draft"
                                        ? "bg-amber-100 text-amber-800 border-amber-200"
                                        : "bg-green-100 text-green-800 border-green-200"
                                    }
                                  >
                                    {report.status === "draft"
                                      ? "Draft"
                                      : "Final"}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        // View report
                                      }}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    {report.status === "draft" && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                          // Edit report
                                        }}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        // Download report
                                      }}
                                    >
                                      <Download className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        // Share report
                                      }}
                                    >
                                      <Share2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        // Delete report
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg bg-gray-50">
                      <FileText className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {activeTab === "all"
                          ? "No reports found"
                          : activeTab === "draft"
                            ? "No draft reports found"
                            : "No finalized reports found"}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 text-center">
                        Create a new report to document patient's condition,
                        treatment plans, or test results.
                      </p>
                      <Button
                        onClick={() => setIsReportBuilderOpen(true)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Create New Report
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <ReportBuilderModal
        open={isReportBuilderOpen}
        onOpenChange={setIsReportBuilderOpen}
        onSave={handleReportAdded}
      />
    </DashboardLayout>
  );
};

export default ReportsPage;

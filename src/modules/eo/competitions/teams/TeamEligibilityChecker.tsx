import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Users,
  Shield,
  Calendar,
  FileText,
  AlertTriangle,
  Eye,
  Download,
  RefreshCw,
  Zap,
  Clock,
  History,
  Send,
} from "lucide-react";
import { useCompetition, RegistrationData } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";
import { cn } from "@/lib/utils";
import { checkTeamEligibility } from "../lib/eligibilityValidation";
import {
  autoSuspendTeams,
  autoApproveTeams,
  flagTeamsForReview,
  getAuditLog,
  getTeamAuditTrail,
} from "../services/eligibilityService";
import {
  generateCSVReport,
  downloadCSVReport,
  generateJSONReport,
  downloadJSONReport,
  generateSummaryReport,
  getExportFormats,
} from "../services/reportService";
import { useAutoEligibilityCheck } from "../hooks/useAutoEligibilityCheck";
import {
  EligibilityCheckResult,
  EligibilityIssue,
  getEligibilityRules,
} from "../lib/eligibilityValidation";

// ─── Types ──────────────────────────────────────────────────────────────
// Note: EligibilityCheckResult and EligibilityIssue are imported from validation utility
// This component now uses the shared validation logic

// ─── Main Component ──────────────────────────────────────────────────────
export default function TeamEligibilityChecker() {
  const { activeCompetition, registrations, competitionConfig } = useCompetition();
  const [sortBy, setSortBy] = useState<"name" | "compliance" | "status">("compliance");
  const [filterStatus, setFilterStatus] = useState<"all" | "compliant" | "issues">("all");
  const [selectedTeams, setSelectedTeams] = useState<Set<string>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  
  // Get eligibility rules
  const ELIGIBILITY_RULES = getEligibilityRules();

  // Compute eligibility for all teams
  const eligibilityResults = useMemo(() => {
    return registrations
      .filter((r) => r.status === "Approved")
      .map((team) => checkTeamEligibility(team, competitionConfig));
  }, [registrations, competitionConfig]);

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let filtered = eligibilityResults;

    // Apply status filter
    if (filterStatus === "compliant") {
      filtered = filtered.filter((r) => r.compliant);
    } else if (filterStatus === "issues") {
      filtered = filtered.filter((r) => !r.compliant);
    }

    // Apply sorting
    const sorted = [...filtered];
    if (sortBy === "compliance") {
      sorted.sort((a, b) => a.completeness - b.completeness);
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.teamName.localeCompare(b.teamName));
    }

    return sorted;
  }, [eligibilityResults, sortBy, filterStatus]);

  const compliantTeams = eligibilityResults.filter((r) => r.compliant).length;
  const teamsWithIssues = eligibilityResults.filter((r) => !r.compliant).length;
  const totalReviewedTeams = eligibilityResults.length;

  return (
    <div className="space-y-6" role="main" aria-label="Team eligibility checker">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team Eligibility Checker</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Verifikasi kelengkapan dan kepatuhan tim terhadap regulasi kompetisi
        </p>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi untuk melihat status kepatuhan tim</Card>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Tim</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalReviewedTeams}</div>
                <p className="text-xs text-muted-foreground mt-1">Approved registrations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Compliant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{compliantTeams}</div>
                <p className="text-xs text-muted-foreground mt-1">Siap berkompetisi</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">{teamsWithIssues}</div>
                <p className="text-xs text-muted-foreground mt-1">Butuh perbaikan</p>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Urutkan berdasarkan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compliance">Kepatuhan</SelectItem>
                <SelectItem value="name">Nama Tim</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tim</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="issues">Ada Masalah</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>

          {/* Team List */}
          <div className="space-y-4">
            {filteredResults.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                Tidak ada tim yang sesuai dengan filter
              </Card>
            ) : (
              filteredResults.map((result) => (
                <Card key={result.teamId} className={cn(
                  result.compliant ? "border-green-200/50 bg-green-50/50" : "border-amber-200/50 bg-amber-50/50"
                )}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{result.teamName}</h3>
                          {result.compliant ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Compliant
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Issues
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">ID: {result.clubId}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{result.completeness}%</div>
                        <p className="text-xs text-muted-foreground">Complete</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <Progress value={result.completeness} className="h-2" />
                    </div>

                    {/* Issues List */}
                    {result.issues.length > 0 ? (
                      <div className="space-y-2">
                        {result.issues.map((issue, idx) => (
                          <Alert
                            key={idx}
                            className={cn(
                              "border-l-4",
                              issue.type === "error"
                                ? "border-l-red-500 bg-red-50/50"
                                : issue.type === "warning"
                                ? "border-l-amber-500 bg-amber-50/50"
                                : "border-l-blue-500 bg-blue-50/50"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              {issue.type === "error" ? (
                                <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                              ) : issue.type === "warning" ? (
                                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                              )}
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-foreground">{issue.message}</p>
                                {issue.resolution && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    <span className="font-medium">Resolusi:</span> {issue.resolution}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Alert>
                        ))}
                      </div>
                    ) : (
                      <Alert className="border-l-4 border-l-green-500 bg-green-50/50">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-foreground">Tim siap berkompetisi</p>
                            <p className="text-xs text-muted-foreground mt-1">Semua persyaratan kepatuhan terpenuhi</p>
                          </div>
                        </div>
                      </Alert>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Detail
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Eligibility Rules Reference */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Regulasi Kepatuhan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="squad" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="squad">Squad</TabsTrigger>
                  <TabsTrigger value="players">Pemain</TabsTrigger>
                  <TabsTrigger value="docs">Dokumen</TabsTrigger>
                </TabsList>

                <TabsContent value="squad" className="space-y-3 mt-4">
                  <div>
                    <p className="text-sm font-medium">Ukuran Squad</p>
                    <p className="text-sm text-muted-foreground">
                      Minimal {ELIGIBILITY_RULES.minSquadSize} pemain, maksimal {ELIGIBILITY_RULES.maxSquadSize} pemain
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Persyaratan Usia</p>
                    {Object.entries(ELIGIBILITY_RULES.ageRequirements).map(([category, req]: any) => (
                      <p key={category} className="text-xs text-muted-foreground">
                        {category}: {req.min}-{req.max} tahun
                      </p>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="players" className="space-y-2 mt-4">
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      Terdaftar pada klub
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      Tidak dalam status suspended
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      Kontrak aktif
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      Medical clearance current
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      Coverage asuransi aktif
                    </li>
                  </ul>
                </TabsContent>

                <TabsContent value="docs" className="space-y-2 mt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Dokumen yang diperlukan ({ELIGIBILITY_RULES.documentationRequired.length}):
                  </p>
                  <ul className="space-y-1 text-sm">
                    {ELIGIBILITY_RULES.documentationRequired.map((doc, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <FileText className="w-3 h-3 text-muted-foreground" />
                        {doc.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

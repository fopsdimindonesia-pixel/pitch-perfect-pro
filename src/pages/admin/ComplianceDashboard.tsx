import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

const complianceFrameworks = [
  {
    name: "GDPR",
    status: "Compliant",
    score: 94,
    lastAudit: "2024-11-15",
    nextAudit: "2025-05-15",
    checkpoints: 23,
    passed: 22
  },
  {
    name: "CCPA",
    status: "Compliant",
    score: 91,
    lastAudit: "2024-10-20",
    nextAudit: "2025-04-20",
    checkpoints: 18,
    passed: 17
  },
  {
    name: "ISO 27001",
    status: "In Progress",
    score: 88,
    lastAudit: "2024-09-10",
    nextAudit: "2025-03-10",
    checkpoints: 35,
    passed: 31
  },
  {
    name: "SOC 2 Type II",
    status: "Compliant",
    score: 93,
    lastAudit: "2024-08-05",
    nextAudit: "2025-02-05",
    checkpoints: 28,
    passed: 26
  },
  {
    name: "PCI DSS",
    status: "Compliant",
    score: 96,
    lastAudit: "2024-07-12",
    nextAudit: "2025-01-12",
    checkpoints: 12,
    passed: 12
  },
  {
    name: "HIPAA",
    status: "N/A",
    score: 0,
    lastAudit: null,
    nextAudit: null,
    checkpoints: 0,
    passed: 0
  }
];

function getStatusIcon(status: string) {
  switch (status) {
    case "Compliant":
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case "In Progress":
      return <Clock className="w-5 h-5 text-blue-600" />;
    case "Warning":
      return <AlertCircle className="w-5 h-5 text-orange-600" />;
    case "N/A":
      return <div className="w-5 h-5 text-gray-400">-</div>;
    default:
      return null;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Compliant":
      return <Badge className="bg-green-100 text-green-800">Compliant</Badge>;
    case "In Progress":
      return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
    case "Warning":
      return <Badge className="bg-orange-100 text-orange-800">Warning</Badge>;
    case "N/A":
      return <Badge className="bg-gray-100 text-gray-800">N/A</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function ComplianceDashboard() {
  const overallScore = Math.round((94 + 91 + 88 + 93 + 96) / 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Compliance Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor regulatory compliance and certifications</p>
      </div>

      {/* Overall Compliance Score */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Overall Compliance Score</h2>
            <p className="text-sm text-muted-foreground">5 active frameworks</p>
          </div>
          <div className="text-center">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeDasharray={`${(overallScore / 100) * 282.6} 282.6`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{overallScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Compliance Frameworks */}
      <div className="space-y-4">
        {complianceFrameworks.map((framework) => (
          <Card key={framework.name} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                {getStatusIcon(framework.status)}
                <div>
                  <h3 className="font-semibold text-lg">{framework.name}</h3>
                  {framework.lastAudit && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Last audit: {framework.lastAudit} | Next: {framework.nextAudit}
                    </p>
                  )}
                </div>
              </div>
              {getStatusBadge(framework.status)}
            </div>

            {framework.score > 0 && (
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Compliance Score</p>
                    <span className="text-sm font-semibold">{framework.score}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        framework.score >= 90 ? "bg-green-600" :
                        framework.score >= 80 ? "bg-blue-600" :
                        "bg-orange-600"
                      }`}
                      style={{ width: `${framework.score}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{framework.checkpoints}</p>
                    <p className="text-xs text-muted-foreground">Checkpoints</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{framework.passed}</p>
                    <p className="text-xs text-muted-foreground">Passed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{framework.checkpoints - framework.passed}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </div>
            )}

            {framework.status === "N/A" && (
              <p className="text-sm text-muted-foreground">Not applicable for this platform</p>
            )}
          </Card>
        ))}
      </div>

      {/* Data Privacy Controls */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Data Privacy Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { control: "Data Encryption", status: "Enabled", details: "AES-256 at rest, TLS 1.3 in transit" },
            { control: "User Consent", status: "Enabled", details: "Explicit consent collection on signup" },
            { control: "Data Retention", status: "Configured", details: "90 day retention policy" },
            { control: "Access Control", status: "Implemented", details: "RBAC with audit logging" },
            { control: "Data Deletion", status: "Automated", details: "GDPR right-to-be-forgotten" },
            { control: "Data Portability", status: "Available", details: "Export user data as CSV/JSON" }
          ].map((control, i) => (
            <div key={i} className="p-4 rounded-lg border hover:bg-muted/50">
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium text-sm">{control.control}</p>
                <Badge className={
                  control.status === "Enabled" || control.status === "Implemented" || control.status === "Automated" || control.status === "Configured" || control.status === "Available" ?
                  "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }>{control.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{control.details}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Measures */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Security Measures</h2>
        <div className="space-y-3">
          {[
            { measure: "Multi-factor Authentication", enabled: true },
            { measure: "IP Whitelisting", enabled: true },
            { measure: "Rate Limiting", enabled: true },
            { measure: "DDoS Protection", enabled: true },
            { measure: "WAF (Web Application Firewall)", enabled: true },
            { measure: "Intrusion Detection System", enabled: false }
          ].map((measure, i) => (
            <div key={i} className="flex items-center p-3 rounded-lg border">
              {measure.enabled ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-600 mr-3" />
              )}
              <span className="text-sm font-medium">{measure.measure}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {measure.enabled ? "Active" : "Recommended"}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Audit History */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Audits</h2>
        <div className="space-y-2">
          {[
            { framework: "PCI DSS", date: "2024-07-12", result: "Pass", auditor: "External Auditor Inc" },
            { framework: "SOC 2 Type II", date: "2024-08-05", result: "Pass", auditor: "Compliance Partners LLC" },
            { framework: "ISO 27001", date: "2024-09-10", result: "Pass with notes", auditor: "ISO Audit Corp" },
            { framework: "CCPA", date: "2024-10-20", result: "Pass", auditor: "Privacy Consultants" },
            { framework: "GDPR", date: "2024-11-15", result: "Pass", auditor: "EU Compliance Ltd" }
          ].map((audit, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
              <div>
                <p className="font-medium text-sm">{audit.framework}</p>
                <p className="text-xs text-muted-foreground">{audit.date} • {audit.auditor}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">{audit.result}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, AlertCircle, Clock } from "lucide-react";
import { ValidationResult } from "@/types/registration";
import { cn } from "@/lib/utils";

interface ValidationSummaryProps {
  result: ValidationResult;
  className?: string;
  expandable?: boolean;
}

/**
 * Component showing a summary of all validation results
 * Displays status of all 5 validators at a glance
 */
export function ValidationSummary({
  result,
  className = "",
  expandable = false,
}: ValidationSummaryProps) {
  const { validations } = result;

  // Map validator results to display items
  const validators = [
    {
      name: "Jumlah Pemain",
      key: "rosterSize" as const,
      icon: "👥",
      description: "Pemain sudah sesuai dengan ketentuan",
    },
    {
      name: "Batas Usia",
      key: "playerAges" as const,
      icon: "🎂",
      description: "Semua pemain memenuhi batas usia",
    },
    {
      name: "Kelayakan Pemain",
      key: "playerEligibility" as const,
      icon: "✅",
      description: "Semua pemain layak bermain",
    },
    {
      name: "Pembayaran",
      key: "payment" as const,
      icon: "💳",
      description: "Pembayaran sudah dikonfirmasi",
    },
    {
      name: "Kuota Tersedia",
      key: "slotAvailability" as const,
      icon: "🏆",
      description: "Masih ada kuota untuk klub",
    },
  ];

  return (
    <Card className={cn("border", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 justify-between">
          <div>📋 Ringkasan Validasi</div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              {result.errors.length} Error
            </Badge>
            <Badge variant="outline" className="text-xs">
              {result.warnings.length} Warning
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {validators.map((validator) => {
            const valResult = validations[validator.key];
            const isValid = valResult?.isValid !== false;
            const hasWarning = valResult?.hasWarning === true;
            const errors = valResult?.errors || [];
            const warnings = valResult?.warnings || [];

            return (
              <div
                key={validator.key}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border transition-colors",
                  isValid && !hasWarning
                    ? "bg-green-50 border-green-200"
                    : hasWarning && !isValid === false
                      ? "bg-amber-50 border-amber-200"
                      : "bg-red-50 border-red-200"
                )}
              >
                <div className="text-lg flex-shrink-0">{validator.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {validator.name}
                    </span>
                    {isValid && !hasWarning ? (
                      <span className="text-xs text-green-700 font-semibold">
                        ✓ Valid
                      </span>
                    ) : hasWarning ? (
                      <span className="text-xs text-amber-700 font-semibold">
                        ⚠ Peringatan
                      </span>
                    ) : (
                      <span className="text-xs text-red-700 font-semibold">
                        ✕ Gagal
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {validator.description}
                  </p>

                  {/* Show error/warning details if any */}
                  {(errors.length > 0 || warnings.length > 0) && (
                    <div className="mt-2 space-y-1">
                      {errors.map((error, idx) => (
                        <div
                          key={`error-${idx}`}
                          className="text-xs text-red-700 pl-2 border-l-2 border-red-300"
                        >
                          {error.message}
                        </div>
                      ))}
                      {warnings.map((warning, idx) => (
                        <div
                          key={`warning-${idx}`}
                          className="text-xs text-amber-700 pl-2 border-l-2 border-amber-300"
                        >
                          {warning.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Status */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 justify-between">
            <div className="text-sm font-semibold">Status Keseluruhan</div>
            {result.isValid ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 mr-1" />
                Siap Disetujui
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Tidak Siap
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Waktu validasi:{" "}
            {new Date(result.timestamp).toLocaleTimeString("id-ID")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Helper component to show validation status indicator
 */
export function ValidationStatusIndicator({ isValid }: { isValid: boolean }) {
  return isValid ? (
    <div className="flex items-center gap-1.5 text-xs text-green-700 font-semibold">
      <CheckCircle className="w-4 h-4" />
      Valid
    </div>
  ) : (
    <div className="flex items-center gap-1.5 text-xs text-red-700 font-semibold">
      <AlertTriangle className="w-4 h-4" />
      Ada Masalah
    </div>
  );
}

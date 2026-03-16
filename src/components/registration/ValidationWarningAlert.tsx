import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Info } from "lucide-react";
import { ValidationError } from "@/types/registration";

interface ValidationWarningAlertProps {
  warnings: ValidationError[];
  onOverride?: () => void;
  overrideButtonLabel?: string;
  className?: string;
}

/**
 * Component for displaying validation warnings
 * Allows manual override for non-blocking issues
 */
export function ValidationWarningAlert({
  warnings,
  onOverride,
  overrideButtonLabel = "Override & Approve",
  className = "",
}: ValidationWarningAlertProps) {
  if (!warnings || warnings.length === 0) return null;

  const warningItems = warnings.filter((w) => w.severity === "warning");
  if (warningItems.length === 0) return null;

  return (
    <Alert className={`border-amber-500/50 bg-amber-50 ${className}`}>
      <div className="flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <AlertTitle className="text-amber-900 font-semibold">
            {warningItems.length} Peringatan - Tinjau Sebelum Menyetujui
          </AlertTitle>
          <AlertDescription className="mt-3 space-y-2">
            <div className="text-sm text-amber-900/70">
              Registrasi ini memiliki beberapa masalah yang perlu perhatian:
            </div>
            <ul className="space-y-2 mt-2">
              {warningItems.map((warning, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <div className="mt-0.5">
                    <Info className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-amber-900">
                      {getWarningTitle(warning.code)}
                    </div>
                    <div className="text-xs text-amber-800 mt-1">
                      {warning.message}
                    </div>
                    {warning.details && (
                      <div className="text-xs text-amber-700 mt-1 pl-2 border-l border-amber-300">
                        {typeof warning.details === "string"
                          ? warning.details
                          : JSON.stringify(warning.details)}
                      </div>
                    )}
                    {warning.hint && (
                      <div className="text-xs text-amber-800 mt-1 italic">
                        💡 {warning.hint}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {onOverride && (
              <div className="mt-4 pt-3 border-t border-amber-200">
                <p className="text-xs text-amber-900/70 mb-2">
                  Anda dapat melanjutkan pengajuan meskipun ada peringatan ini, namun periksa kembali informasi klub.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-amber-600 border-amber-600 hover:bg-amber-50"
                  onClick={onOverride}
                >
                  {overrideButtonLabel}
                </Button>
              </div>
            )}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}

/**
 * Helper function to get user-friendly warning title from warning code
 */
function getWarningTitle(code: string): string {
  const titleMap: Record<string, string> = {
    ROSTER_CLOSE_TO_MINIMUM: "Pemain Mendekati Jumlah Minimum",
    PLAYERS_AT_AGE_LIMIT: "Ada Pemain di Batas Usia Maksimum",
    PENDING_ELIGIBILITY: "Status Kelayakan Pemain Tertunda",
    PARTIAL_PAYMENT: "Pembayaran Belum Lengkap",
    LIMITED_SLOTS: "Kuota Terbatas",
    VALIDATION_WARNING: "Peringatan Validasi",
  };

  return titleMap[code] || code;
}

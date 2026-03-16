import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { ValidationError } from "@/types/registration";

interface ValidationErrorAlertProps {
  errors: ValidationError[];
  onDismiss?: () => void;
  className?: string;
}

/**
 * Component for displaying blocking validation errors
 * Prevents registration approval until errors are resolved
 */
export function ValidationErrorAlert({
  errors,
  onDismiss,
  className = "",
}: ValidationErrorAlertProps) {
  if (!errors || errors.length === 0) return null;

  const blockingErrors = errors.filter((e) => e.severity === "error");
  if (blockingErrors.length === 0) return null;

  return (
    <Alert
      variant="destructive"
      className={`border-destructive/50 bg-destructive/5 ${className}`}
    >
      <div className="flex gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <AlertTitle className="text-destructive font-semibold">
            Validasi Gagal - {blockingErrors.length} masalah ditemukan
          </AlertTitle>
          <AlertDescription className="mt-3 space-y-2">
            <div className="text-sm text-destructive/80">
              Registrasi ini tidak dapat disetujui. Masalah berikut harus diselesaikan terlebih dahulu:
            </div>
            <ul className="space-y-2 mt-2">
              {blockingErrors.map((error, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <div className="mt-1">
                    <AlertCircle className="h-3.5 w-3.5 text-destructive flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-destructive">
                      {getErrorTitle(error.code)}
                    </div>
                    <div className="text-xs text-destructive/70 mt-1">
                      {error.message}
                    </div>
                    {error.details && (
                      <div className="text-xs text-destructive/60 mt-1 pl-2 border-l border-destructive/30">
                        {typeof error.details === "string"
                          ? error.details
                          : JSON.stringify(error.details)}
                      </div>
                    )}
                    {error.hint && (
                      <div className="text-xs text-destructive/70 mt-1 italic">
                        💡 Saran: {error.hint}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}

/**
 * Helper function to get user-friendly error title from error code
 */
function getErrorTitle(code: string): string {
  const titleMap: Record<string, string> = {
    ROSTER_TOO_SMALL: "Terlalu Sedikit Pemain",
    ROSTER_TOO_LARGE: "Terlalu Banyak Pemain",
    PLAYERS_EXCEED_AGE_LIMIT: "Ada Pemain Melebihi Batas Usia",
    SUSPENDED_PLAYERS: "Ada Pemain yang Dilarang",
    PAYMENT_NOT_VERIFIED: "Pembayaran Belum Dikonfirmasi",
    NO_SLOTS_AVAILABLE: "Kuota Penuh",
    INVALID_REGISTRATION: "Data Registrasi Tidak Valid",
  };

  return titleMap[code] || code;
}

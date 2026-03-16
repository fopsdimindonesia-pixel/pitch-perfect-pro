import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Shield,
  User,
  Heart,
  FileCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerificationStatus } from "../PlayerManagement";

interface PlayerVerificationProps {
  playerId?: string;
  verificationStatus: VerificationStatus;
  mode: "create" | "edit";
}

interface VerificationItem {
  key: keyof Omit<VerificationStatus, "overall" | "approvedBy" | "approvedAt" | "rejectionReason">;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function PlayerVerification({
  playerId,
  verificationStatus,
  mode,
}: PlayerVerificationProps) {
  const verificationItems: VerificationItem[] = [
    {
      key: "identity",
      label: "Verifikasi Identitas",
      description: "Dokumen identitas pemain telah diverifikasi",
      icon: <User className="w-5 h-5" />,
      color: "blue",
    },
    {
      key: "medical",
      label: "Pemeriksaan Medis",
      description: "Pemain telah lulus pemeriksaan kesehatan lengkap",
      icon: <Heart className="w-5 h-5" />,
      color: "red",
    },
    {
      key: "documents",
      label: "Verifikasi Dokumen",
      description: "Semua dokumen pemain sudah lengkap dan terverifikasi",
      icon: <FileCheck className="w-5 h-5" />,
      color: "green",
    },
    {
      key: "eligibility",
      label: "Kelayakan Bermain",
      description: "Pemain memenuhi syarat untuk bermain di kompetisi",
      icon: <Zap className="w-5 h-5" />,
      color: "yellow",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-50 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Verified":
        return "default";
      case "Pending":
        return "secondary";
      case "Rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified":
        return <CheckCircle2 className="w-5 h-5" />;
      case "Pending":
        return <Clock className="w-5 h-5" />;
      case "Rejected":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getItemStatusColor = (color: string, status: string) => {
    if (status === "Verified")
      return "bg-green-50 border-green-200 text-green-700";
    if (status === "Pending") return "bg-yellow-50 border-yellow-200 text-yellow-700";
    if (status === "Rejected") return "bg-red-50 border-red-200 text-red-700";
    return "bg-gray-50 border-gray-200 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card className={cn("border-2", getStatusColor(verificationStatus.overall))}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(verificationStatus.overall)}
              <div>
                <CardTitle className="text-lg">
                  Status Verifikasi: {verificationStatus.overall}
                </CardTitle>
                <CardDescription className="mt-1">
                  {verificationStatus.overall === "Verified"
                    ? "Pemain telah diverifikasi dan siap bermain"
                    : verificationStatus.overall === "Pending"
                      ? "Proses verifikasi sedang berlangsung"
                      : "Ada masalah dengan verifikasi pemain"}
                </CardDescription>
              </div>
            </div>
            <Badge variant={getStatusBadgeVariant(verificationStatus.overall)}>
              {verificationStatus.overall}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {verificationStatus.approvedAt && (
            <>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Disetujui oleh</p>
                  <p className="font-medium">{verificationStatus.approvedBy}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tanggal Persetujuan</p>
                  <p className="font-medium">{verificationStatus.approvedAt}</p>
                </div>
              </div>
            </>
          )}
          {verificationStatus.rejectionReason && (
            <>
              <Separator />
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Alasan Penolakan:</strong> {verificationStatus.rejectionReason}
                </AlertDescription>
              </Alert>
            </>
          )}
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tahapan Verifikasi</CardTitle>
          <CardDescription>
            Proses verifikasi pemain yang diperlukan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verificationItems.map((item, idx) => {
            const status = verificationStatus[item.key];
            return (
              <div key={item.key}>
                <div
                  className={cn(
                    "p-4 rounded-lg border-2 transition-colors",
                    getItemStatusColor(item.color, status)
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/50">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                        <Badge variant={getStatusBadgeVariant(status)}>
                          {status === "Verified" && "✓ "}
                          {status === "Pending" && "⏳ "}
                          {status === "Rejected" && "✗ "}
                          {status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Details */}
                {status === "Pending" && (
                  <div className="mt-2 p-3 rounded bg-yellow-50 border border-yellow-200 text-sm text-yellow-800">
                    <p>
                      ⏳ Menunggu review dari tim verifikasi. Proses biasanya memakan
                      waktu 1-2 hari kerja.
                    </p>
                  </div>
                )}
                {status === "Rejected" && (
                  <div className="mt-2 p-3 rounded bg-red-50 border border-red-200 text-sm">
                    <p className="text-red-800">
                      ✗ Verifikasi ditolak. Silakan periksa kembali dokumen dan
                      coba upload ulang.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Timeline Verifikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                date: "10 Mar 2024",
                event: "Data pemain lengkap",
                status: "completed",
              },
              {
                date: "11 Mar 2024",
                event: "Dokumen diunggah dan diverifikasi",
                status: "completed",
              },
              {
                date: "12 Mar 2024",
                event: "Pemeriksaan medis dilakukan",
                status: "completed",
              },
              {
                date: "13 Mar 2024",
                event: "Persetujuan verifikasi final",
                status: "current",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2",
                      item.status === "completed"
                        ? "bg-green-500 border-green-500"
                        : item.status === "current"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 bg-gray-50"
                    )}
                  />
                  {idx !== 3 && (
                    <div
                      className={cn(
                        "w-0.5 h-8 mt-1",
                        item.status === "completed"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      )}
                    />
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium">{item.event}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tindakan Verifikasi</CardTitle>
          <CardDescription>Opsi yang tersedia untuk pembuat</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {verificationStatus.overall === "Pending" && (
            <>
              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Verifikasi sedang diproses. Anda dapat meninjau status atau
                  menambahkan dokumen tambahan jika diperlukan.
                </AlertDescription>
              </Alert>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  Hubungi Tim Verifikasi
                </Button>
                <Button className="flex-1 gap-2">
                  <FileCheck className="w-4 h-4" />
                  Tambah Dokumen
                </Button>
              </div>
            </>
          )}

          {verificationStatus.overall === "Verified" && (
            <>
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Selamat! Pemain telah diverifikasi dan siap untuk bermain dalam
                  kompetisi resmi.
                </AlertDescription>
              </Alert>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                >
                  Unduh Sertifikat
                </Button>
                <Button className="flex-1 gap-2">
                  <Shield className="w-4 h-4" />
                  Kelola Verifikasi
                </Button>
              </div>
            </>
          )}

          {verificationStatus.overall === "Rejected" && (
            <>
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Verifikasi ditolak. Silakan tinjau alasan penolakan dan unggah
                  dokumen yang diperbaiki.
                </AlertDescription>
              </Alert>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                >
                  Lihat Rincian Penolakan
                </Button>
                <Button className="flex-1 gap-2">
                  <FileCheck className="w-4 h-4" />
                  Unggah Ulang Dokumen
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Langkah Berikutnya
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            {verificationStatus.overall === "Verified" ? (
              <>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">1</span>
                  <span>Pemain dapat ditambahkan ke skuad resmi klub</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">2</span>
                  <span>Dapat mengikuti pertandingan resmi kompetisi</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">3</span>
                  <span>
                    Pastikan pemeriksaan kesehatan diperbarui setiap tahun
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">1</span>
                  <span>Lengkapi semua dokumen yang diperlukan</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">2</span>
                  <span>Pastikan pemeriksaan medis telah dilakukan</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">3</span>
                  <span>Tunggu verifikasi dari tim admin</span>
                </li>
              </>
            )}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

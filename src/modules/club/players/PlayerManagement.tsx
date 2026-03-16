import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, AlertCircle, Clock, FileText, User, Camera, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import PlayerRegistration from "./components/PlayerRegistration";
import PlayerProfile from "./components/PlayerProfile";
import PlayerPhoto from "./components/PlayerPhoto";
import PlayerDocuments from "./components/PlayerDocuments";
import PlayerVerification from "./components/PlayerVerification";

export interface PlayerFormData {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  idNumber: string;
  position: string;
  jerNumber: string;
  height: string;
  weight: string;
  foot: "Left" | "Right" | "Both";
  joinDate: string;
  contractExpiry: string;
  medicalApproval: boolean;
  currentStatus: "Active" | "Injured" | "Suspended" | "On Loan" | "Loaned Out";
}

export interface DocumentFile {
  id: string;
  name: string;
  type: "ID" | "Medical" | "Contract" | "Passport" | "Other";
  uploadedAt: string;
  size: string;
  status: "Verified" | "Pending Review" | "Rejected";
  url?: string;
}

export interface VerificationStatus {
  overall: "Verified" | "Pending" | "Rejected";
  identity: "Verified" | "Pending" | "Rejected";
  medical: "Verified" | "Pending" | "Rejected";
  documents: "Verified" | "Pending" | "Rejected";
  eligibility: "Verified" | "Pending" | "Rejected";
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
}

interface PlayerManagementProps {
  playerId?: string;
  mode?: "create" | "edit";
  initialData?: PlayerFormData;
}

export default function PlayerManagement({ playerId, mode = "create" }: PlayerManagementProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  // Sample data for edit mode
  const [playerData] = useState<PlayerFormData>({
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "2000-05-15",
    nationality: "Indonesia",
    idNumber: "1234567890123456",
    position: "ST",
    jerNumber: "9",
    height: "185",
    weight: "82",
    foot: "Right",
    joinDate: "2022-01-15",
    contractExpiry: "2026-12-31",
    medicalApproval: true,
    currentStatus: "Active",
  });

  const [verificationStatus] = useState<VerificationStatus>({
    overall: mode === "create" ? "Pending" : "Verified",
    identity: "Verified",
    medical: "Verified",
    documents: "Verified",
    eligibility: "Pending",
    approvedBy: mode === "create" ? undefined : "Admin Name",
    approvedAt: mode === "create" ? undefined : "2024-03-10",
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Show success toast
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-50 border-green-200 text-green-700";
      case "Pending":
        return "bg-yellow-50 border-yellow-200 text-yellow-700";
      case "Rejected":
        return "bg-red-50 border-red-200 text-red-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified":
        return <CheckCircle2 className="w-4 h-4" />;
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "Rejected":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Player Management">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/club/players")}
            className="h-9 w-9"
            aria-label="Back to players list"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {mode === "create" ? "Registrasi Pemain Baru" : `${playerData.firstName} ${playerData.lastName}`}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "create" ? "Daftarkan pemain baru ke klub" : "Kelola data pemain lengkap"}
            </p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>

      {/* Verification Status Summary */}
      {mode === "edit" && (
        <Card className={cn("border-2", getStatusColor(verificationStatus.overall))}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(verificationStatus.overall)}
                <CardTitle className="text-base">Status Verifikasi: {verificationStatus.overall}</CardTitle>
              </div>
              {verificationStatus.overall === "Verified" && (
                <Badge variant="outline" className="bg-green-50">
                  ✓ Terverifikasi
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Identitas", status: verificationStatus.identity },
                { label: "Medis", status: verificationStatus.medical },
                { label: "Dokumen", status: verificationStatus.documents },
                { label: "Kelayakan", status: verificationStatus.eligibility },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  {getStatusIcon(item.status)}
                  <span>{item.label}: {item.status}</span>
                </div>
              ))}
            </div>
            {verificationStatus.approvedAt && (
              <p className="text-xs text-muted-foreground">
                Disetujui oleh {verificationStatus.approvedBy} pada {verificationStatus.approvedAt}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Warning Alert - IF in Creation Mode */}
      {mode === "create" && (
        <Alert className="border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-800">
            Pastikan semua informasi pemain akurat. Dokumen yang tidak lengkap akan menunda proses verifikasi.
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5 gap-2">
          <TabsTrigger value="profile" className="gap-2 flex items-center">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="photo" className="gap-2 flex items-center">
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Foto</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2 flex items-center">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Dokumen</span>
          </TabsTrigger>
          <TabsTrigger value="verification" className="gap-2 flex items-center">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Verifikasi</span>
          </TabsTrigger>
          {mode === "create" && (
            <TabsTrigger value="registration" className="gap-2 flex items-center">
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">Pendaftaran</span>
            </TabsTrigger>
          )}
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="profile" className="space-y-4 mt-6">
          <PlayerProfile initialData={playerData} mode={mode} />
        </TabsContent>

        <TabsContent value="photo" className="space-y-4 mt-6">
          <PlayerPhoto playerId={playerId} />
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 mt-6">
          <PlayerDocuments playerId={playerId} />
        </TabsContent>

        <TabsContent value="verification" className="space-y-4 mt-6">
          <PlayerVerification
            playerId={playerId}
            verificationStatus={verificationStatus}
            mode={mode}
          />
        </TabsContent>

        {mode === "create" && (
          <TabsContent value="registration" className="space-y-4 mt-6">
            <PlayerRegistration />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

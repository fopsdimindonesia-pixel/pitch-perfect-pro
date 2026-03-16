import { useState, useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  Eye,
  Trash2,
  Upload,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  File,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocumentFile } from "../PlayerManagement";

interface PlayerDocumentsProps {
  playerId?: string;
}

const DOCUMENT_TYPES = [
  { value: "ID", label: "Identitas (KTP/SIM/Paspor)" },
  { value: "Medical", label: "Sertifikat Medis" },
  { value: "Contract", label: "Kontrak Kerja" },
  { value: "Passport", label: "Paspor" },
  { value: "Other", label: "Dokumen Lainnya" },
];

export default function PlayerDocuments({ playerId }: PlayerDocumentsProps) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<DocumentFile[]>([
    {
      id: "1",
      name: "KTP - John Doe",
      type: "ID",
      uploadedAt: "2024-03-01",
      size: "523 KB",
      status: "Verified",
      url: "/docs/ktp.pdf",
    },
    {
      id: "2",
      name: "Medical Certificate",
      type: "Medical",
      uploadedAt: "2024-03-05",
      size: "1.2 MB",
      status: "Verified",
      url: "/docs/medical.pdf",
    },
    {
      id: "3",
      name: "Contract Agreement",
      type: "Contract",
      uploadedAt: "2024-03-08",
      size: "856 KB",
      status: "Pending Review",
      url: "/docs/contract.pdf",
    },
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && selectedType) {
      handleUpload(files);
    }
  };

  const handleUpload = async (files: FileList) => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      const file = files[0];
      const newDoc: DocumentFile = {
        id: Date.now().toString(),
        name: file.name,
        type: (selectedType as DocumentFile["type"]) || "Other",
        uploadedAt: new Date().toLocaleDateString("id-ID"),
        size:
          file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${(file.size / 1024).toFixed(0)} KB`,
        status: "Pending Review",
        url: URL.createObjectURL(file),
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setIsUploading(false);
      setSelectedType("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 1500);
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified":
        return <CheckCircle2 className="w-4 h-4" />;
      case "Pending Review":
        return <Clock className="w-4 h-4" />;
      case "Rejected":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-50 text-green-700";
      case "Pending Review":
        return "bg-yellow-50 text-yellow-700";
      case "Rejected":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const completedDocs = documents.filter((d) => d.status === "Verified").length;
  const requiredDocs = 4;

  return (
    <div className="space-y-6">
      {/* Document Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Persyaratan Dokumen</CardTitle>
          <CardDescription>
            Dokumen yang diperlukan untuk verifikasi pemain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                style={{ width: `${(completedDocs / requiredDocs) * 100}%` }}
              />
            </div>
            <Badge variant="outline">
              {completedDocs}/{requiredDocs} Lengkap
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              { name: "Identitas", icon: "🪪" },
              { name: "Sertifikat Medis", icon: "🏥" },
              { name: "Kontrak Kerja", icon: "📋" },
              { name: "Paspor/Visa", icon: "✈️" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Unggah Dokumen Baru</CardTitle>
          <CardDescription>Pilih jenis dokumen dan file untuk diunggah</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading || !selectedType}
          />

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis dokumen" />
            </SelectTrigger>
            <SelectContent>
              {DOCUMENT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={!selectedType || isUploading}
            className="w-full gap-2"
          >
            <Upload className="w-4 h-4" />
            {isUploading
              ? "Mengunggah..."
              : selectedType
                ? "Pilih File"
                : "Pilih Jenis Dokumen Dulu"}
          </Button>

          <Alert className="bg-blue-50 border-blue-200">
            <FileText className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Format file yang diterima: PDF, JPG, PNG, DOC, DOCX (Maks: 10MB)
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Documents List */}
      {documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Dokumen Terunggah</CardTitle>
            <CardDescription>{documents.length} dokumen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-4 p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 rounded bg-gray-100">
                    <File className="w-5 h-5 text-gray-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.size} • {doc.uploadedAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={cn(getStatusColor(doc.status))}>
                      <span className="mr-1">
                        {getStatusIcon(doc.status)}
                      </span>
                      {doc.status}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(doc.id)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Catatan Verifikasi</CardTitle>
          <CardDescription>Feedback dari tim verifikasi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Dokumen Kontrak Menunggu Review</p>
                <p className="text-xs text-muted-foreground mt-1">
                  File kontrak sedang diverifikasi oleh bagian legal. Proses biasanya memakan waktu 2-3 hari kerja.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-green-50 border border-green-200 space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Sertifikat Medis Terverifikasi</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Sertifikat medis pemain telah diverifikasi dan valid hingga 31 Desember 2024.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Checklist */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Checklist Dokumen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2 rounded bg-white"
            >
              <div
                className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center text-white text-xs font-bold",
                  doc.status === "Verified"
                    ? "bg-green-500 border-green-500"
                    : "bg-gray-300 border-gray-300"
                )}
              >
                {doc.status === "Verified" && "✓"}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.type}</p>
              </div>
              <Badge variant={doc.status === "Verified" ? "default" : "secondary"}>
                {doc.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

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
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  Camera,
  X,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoFile {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  status: "Active" | "Archived";
  url: string;
}

interface PlayerPhotoProps {
  playerId?: string;
}

export default function PlayerPhoto({ playerId }: PlayerPhotoProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [photos, setPhotos] = useState<PhotoFile[]>([
    {
      id: "1",
      name: "John Doe - Main Photo",
      size: 245,
      uploadDate: "2024-03-10",
      status: "Active",
      url: "https://via.placeholder.com/400x500?text=Player+Photo",
    },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    // Simulate upload
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          // Add new photo to list
          const file = files[0];
          setPhotos((prev) => [
            {
              id: Date.now().toString(),
              name: `${file.name} (Uploaded)`,
              size: Math.round(file.size / 1024),
              uploadDate: new Date().toLocaleDateString("id-ID"),
              status: "Active",
              url: URL.createObjectURL(file),
            },
            ...prev,
          ]);
        }, 500);
      }
      setUploadProgress(progress);
    }, 300);
  };

  const handleSetActive = (id: string) => {
    setPhotos((prev) =>
      prev.map((p) => ({
        ...p,
        status: p.id === id ? "Active" : "Archived",
      }))
    );
  };

  const handleDelete = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const activePhoto = photos.find((p) => p.status === "Active");

  return (
    <div className="space-y-6">
      {/* Guidelines */}
      <Alert className="bg-blue-50 border-blue-200">
        <ImageIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Panduan foto:</strong> Gunakan foto dalam format JPG atau PNG, ukuran
          maksimal 5MB, dengan rasio aspek 3:4 (300x400px minimum). Foto harus jelas,
          pencahayaan baik, dan menampilkan wajah pemain dengan jelas.
        </AlertDescription>
      </Alert>

      {/* Upload Area */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary hover:bg-gray-50"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="pt-8 pb-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
            disabled={isUploading}
          />

          <div className="flex flex-col items-center justify-center text-center gap-3">
            {isUploading ? (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div className="w-full max-w-xs space-y-2">
                  <p className="font-medium">Mengunggah foto...</p>
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {Math.round(uploadProgress)}%
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Seret atau klik untuk unggah</p>
                  <p className="text-sm text-muted-foreground">
                    JPG atau PNG, maks 5MB
                  </p>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Pilih Foto
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Active Photo Preview */}
      {activePhoto && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Foto Aktif</CardTitle>
            <CardDescription>Foto ini akan ditampilkan di profil pemain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="relative flex-shrink-0">
                <img
                  src={activePhoto.url}
                  alt="Active player photo"
                  className="w-40 h-48 object-cover rounded-lg border-4 border-primary shadow-lg"
                />
                <Badge className="absolute top-2 right-2 bg-green-600">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Aktif
                </Badge>
              </div>
              <div className="flex-1 space-y-4 flex flex-col justify-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Nama File
                  </p>
                  <p className="font-medium">{activePhoto.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Ukuran
                  </p>
                  <p className="font-medium">{activePhoto.size} KB</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tanggal Unggah
                  </p>
                  <p className="font-medium">{activePhoto.uploadDate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photo History */}
      {photos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Riwayat Foto</CardTitle>
            <CardDescription>
              Semua foto yang telah diunggah untuk pemain ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {photos.map((photo, idx) => (
                <div
                  key={photo.id}
                  className="flex items-center gap-4 p-3 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-12 h-12 object-cover rounded border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{photo.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {photo.size} KB • {photo.uploadDate}
                    </p>
                  </div>
                  <Badge variant={photo.status === "Active" ? "default" : "outline"}>
                    {photo.status}
                  </Badge>
                  <div className="flex gap-2">
                    {photo.status !== "Active" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetActive(photo.id)}
                        className="text-xs"
                      >
                        Set Aktif
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(photo.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {photos.length === 0 && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Belum ada foto pemain. Unggah foto untuk melanjutkan proses verifikasi.
          </AlertDescription>
        </Alert>
      )}

      {/* Photo Guidelines */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-base">Tips Foto Berkualitas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
              1
            </div>
            <div>
              <p className="font-medium">Pencahayaan Alami</p>
              <p className="text-muted-foreground">
                Ambil foto dengan cahaya alami atau pencahayaan studio yang baik
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
              2
            </div>
            <div>
              <p className="font-medium">Latar Belakang Netral</p>
              <p className="text-muted-foreground">
                Gunakan latar belakang netral (putih, abu-abu, atau biru muda)
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
              3
            </div>
            <div>
              <p className="font-medium">Fokus pada Wajah</p>
              <p className="text-muted-foreground">
                Pastikan wajah pemain jelas terlihat tanpa topi atau kacamata
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
              4
            </div>
            <div>
              <p className="font-medium">Rasio Aspek Tepat</p>
              <p className="text-muted-foreground">
                Gunakan rasio 3:4 (potret, bukan landscape)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

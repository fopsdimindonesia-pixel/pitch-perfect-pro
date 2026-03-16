import { useState } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { validateRequired } from "@/lib/validation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlayerFormData } from "../PlayerManagement";

interface PlayerProfileProps {
  initialData: PlayerFormData;
  mode: "create" | "edit";
}

const POSITIONS = [
  "GK",
  "CB",
  "LB",
  "RB",
  "LWB",
  "RWB",
  "CDM",
  "CAM",
  "CM",
  "RM",
  "LM",
  "LW",
  "RW",
  "CF",
  "ST",
  "SS",
];

const NATIONALITIES = [
  "Indonesia",
  "Malaysia",
  "Singapore",
  "Thailand",
  "Vietnam",
  "Philippines",
];

const FOOT_OPTIONS = ["Left", "Right", "Both"];

const STATUS_OPTIONS = ["Active", "Injured", "Suspended", "On Loan", "Loaned Out"];

export default function PlayerProfile({
  initialData,
  mode,
}: PlayerProfileProps) {
  const [isSaving, setIsSaving] = useState(false);

  const schema = {
    firstName: [(value: unknown) => validateRequired(value as string, "First name")],
    lastName: [(value: unknown) => validateRequired(value as string, "Last name")],
    dateOfBirth: [(value: unknown) => validateRequired(value as string, "Date of birth")],
    nationality: [(value: unknown) => validateRequired(value as string, "Nationality")],
    idNumber: [(value: unknown) => validateRequired(value as string, "ID number")],
    height: [(value: unknown) => validateRequired(value as string, "Height")],
    weight: [(value: unknown) => validateRequired(value as string, "Weight")],
    foot: [(value: unknown) => validateRequired(value as string, "Preferred foot")],
    position: [(value: unknown) => validateRequired(value as string, "Position")],
    jerNumber: [(value: unknown) => validateRequired(value as string, "Jersey number")],
    joinDate: [(value: unknown) => validateRequired(value as string, "Join date")],
    contractExpiry: [(value: unknown) => validateRequired(value as string, "Contract expiry")],
    currentStatus: [(value: unknown) => validateRequired(value as string, "Status")],
  };

  const form = useFormValidation<any>({
    initialValues: initialData,
    schema: schema as any,
    onSubmit: async (data) => {
      setIsSaving(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Saved profile data:", data);
      } finally {
        setIsSaving(false);
      }
    },
  });

  const isComplete =
    form.values.firstName &&
    form.values.lastName &&
    form.values.dateOfBirth &&
    form.values.nationality &&
    form.values.idNumber;

  const handleFieldSelect = (fieldName: keyof PlayerFormData, value: string) => {
    form.setFieldValue(fieldName, value);
  };

  return (
    <form onSubmit={form.handleSubmit} className="space-y-6">
      {/* Profile Completion Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Kelengkapan Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
                style={{ width: isComplete ? "100%" : "60%" }}
              />
            </div>
            <Badge variant={isComplete ? "default" : "secondary"}>
              {isComplete ? "100% Lengkap" : "60% Lengkap"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informasi Pribadi</CardTitle>
          <CardDescription>Data dasar pemain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Depan *</label>
              <Input
                name="firstName"
                placeholder="John"
                value={(form.values.firstName as string) || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled={isSaving}
                className={cn(
                  "transition-all",
                  form.getFieldError("firstName") && "border-red-500"
                )}
              />
              {form.getFieldError("firstName") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("firstName")}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Belakang *</label>
              <Input
                name="lastName"
                placeholder="Doe"
                value={(form.values.lastName as string) || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled={isSaving}
                className={cn(
                  "transition-all",
                  form.getFieldError("lastName") && "border-red-500"
                )}
              />
              {form.getFieldError("lastName") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("lastName")}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tanggal Lahir *</label>
              <Input
                name="dateOfBirth"
                type="date"
                value={(form.values.dateOfBirth as string) || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled={isSaving}
                className={cn(
                  "transition-all",
                  form.getFieldError("dateOfBirth") && "border-red-500"
                )}
              />
              {form.getFieldError("dateOfBirth") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("dateOfBirth")}
                </p>
              )}
            </div>

            {/* Nationality */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Kebangsaan *</label>
              <Select
                value={(form.values.nationality as string) || ""}
                onValueChange={(value) =>
                  handleFieldSelect("nationality", value)
                }
              >
                <SelectTrigger disabled={isSaving}>
                  <SelectValue placeholder="Pilih kebangsaan" />
                </SelectTrigger>
                <SelectContent>
                  {NATIONALITIES.map((nat) => (
                    <SelectItem key={nat} value={nat}>
                      {nat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.getFieldError("nationality") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("nationality")}
                </p>
              )}
            </div>

            {/* ID Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Nomor Identitas *</label>
              <Input
                name="idNumber"
                placeholder="3274123456789012"
                value={(form.values.idNumber as string) || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled={isSaving}
                className={cn(
                  "transition-all",
                  form.getFieldError("idNumber") && "border-red-500"
                )}
              />
              {form.getFieldError("idNumber") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("idNumber")}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Physical Attributes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Atribut Fisik</CardTitle>
          <CardDescription>Data tinggi dan berat badan pemain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Height */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tinggi Badan (cm) *</label>
              <Input
                name="height"
                type="number"
                placeholder="180"
                value={(form.values.height as string) || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled={isSaving}
                className={cn(
                  "transition-all",
                  form.getFieldError("height") && "border-red-500"
                )}
              />
              {form.getFieldError("height") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("height")}
                </p>
              )}
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Berat Badan (kg) *</label>
              <Input
                name="weight"
                type="number"
                placeholder="75"
                value={(form.values.weight as string) || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled={isSaving}
                className={cn(
                  "transition-all",
                  form.getFieldError("weight") && "border-red-500"
                )}
              />
              {form.getFieldError("weight") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("weight")}
                </p>
              )}
            </div>

            {/* Preferred Foot */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Kaki Dominan *</label>
              <Select
                value={(form.values.foot as string) || ""}
                onValueChange={(value) => handleFieldSelect("foot", value)}
              >
                <SelectTrigger disabled={isSaving}>
                  <SelectValue placeholder="Pilih kaki" />
                </SelectTrigger>
                <SelectContent>
                  {FOOT_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.getFieldError("foot") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("foot")}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Football Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informasi Sepak Bola</CardTitle>
          <CardDescription>
            Data posisi, nomor jersey, dan informasi kontrak
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Position */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Posisi *</label>
              <Select
                value={(form.values.position as string) || ""}
                onValueChange={(value) => handleFieldSelect("position", value)}
              >
                <SelectTrigger disabled={isSaving}>
                  <SelectValue placeholder="Pilih posisi" />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map((pos) => (
                    <SelectItem key={pos} value={pos}>
                      {pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.getFieldError("position") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("position")}
                </p>
              )}
            </div>

            {/* Jersey Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Nomor Jersey *</label>
              <Input
                name="jerNumber"
                type="number"
                placeholder="10"
                min="1"
                max="99"
                value={(form.values.jerNumber as string) || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled={isSaving}
                className={cn(
                  "transition-all",
                  form.getFieldError("jerNumber") && "border-red-500"
                )}
              />
              {form.getFieldError("jerNumber") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("jerNumber")}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status *</label>
              <Select
                value={(form.values.currentStatus as string) || ""}
                onValueChange={(value) =>
                  handleFieldSelect("currentStatus", value)
                }
              >
                <SelectTrigger disabled={isSaving}>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.getFieldError("currentStatus") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("currentStatus")}
                </p>
              )}
            </div>

            {/* Join Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tanggal Bergabung *</label>
              <Input
                name="joinDate"
                type="date"
                value={(form.values.joinDate as string) || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled={isSaving}
                className={cn(
                  "transition-all",
                  form.getFieldError("joinDate") && "border-red-500"
                )}
              />
              {form.getFieldError("joinDate") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("joinDate")}
                </p>
              )}
            </div>

            {/* Contract Expiry */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tanggal Kontrak Berakhir *
              </label>
              <Input
                name="contractExpiry"
                type="date"
                value={(form.values.contractExpiry as string) || ""}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                disabled={isSaving}
                className={cn(
                  "transition-all",
                  form.getFieldError("contractExpiry") && "border-red-500"
                )}
              />
              {form.getFieldError("contractExpiry") && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {form.getFieldError("contractExpiry")}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Approval */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base">Status Persetujuan Medis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-600">✓ Lulus Medical Check-Up</Badge>
            <p className="text-sm text-muted-foreground">
              Pemain telah menyelesaikan pemeriksaan medis pada 15 Mar 2024
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button
        type="submit"
        disabled={isSaving}
        className="w-full"
        size="lg"
      >
        {isSaving ? "Menyimpan..." : "Simpan Profil Pemain"}
      </Button>
    </form>
  );
}

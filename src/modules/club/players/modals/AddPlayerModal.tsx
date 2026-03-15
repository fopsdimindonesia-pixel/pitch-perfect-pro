import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PlayerManagement from "../PlayerManagement";
import type { PlayerFormData } from "../PlayerManagement";

interface AddPlayerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const initialData: PlayerFormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  nationality: "",
  idNumber: "",
  position: "",
  jerNumber: "",
  height: "",
  weight: "",
  foot: "Right",
  joinDate: "",
  contractExpiry: "",
  currentStatus: "Active",
  medicalApproval: false,
};

export function AddPlayerModal({ open, onOpenChange, onSuccess }: AddPlayerModalProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSuccess = () => {
    setIsSaving(false);
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Player</DialogTitle>
          <DialogDescription>
            Fill in the player information below. All required fields must be completed.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <PlayerManagement initialData={initialData} mode="create" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

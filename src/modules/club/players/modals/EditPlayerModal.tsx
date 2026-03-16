import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PlayerManagement from "../PlayerManagement";
import type { PlayerFormData } from "../PlayerManagement";

interface EditPlayerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playerData: PlayerFormData;
  onSuccess?: () => void;
}

export function EditPlayerModal({ open, onOpenChange, playerData, onSuccess }: EditPlayerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Player</DialogTitle>
          <DialogDescription>
            Update {playerData.firstName} {playerData.lastName}'s information below.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <PlayerManagement initialData={playerData} mode="edit" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

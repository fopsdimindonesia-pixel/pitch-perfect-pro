import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Edit2, Trash2, AlertCircle } from "lucide-react";
import { mockPlayerData } from "@/lib/mockData";
import { EditPlayerModal } from "./modals/EditPlayerModal";
import { ConfirmDeleteDialog } from "@/components/dialogs/ConfirmDeleteDialog";
import type { PlayerFormData } from "./PlayerManagement";

export default function PlayerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Find player from mock data
  const player = mockPlayerData.players.find((p) => p.id === id);

  if (!player) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900">Player Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-800 mb-4">We couldn't find the player you're looking for.</p>
            <Button onClick={() => navigate("/club/players")}>Back to Players</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsDeleting(false);
    setDeleteOpen(false);
    // Navigate back to players list
    navigate("/club/players");
  };

  const playerFormData: PlayerFormData = {
    id: player.id,
    firstName: player.name.split(" ")[0],
    lastName: player.name.split(" ").slice(1).join(" "),
    dateOfBirth: player.dob || "",
    nationality: player.nationality || "Indonesia",
    idNumber: player.idNumber || "",
    position: player.position,
    jerNumber: player.number.toString(),
    height: player.height?.toString() || "",
    weight: player.weight?.toString() || "",
    foot: "Right",
    joinDate: "",
    contractExpiry: "",
    currentStatus: "Active",
    medicalApproval: player.eligibility === "Eligible",
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/club/players")}
          className="h-10 w-10"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{player.name}</h1>
          <p className="text-gray-600">#{player.number} • {player.position}</p>
        </div>
      </div>

      {/* Status Alert */}
      {player.eligibility === "Not Eligible" && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            This player is not eligible to play. Please check the eligibility status.
          </AlertDescription>
        </Alert>
      )}

      {/* Player Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Primary Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Player Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="font-medium">{player.dob || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Nationality</p>
              <p className="font-medium">{player.nationality || "Indonesia"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ID Number</p>
              <p className="font-medium">{player.idNumber || "Not provided"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Physical Attributes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Physical Attributes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Height</p>
              <p className="font-medium">{player.height ? `${player.height} cm` : "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Weight</p>
              <p className="font-medium">{player.weight ? `${player.weight} kg` : "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Position</p>
              <Badge>{player.position}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Eligibility</p>
              <Badge
                variant={player.eligibility === "Eligible" ? "default" : "secondary"}
                className={
                  player.eligibility === "Eligible"
                    ? "bg-green-600"
                    : "bg-yellow-600"
                }
              >
                {player.eligibility}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Age</p>
              <p className="font-medium">{player.age} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fee Status</p>
              <Badge variant="outline">{player.feeStatus}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Season Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded">
              <p className="text-2xl font-bold text-blue-600">{player.goals}</p>
              <p className="text-sm text-gray-600">Goals</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded">
              <p className="text-2xl font-bold text-green-600">{player.assists}</p>
              <p className="text-sm text-gray-600">Assists</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded">
              <p className="text-2xl font-bold text-red-600">{player.cards}</p>
              <p className="text-sm text-gray-600">Cards</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={() => navigate("/club/players")}
        >
          Back to List
        </Button>
        <Button
          onClick={() => setEditOpen(true)}
          className="gap-2"
        >
          <Edit2 className="w-4 h-4" />
          Edit Player
        </Button>
        <Button
          variant="destructive"
          onClick={() => setDeleteOpen(true)}
          className="gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </div>

      {/* Edit Modal */}
      <EditPlayerModal
        open={editOpen}
        onOpenChange={setEditOpen}
        playerData={playerFormData}
        onSuccess={() => {
          // Refresh player data
        }}
      />

      {/* Delete Confirmation */}
      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Player"
        description="This action cannot be undone. The player will be permanently removed from the roster."
        itemName={player.name}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        isDangerous={true}
      />
    </div>
  );
}

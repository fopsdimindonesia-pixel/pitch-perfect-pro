import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Edit2, Trash2, AlertCircle } from "lucide-react";
import { mockPlayers } from "@/lib/mockData";
import type { PlayerFormData } from "@/modules/club/players/PlayerManagement";
import { ConfirmDeleteDialog } from "@/components/dialogs/ConfirmDeleteDialog";

export default function PlayerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const player = mockPlayers.find((p) => p.id === id);

  if (!player) {
    return (
      <div className="p-6">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle>Player Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">We couldn't find the player you're looking for.</p>
            <Button onClick={() => navigate("/club/players")}>Back to Players</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsDeleting(false);
    setDeleteOpen(false);
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
    height: String(player.height || ""),
    weight: String(player.weight || ""),
    foot: "Right",
    joinDate: "",
    contractExpiry: "",
    currentStatus: "Active",
    medicalApproval: player.eligibility === "Verified",
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/club/players")} className="h-10 w-10">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{player.name}</h1>
          <p className="text-muted-foreground">#{player.number} • {player.position}</p>
        </div>
      </div>

      {player.eligibility === "Suspended" && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            This player is currently suspended and not eligible to play.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Player Info</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><p className="text-sm text-muted-foreground">Date of Birth</p><p className="font-medium">{player.dob || "Not provided"}</p></div>
            <div><p className="text-sm text-muted-foreground">Nationality</p><p className="font-medium">{player.nationality || "Indonesia"}</p></div>
            <div><p className="text-sm text-muted-foreground">ID Number</p><p className="font-medium">{player.idNumber || "Not provided"}</p></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Physical</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div><p className="text-sm text-muted-foreground">Height</p><p className="font-medium">{player.height ? `${player.height} cm` : "N/A"}</p></div>
            <div><p className="text-sm text-muted-foreground">Weight</p><p className="font-medium">{player.weight ? `${player.weight} kg` : "N/A"}</p></div>
            <div><p className="text-sm text-muted-foreground">Position</p><Badge>{player.position}</Badge></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Status</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Eligibility</p>
              <Badge variant={player.eligibility === "Verified" ? "default" : "secondary"}>
                {player.eligibility}
              </Badge>
            </div>
            <div><p className="text-sm text-muted-foreground">Age</p><p className="font-medium">{player.age} years</p></div>
            <div><p className="text-sm text-muted-foreground">Fee Status</p><Badge variant="outline">{player.feeStatus}</Badge></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Season Statistics</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded bg-primary/10">
              <p className="text-2xl font-bold text-primary">{player.goals}</p>
              <p className="text-sm text-muted-foreground">Goals</p>
            </div>
            <div className="text-center p-3 rounded bg-green-500/10">
              <p className="text-2xl font-bold text-green-600">{player.assists}</p>
              <p className="text-sm text-muted-foreground">Assists</p>
            </div>
            <div className="text-center p-3 rounded bg-destructive/10">
              <p className="text-2xl font-bold text-destructive">{player.cards}</p>
              <p className="text-sm text-muted-foreground">Cards</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={() => navigate("/club/players")}>Back to List</Button>
        <Button onClick={() => setEditOpen(true)} className="gap-2">
          <Edit2 className="w-4 h-4" /> Edit Player
        </Button>
        <Button variant="destructive" onClick={() => setDeleteOpen(true)} className="gap-2">
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </div>

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

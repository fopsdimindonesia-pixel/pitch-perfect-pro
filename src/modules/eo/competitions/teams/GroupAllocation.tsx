import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, GripVertical, Check, AlertTriangle, Zap, Lock, Unlock, RotateCcw, RotateCw } from "lucide-react";
import { useCompetition, RegistrationData } from "../context/CompetitionContext";
import { CompetitionSwitcher } from "../components/CompetitionSwitcher";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { saveGroupAllocation, publishLockedAllocation } from "../api";

// ─── Types ──────────────────────────────────────────────────────────────
type DistributionStrategy = "balanced" | "manual" | "snake-draft";

interface GroupWithTeams {
  id: string;
  name: string;
  clubIds: string[];
}

interface DragState {
  draggedClubId: string | null;
  sourceGroupId: string | null;
}

interface ValidationError {
  type: "warning" | "error";
  message: string;
}

// ─── Helper Function: Calculate groups based on format ──────────────────
function calculateGroupCountByFormat(
  format: string,
  teamCount: number
): number {
  if (teamCount === 0) return 0;

  switch (format?.toLowerCase()) {
    case "knockout":
      // Knockout: single elimination, usually 1 group/bracket
      return 1;

    case "league":
      // League: multiple groups for round-robin variety
      if (teamCount <= 4) return 1;
      if (teamCount <= 8) return 2;
      if (teamCount <= 12) return 3;
      return Math.ceil(teamCount / 4); // 4 teams per group ideal

    case "group+ko":
      // Group stage + Knockout: balanced groups for advancement
      if (teamCount <= 4) return 1;
      if (teamCount <= 8) return 2;
      if (teamCount <= 12) return 3;
      return Math.ceil(teamCount / 4);

    default:
      // Default logic
      return teamCount <= 4 ? 1 : teamCount <= 8 ? 2 : Math.ceil(teamCount / 4);
  }
}

// ─── Helper Function: Get team limits per group ──────────────────────────────
function getGroupLimits(
  format: string,
  totalTeams: number,
  numGroups: number
): { min: number; max: number; ideal: number } {
  const baseIdeal = Math.ceil(totalTeams / numGroups);

  switch (format?.toLowerCase()) {
    case "knockout":
      // Knockout brackets work with any size
      return { min: 2, max: totalTeams, ideal: baseIdeal };

    case "league":
      // League prefers 3-6 teams per group for good round-robin
      return { min: 3, max: 6, ideal: 4 };

    case "group+ko":
      // Group stage: balanced groups advancing to knockout
      return { min: 3, max: 8, ideal: baseIdeal };

    default:
      return { min: 2, max: totalTeams, ideal: baseIdeal };
  }
}

// ─── Helper Function: Auto-balance distribution ──────────────────────────────
function autoBalanceGroups(
  currentGroups: GroupWithTeams[],
  teams: RegistrationData[]
): GroupWithTeams[] {
  const numGroups = currentGroups.length;
  const baseSize = Math.floor(teams.length / numGroups);
  const remainder = teams.length % numGroups;

  return currentGroups.map((group, idx) => ({
    ...group,
    clubIds: teams
      .slice(
        idx * baseSize + Math.min(idx, remainder),
        (idx + 1) * baseSize + Math.min(idx + 1, remainder)
      )
      .map((t) => t.clubId),
  }));
}

// ─── Helper Function: Distribute teams by strategy ──────────────────────
function distributeTeams(
  teams: RegistrationData[],
  numGroups: number,
  strategy: DistributionStrategy
): string[][] {
  const groups: string[][] = Array.from({ length: numGroups }, () => []);

  if (strategy === "balanced") {
    // Simple round-robin: distribute evenly
    teams.forEach((team, idx) => {
      groups[idx % numGroups].push(team.clubId);
    });
  } else if (strategy === "snake-draft") {
    // Snake draft: alternate direction per round
    let groupIdx = 0;
    let direction = 1; // 1 = forward, -1 = backward
    const teamsPerRound = numGroups;

    teams.forEach((team, idx) => {
      groups[groupIdx].push(team.clubId);
      groupIdx += direction;

      // Reverse direction at boundaries
      if (groupIdx >= numGroups) {
        groupIdx = numGroups - 2;
        direction = -1;
      } else if (groupIdx < 0) {
        groupIdx = 1;
        direction = 1;
      }
    });
  } else if (strategy === "manual") {
    // Manual: distribute evenly, let user drag to customize
    teams.forEach((team, idx) => {
      groups[idx % numGroups].push(team.clubId);
    });
  }

  return groups;
}

// ─── Component ──────────────────────────────────────────────────────────
export default function GroupAllocation() {
  const { activeCompetition, registrations, competitionConfig } = useCompetition();

  // ─── State Management ────────────────────────────────────────────────
  const [groups, setGroups] = useState<GroupWithTeams[]>([]);
  const [dragState, setDragState] = useState<DragState>({ draggedClubId: null, sourceGroupId: null });
  const [dragOverGroupId, setDragOverGroupId] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalGroups, setOriginalGroups] = useState<GroupWithTeams[]>([]);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [strategy, setStrategy] = useState<DistributionStrategy>("balanced");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [groupsLocked, setGroupsLocked] = useState(false);
  const [history, setHistory] = useState<GroupWithTeams[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // ─── Compute initial groups based on format and strategy ──────────────
  const initialGroups = useMemo(() => {
    if (!activeCompetition) return [];

    const approvedRegistrations = registrations.filter((r) => r.status === "Approved");
    if (approvedRegistrations.length === 0) return [];

    const teamCount = approvedRegistrations.length;
    const numGroups = calculateGroupCountByFormat(activeCompetition.format, teamCount);
    const distributedTeams = distributeTeams(approvedRegistrations, numGroups, strategy);

    const groupNames = ["A", "B", "C", "D", "E", "F"];
    return distributedTeams.map((clubIds, i) => ({
      id: `group-${i}`,
      name: `Group ${groupNames[i] || i + 1}`,
      clubIds,
    }));
  }, [activeCompetition, registrations, strategy]);

  // ─── Initialize groups on mount or when initialGroups changes ────────
  useEffect(() => {
    if (initialGroups.length > 0) {
      setGroups(initialGroups);
      setOriginalGroups(initialGroups);
      setHistory([initialGroups]); // Initialize history with initial state
      setHistoryIndex(0); // Start at index 0
      setHasChanges(false);
      setGroupsLocked(false); // Reset lock when groups change
      setSaveMessage(null);
    }
  }, [initialGroups]);

  // ─── Validate against CompetitionConfig constraints ──────────────────
  const validateGroups = useCallback(() => {
    const errors: ValidationError[] = [];

    if (!competitionConfig.categories || competitionConfig.categories.length === 0) {
      return errors; // No constraints to validate
    }

    const maxTeamsAllowed = competitionConfig.categories[0]?.maxTeams || 999;

    // Check if total teams exceed limits
    const totalTeams = groups.reduce((sum, g) => sum + g.clubIds.length, 0);
    if (totalTeams > maxTeamsAllowed) {
      errors.push({
        type: "error",
        message: `Jumlah tim (${totalTeams}) melebihi batas maksimal (${maxTeamsAllowed})`,
      });
    }

    // Check for empty groups
    const emptyGroups = groups.filter((g) => g.clubIds.length === 0);
    if (emptyGroups.length > 0) {
      errors.push({
        type: "warning",
        message: `Ada ${emptyGroups.length} grup kosong. Pertimbangkan untuk menambah atau menghapus grup.`,
      });
    }

    // Check for unbalanced groups (variance > 2 teams)
    if (groups.length > 1) {
      const sizes = groups.map((g) => g.clubIds.length);
      const maxSize = Math.max(...sizes);
      const minSize = Math.min(...sizes);
      if (maxSize - minSize > 2) {
        errors.push({
          type: "warning",
          message: `Distribusi tim tidak seimbang (min: ${minSize}, max: ${maxSize}). Gunakan "Balanced" strategy.`,
        });
      }
    }

    return errors;
  }, [groups, competitionConfig]);

  // ─── Update validation errors when groups change ─────────────────────
  useEffect(() => {
    setValidationErrors(validateGroups());
  }, [groups, validateGroups]);

  // ─── Helpers ────────────────────────────────────────────────────────
  const getTeamNameById = useCallback(
    (clubId: string) => registrations.find((r) => r.clubId === clubId)?.clubName || clubId,
    [registrations]
  );

  const getAllTeams = useCallback(
    () => registrations.filter((r) => r.status === "Approved"),
    [registrations]
  );

  const getAllocatedClubIds = useCallback(() => {
    return new Set(groups.flatMap((g) => g.clubIds));
  }, [groups]);

  const getUnallocatedTeams = useCallback(() => {
    const allocated = getAllocatedClubIds();
    return getAllTeams().filter((t) => !allocated.has(t.clubId));
  }, [groups, getAllTeams, getAllocatedClubIds]);

  // ─── Drag Handlers ──────────────────────────────────────────────────
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, clubId: string, sourceGroupId: string) => {
      if (groupsLocked) {
        e.preventDefault();
        return;
      }
      setDragState({ draggedClubId: clubId, sourceGroupId });
      e.dataTransfer.effectAllowed = "move";
      e.currentTarget.style.opacity = "0.5";
    },
    [groupsLocked]
  );

  const handleDragEnd = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1";
    setDragState({ draggedClubId: null, sourceGroupId: null });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.currentTarget.style.border = "2px dashed hsl(var(--primary))";
    e.currentTarget.style.backgroundColor = "hsl(var(--primary) / 0.05)";
    e.currentTarget.style.transform = "scale(1.01)";
    e.currentTarget.style.transition = "all 0.15s ease-in-out";
    setDragOverGroupId((e.currentTarget as any).dataset.groupId || null);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.border = "";
    e.currentTarget.style.backgroundColor = "";
    e.currentTarget.style.transform = "";
    setDragOverGroupId(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, targetGroupId: string) => {
      e.preventDefault();
      e.currentTarget.style.border = "";

      // Prevent drop if groups are locked
      if (groupsLocked) {
        setSaveMessage({
          type: "error",
          text: "✗ Alokasi grup terkunci. Buka kunci untuk mengubah.",
        });
        return;
      }

      const { draggedClubId, sourceGroupId } = dragState;
      if (!draggedClubId || !sourceGroupId) return;

      if (sourceGroupId === targetGroupId) return; // No-op: same group

      // Get group limits and check if target group is full
      const limits = getGroupLimits(
        activeCompetition?.format || "",
        groups.reduce((sum, g) => sum + g.clubIds.length, 0),
        groups.length
      );
      
      const targetGroup = groups.find((g) => g.id === targetGroupId);
      if (targetGroup && targetGroup.clubIds.length >= limits.max) {
        setSaveMessage({
          type: "error",
          text: `✗ Grup ${targetGroup.name} sudah penuh (max: ${limits.max} tim)`,
        });
        return; // Prevent drop
      }

      const newGroups = groups.map((group) => {
        if (group.id === sourceGroupId) {
          return {
            ...group,
            clubIds: group.clubIds.filter((id) => id !== draggedClubId),
          };
        }
        if (group.id === targetGroupId) {
          return {
            ...group,
            clubIds: [...group.clubIds, draggedClubId],
          };
        }
        return group;
      });

      // Add to history for undo/redo
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newGroups);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);

      setGroups(newGroups);
      setHasChanges(true);
      setSaveMessage(null);
      setDragState({ draggedClubId: null, sourceGroupId: null });
    },
    [dragState, groups, activeCompetition, groupsLocked, history, historyIndex]
  );

  // ─── Strategy Distribution Handler ──────────────────────────────────
  const handleStrategyChange = useCallback(
    (newStrategy: DistributionStrategy) => {
      setStrategy(newStrategy);
      // Reset groups with new strategy (will trigger useEffect)
      setHasChanges(false);
      setSaveMessage(null);
    },
    []
  );

  // ─── Quick Action Handlers ──────────────────────────────────────────
  const handleAutoBalance = useCallback(() => {
    const allTeams = getAllTeams();
    const balanced = autoBalanceGroups(groups, allTeams);
    setGroups(balanced);
    setHasChanges(true);
    setSaveMessage(null);
  }, [groups, getAllTeams]);

  const handleDistributeEvenly = useCallback(() => {
    const allTeams = getAllTeams();
    const numGroups = groups.length;
    const distributed = distributeTeams(allTeams, numGroups, "balanced");

    const newGroups = groups.map((group, idx) => ({
      ...group,
      clubIds: distributed[idx],
    }));
    setGroups(newGroups);
    setHasChanges(true);
    setSaveMessage(null);
  }, [groups, getAllTeams]);

  // ─── Action Handlers ────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!activeCompetition) return;

    const errors = validationErrors.filter((e) => e.type === "error");
    if (errors.length > 0) {
      setSaveMessage({ type: "error", text: "✗ Gagal: Ada kesalahan validasi" });
      return;
    }

    try {
      // Call API to save group allocation
      const result = await saveGroupAllocation(
        activeCompetition.id,
        groups,
        groupsLocked
      );

      if (result.success) {
        setSaveMessage({ type: "success", text: "✓ " + result.message });
        setHasChanges(false);
        setOriginalGroups(groups);
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage({ type: "error", text: "✗ " + result.message });
      }
    } catch (error) {
      setSaveMessage({ type: "error", text: "✗ Gagal menyimpan alokasi grup" });
    }
  }, [groups, validationErrors, activeCompetition, groupsLocked]);

  const handleReset = useCallback(() => {
    if (originalGroups.length > 0) {
      setGroups(originalGroups);
      setHasChanges(false);
      setSaveMessage(null);
    }
  }, [originalGroups]);

  // ─── Group Locking Handlers ────────────────────────────────────────
  const handleLockAllocation = useCallback(async () => {
    if (!activeCompetition) return;

    try {
      // Call API to publish locked allocation
      const result = await publishLockedAllocation(activeCompetition.id, groups);
      
      if (result.success) {
        setGroupsLocked(true);
        setSaveMessage({ type: "success", text: "✓ " + result.message });
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage({ type: "error", text: "✗ " + result.message });
      }
    } catch (error) {
      setSaveMessage({ type: "error", text: "✗ Gagal mengunci alokasi grup" });
    }
  }, [activeCompetition, groups]);

  const handleUnlock = useCallback(() => {
    setGroupsLocked(false);
    setSaveMessage({ type: "success", text: "✓ Alokasi grup dibuka untuk perubahan" });
    setTimeout(() => setSaveMessage(null), 3000);
  }, []);

  // ─── Undo/Redo Handlers ────────────────────────────────────────────
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setGroups(history[newIndex]);
      setHasChanges(true);
      setSaveMessage({
        type: "success",
        text: `↶ Undo (${newIndex + 1} dari ${history.length})`,
      });
      setTimeout(() => setSaveMessage(null), 2000);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setGroups(history[newIndex]);
      setHasChanges(true);
      setSaveMessage({
        type: "success",
        text: `↷ Redo (${newIndex + 1} dari ${history.length})`,
      });
      setTimeout(() => setSaveMessage(null), 2000);
    }
  }, [history, historyIndex]);

  // ─── Render ─────────────────────────────────────────────────────────
  const unallocatedTeams = getUnallocatedTeams();
  const formatLabel = activeCompetition?.format || "Unknown";

  return (
    <div className="space-y-6" role="main" aria-label="Group allocation">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Group Allocation</h1>
            <p className="text-muted-foreground mt-1">
              Format: <span className="font-semibold">{formatLabel}</span> • Drag and drop teams ke dalam grup
            </p>
          </div>
          {hasChanges && (
            <Badge variant="destructive" className="animate-pulse">
              Belum Disimpan
            </Badge>
          )}
        </div>
      </div>

      <CompetitionSwitcher />

      {!activeCompetition ? (
        <Card className="p-8 text-center text-muted-foreground">Pilih kompetisi</Card>
      ) : groups.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          Belum ada tim yang disetujui untuk dialokasikan ke grup
        </Card>
      ) : (
        <>
          {/* Strategy Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Distribution Strategy</label>
              <Select value={strategy} onValueChange={(v) => handleStrategyChange(v as DistributionStrategy)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced (Even Distribution)</SelectItem>
                  <SelectItem value="snake-draft">Snake Draft (Alternating)</SelectItem>
                  <SelectItem value="manual">Manual (Drag & Drop)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {strategy === "balanced" && "Distribusi tim secara merata ke semua grup"}
                {strategy === "snake-draft" && "Distribusi bolak-balik untuk keseimbangan"}
                {strategy === "manual" && "Pengaturan manual dengan drag dan drop"}
              </p>
            </div>

            {/* Summary Stats */}
            <div className="flex items-end gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Teams</p>
                <p className="text-2xl font-bold">
                  {groups.reduce((sum, g) => sum + g.clubIds.length, 0)}/
                  {getAllTeams().length}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Groups</p>
                <p className="text-2xl font-bold">{groups.length}</p>
              </div>
            </div>

            {/* Format Info */}
            <div className="flex items-end">
              <div className="bg-muted p-3 rounded-lg text-sm">
                <p className="font-medium mb-1">Format Logic</p>
                <p className="text-xs text-muted-foreground">
                  {formatLabel.toLowerCase() === "knockout" &&
                    "Knockout: single bracket untuk eliminasi langsung"}
                  {formatLabel.toLowerCase() === "league" &&
                    "League: multiple groups dengan round-robin"}
                  {formatLabel.toLowerCase() === "group+ko" &&
                    "Group+KO: groups dilanjut knockout"}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 flex-wrap items-start">
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAutoBalance}
                      className="gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Auto Balance
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Otomatis seimbangkan distribusi tim di semua grup</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDistributeEvenly}
                      className="gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Distribute Evenly
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Distribusikan tim secara merata menggunakan strategi saat ini</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Separator */}
            <div className="border-l h-8 mx-2" />

            {/* Undo/Redo Controls */}
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUndo}
                      disabled={historyIndex <= 0}
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Undo
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {historyIndex > 0
                      ? `Batalkan perubahan (${historyIndex} dari ${history.length})`
                      : "Tidak ada yang bisa dibatalkan"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRedo}
                      disabled={historyIndex >= history.length - 1}
                      className="gap-2"
                    >
                      <RotateCw className="w-4 h-4" />
                      Redo
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {historyIndex < history.length - 1
                      ? `Ulangi perubahan (${historyIndex + 1} dari ${history.length})`
                      : "Tidak ada yang bisa diulangi"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Separator */}
            <div className="border-l h-8 mx-2" />

            {/* Lock/Unlock Control */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={groupsLocked ? "destructive" : "outline"}
                    size="sm"
                    onClick={groupsLocked ? handleUnlock : handleLockAllocation}
                    className="gap-2"
                  >
                    {groupsLocked ? (
                      <>
                        <Unlock className="w-4 h-4" />
                        Unlock
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Lock
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {groupsLocked
                    ? "Buka kunci untuk memungkinkan perubahan alokasi grup"
                    : "Kunci alokasi grup untuk mencegah perubahan tidak sengaja"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Success/Error Message */}
          {saveMessage && (
            <Alert
              className={
                saveMessage.type === "success"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }
            >
              <Check
                className={`h-4 w-4 ${
                  saveMessage.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              />
              <AlertDescription
                className={
                  saveMessage.type === "success" ? "text-green-800" : "text-red-800"
                }
              >
                {saveMessage.text}
              </AlertDescription>
            </Alert>
          )}

          {/* Validation Errors & Warnings */}
          {validationErrors.length > 0 && (
            <div className="space-y-2">
              {validationErrors.map((error, idx) => (
                <Alert
                  key={idx}
                  className={
                    error.type === "error"
                      ? "bg-red-50 border-red-200"
                      : "bg-yellow-50 border-yellow-200"
                  }
                >
                  {error.type === "error" ? (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  )}
                  <AlertDescription
                    className={
                      error.type === "error"
                        ? "text-red-800"
                        : "text-yellow-800"
                    }
                  >
                    {error.message}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          {/* Unallocated Teams Alert */}
          {unallocatedTeams.length > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {unallocatedTeams.length} tim belum dialokasikan:{" "}
                <span className="font-medium">{unallocatedTeams.map((t) => t.clubName).join(", ")}</span>
              </AlertDescription>
            </Alert>
          )}

          {/* Group Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map((group) => {
              const limits = getGroupLimits(
                activeCompetition?.format || "",
                groups.reduce((sum, g) => sum + g.clubIds.length, 0),
                groups.length
              );
              const isOverLimit = group.clubIds.length > limits.max;
              const isUnderLimit = group.clubIds.length < limits.min && group.clubIds.length > 0;
              const isDragOver = dragOverGroupId === group.id;

              return (
                <Card
                  key={group.id}
                  data-group-id={group.id}
                  className={`p-4 border-2 transition-all duration-150 ${
                    isDragOver
                      ? "border-primary bg-primary/5 scale-[1.01]"
                      : "border-transparent hover:border-muted"
                  } ${isOverLimit ? "border-red-300 bg-red-50" : ""} ${
                    isUnderLimit ? "border-yellow-300 bg-yellow-50" : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, group.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{group.name}</h3>
                      {groupsLocked && (
                        <Lock className="w-4 h-4 text-destructive" aria-label="Alokasi grup terkunci" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={isOverLimit ? "destructive" : isUnderLimit ? "secondary" : "outline"}
                        className="whitespace-nowrap"
                      >
                        {group.clubIds.length}/{limits.ideal}
                      </Badge>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="text-xs">
                              {limits.min}-{limits.max}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            Batas optimal: {limits.min}-{limits.max} tim
                            {isOverLimit && ` (Terlampaui!)`}
                            {isUnderLimit && ` (Kurang)`}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 min-h-32 bg-muted/30 rounded p-2 border border-border/50">
                    {group.clubIds.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                        {isDragOver ? "📥 Drop tim di sini" : "Drop tim di sini"}
                      </div>
                    ) : (
                      group.clubIds.map((clubId) => (
                        <div
                          key={clubId}
                          draggable={!groupsLocked}
                          onDragStart={(e) => handleDragStart(e, clubId, group.id)}
                          onDragEnd={handleDragEnd}
                          className={`flex items-center gap-2 p-3 bg-card border border-border rounded ${
                            groupsLocked
                              ? "cursor-not-allowed opacity-60"
                              : "cursor-grab active:cursor-grabbing hover:bg-accent hover:border-primary"
                          } transition-all duration-150 hover:shadow-sm`}
                          role="button"
                          tabIndex={groupsLocked ? -1 : 0}
                          aria-label={`Team: ${getTeamNameById(clubId)}`}
                        >
                          <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm flex-1 font-medium">{getTeamNameById(clubId)}</span>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={!hasChanges}
                    className="min-w-24"
                  >
                    Reset
                  </Button>
                </TooltipTrigger>
                {!hasChanges && (
                  <TooltipContent>Belum ada perubahan untuk direset</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleSave}
                    disabled={!hasChanges || validationErrors.some((e) => e.type === "error")}
                    className="min-w-24"
                  >
                    Save Allocation
                  </Button>
                </TooltipTrigger>
                {!hasChanges && (
                  <TooltipContent>Belum ada perubahan untuk disimpan</TooltipContent>
                )}
                {validationErrors.some((e) => e.type === "error") && (
                  <TooltipContent>Selesaikan kesalahan validasi terlebih dahulu</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </>
      )}
    </div>
  );
}

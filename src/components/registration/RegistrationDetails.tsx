import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Trophy, Zap } from "lucide-react";
import { Registration, CompetitionConstraints } from "@/types/registration";

interface RegistrationDetailsProps {
  registration: Registration;
  constraints: CompetitionConstraints;
  className?: string;
}

/**
 * Component showing registration details including:
 * - Player roster with ages and eligibility
 * - Competition constraints
 * - Constraint compliance summary
 */
export function RegistrationDetails({
  registration,
  constraints,
  className = "",
}: RegistrationDetailsProps) {
  const playerCount = registration.players?.length || 0;
  const rosterValidation = {
    current: playerCount,
    min: constraints.minRosterSize,
    max: constraints.maxRosterSize,
    status:
      playerCount < constraints.minRosterSize
        ? "below"
        : playerCount > constraints.maxRosterSize
          ? "above"
          : "valid",
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Constraints Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Syarat Kompetisi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Min Pemain
              </div>
              <div className="text-lg font-bold mt-1">
                {constraints.minRosterSize}
              </div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Max Pemain
              </div>
              <div className="text-lg font-bold mt-1">
                {constraints.maxRosterSize}
              </div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Batas Usia
              </div>
              <div className="text-lg font-bold mt-1">
                {extractAgeLimit(constraints.ageGroup)} tahun
              </div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Kuota Tersisa
              </div>
              <div className="text-lg font-bold mt-1">
                {constraints.slotsAvailable}/{constraints.maxTeams}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roster Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4" />
            Status Pemain ({playerCount} terdaftar)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">
                  Persyaratan Roster
                </div>
                <div className="text-2xl font-bold mt-1">
                  {playerCount}
                  <span className="text-sm font-normal text-muted-foreground">
                    / {constraints.minRosterSize}–{constraints.maxRosterSize}
                  </span>
                </div>
              </div>
              <div>
                <Badge
                  variant={
                    rosterValidation.status === "valid"
                      ? "default"
                      : "destructive"
                  }
                  className="text-xs py-1"
                >
                  {rosterValidation.status === "below"
                    ? `Kurang ${constraints.minRosterSize - playerCount}`
                    : rosterValidation.status === "above"
                      ? `Lebih ${playerCount - constraints.maxRosterSize}`
                      : "Valid"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Players Table */}
          {registration.players && registration.players.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="text-sm">
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="text-xs font-semibold">Nama</TableHead>
                    <TableHead className="text-xs font-semibold">Usia</TableHead>
                    <TableHead className="text-xs font-semibold">Posisi</TableHead>
                    <TableHead className="text-xs font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registration.players.map((player, idx) => (
                    <TableRow key={idx} className="hover:bg-muted/30">
                      <TableCell className="font-medium">
                        {player.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{player.age} th</span>
                          {player.age >
                            extractAgeLimit(constraints.ageGroup) && (
                            <Badge
                              variant="destructive"
                              className="text-[10px] px-1.5 py-0"
                            >
                              Melebihi
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            player.eligibility === "Verified"
                              ? "default"
                              : player.eligibility === "Suspended"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {translateEligibility(player.eligibility)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Tidak ada data pemain</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Helper to extract age limit from age group string (e.g., "U13" -> 13)
 */
function extractAgeLimit(ageGroup: string): number {
  const match = ageGroup.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

/**
 * Helper to translate eligibility status to Indonesian
 */
function translateEligibility(status: string): string {
  const map: Record<string, string> = {
    Verified: "Terverifikasi",
    Suspended: "Dilarang",
    Pending: "Tertunda",
    Ineligible: "Tidak Layak",
  };
  return map[status] || status;
}

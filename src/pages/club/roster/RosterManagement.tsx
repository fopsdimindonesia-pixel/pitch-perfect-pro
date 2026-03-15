import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, X } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { useState, useMemo } from "react";
import { focusVisibleClass } from "@/lib/accessibility";

interface Player {
  id: string;
  number: number;
  name: string;
  position: "GK" | "DEF" | "MID" | "FWD";
  status: "Active" | "Inactive" | "Loaned";
  joinedAt?: string;
}

export default function RosterManagement() {
  const [searchText, setSearchText] = useState("");
  const [positionFilter, setPositionFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const allPlayers: Player[] = [
    { id: "1", number: 1, name: "Citra Wijaya", position: "GK", status: "Active", joinedAt: "2020-06-15" },
    { id: "4", number: 4, name: "Rizky Pratama", position: "DEF", status: "Active", joinedAt: "2020-01-10" },
    { id: "5", number: 5, name: "Ahmad Suryanto", position: "DEF", status: "Active", joinedAt: "2021-03-20" },
    { id: "6", number: 6, name: "Bima Kusuma", position: "DEF", status: "Inactive", joinedAt: "2019-08-05" },
    { id: "8", number: 8, name: "Andi Kusuma", position: "MID", status: "Active", joinedAt: "2021-02-14" },
    { id: "10", number: 10, name: "Dani Pratama", position: "MID", status: "Active", joinedAt: "2020-11-22" },
    { id: "7", number: 7, name: "Evan Wijaya", position: "FWD", status: "Loaned", joinedAt: "2022-01-30" },
    { id: "9", number: 9, name: "Budi Santoso", position: "FWD", status: "Active", joinedAt: "2019-05-12" },
    { id: "11", number: 11, name: "Fajar Hidayat", position: "MID", status: "Active", joinedAt: "2021-07-08" },
    { id: "3", number: 3, name: "Galang Sutrisno", position: "DEF", status: "Active", joinedAt: "2020-09-18" },
  ];

  // Filter players berdasarkan search, position, dan status
  const filteredPlayers = useMemo(() => {
    return allPlayers.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          player.number.toString().includes(searchText);
      const matchesPosition = !positionFilter || player.position === positionFilter;
      const matchesStatus = !statusFilter || player.status === statusFilter;
      
      return matchesSearch && matchesPosition && matchesStatus;
    });
  }, [searchText, positionFilter, statusFilter]);

  // Hitung statistik berdasarkan filtered players
  const stats = useMemo(() => {
    return {
      total: filteredPlayers.length,
      gk: filteredPlayers.filter(p => p.position === "GK").length,
      def: filteredPlayers.filter(p => p.position === "DEF").length,
      mid: filteredPlayers.filter(p => p.position === "MID").length,
      fwd: filteredPlayers.filter(p => p.position === "FWD").length,
    };
  }, [filteredPlayers]);

  const positions = ["GK", "DEF", "MID", "FWD"];
  const statuses = ["Active", "Inactive", "Loaned"];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Squad Roster</h1>
          <p className="text-muted-foreground mt-1">Current team composition</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Player
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder="Search by player name or number..."
              className="pl-10"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              aria-label="Search roster by player name or number"
            />
            {searchText && (
              <button
                onClick={() => setSearchText("")}
                className={`absolute right-3 top-3 text-muted-foreground hover:text-foreground ${focusVisibleClass}`}
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Position Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" id="position-filter-title">Filter by Position</h3>
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="position-filter-title">
          <Button
            variant={!positionFilter ? "default" : "outline"}
            size="sm"
            onClick={() => setPositionFilter(null)}
            className={focusVisibleClass}
          >
            All
          </Button>
          {positions.map(pos => (
            <Button
              key={pos}
              variant={positionFilter === pos ? "default" : "outline"}
              size="sm"
              onClick={() => setPositionFilter(positionFilter === pos ? null : pos)}
              className={focusVisibleClass}
              aria-pressed={positionFilter === pos}
            >
              {pos === "GK" && "Goalkeeper"}
              {pos === "DEF" && "Defender"}
              {pos === "MID" && "Midfielder"}
              {pos === "FWD" && "Forward"}
            </Button>
          ))}
        </div>
      </div>

      {/* Status Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold" id="status-filter-title">Filter by Status</h3>
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="status-filter-title">
          <Button
            variant={!statusFilter ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(null)}
            className={focusVisibleClass}
          >
            All
          </Button>
          {statuses.map(status => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === status ? null : status)}
              className={focusVisibleClass}
              aria-pressed={statusFilter === status}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-3xl font-bold text-primary">{stats.total}</p>
              <p className="text-xs text-muted-foreground mt-1">Total Players</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.gk}</p>
              <p className="text-xs text-muted-foreground mt-1">Goalkeeper</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-navy">{stats.def}</p>
              <p className="text-xs text-muted-foreground mt-1">Defender</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.mid}</p>
              <p className="text-xs text-muted-foreground mt-1">Midfielder</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gold">{stats.fwd}</p>
              <p className="text-xs text-muted-foreground mt-1">Forward</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Player List */}
      <div className="space-y-2">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <Card key={player.number} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {player.number}
                    </div>
                    <div>
                      <p className="font-semibold">{player.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {player.position === "GK" && "Goalkeeper"}
                        {player.position === "DEF" && "Defender"}
                        {player.position === "MID" && "Midfielder"}
                        {player.position === "FWD" && "Forward"}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={player.status.toLowerCase() as any} />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-muted-foreground text-sm">No players found matching your filters</p>
              {(searchText || positionFilter || statusFilter) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setSearchText("");
                    setPositionFilter(null);
                    setStatusFilter(null);
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

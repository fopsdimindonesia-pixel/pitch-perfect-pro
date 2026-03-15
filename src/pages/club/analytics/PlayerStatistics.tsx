import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState, useMemo } from "react";
import { DataTable, type DataTableColumn } from "@/components/shared/DataTable";
import { focusVisibleClass } from "@/lib/accessibility";
import { ChartContainer } from "@/components/shared/ChartUtils";

interface Player {
  id: string;
  rank: number;
  name: string;
  position: string;
  goals: number;
  assists: number;
  rating: number;
}

export default function PlayerStatistics() {
  const initialPlayers: Player[] = [
    { id: "1", rank: 1, name: "Budi Santoso", position: "FW", goals: 12, assists: 5, rating: 8.5 },
    { id: "2", rank: 2, name: "Andi Kusuma", position: "MID", goals: 8, assists: 7, rating: 8.2 },
    { id: "3", rank: 3, name: "Evan Pratama", position: "FW", goals: 5, assists: 3, rating: 7.8 },
    { id: "4", rank: 4, name: "Rizky Pratama", position: "DEF", goals: 1, assists: 2, rating: 7.5 },
    { id: "5", rank: 5, name: "Hendra Setiawan", position: "MID", goals: 3, assists: 6, rating: 7.9 },
    { id: "6", rank: 6, name: "Agus Firmansyah", position: "FW", goals: 6, assists: 4, rating: 7.6 },
    { id: "7", rank: 7, name: "Bambang Sutrisno", position: "DEF", goals: 0, assists: 1, rating: 7.3 },
    { id: "8", rank: 8, name: "Dedi Gunawan", position: "GK", goals: 0, assists: 0, rating: 7.4 },
  ];

  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [searchText, setSearchText] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const positions = useMemo(() => 
    [...new Set(players.map(p => p.position))].sort(),
    [players]
  );

  const filteredPlayers = useMemo(() => {
    return players.filter(player =>
      player.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (!positionFilter || player.position === positionFilter) &&
      (!ratingFilter || 
        (ratingFilter === "high" && player.rating >= 8) ||
        (ratingFilter === "medium" && player.rating >= 7 && player.rating < 8) ||
        (ratingFilter === "all")
      )
    ).sort((a, b) => b.goals + b.assists - (a.goals + a.assists));
  }, [players, searchText, positionFilter, ratingFilter]);

  const stats = useMemo(() => ({
    total: filteredPlayers.length,
    totalGoals: filteredPlayers.reduce((sum, p) => sum + p.goals, 0),
    totalAssists: filteredPlayers.reduce((sum, p) => sum + p.assists, 0),
    topRating: Math.max(...filteredPlayers.map(p => p.rating), 0),
  }), [filteredPlayers]);

  // Simulate data loading
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const tableColumns: DataTableColumn<Player>[] = [
    {
      key: "rank",
      label: "Rank",
      sortable: true,
      searchable: false,
      width: "80px",
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      searchable: true,
    },
    {
      key: "position",
      label: "Position",
      sortable: true,
      searchable: true,
      render: (value) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "goals",
      label: "Goals",
      sortable: true,
      searchable: false,
      render: (value) => <span className="font-semibold text-primary">{value}</span>,
    },
    {
      key: "assists",
      label: "Assists",
      sortable: true,
      searchable: false,
      render: (value) => <span className="font-semibold text-gold">{value}</span>,
    },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      searchable: false,
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold">{value}/10</div>
          <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(value / 10) * 100}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Player Statistics</h1>
          <p className="text-muted-foreground mt-1">Individual player performance ranking</p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isLoading}
          className={focusVisibleClass}
        >
          {isLoading ? "Loading..." : "Refresh Data"}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by player name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-xs"
          aria-label="Search player names"
        />
        {searchText && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchText("")}
            className={`h-9 w-9 p-0 ${focusVisibleClass}`}
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label className="text-xs mb-2 block">Position</Label>
          <div className="flex flex-wrap gap-1">
            <Button
              variant={!positionFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setPositionFilter("")}
              className={focusVisibleClass}
            >
              All
            </Button>
            {positions.map(pos => (
              <Button
                key={pos}
                variant={positionFilter === pos ? "default" : "outline"}
                size="sm"
                onClick={() => setPositionFilter(pos)}
                className={focusVisibleClass}
              >
                {pos}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-xs mb-2 block">Rating</Label>
          <div className="flex flex-wrap gap-1">
            <Button
              variant={ratingFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setRatingFilter("all")}
              className={focusVisibleClass}
            >
              All
            </Button>
            <Button
              variant={ratingFilter === "high" ? "default" : "outline"}
              size="sm"
              onClick={() => setRatingFilter("high")}
              className={focusVisibleClass}
            >
              High (8+)
            </Button>
            <Button
              variant={ratingFilter === "medium" ? "default" : "outline"}
              size="sm"
              onClick={() => setRatingFilter("medium")}
              className={focusVisibleClass}
            >
              Medium (7-8)
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground mt-2">Players</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-primary">{stats.totalGoals}</p>
            <p className="text-sm text-muted-foreground mt-2">Total Goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-gold">{stats.totalAssists}</p>
            <p className="text-sm text-muted-foreground mt-2">Total Assists</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-green-600">{stats.topRating.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground mt-2">Top Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* DataTable with loading state */}
      <ChartContainer
        title="Performance Rankings"
        description="Comprehensive player statistics with sorting and filtering"
        isLoading={isLoading}
        height="auto"
        className="p-0"
      >
        <DataTable<Player>
          data={filteredPlayers}
          columns={tableColumns}
          title=""
          searchPlaceholder="Search players..."
          enableSelection={true}
          pageSize={10}
        />
      </ChartContainer>
    </div>
  );
}

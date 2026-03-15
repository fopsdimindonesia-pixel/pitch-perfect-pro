import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, TrendingUp } from "lucide-react";
import { useState, useMemo } from "react";
import { DataTable, type DataTableColumn } from "@/components/shared/DataTable";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { focusVisibleClass } from "@/lib/accessibility";

interface TrainingRecord {
  id: string;
  date: string;
  team: string;
  present: number;
  absent: number;
  injured: number;
  total: number;
  attendanceRate: number;
}

export default function TrainingAttendance() {
  const initialRecords: TrainingRecord[] = [
    { id: "1", date: "2024-03-20", team: "Senior", present: 24, absent: 1, injured: 2, total: 27, attendanceRate: 89 },
    { id: "2", date: "2024-03-19", team: "U18", present: 17, absent: 0, injured: 1, total: 18, attendanceRate: 94 },
    { id: "3", date: "2024-03-19", team: "U14", present: 21, absent: 1, injured: 0, total: 22, attendanceRate: 95 },
    { id: "4", date: "2024-03-18", team: "Senior", present: 26, absent: 0, injured: 0, total: 26, attendanceRate: 100 },
    { id: "5", date: "2024-03-18", team: "U20", present: 19, absent: 1, injured: 1, total: 21, attendanceRate: 90 },
    { id: "6", date: "2024-03-17", team: "U14", present: 22, absent: 0, injured: 0, total: 22, attendanceRate: 100 },
  ];

  const [records, setRecords] = useState<TrainingRecord[]>(initialRecords);
  const [searchText, setSearchText] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const teams = useMemo(() =>
    [...new Set(records.map(r => r.team))].sort(),
    [records]
  );

  const dates = useMemo(() =>
    [...new Set(records.map(r => r.date))].sort().reverse(),
    [records]
  );

  const filteredRecords = useMemo(() => {
    return records.filter(r =>
      r.team.toLowerCase().includes(searchText.toLowerCase()) &&
      (!teamFilter || r.team === teamFilter) &&
      (!dateFilter || r.date === dateFilter)
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [records, searchText, teamFilter, dateFilter]);

  const stats = useMemo(() => ({
    sessions: filteredRecords.length,
    totalPresent: filteredRecords.reduce((sum, r) => sum + r.present, 0),
    totalAbsent: filteredRecords.reduce((sum, r) => sum + r.absent, 0),
    totalInjured: filteredRecords.reduce((sum, r) => sum + r.injured, 0),
    avgAttendance: filteredRecords.length > 0 
      ? Math.round((filteredRecords.reduce((sum, r) => sum + r.present, 0) / 
                   filteredRecords.reduce((sum, r) => sum + r.total, 0)) * 100)
      : 0,
  }), [filteredRecords]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const tableColumns: DataTableColumn<TrainingRecord>[] = [
    {
      key: "date",
      label: "Date",
      sortable: true,
      searchable: false,
    },
    {
      key: "team",
      label: "Team",
      sortable: true,
      searchable: true,
      render: (value) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "present",
      label: "Present",
      sortable: true,
      searchable: false,
      render: (value) => <Badge className="bg-green-100 text-green-800">{value}</Badge>,
    },
    {
      key: "absent",
      label: "Absent",
      sortable: true,
      searchable: false,
      render: (value) => <Badge className="bg-red-100 text-red-800">{value}</Badge>,
    },
    {
      key: "injured",
      label: "Injured",
      sortable: true,
      searchable: false,
      render: (value) => <Badge className="bg-yellow-100 text-yellow-800">{value}</Badge>,
    },
    {
      key: "total",
      label: "Total",
      sortable: true,
      searchable: false,
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    {
      key: "attendanceRate",
      label: "Attendance Rate",
      sortable: true,
      searchable: false,
      render: (value) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold">{value}%</span>
          <div className="h-2 w-12 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${value}%` }}
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
          <h1 className="text-3xl font-bold">Training Attendance</h1>
          <p className="text-muted-foreground mt-1">Session participation records</p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isLoading}
          className={focusVisibleClass}
        >
          {isLoading ? "Loading..." : "Refresh"}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by team..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-xs"
          aria-label="Search by team name"
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
          <Label className="text-xs mb-2 block">Team</Label>
          <div className="flex flex-wrap gap-1">
            <Button
              variant={!teamFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setTeamFilter("")}
              className={focusVisibleClass}
            >
              All Teams
            </Button>
            {teams.map(team => (
              <Button
                key={team}
                variant={teamFilter === team ? "default" : "outline"}
                size="sm"
                onClick={() => setTeamFilter(team)}
                className={focusVisibleClass}
              >
                {team}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-xs mb-2 block">Date</Label>
          <div className="flex flex-wrap gap-1 overflow-x-auto pb-1">
            <Button
              variant={!dateFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setDateFilter("")}
              className={focusVisibleClass}
            >
              All Dates
            </Button>
            {dates.map(date => (
              <Button
                key={date}
                variant={dateFilter === date ? "default" : "outline"}
                size="sm"
                onClick={() => setDateFilter(date)}
                className={`text-xs whitespace-nowrap ${focusVisibleClass}`}
              >
                {date}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold">{stats.sessions}</p>
            <p className="text-sm text-muted-foreground mt-2">Sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-green-600">{stats.totalPresent}</p>
            <p className="text-sm text-muted-foreground mt-2">Present</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-red-600">{stats.totalAbsent}</p>
            <p className="text-sm text-muted-foreground mt-2">Absent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-4xl font-bold text-yellow-600">{stats.totalInjured}</p>
            <p className="text-sm text-muted-foreground mt-2">Injured</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <p className="text-4xl font-bold text-blue-600">{stats.avgAttendance}</p>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">% Attendance</p>
          </CardContent>
        </Card>
      </div>

      {/* DataTable with loading state */}
      {isLoading ? (
        <LoadingSkeleton rows={6} type="table" />
      ) : (
        <DataTable<TrainingRecord>
          data={filteredRecords}
          columns={tableColumns}
          title="Attendance Records"
          description="Historical training session attendance data"
          searchPlaceholder="Search teams..."
          enableSelection={true}
          pageSize={10}
        />
      )}
    </div>
  );
}

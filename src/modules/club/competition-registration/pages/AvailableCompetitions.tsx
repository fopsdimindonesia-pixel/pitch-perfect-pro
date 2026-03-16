/**
 * AvailableCompetitions - List semua kompetisi yang tersedia untuk registrasi
 * 
 * Fitur:
 * - Grid/list view kompetisi
 * - Filter & sort
 * - Status registration indicator
 * - Direct navigation ke detail dan registration flow
 */

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CompetitionCard } from "../components/CompetitionCard";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Grid2X2, List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Competition } from "../lib/types";
import { mockCompetitionsExtended } from "../lib/mockData";

export default function AvailableCompetitions() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterAgeGroup, setFilterAgeGroup] = useState<string>("all");
  const [filterFormat, setFilterFormat] = useState<string>("all");

  // Get unique values for filters
  const ageGroups = useMemo(() => {
    const groups = Array.from(new Set(mockCompetitionsExtended.map((c) => c.ageGroup)));
    return groups.sort();
  }, []);

  const formats = useMemo(() => {
    const f = Array.from(new Set(mockCompetitionsExtended.map((c) => c.format)));
    return f.sort();
  }, []);

  // Filter & search
  const filteredCompetitions = useMemo(() => {
    return mockCompetitionsExtended.filter((comp) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        if (
          !comp.name.toLowerCase().includes(query) &&
          !comp.eoName.toLowerCase().includes(query) &&
          !comp.ageGroup.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Status filter
      if (filterStatus !== "all" && comp.status !== filterStatus) {
        return false;
      }

      // Age group filter
      if (filterAgeGroup !== "all" && comp.ageGroup !== filterAgeGroup) {
        return false;
      }

      // Format filter
      if (filterFormat !== "all" && comp.format !== filterFormat) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filterStatus, filterAgeGroup, filterFormat]);

  // Stats
  const stats = {
    total: mockCompetitionsExtended.length,
    open: mockCompetitionsExtended.filter((c) => c.status === "Registration Open").length,
    filtered: filteredCompetitions.length,
  };

  const handleViewDetail = (competitionId: string) => {
    navigate(`/club/competition/${competitionId}`);
  };

  const handleRegister = (competitionId: string) => {
    navigate(`/club/competition/${competitionId}/register`);
  };

  return (
    <div className="space-y-6 animate-fade-in" role="main" aria-label="Available competitions">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Daftar Kompetisi</h1>
          <p className="text-muted-foreground mt-1">
            {stats.total} kompetisi tersedia • {stats.open} pendaftaran dibuka
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="gap-2"
          >
            <Grid2X2 className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="gap-2"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-xs text-muted-foreground mt-1">Total Kompetisi</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">{stats.open}</div>
              <div className="text-xs text-muted-foreground mt-1">Pendaftaran Dibuka</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">
                {filteredCompetitions.length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Hasil Filter</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-gold/5 to-gold/10">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-foreground">20</div>
              <div className="text-xs text-muted-foreground mt-1">Terdaftar</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-muted/50 border-muted">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari kompetisi, EO, atau usia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Registration Open">Pendaftaran Dibuka</SelectItem>
                  <SelectItem value="Active">Berlangsung</SelectItem>
                  <SelectItem value="Finished">Selesai</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterAgeGroup} onValueChange={setFilterAgeGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Kelompok Usia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Usia</SelectItem>
                  {ageGroups.map((ag) => (
                    <SelectItem key={ag} value={ag}>
                      {ag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterFormat} onValueChange={setFilterFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Format</SelectItem>
                  {formats.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {filteredCompetitions.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-muted-foreground">Tidak ada kompetisi</p>
            <p className="text-sm text-muted-foreground">
              Coba ubah filter atau search untuk menemukan kompetisi yang sesuai
            </p>
          </div>
        </Card>
      ) : (
        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-3"
          )}
        >
          {filteredCompetitions.map((competition) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
              onViewDetail={handleViewDetail}
              onRegister={handleRegister}
              isRegistered={false}
              isRegistrationOpen={competition.status === "Registration Open"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

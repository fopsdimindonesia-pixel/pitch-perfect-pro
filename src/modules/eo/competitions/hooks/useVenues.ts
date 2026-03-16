import { useState, useCallback, useMemo } from "react";

// ─── Types ──────────────────────────────────────────────────────────────
export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  surface: "grass" | "artificial" | "concrete";
  facilities: string[]; // e.g., ["lights", "parking", "medical"]
}

export interface VenueAssignment {
  matchId: string;
  venueId: string;
  startTime: string;
}

export interface VenueUtilization {
  venueId: string;
  name: string;
  totalMatches: number;
  utilization: number; // percentage 0-100
}

// ─── Constants ──────────────────────────────────────────────────────────
const DEFAULT_VENUES: Venue[] = [
  {
    id: "v1",
    name: "Stadion Utama",
    location: "Jakarta",
    capacity: 10000,
    surface: "grass",
    facilities: ["lights", "parking", "medical", "press"],
  },
  {
    id: "v2",
    name: "Lapangan Sekunder",
    location: "Jakarta",
    capacity: 5000,
    surface: "artificial",
    facilities: ["lights", "parking"],
  },
  {
    id: "v3",
    name: "Stadion Cadangan",
    location: "Jakarta",
    capacity: 3000,
    surface: "grass",
    facilities: ["parking", "medical"],
  },
];

// ─── Hook ───────────────────────────────────────────────────────────────
export function useVenues() {
  const [venues, setVenues] = useState<Venue[]>(DEFAULT_VENUES);
  const [assignments, setAssignments] = useState<VenueAssignment[]>([]);

  const addAssignment = useCallback(
    (matchId: string, venueId: string, startTime: string) => {
      // Remove existing assignment for this match if any
      setAssignments((prev) => [
        ...prev.filter((a) => a.matchId !== matchId),
        { matchId, venueId, startTime },
      ]);
    },
    []
  );

  const removeAssignment = useCallback((matchId: string) => {
    setAssignments((prev) => prev.filter((a) => a.matchId !== matchId));
  }, []);

  const getVenueUtilization = useCallback((): VenueUtilization[] => {
    const maxMatchesPerVenue = 10; // Arbitrary per-venue capacity

    return venues.map((venue) => {
      const matchCount = assignments.filter(
        (a) => a.venueId === venue.id
      ).length;
      const utilization = Math.min((matchCount / maxMatchesPerVenue) * 100, 100);

      return {
        venueId: venue.id,
        name: venue.name,
        totalMatches: matchCount,
        utilization,
      };
    });
  }, [venues, assignments]);

  const getAssignmentForMatch = useCallback(
    (matchId: string): VenueAssignment | undefined => {
      return assignments.find((a) => a.matchId === matchId);
    },
    [assignments]
  );

  const getAvailableVenues = useCallback(
    (excludeVenueId?: string): Venue[] => {
      return venues.filter((v) => v.id !== excludeVenueId);
    },
    [venues]
  );

  // Memoize statistics
  const stats = useMemo(() => {
    const utilization = getVenueUtilization();
    const avgUtilization =
      utilization.length > 0
        ? utilization.reduce((sum, v) => sum + v.utilization, 0) /
          utilization.length
        : 0;
    const maxUtilization =
      utilization.length > 0
        ? Math.max(...utilization.map((v) => v.utilization))
        : 0;

    return {
      totalVenues: venues.length,
      availableCapacity: venues.reduce((sum, v) => sum + v.capacity, 0),
      averageUtilization: Math.round(avgUtilization),
      maxUtilization: Math.round(maxUtilization),
      distribution: utilization,
    };
  }, [venues, getVenueUtilization]);

  return {
    venues,
    assignments,
    addAssignment,
    removeAssignment,
    getVenueUtilization,
    getAssignmentForMatch,
    getAvailableVenues,
    stats,
  };
}

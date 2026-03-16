/**
 * Fixture Generation Algorithms
 * 
 * Extracted from FixtureGenerator component for reusability and testing
 * Handles Round-Robin, Knockout, and Hybrid format fixtures
 */

export interface MatchData {
  id: string;
  competitionId: string;
  competitionName: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: "Scheduled" | "Live" | "Finished";
  date: string;
  time: string;
  venue: string;
  referee: string;
  matchday: number;
  round?: string;
  group?: string;
}

export interface ValidationError {
  type: "error" | "warning";
  message: string;
}

// ─── Round-Robin (League) Format ────────────────────────────────────────
/**
 * Generates round-robin fixtures where every team plays every other team
 * Optimized with rotation algorithm to minimize scheduling conflicts
 */
export function generateRoundRobin(
  teams: string[],
  competitionId: string,
  competitionName: string,
  startDate: string
): MatchData[] {
  const list = teams.length % 2 === 0 ? [...teams] : [...teams, "BYE"];
  const n = list.length;
  const rounds = n - 1;
  const matchesPerRound = n / 2;
  const matches: MatchData[] = [];
  const start = new Date(startDate || new Date().toISOString().split("T")[0]);
  let matchId = Date.now();

  for (let round = 0; round < rounds; round++) {
    const roundDate = new Date(start);
    roundDate.setDate(roundDate.getDate() + round * 7);
    const dateStr = roundDate.toISOString().split("T")[0];

    for (let i = 0; i < matchesPerRound; i++) {
      const home = list[i];
      const away = list[n - 1 - i];
      if (home === "BYE" || away === "BYE") continue;

      matches.push({
        id: `gen-${matchId++}`,
        competitionId,
        competitionName,
        homeTeam: home,
        awayTeam: away,
        homeScore: 0,
        awayScore: 0,
        status: "Scheduled",
        date: dateStr,
        time: `${9 + (i % 4) * 2}:00`,
        venue: "TBD",
        referee: "TBD",
        matchday: round + 1,
        round: `Matchday ${round + 1}`,
      });
    }

    // Rotation: fix first element, rotate rest
    const last = list.pop()!;
    list.splice(1, 0, last);
  }

  return matches;
}

// ─── Knockout (Single Elimination) Format ───────────────────────────────
/**
 * Generates knockout bracket fixtures
 * Pads teams to nearest power of 2
 * Only generates first round pairings, others are placeholders pending results
 */
export function generateKnockout(
  teams: string[],
  competitionId: string,
  competitionName: string,
  startDate: string
): MatchData[] {
  // Pad to next power of 2
  const n = teams.length;
  const nextPow2 = Math.pow(2, Math.ceil(Math.log2(n)));
  const padded = [...teams];
  while (padded.length < nextPow2) padded.push("BYE");

  const matches: MatchData[] = [];
  const start = new Date(startDate || new Date().toISOString().split("T")[0]);
  let matchId = Date.now();

  const roundNames = (size: number): string => {
    if (size === 2) return "Final";
    if (size === 4) return "Semifinal";
    if (size === 8) return "Quarterfinal";
    return `Round of ${size}`;
  };

  // Generate first round pairings
  const roundSize = nextPow2;
  const roundName = roundNames(roundSize);
  const roundDate = new Date(start);
  const dateStr = roundDate.toISOString().split("T")[0];

  for (let i = 0; i < nextPow2 / 2; i++) {
    const home = padded[i];
    const away = padded[nextPow2 - 1 - i];
    if (home === "BYE" || away === "BYE") continue;

    matches.push({
      id: `gen-${matchId++}`,
      competitionId,
      competitionName,
      homeTeam: home,
      awayTeam: away,
      homeScore: 0,
      awayScore: 0,
      status: "Scheduled",
      date: dateStr,
      time: `${9 + (i % 6) * 2}:00`,
      venue: "TBD",
      referee: "TBD",
      matchday: 1,
      round: roundName,
    });
  }

  // Generate placeholder rounds pending results
  let remaining = nextPow2 / 2;
  let weekOffset = 1;
  while (remaining > 1) {
    const pairsInRound = remaining / 2;
    const rName = roundNames(remaining);
    const rDate = new Date(start);
    rDate.setDate(rDate.getDate() + weekOffset * 7);
    const rDateStr = rDate.toISOString().split("T")[0];

    for (let i = 0; i < pairsInRound; i++) {
      matches.push({
        id: `gen-${matchId++}`,
        competitionId,
        competitionName,
        homeTeam: `Winner ${rName} #${i * 2 + 1}`,
        awayTeam: `Winner ${rName} #${i * 2 + 2}`,
        homeScore: 0,
        awayScore: 0,
        status: "Scheduled",
        date: rDateStr,
        time: `${9 + (i % 4) * 2}:00`,
        venue: "TBD",
        referee: "TBD",
        matchday: weekOffset + 1,
        round: remaining === 2 ? "Final" : roundNames(remaining / 2 * 2 > 2 ? remaining : remaining),
      });
    }
    remaining = pairsInRound;
    weekOffset++;
  }

  return matches;
}

// ─── Hybrid (Group + Knockout) Format ───────────────────────────────────
/**
 * Generates group stage (round-robin) followed by knockout
 * Groups advance top 2 teams to knockout stage
 */
export function generateHybrid(
  teams: string[],
  competitionId: string,
  competitionName: string,
  startDate: string
): MatchData[] {
  const n = teams.length;
  const groupSize = 4;
  const numGroups = Math.max(1, Math.ceil(n / groupSize));
  const matches: MatchData[] = [];
  const start = new Date(startDate || new Date().toISOString().split("T")[0]);
  let matchId = Date.now();
  let maxMatchday = 0;

  // Distribute teams into groups
  const groups: string[][] = Array.from({ length: numGroups }, () => []);
  teams.forEach((t, i) => groups[i % numGroups].push(t));

  // Round-robin within each group
  groups.forEach((group, gi) => {
    const groupLabel = String.fromCharCode(65 + gi); // A, B, C...
    const list = group.length % 2 === 0 ? [...group] : [...group, "BYE"];
    const gn = list.length;
    const rounds = gn - 1;

    for (let round = 0; round < rounds; round++) {
      const roundDate = new Date(start);
      roundDate.setDate(roundDate.getDate() + round * 7);
      const dateStr = roundDate.toISOString().split("T")[0];

      for (let i = 0; i < gn / 2; i++) {
        const home = list[i];
        const away = list[gn - 1 - i];
        if (home === "BYE" || away === "BYE") continue;

        const md = round + 1;
        if (md > maxMatchday) maxMatchday = md;

        matches.push({
          id: `gen-${matchId++}`,
          competitionId,
          competitionName,
          homeTeam: home,
          awayTeam: away,
          homeScore: 0,
          awayScore: 0,
          status: "Scheduled",
          date: dateStr,
          time: `${9 + (i % 4) * 2}:00`,
          venue: "TBD",
          referee: "TBD",
          matchday: md,
          round: `Group ${groupLabel} - MD ${md}`,
          group: groupLabel,
        });
      }
      const last = list.pop()!;
      list.splice(1, 0, last);
    }
  });

  // Knockout stage: top 2 from each group
  const koTeams = groups.flatMap((_, gi) => {
    const gl = String.fromCharCode(65 + gi);
    return [`1st Group ${gl}`, `2nd Group ${gl}`];
  });

  const koStart = new Date(start);
  koStart.setDate(koStart.getDate() + (maxMatchday + 1) * 7);

  const koMatches = generateKnockout(koTeams, competitionId, competitionName, koStart.toISOString().split("T")[0]);
  koMatches.forEach((m) => {
    m.matchday += maxMatchday;
  });

  return [...matches, ...koMatches];
}

// ─── Fixture Validation ─────────────────────────────────────────────────
/**
 * Validates fixtures for conflicts and issues
 * Checks for:
 * - Time/venue conflicts (same team at same time)
 * - Invalid dates
 * - Incomplete team info
 */
export function validateFixtures(
  fixtures: MatchData[],
  options: {
    allowBYE?: boolean;
    checkVenue?: boolean;
    checkTeams?: boolean;
  } = {}
): ValidationError[] {
  const {
    allowBYE = true,
    checkVenue = true,
    checkTeams = true,
  } = options;

  const errors: ValidationError[] = [];
  const timeSlots = new Map<string, MatchData[]>();
  const teamSchedules = new Map<string, MatchData[]>();

  fixtures.forEach((match) => {
    // Check for BYE teams
    if (!allowBYE && (match.homeTeam === "BYE" || match.awayTeam === "BYE")) {
      errors.push({
        type: "warning",
        message: `Pertandingan ${match.id} melibatkan tim bye: ${match.homeTeam} vs ${match.awayTeam}`,
      });
    }

    // Check for incomplete team info
    if (checkTeams && (match.homeTeam === "TBD" || match.awayTeam === "TBD")) {
      errors.push({
        type: "error",
        message: `Pertandingan ${match.id} memiliki tim yang belum ditentukan`,
      });
    }

    // Check date validity
    try {
      const matchDate = new Date(match.date);
      if (isNaN(matchDate.getTime())) {
        errors.push({
          type: "error",
          message: `Tanggal tidak valid untuk pertandingan ${match.id}: ${match.date}`,
        });
      }
    } catch (e) {
      errors.push({
        type: "error",
        message: `Error parsing date untuk pertandingan ${match.id}`,
      });
    }

    // Track time slots (venue + date + time)
    if (checkVenue && match.venue !== "TBD") {
      const timeSlot = `${match.venue}|${match.date}|${match.time}`;
      if (!timeSlots.has(timeSlot)) {
        timeSlots.set(timeSlot, []);
      }
      timeSlots.get(timeSlot)!.push(match);
    }

    // Track team schedules (same team can't play at same time)
    [match.homeTeam, match.awayTeam].forEach((team) => {
      const dateTime = `${match.date}|${match.time}`;
      const key = `${team}|${dateTime}`;
      if (!teamSchedules.has(key)) {
        teamSchedules.set(key, []);
      }
      teamSchedules.get(key)!.push(match);
    });
  });

  // Check for venue conflicts (multiple matches in same slot)
  timeSlots.forEach((matchesInSlot, slot) => {
    if (matchesInSlot.length > 1) {
      errors.push({
        type: "error",
        message: `Konflik venue: ${matchesInSlot.length} pertandingan dijadwalkan di slot yang sama (${slot})`,
      });
    }
  });

  // Check for team scheduling conflicts (team playing multiple matches same time)
  teamSchedules.forEach((matchesForTeam, key) => {
    if (matchesForTeam.length > 1) {
      const [team, dateTime] = key.split("|").slice(0, 2);
      errors.push({
        type: "error",
        message: `${team} dijadwalkan untuk ${matchesForTeam.length} pertandingan at ${dateTime}`,
      });
    }
  });

  return errors;
}

// ─── Fixture Statistics ─────────────────────────────────────────────────
/**
 * Calculate fixture statistics
 */
export function getFixtureStats(fixtures: MatchData[]) {
  const groups = new Set(fixtures.map((m) => m.group).filter(Boolean));
  const matchdays = new Set(fixtures.map((m) => m.matchday));
  const venues = new Set(fixtures.map((m) => m.venue).filter((v) => v !== "TBD"));
  const teams = new Set<string>();

  fixtures.forEach((m) => {
    if (m.homeTeam !== "BYE") teams.add(m.homeTeam);
    if (m.awayTeam !== "BYE") teams.add(m.awayTeam);
  });

  return {
    totalMatches: fixtures.length,
    totalTeams: teams.size,
    totalGroups: groups.size,
    totalMatchdays: matchdays.size,
    assignedVenues: venues.size,
    scheduledVenues: venues,
    byeMatches: fixtures.filter((m) => m.homeTeam === "BYE" || m.awayTeam === "BYE").length,
  };
}

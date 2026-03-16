

# Review & Merger: Match & Tools + Match Management

## Overlap Analysis

### Duplicate 1: EO MatchSheet vs DigitalMatchSheet vs EventRecorder
Three pages doing overlapping work on the same match:

| Page | Lineups | Score Edit | Event Recording | Event Display |
|------|---------|-----------|-----------------|---------------|
| EO MatchSheet (`/eo/match-sheet`) | Yes (legacy mock) | Yes | Yes (basic form) | Yes |
| DigitalMatchSheet (`/match/match-sheet`) | Yes (MatchContext) | No | No | Yes |
| EventRecorder (`/match/event-recorder`) | No | No | Yes (full form) | Yes |

All three display the same event timeline with identical emoji icons and Badge rendering. The EO MatchSheet is essentially a combined version of the other two but uses legacy `mockData` instead of `MatchContext`.

**Merge into one unified DigitalMatchSheet** with tabs: Lineups, Record & Timeline, Match Info. Role-gate the recording form (EO only).

### Duplicate 2: MatchStatsDashboard vs PlayerRatings
Both are per-match analytics pages:
- `MatchStatsDashboard`: possession bars, stat comparison, goals-by-half chart, "Top Performers" with ratings
- `PlayerRatings`: player table with rating, minutes, touches, pass%, G/A

The "Top Performers" section in MatchStatsDashboard already shows player ratings. These should be combined into one **Match Analytics** page with tabs: Overview (stats comparison) and Player Performance (ratings table).

### No Overlap (Keep Separate)
- **LiveScoreboard** — multi-match overview, different scope
- **RefereeReport** — official post-match document with notes/export
- **TacticalAnalysis** — formation/heatmap visualization
- **RefereeAssignment** — referee management table
- **LineupSubmission** — club lineup submission form
- **MatchArchive** — historical match records
- **Schedule, Standings, FixtureGenerator, BracketBuilder** — competition tools, no match-level overlap

---

## Plan

### A. Merge DigitalMatchSheet + EventRecorder + EO MatchSheet

Rewrite `DigitalMatchSheet.tsx` with 3 tabs:
1. **Lineups** — existing dual-lineup display (unchanged)
2. **Events** — event recording form (from EventRecorder) + timeline display, role-gated: `{(role === 'eo') && <RecordForm />}`
3. **Match Info** — venue, referee, officials, date (existing)

Delete `MatchEventRecorder.tsx` and `src/modules/eo/reports/MatchSheet.tsx`.

### B. Merge MatchStatsDashboard + PlayerRatings

Rewrite `MatchStatsDashboard.tsx` with 2 tabs:
1. **Overview** — possession, stat comparison bars, goals-by-half chart (existing)
2. **Player Performance** — ratings table with rating/minutes/touches/pass%/G-A (from PlayerRatings)

Delete `PlayerRatings.tsx`.

### C. Update Routing & Sidebar

- Remove `/match/event-recorder` route
- Remove `/match/ratings` route
- Point EO sidebar "Match Sheet" to `/match/match-sheet` (shared)
- Remove "Event Recorder" from EO sidebar Match Management group
- Remove "Player Ratings" from EO sidebar Match Tools group
- Remove `/eo/match-sheet` route
- Rename "Match Stats" to "Match Analytics" in sidebar

### D. Clean Up EO "Match & Tools" Group

The EO sidebar currently has both "Match & Tools" (6 items) and "Match Management" (5 items) + "Match Tools" (5 items) = 16 match-related entries. After merges, consolidate into:

**Match & Tools** (EO-specific competition tools):
- Schedule, Fixture Generator, Bracket Builder, Standings, Dashboard

**Match Operations** (merged from Match Management + Match Tools):
- Digital Match Sheet (unified)
- Live Scoreboard
- Referee Report
- Match Analytics (unified)
- Referee Assignment
- Lineup
- Tactical Analysis
- Archive

---

## File Changes

| File | Action |
|------|--------|
| `src/modules/match/pages/DigitalMatchSheet.tsx` | **Rewrite** — add event recording tab, role-gate |
| `src/modules/match/pages/MatchStatsDashboard.tsx` | **Rewrite** — add player ratings tab |
| `src/modules/match/pages/MatchEventRecorder.tsx` | **Delete** — merged into DigitalMatchSheet |
| `src/modules/match/pages/PlayerRatings.tsx` | **Delete** — merged into MatchStatsDashboard |
| `src/modules/eo/reports/MatchSheet.tsx` | **Delete** — replaced by shared DigitalMatchSheet |
| `src/modules/eo/reports/index.ts` | **Update** — remove MatchSheet export |
| `src/modules/eo/index.ts` | **Update** — remove MatchSheet export |
| `src/modules/match/index.ts` | **Update** — remove deleted exports |
| `src/App.tsx` | **Update** — remove deleted routes, redirect `/eo/match-sheet` |
| `src/components/layout/AppSidebar.tsx` | **Update** — consolidate sidebar groups |


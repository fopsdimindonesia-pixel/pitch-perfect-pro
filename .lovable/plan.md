

# Competition Management Logic — Full Refinement

## Current Gaps

### 1. Competition Creation (mostly done, minor fixes)
- Stepper works but doesn't save rules to config on creation
- No min/max roster fields in category setup

### 2. Club Registration Logic (major gaps)
- `RegistrationApproval.tsx`: Approve/Reject buttons are non-functional (no state mutation)
- `ClubRegistrations.tsx` (pages/eo): Uses local `useState(mockRegistrations)` instead of CompetitionContext — completely disconnected
- No slot availability check before approval
- No player eligibility validation
- No payment gate (can approve unpaid registrations)
- Competition status not enforced (can register even when status != `registration_open`)
- No `updateRegistration` method in CompetitionContext

### 3. Fixture Generator Logic (major gaps)
- "Generate" buttons do nothing
- No round-robin algorithm
- No knockout bracket algorithm
- No hybrid (group + knockout) algorithm
- Generated fixtures don't write to context

## Plan

### A. Extend CompetitionContext with Registration & Fixture Logic

Add to `CompetitionContext.tsx`:
- `updateRegistration(id, status)` — mutates registration status in shared state
- `addMatches(matches[])` — writes generated fixtures to shared state  
- `clearMatches()` — reset fixtures for regeneration
- Add `minRoster` / `maxRoster` fields to `Category` interface

### B. Rebuild RegistrationApproval with Full Validation

Replace current placeholder with proper approval flow that enforces:

```text
Club Apply
→ Check: competition.status === 'registration_open'
→ Check: approvedCount < category.maxTeams (slot availability)
→ Check: paymentStatus === 'Paid' (payment gate)
→ EO clicks Approve/Reject → calls updateRegistration()
→ Toast confirmation
```

- Show validation warnings: "Pembayaran belum lunas", "Slot penuh (8/8)"
- Disable Approve button when validation fails
- Wire to `useCompetition().updateRegistration()`
- Delete duplicate `src/pages/eo/ClubRegistrations.tsx` — consolidate into module page

### C. Build Fixture Generator Algorithms

Implement three generators inside `FixtureGenerator.tsx`:

**League (Round-Robin):**
```
teams = N, rounds = N-1, matches_per_round = N/2
```
Standard round-robin rotation algorithm producing all pairings.

**Knockout:**
```
16 teams → R16 (8 matches) → QF (4) → SF (2) → Final (1)
```
Seed teams, generate bracket with bye handling for non-power-of-2 counts.

**Hybrid (Group + Knockout):**
Split teams into groups (4 per group), round-robin within groups, top 2 advance to knockout.

All generators:
- Write to context via `addMatches()`
- Show preview before confirming
- Assign auto-generated dates (weekly intervals from competition startDate)
- Show match count summary

### D. Status-Gated Registration

In RegistrationApproval, show clear status gate:
- If `status === 'draft'`: "Kompetisi masih draft. Buka registrasi terlebih dahulu."
- If `status === 'registration_closed'`: "Registrasi sudah ditutup."
- If `status === 'active'` or later: "Kompetisi sudah berjalan."
- Only allow approval actions when `status === 'registration_open'`

### File Changes

| File | Action |
|------|--------|
| `CompetitionContext.tsx` | Add `updateRegistration`, `addMatches`, `clearMatches` |
| `registration/RegistrationApproval.tsx` | Full rewrite with validation logic, slot checks, payment gate |
| `tools/FixtureGenerator.tsx` | Add round-robin, knockout, hybrid algorithms with preview |
| `teams/TeamSlotManagement.tsx` | Wire slot count from category.maxTeams instead of `clubs` field |
| `src/pages/eo/ClubRegistrations.tsx` | Delete (duplicate of RegistrationApproval) |

### What stays unchanged
- CompetitionSetup stepper and tabs
- CompetitionSwitcher component
- GroupAllocation, BracketBuilder
- Match module (separate domain)


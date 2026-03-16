
## Fix: JSX Unescaped `<` and `>` Characters — 4 Files

All build errors are the same root cause: raw `<` and `>` comparison characters used inside JSX text strings (e.g. `<50%`, `>1500 min`, `>55%`). TypeScript/JSX treats these as tag delimiters, causing parse errors.

**Fix**: Replace each offending `<` with `{'<'}` and `>` with `{'>'}` inline within the span/p text.

### Files & Lines to Fix

1. `AveragePossession.tsx` line 174 — `Defensive (<50%)` → `Defensive ({'<'}50%)`
2. `ShotAccuracy.tsx` line 169 — `Needs Improvement (<50%)` → `Needs Improvement ({'<'}50%)`
3. `MinutesPlayedLeaderboard.tsx` line 122 — `Regular Starters (>1500 min)` → `Regular Starters ({'>'}1500 min)`
4. `MinutesPlayedLeaderboard.tsx` line 136 — `Rotation Players (<1000 min)` → `Rotation Players ({'<'}1000 min)`
5. `PossessionTrends.tsx` line 90 — `Matches >50%` → `Matches {'>'}50%`
6. `PossessionTrends.tsx` line 177 — `High Possession (>55%)` → `High Possession ({'>'}55%)`
7. `PossessionTrends.tsx` line 185 — `Low Possession (<45%)` → `Low Possession ({'<'}45%)`

All 7 changes are single-line span/p text substitutions. No logic changes.

### Restructuring Plan (SoccerOS Blueprint)

After fixing build errors, the restructuring will align the module folder layout to the 10 Blueprint domains:

```
src/modules/
  iam/            (1–25)   Identity & Access Management
  org/            (26–50)  Multi-Tenant Organization System
  owner/          (51–75)  Platform Owner Module
  eo/             (76–120) Event Organizer Module
  club/           (121–170) Club Management Module
  player/         (171–200) Player Digital Ecosystem
  match/          (201–240) Match Management System
  standings/      (241–270) Standings & Analytics Engine
  finance/        (271–300) Finance & Payment System
  platform/       (301–350) Infrastructure & Platform System
```

Each domain maps to a sidebar nav group with sub-pages per Blueprint module number range. Existing pages are re-housed under the new structure. The `AppSidebar` nav arrays are rebuilt to reflect SoccerOS's role-aware module access per tenant type.

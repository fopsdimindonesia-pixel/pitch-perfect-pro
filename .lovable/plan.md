
# Football Ecosystem SaaS — Full UI Prototype

## Overview
A complete UI prototype with all 3 dashboards (Owner, EO, Club), multi-tenant RBAC navigation, all priority features, and financial module — built with rich mock data, no backend yet.

---

## 1. Design System Setup
- Apply "Pitch & Slate" color palette to `index.css` (Pitch Green primary, Deep Navy foreground, Off-white background)
- Add Geist Sans font via Google Fonts
- Configure `tabular-nums`, `-0.02em` tracking for display headings
- Match card shadow system and status badge tokens

---

## 2. App Shell & Multi-Tenant Navigation
- Role switcher in header (Owner / EO / Club) to simulate multi-tenant context — persisted in local state
- Collapsible 240px sidebar using shadcn Sidebar, icon-only collapsed mode
- Role-aware sidebar nav: each role sees a completely different menu set
- Top header bar with: role badge, active tenant name, notification bell, profile menu

---

## 3. Owner Dashboard (`/owner/*`)
Pages:
- **Overview** — Stats cards: Total EOs, Clubs, Players, Active Competitions, Revenue
- **EO Management** — Table: EO name, subscription plan, active competitions, status badge (Active/Suspended), action menu
- **Club Management** — Table: Club name, EO affiliation, player count, registration status
- **Financial** — Platform fee overview, subscription revenue chart (recharts bar chart), payment log table
- **Audit Log** — Timestamped activity feed with actor, action type, and entity
- **System Config** — RBAC roles list, platform settings panel (mock)

---

## 4. EO Dashboard (`/eo/*`)
Pages:
- **Overview** — Active competitions count, pending club registrations, upcoming matches today, standings summary
- **Competitions** — Cards grid: each card shows competition name, format badge (League/Knockout/Group+KO), age group chip, club count, status (Draft/Active/Finished)
- **Create Competition** — Stepper form: Name → Format → Age Group → Registration Fee → Invite Clubs
- **Club Registration** — Table with Approve/Reject actions, registration fee status, club details
- **Schedule** — Weekly calendar view with match cards (left-accent border by status: Gray=Scheduled, Green=Live, Navy=Finished), venue, referee
- **Match Sheet** — Full match day view: two team lineups side by side, player verification status badges, live score input, goal/card event log
- **Standings** — Auto-calculated table: Pos, Club, P, W, D, L, GF, GA, GD, Pts — all tabular-nums
- **Reports** — Per-competition stat cards + exportable match results table

---

## 5. Club Dashboard (`/club/*`)
Pages:
- **Overview** — Club stats: Squad size, registered competitions, upcoming match, last result
- **Players** — Paginated data grid: photo thumbnail, name, position, age, eligibility badge (Verified/Pending/Suspended), QR icon action
- **Add/Edit Player** — Form: photo upload, name, DOB, position, ID number, birth certificate (file placeholder)
- **E-Card (QR)** — Player card with photo, club crest, name, DOB, ID number, and QR code placeholder — printable card layout with `aspect-square` QR container
- **Competition Roster** — Drag-to-add player list per registered competition, eligibility warnings
- **Match Day** — Mobile-optimized view: today's match header, drag-and-drop Starting XI (11 slots) + Bench (7 slots), substitution log
- **Match History** — Paginated table of past matches with score, competition, and lineup link
- **Financial** (optional tab) — Player fee table: name, monthly fee status (Paid/Unpaid), payment history

---

## 6. Shared Components
- `MatchStatusBadge` — LIVE/SCHEDULED/FINISHED with color + subtle hover animation
- `PlayerEligibilityBadge` — VERIFIED (green) / PENDING (amber) / SUSPENDED (red)
- `MatchCard` — Shadow-layered card, 4px left accent border by status, team names, score, venue
- `PlayerCard` — Concentric radius (outer 12px / inner 8px), QR outline treatment
- `StatCard` — KPI card with icon, value (tabular-nums), trend indicator
- `StandingsTable` — Dense divide-y rows, row hover bg-accent/50

---

## 7. Routing Structure
```
/ → redirect to /owner
/owner/overview
/owner/eo-management
/owner/club-management
/owner/financial
/owner/audit-log
/eo/overview
/eo/competitions
/eo/competitions/create
/eo/registrations
/eo/schedule
/eo/match-sheet
/eo/standings
/club/overview
/club/players
/club/ecard
/club/roster
/club/match-day
/club/match-history
/club/financial
```

---

## 8. Mock Data
- 3 sample EOs with competitions
- 8 sample clubs with 20 players each (mock)
- Sample match schedule (5 matches across statuses)
- Sample standings table data
- Sample financial/payment records

# Pitch Perfect Pro - Module Summary Reference Guide

## Quick Reference: All Modules

### 1. OWNER MODULE
**Status:** ✅ Core Platform Management  
**Key Files:**
- `src/pages/socceros/owner/PlatformDashboard.tsx`
- `src/modules/owner/dashboard/OwnerDashboard.tsx`
- Related modules: user management, finance, monitoring

**Primary Responsibilities:**
1. **Platform Dashboard** - System-wide metrics, health, activity
2. **User Management** - Registration, KYC, roles, suspension
3. **Organization Management** - Verify clubs, EOs, federations
4. **Finance Management** - Revenue tracking, payouts, reconciliation
5. **Infrastructure Monitoring** - Server health, API performance, backups
6. **Compliance Management** - GDPR, AML, PCI-DSS, financial audits
7. **Competition Monitoring** - Track all competitions, enforce rules
8. **API Management** - Issue/revoke keys, set rate limits

**Key Metrics:**
- Platform uptime (target: 99.99%)
- Total users, organizations, competitions
- Revenue, expenses, profitability
- System resource utilization
- Active incidents and alerts

**Critical Business Rules:**
- KYC verification mandatory for all users
- Transaction fees: 2.5% of amount
- Payout minimum: 100K, max: 100M
- Compliance score must stay > 85%
- Infrastructure alert thresholds defined

---

### 2. ORGANIZATION MODULE
**Status:** ✅ Hierarchical Organization Management  
**Key Files:**
- `src/pages/organization/OrganizationProfile.tsx`
- `src/pages/organization/ClubRegistry.tsx`
- `src/pages/organization/FederationStructure.tsx`
- `src/pages/organization/LeagueOrganization.tsx`
- `src/pages/organization/EventOrganizerRegistry.tsx`

**Primary Responsibilities:**
1. **Organization Profile** - Manage org details, branding, hierarchy
2. **Club Registry** - Register/verify clubs, manage memberships
3. **Federation Structure** - Maintain hierarchy (Federation→Region→League→Club)
4. **League Organization** - Create leagues, assign clubs, manage divisions
5. **Event Organizer Registry** - Register/license event organizers
6. **Member Management** - Track members per organization

**Hierarchical Structure:**
```
Federation (1)
├── Region (≈34)
│   ├── League (≈128)
│   │   └── Club (≈2500)
```

**Key Entities:**
- Federation: Governing body
- Region: Geographic division
- League: Competition organizer
- Club: Team participant
- Organization: Any of the above

**Critical Business Rules:**
- Each club must have unique registration ID
- Club requires head coach before registration
- Minimum 4 teams required to create league
- Organization hierarchy cannot be modified during competition
- Status workflow: Pending → Verified → Active ↔ Inactive

---

### 3. COMPETITION MODULE
**Status:** ✅ Full Competition Lifecycle  
**Key Files:**
- `src/pages/competition/CompetitionDashboard.tsx`
- `src/pages/competition/CompetitionCreator.tsx`
- `src/pages/competition/FixtureGenerator.tsx`
- `src/pages/competition/MatchManagement.tsx`
- `src/pages/competition/TeamSlotManagement.tsx`

**Primary Responsibilities:**
1. **Competition Creator** - Multi-step wizard for setup
2. **Fixture Generator** - Auto-generate match schedules
3. **Match Management** - Create/edit/cancel matches
4. **Team Slot Management** - Allocate and track slots
5. **Standing Calculation** - Real-time ranking updates

**Competition Formats:**
- **League:** Round-robin (single/double)
- **Knockout:** Single/double elimination
- **Group+KO:** Groups → Knockout

**Competition Lifecycle:**
```
Draft → Registration → Fixture Generation → Live → Completed
```

**Standing Calculation (Real-time):**
1. After each match: W=3pts, D=1pt, L=0pts
2. Ranking: Points → GD → GF → H2H → Fair Play
3. Automatic promotion/relegation determination
4. Historical snapshots after each matchday

**Critical Business Rules:**
- Min 4 teams required
- Cannot modify teams after competition starts
- Fixtures locked after first match played
- Automatic rescheduling on venue conflict
- Registration deadline enforced strictly

---

### 4. MATCH MODULE
**Status:** ✅ Complete Match Lifecycle  
**Key Files:**
- `src/pages/match/setup/MatchScheduler.tsx`
- `src/pages/match/setup/RefereeAssignment.tsx`
- `src/pages/match/lineup/LineupSubmission.tsx`
- `src/pages/match/data/MatchStatistics.tsx`
- `src/pages/match/analytics/TacticalAnalysis.tsx`

**Primary Responsibilities:**
1. **Match Scheduling** - Create/schedule matches with constraints
2. **Referee Assignment** - Auto-assign qualified referees
3. **Lineup Management** - Team lineup submission & validation
4. **Live Events Tracking** - Goals, cards, substitutions, injuries
5. **Statistics Collection** - Team & player stats
6. **Tactical Analysis** - Formation analysis, performance metrics

**Match Lifecycle:**
```
Scheduled → Confirmed → Live → Finished → Archived
```

**Scheduling Constraints:**
- Team availability verified
- Referee available and qualified
- Venue capacity adequate
- Min 5 day gap between consecutive matches
- Max 3 matches per team in 10 days
- Evening slots preferred (19:00)

**Live Event Types:**
- Goal (scorer, assist, minute)
- Card (yellow/red, reason, minute)
- Substitution (in/out, minute)
- Injury (player, type)

**Match Statistics:**
- Team: Possession%, Shots, Passes, Tackles, Corners
- Player: Goals, Assists, Rating, Passes, Tackles

**Referee Assignment Criteria:**
- Certification level matches tier
- No conflict of interest
- Balanced workload
- Geographic proximity preferred

**Critical Business Rules:**
- Lineup submitted min 24hrs before match
- Suspended players cannot play
- Max 23 players submitted (11+12)
- 2 yellow cards = automatic suspension next match
- Match cannot start if linesman missing

---

### 5. FINANCE MODULE
**Status:** ✅ Payment & Compliance Management  
**Key Files:**
- `src/pages/finance/subscriptions/SubscriptionPlans.tsx`
- `src/pages/finance/payments/PaymentGateway.tsx`
- `src/pages/finance/payouts/PayoutRequests.tsx`
- `src/pages/finance/system/TransactionMonitoring.tsx`
- `src/pages/finance/compliance/FinancialCompliance.tsx`

**Primary Responsibilities:**
1. **Subscription Management** - Plans, billing, auto-renewal
2. **Payment Gateway Integration** - Process payments, handle failures
3. **Payout Management** - Organization withdrawals, settlements
4. **Transaction Monitoring** - Fraud detection, risk scoring
5. **Financial Compliance** - KYC, AML, PCI-DSS, GDPR

**Subscription Plans:**
| Plan | Price | Max Players | Features |
|------|-------|------------|----------|
| Basic | 50K | 5 | Basic reports, email support |
| Professional | 150K | 20 | Advanced reports, API, priority |
| Enterprise | Custom | Unlimited | Custom, dedicated support |

**Payment Methods:**
- Bank Transfer (VA: BCA, Mandiri, BNI)
- Credit Cards (Visa, MC via Stripe)
- E-Wallets (GCash, OVO, DANA)
- Online Banking

**Payout Workflow:**
```
Request Submitted
  ├─ AML screening
  ├─ Account verification
  ├─ Fraud check
  └─ Approval/Rejection
     └─ Wire transfer (5 days)
```

**Compliance Frameworks:**
- GDPR: EU data protection
- CCPA: California privacy
- PCI DSS: Payment security
- ISO 27001: Information security
- AML/KYC: Anti-money laundering

**Critical Business Rules:**
- Transaction fee: 2.5% of amount
- Minimum payout: 100K
- Maximum payout: 100M
- Payout frequency: Max 2/week
- Settlement window: 5 business days
- AML check mandatory for > 50M
- Compliance score target: > 85%

---

### 6. ANALYTICS MODULE
**Status:** ✅ Performance Analytics & Reporting  
**Key Files:**
- `src/pages/analytics/standings/LeagueStandings.tsx`
- `src/pages/analytics/team/TeamPerformanceOverview.tsx`
- `src/pages/analytics/player/TopScorers.tsx`
- `src/pages/analytics/match/MatchResultTrends.tsx`

**Primary Responsibilities:**
1. **League Standings** - Auto-calculated rankings
2. **Team Performance** - Comprehensive team analytics
3. **Top Scorers** - Goal-scoring leaderboard
4. **Match Trends** - Historical performance analysis
5. **Player Statistics** - Individual performance tracking

**Standing Calculation Logic:**
```
Points = (Wins × 3) + (Draws × 1)
Ranking = {Points} → {GD} → {GF} → {H2H} → {Fair Play}
```

**Team Metrics:**
- Record (W-D-L), Points, GF/GA, GD
- Win%, Home/Away splits
- Form (last 5 matches)
- Efficiency metrics

**Player Metrics:**
- Goals, Assists, Rating
- Pass completion, Tackles
- Minutes played, Match ratio

**Leaderboards:**
- Top Scorers: Goals → Efficiency → Assists
- Assist Leaders: Assists → Goals → Consistency
- Clean Sheets: Defensive performance

**Real-time Updates:**
- Standings update after each match
- Historical snapshots per matchday
- Automatic projections to final standing

**Critical Business Rules:**
- Recalculate after match completion
- No manual standing changes without audit trail
- Archive all calculations for dispute resolution
- Eligibility tracking for promotion/relegation

---

### 7. ADMIN MODULE
**Status:** ✅ Technical Administration  
**Key Files:**
- `src/pages/admin/SystemMonitoring.tsx`
- `src/pages/admin/APIKeyManagement.tsx`
- `src/pages/admin/ComplianceDashboard.tsx`

**Primary Responsibilities:**
1. **System Monitoring** - Infrastructure health, performance
2. **API Key Management** - Issue/revoke keys, rate limiting
3. **Compliance Dashboard** - Regulatory compliance tracking

**System Health Metrics:**
| Service | Target | Alert Level |
|---------|--------|------------|
| Uptime | 99.99% | < 99.9% |
| API Latency | 100ms | > 500ms |
| DB Latency | 50ms | > 100ms |
| Error Rate | < 1% | > 1% |

**API Key Management:**
- Scopes: read:*, write:*
- Usage tracking (requests/month)
- Rate limiting per key
- Expiration policies
- Rotation requirements (90 days)

**Compliance Monitoring:**
- Automated checks for compliance rules
- Evidence collection and audit trails
- Non-compliance tracking and remediation
- Annual third-party audits

**Critical Business Rules:**
- Incident response SLA: P1 (15min), P2 (1hr), P3 (4hrs), P4 (next day)
- Maintenance window: 72hrs notice, < 2hrs duration
- Backup tested quarterly
- RTO: 4 hours, RPO: 1 hour

---

### 8. EVENT ORGANIZER (EO) MODULE
**Status:** ✅ Competition Management for EOs  
**Key Files:**
- `src/pages/eo/EOOverview.tsx`
- `src/pages/eo/Competitions.tsx`
- `src/pages/eo/Schedule.tsx`
- `src/pages/eo/Standings.tsx`
- `src/modules/eo/competitions/Competitions.tsx`

**Primary Responsibilities:**
1. **EO Dashboard** - Overview of competitions and actions
2. **Competition Management** - Create/edit/monitor competitions
3. **Registration Management** - Approve/reject club registrations
4. **Schedule Management** - Create/modify match schedules
5. **Standings Management** - Monitor/verify standings

**EO Dashboard Display:**
- Active competitions count
- Pending registrations
- Matches today/upcoming
- Revenue this month
- Recent activities

**Competition Statuses:**
- Draft: Being created
- Registration: Accepting teams
- Active: Ongoing
- Completed: Finished

**Registration Workflow:**
```
Club applies
  ├─ Documents submitted
  ├─ EO review
  └─ Approval/Rejection
     └─ Confirmation sent
```

**Schedule Management:**
- Week view navigation
- Drag-to-reschedule
- Conflict detection
- Venue capacity check
- Cannot reschedule < 48hrs before

**Critical Business Rules:**
- Registration deadline enforced
- Minimum squad confirmed (14+ players)
- Team fees collected before activation
- Schedule locked after first match
- Standings auto-update real-time

---

### 9. CLUB MODULE
**Status:** ✅ Club Management & Operations  
**Key Files:**
- `src/modules/club/dashboard/ClubDashboard.tsx`
- `src/modules/club/players/Players.tsx`
- `src/modules/club/staff/CoachManagement.tsx`
- `src/modules/club/academy/YouthTeams.tsx`
- `src/modules/club/finance/FinancialDashboard.tsx`

**Primary Responsibilities:**
1. **Club Dashboard** - Overview of club status and performance
2. **Squad Management** - Register players, manage profiles
3. **Staff Management** - Coaches, medical staff, fitness coaches
4. **Academy Management** - Youth team categories and development
5. **Financial Management** - Revenue, expenses, budgeting

**Club Dashboard Displays:**
- Team stats (W-D-L, points, position)
- Upcoming matches (next 3)
- Recent results
- Squad count, staff count
- Financial status

**Squad Management Requirements:**
- Min 14 players for competition
- Each player: jersey number (1-99), position, age, contract
- Eligibility tracking (suspension, loan status)
- Youth/senior player tracking

**Staff Types:**
- Head Coach (required)
- Assistant Coaches
- Medical Staff
- Fitness Coach
- Goalkeeper Coach
- Physiotherapist

**Youth Teams by Category:**
- U-12, U-14, U-16, U-18, Senior
- Track development pathway
- Monitor progression

**Financial Tracking:**
- Revenue: Tickets, sponsorships, merchandise, broadcasting
- Expenses: Salaries, operations, travel, medical
- Budget variance tracking
- Monthly reconciliation

**Critical Business Rules:**
- Head coach required before registration
- Foreign player quota may apply
- Each player has unique squad number
- Minimum 16 match participation for eligibility
- Contract dates must be valid
- All staff require current licenses

---

### 10. SOCCEROS MODULE
**Status:** ✅ Role-Based Dashboards  
**Key Files:**
- `src/pages/socceros/owner/PlatformDashboard.tsx`
- `src/pages/socceros/identity/UserDashboard.tsx`
- `src/pages/socceros/match/LineupBuilder.tsx`
- `src/pages/socceros/finance/FinancialDashboard.tsx`
- `src/pages/socceros/eo/CompetitionDashboard.tsx`
- `src/pages/socceros/club/SquadManagement.tsx`

**Purpose:** Specialized dashboards for different user roles

**Dashboard Types:**
1. **Owner Dashboard:** Platform metrics, global analytics
2. **EO Dashboard:** Competition management, revenue
3. **Club Dashboard:** Squad stats, match results
4. **Coach Dashboard:** Squad management, tactics
5. **Player Dashboard:** Personal stats, schedules

**Common Components Across All Dashboards:**
- Header with role badge
- Statistics cards (KPIs)
- Recent activities feed
- Upcoming tasks/deadlines
- Quick action buttons
- Responsive layout (mobile-friendly)

**Role-Based Features:**
- Owner: Full system visibility
- EO: Competition scope
- Club: Club scope
- Coach: Team scope
- Player: Personal scope

**Critical Business Rules:**
- Permissions strictly enforced
- Data isolation by role
- Audit trail for all actions
- Real-time notifications for updates

---

## Cross-Module Workflows

### 1. Complete Competition Lifecycle
```
EO Creates Competition
  └─ Owner approves
     └─ Clubs register
        └─ EO generates fixtures
           └─ Matches scheduled
              └─ Referees assigned
                 └─ Matches played
                    └─ Results recorded
                       └─ Analytics generated
                          └─ Competition completed
```

### 2. User Registration & Access
```
User Registers
  └─ KYC Verification
     └─ Owner approves
        └─ Role assigned
           └─ Organization access granted
              └─ First login
                 └─ MFA setup (if required)
                    └─ Dashboard available
```

### 3. Match Execution
```
Match Scheduled
  └─ Referee assigned
     └─ Lineups submitted
        └─ Match begins
           └─ Live events tracked
              └─ Match finishes
                 └─ Statistics finalized
                    └─ Standings updated
                       └─ Reports generated
```

### 4. Financial Transaction
```
Organization owes fees
  └─ Invoice generated
     └─ Email sent
        └─ Payment submitted
           └─ Payment processed
              └─ AML check (if large)
                 └─ Verification
                    └─ Service activated
                       └─ Accounting logged
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Pitch Perfect Pro                     │
└─────────────────────────────────────────────────────────┘

┌─ OWNER MODULE (Admin)
│  ├─ User Management
│  ├─ Organization Management
│  ├─ Competition Monitoring
│  ├─ Finance Oversight
│  └─ Infrastructure Monitoring

├─ ORGANIZATION MODULE (Data)
│  ├─ Federations
│  ├─ Regions
│  ├─ Leagues
│  └─ Clubs

├─ COMPETITION MODULE (Business Logic)
│  ├─ Create/Edit Competitions
│  ├─ Generate Fixtures
│  ├─ Team Registration
│  └─ Standings Calculation

├─ MATCH MODULE (Operations)
│  ├─ Schedule Matches
│  ├─ Assign Referees
│  ├─ Manage Lineups
│  ├─ Track Live Events
│  └─ Collect Statistics

├─ ANALYTICS MODULE (Reporting)
│  ├─ League Standings
│  ├─ Team Performance
│  ├─ Player Statistics
│  └─ Match Trends

├─ FINANCE MODULE (Payments)
│  ├─ Subscriptions
│  ├─ Payments
│  ├─ Payouts
│  ├─ Transaction Monitoring
│  └─ Compliance

├─ ADMIN MODULE (Technical)
│  ├─ System Monitoring
│  ├─ API Management
│  └─ Compliance

├─ EO MODULE (Competition Ops)
│  ├─ Manage Competitions
│  ├─ Approve Registrations
│  ├─ Create Schedules
│  └─ Monitor Standings

├─ CLUB MODULE (Team Ops)
│  ├─ Squad Management
│  ├─ Staff Management
│  ├─ Academy Management
│  └─ Financial Management

└─ SOCCEROS MODULE (UI)
   └─ Role-Based Dashboards
```

---

## Summary

Pitch Perfect Pro consists of **10 integrated modules** that work together to provide complete football league management:

1. **Owner** - Platform administration and oversight
2. **Organization** - Hierarchical organization structure
3. **Competition** - Competition lifecycle management
4. **Match** - Complete match operations
5. **Finance** - Payments and compliance
6. **Analytics** - Performance analysis and reporting
7. **Admin** - Technical infrastructure management
8. **EO** - Event organizer competition management
9. **Club** - Club operations and squad management
10. **Socceros** - Role-based dashboard UI

Each module has clear responsibilities, business rules, and integration points, ensuring data consistency and operational efficiency across the entire platform.

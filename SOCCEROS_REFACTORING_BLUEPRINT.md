# 🏗️ SoccerOS UI Refactoring Blueprint

**Status:** Architecture & Mapping Complete  
**Scope:** Full folder restructuring (275+ pages)  
**Timeline:** 3 Phases  
**Risk Level:** Low (No functionality deletion, pure reorganization)

---

## 📋 EXECUTIVE SUMMARY

### Current State
- **275+ pages** spread across 15 directories
- **Monolithic modules:** `competition/` (64 files flat), `admin/` (39 files flat)
- **Inconsistent depth:** 1-4 folder levels, no clear hierarchy
- **Duplicate functionality:** registrations, standings, staff assignments in multiple places
- **Navigation:** Role-based but files not organized by role

### Target State
- **500+ module-ready structure** aligned with SoccerOS Blueprint
- **Domain-driven organization** with clear separation by role and system
- **3-level hierarchy:** Role → System → Feature
- **Consistent naming conventions** throughout
- **Scalable routing** supporting RBAC roles
- **Clear sidebar navigation** by role and module

---

## 🎯 PROPOSED FOLDER STRUCTURE

### Level 1: Core Infrastructure (Universal)

```
src/
├── core/                          # Framework & auth (new)
│   ├── auth/                      # Auth infrastructure
│   ├── rbac/                      # Role-based access control
│   ├── layout/                    # Layout components
│   ├── navigation/                # Navigation components
│   ├── hooks/                     # Global hooks
│   └── providers/                 # Global providers
│
├── modules/                       # MAIN CONTENT AREA (reorganized)
│   ├── identity/                  # Identity & Access System (Modules 1-40)
│   ├── organizations/             # Organization System (Modules 41-80)
│   ├── owner/                     # Platform Owner System (Modules 81-130)
│   ├── eo/                        # Event Organizer System (Modules 131-220)
│   ├── club/                      # Club Management System (Modules 221-320)
│   ├── matches/                   # Match & Game Engine (Modules 321-400)
│   ├── finance/                   # Finance & Billing (Modules 401-450)
│   ├── analytics/                 # Analytics & Intelligence (Modules 451-500)
│   ├── shared/                    # Cross-role shared modules (Communications, Uploads, etc)
│   └── public/                    # Public-facing modules (no auth required)
│
├── components/                    # UI Components (unchanged)
└── lib/                          # Utilities (unchanged)
```

---

## 📊 DETAILED MODULE STRUCTURE

### 1️⃣ **IDENTITY & ACCESS SYSTEM** (Modules 1-40)
**Current Pages:** Files from `auth/` folder + User Management  
**Purpose:** Authentication, authorization, user profiles

```
modules/identity/
├── authentication/              # Login, registration, password reset
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── PasswordReset.tsx
│   ├── MFASetup.tsx
│   └── SessionManagement.tsx
│
├── user-profile/               # User settings and preferences
│   ├── UserProfile.tsx
│   ├── ProfileSettings.tsx
│   ├── Preferences.tsx
│   ├── PrivacySettings.tsx
│   └── NotificationPreferences.tsx
│
├── security/                   # Security features
│   ├── TwoFactorAuth.tsx
│   ├── LoginHistory.tsx
│   ├── DeviceManagement.tsx
│   └── SecurityLog.tsx
│
└── compliance/                 # GDPR & Legal
    ├── TermsOfService.tsx
    └── PrivacyPolicy.tsx
```

---

### 2️⃣ **ORGANIZATIONS SYSTEM** (Modules 41-80)
**Current Pages:** Club profiles, Organization hierarchy, Registrations  
**Purpose:** Organization registry, membership, hierarchy

```
modules/organizations/
├── registry/                   # Organization registry & discovery
│   ├── OrganizationList.tsx
│   ├── OrganizationDetails.tsx
│   ├── BulkRegistration.tsx
│   └── ImportOrganizations.tsx
│
├── membership/                 # Membership & roles within org
│   ├── MemberManagement.tsx
│   ├── RoleAssignment.tsx
│   ├── InvitationManagement.tsx
│   └── TeamMembership.tsx
│
├── hierarchy/                  # Org structure visualization
│   ├── HierarchyViewer.tsx
│   ├── DepartmentManagement.tsx
│   └── ReportingStructure.tsx
│
└── public/                     # Public organization info
    ├── PublicOrganizationProfile.tsx
    └── PublicOrgDirectory.tsx
```

---

### 3️⃣ **PLATFORM OWNER SYSTEM** (Modules 81-130)
**Current Pages:** Most of `./pages/admin/` + Owner financials  
**Purpose:** System-wide management for platform super admin

```
modules/owner/
├── dashboard/                 # Owner homepage & KPIs
│   └── OwnerDashboard.tsx
│
├── platform-management/       # Platform-wide settings
│   ├── SystemConfiguration.tsx
│   ├── FeatureFlags.tsx
│   ├── PlatformSettings.tsx
│   └── MaintenanceMode.tsx
│
├── users/                     # User management system-wide
│   ├── UserManagement.tsx
│   ├── UserMonitoring.tsx
│   ├── RoleManagement.tsx
│   ├── PermissionManagement.tsx
│   └── UserAudit.tsx
│
├── organizations/             # Organization oversight
│   ├── OrganizationMonitoring.tsx
│   ├── OrganizationApprovals.tsx
│   ├── BillingManagement.tsx
│   └── SubscriptionManagement.tsx
│
├── competitions/              # Competition system oversight
│   ├── CompetitionMonitoring.tsx
│   ├── CompetitionApprovals.tsx
│   └── CompetitionAnalytics.tsx
│
├── players/                   # Player system oversight
│   ├── PlayerMonitoring.tsx
│   ├── PlayerVerification.tsx
│   └── PlayerStatistics.tsx
│
├── finance/                   # Platform financial management
│   ├── PlatformRevenue.tsx
│   ├── PlatformFinancial.tsx
│   ├── PaymentReconciliation.tsx
│   └── FinancialReports.tsx
│
├── analytics/                 # Platform-wide analytics
│   ├── GlobalAnalytics.tsx
│   ├── PlatformMetrics.tsx
│   ├── UserBehavior.tsx
│   └── BusinessIntelligence.tsx
│
├── infrastructure/            # Technical infrastructure
│   ├── SystemMonitoring.tsx
│   ├── PerformanceMonitoring.tsx
│   ├── ServiceMonitoring.tsx
│   ├── APIMonitoring.tsx
│   └── LogManagement.tsx
│
├── security/                  # Platform security
│   ├── AuditLog.tsx
│   ├── SecurityAudit.tsx
│   ├── IncidentManagement.tsx
│   └── ComplianceReports.tsx
│
└── developer-tools/           # Dev portal & integrations
    ├── DeveloperPortal.tsx
    ├── APIDocumentation.tsx
    ├── IntegrationManagement.tsx
    └── WebhookManagement.tsx
```

---

### 4️⃣ **EVENT ORGANIZER SYSTEM** (Modules 131-220)
**Current Pages:** Most of `./pages/eo/` folder  
**Purpose:** Competition & tournament management

```
modules/eo/
├── dashboard/                 # EO homepage
│   └── EODashboard.tsx
│
├── competitions/              # Competition orchestration
│   ├── CompetitionList.tsx
│   ├── CompetitionCreator.tsx        (from CreateCompetition)
│   ├── CompetitionSetup.tsx
│   ├── CompetitionOverview.tsx
│   ├── CompetitionProfile.tsx
│   ├── CompetitionDetails.tsx
│   ├── CompetitionDashboard.tsx
│   ├── CompetitionApproval.tsx
│   ├── CompetitionBranding.tsx
│   ├── CompetitionCategories.tsx
│   └── CompetitionReports.tsx
│
├── tournaments/               # Tournament engine & brackets
│   ├── BracketBuilder.tsx
│   ├── FixtureGenerator.tsx
│   ├── TournamentStructure.tsx
│   ├── GroupAllocation.tsx
│   ├── TieBreakerRules.tsx
│   └── SeasonManagement.tsx
│
├── teams/                     # Team registrations & management
│   ├── ClubRegistration.tsx         (moved from eo root)
│   ├── ClubRegistrations.tsx
│   ├── ParticipantRegistration.tsx
│   ├── RegistrationStatus.tsx
│   ├── RegistrationApproval.tsx
│   ├── RegistrationDeadline.tsx
│   ├── RegistrationPayment.tsx
│   ├── TeamConfirmation.tsx
│   ├── TeamWithdrawal.tsx
│   ├── TeamSlotManagement.tsx
│   ├── WaitingListSystem.tsx
│   └── PlayerEligibilityRules.tsx
│
├── matches/                   # Match scheduling & management
│   ├── MatchScheduler.tsx            (from match/setup)
│   ├── MatchManagement.tsx
│   ├── MatchSheet.tsx
│   ├── Schedule.tsx
│   ├── MatchRules.tsx
│   ├── RefereeAssignment.tsx
│   └── VenueManagement.tsx
│
├── venues/                    # Venue management
│   └── VenueManagement.tsx
│
├── referees/                  # Referee management & assignment
│   ├── RefereeAssignment.tsx         (duplicate - consolidate)
│   ├── RefereeRegistry.tsx
│   └── RefereeLicensing.tsx
│
├── rankings/                  # Standings & rankings
│   ├── Standings.tsx
│   ├── Rankings.tsx
│   └── PointsCalculation.tsx
│
├── media/                     # Media & documentation
│   ├── CompetitionMedia.tsx
│   ├── CompetitionDocuments.tsx
│   ├── DocumentManagement.tsx
│   ├── WaiverManagement.tsx
│   └── PublicMedia.tsx
│
├── awards/                    # Awards & recognition
│   ├── AwardSystem.tsx
│   ├── MedalManagement.tsx
│   ├── PrizePrizeDistribution.tsx
│   └── AgeGroupManagement.tsx
│
├── finance/                   # EO financial management
│   ├── EOMerchandisingBudget.tsx
│   ├── FinancialManagement.tsx
│   └── RevenueTracking.tsx
│
├── analytics/                 # EO analytics & insights
│   ├── CompetitionAnalytics.tsx
│   ├── CompetitionStatistics.tsx
│   └── ParticipationAnalytics.tsx
│
└── reports/                   # Reports & exports
    └── Reports.tsx
```

---

### 5️⃣ **CLUB MANAGEMENT SYSTEM** (Modules 221-320)
**Current Pages:** `./pages/club/` folder  
**Purpose:** Club operations & management

```
modules/club/
├── dashboard/                 # Club homepage
│   ├── ClubDashboard.tsx
│   └── ClubOverview.tsx
│
├── club-profile/              # Club identity & information
│   ├── ClubProfile.tsx
│   ├── ClubBranding.tsx
│   ├── ClubAchievements.tsx
│   ├── ClubHistory.tsx
│   └── ClubFinancial.tsx
│
├── staff/                     # Staff management
│   ├── CoachManagement.tsx
│   ├── MedicalStaff.tsx
│   ├── StaffRegistry.tsx
│   ├── StaffRoles.tsx
│   ├── TeamManager.tsx
│   └── StaffAssignment.tsx
│
├── players/                   # Player management
│   ├── Players.tsx                  # Main player list
│   ├── PlayerProfile.tsx
│   ├── PlayerContract.tsx
│   ├── PlayerDocuments.tsx
│   ├── PlayerHistory.tsx
│   ├── PlayerInjuryRecord.tsx
│   ├── PlayerPhoto.tsx
│   ├── PlayerRegistration.tsx
│   ├── PlayerSuspension.tsx
│   ├── PlayerTransfer.tsx
│   ├── PlayerVerification.tsx
│   └── PlayerEligibility.tsx
│
├── academy/                   # Academy & youth development
│   ├── AcademyRegistration.tsx
│   ├── AgeCategory.tsx
│   ├── PlayerPromotion.tsx
│   ├── TalentDevelopment.tsx
│   └── YouthTeams.tsx
│
├── roster/                    # Squad & team rosters
│   ├── Roster.tsx
│   ├── RosterManagement.tsx
│   ├── SquadPositions.tsx
│   ├── PlayerAvailability.tsx
│   ├── PlayingTime.tsx
│   └── ContractStatus.tsx
│
├── training/                  # Training & development
│   ├── TrainingSchedule.tsx
│   ├── TrainingAttendance.tsx
│   ├── SessionPlanning.tsx
│   ├── FacilityManagement.tsx
│   └── CoachFeedback.tsx
│
├── matches/                   # Match participation
│   ├── MatchDay.tsx
│   ├── MatchHistory.tsx
│   └── UpcomingMatches.tsx
│
├── finance/                   # Club finances
│   ├── FinancialDashboard.tsx
│   ├── BudgetManagement.tsx
│   ├── PayrollManagement.tsx
│   ├── RevenueStreams.tsx
│   └── FinancialReports.tsx
│
├── fans/                      # Fan management
│   ├── FanEngagement.tsx
│   ├── FanFeedback.tsx
│   ├── TicketSales.tsx
│   ├── MerchandiseCatalog.tsx
│   └── SocialMedia.tsx
│
├── media/                     # Club digital content
│   ├── ClubMedia.tsx
│   ├── VideoContent.tsx
│   ├── PhotoGallery.tsx
│   └── NewsManagement.tsx
│
├── operations/                # Club operations
│   ├── Notifications.tsx
│   ├── Documents.tsx
│   └── Settings.tsx
│
└── analytics/                 # Club insights
    ├── ClubAnalytics.tsx
    ├── PlayerStatistics.tsx
    ├── PerformanceAnalytics.tsx
    ├── InjuryTrends.tsx
    └── TeamPerformance.tsx
```

---

### 6️⃣ **MATCHES SYSTEM** (Modules 321-400)
**Current Pages:** `./pages/match/` folder  
**Purpose:** Match execution & data collection

```
modules/matches/
├── setup/                     # Pre-match preparation
│   ├── MatchScheduler.tsx
│   ├── RefereeAssignment.tsx
│   ├── VenueSetup.tsx
│   └── EquipmentCheck.tsx
│
├── lineups/                   # Team lineup submission
│   ├── LineupSubmission.tsx
│   ├── FormationBuilder.tsx
│   ├── SubstituteBench.tsx
│   └── PlayerConformation.tsx
│
├── events/                    # Live match events
│   ├── MatchEvents.tsx        # Goal, card, substitution, etc
│   ├── EventRecorder.tsx
│   ├── ScoringEvents.tsx
│   ├── DisciplineryEvents.tsx
│   └── SubstitutionLog.tsx
│
├── timeline/                  # Match progression
│   ├── MatchTimeline.tsx
│   └── TimelinePlayer.tsx
│
├── statistics/                # Match statistics
│   ├── MatchStatistics.tsx
│   ├── PlayerRatings.tsx
│   ├── TeamStats.tsx
│   └── MatchSummary.tsx
│
├── media/                     # Match media capture
│   ├── PhotoCapture.tsx
│   ├── VideoClips.tsx
│   └── MatchHighlights.tsx
│
├── analytics/                 # Match analysis
│   ├── TacticalAnalysis.tsx
│   ├── PerformanceAnalysis.tsx
│   ├── ComparisonAnalysis.tsx
│   └── InsightGeneration.tsx
│
└── archive/                   # Historical matches
    ├── MatchArchive.tsx
    ├── MatchReplays.tsx
    ├── HistoricalStatistics.tsx
    └── CareerHighlights.tsx
```

---

### 7️⃣ **FINANCE SYSTEM** (Modules 401-450)
**Current Pages:** `./pages/finance/` folder  
**Purpose:** Payments, billing, sponsorships, prizes

```
modules/finance/
├── payments/                  # Payment processing
│   ├── PaymentGateway.tsx
│   ├── PaymentStatus.tsx
│   ├── PaymentTracking.tsx
│   ├── ManualPayment.tsx
│   └── PaymentMethods.tsx
│
├── billing/                   # Invoicing & billing
│   ├── FinancialReports.tsx
│   ├── InvoiceGenerator.tsx
│   ├── RefundManagement.tsx
│   └── BillingHistory.tsx
│
├── registrations/             # Registration fees
│   ├── CompetitionRegistrationPayment.tsx
│   ├── PlayerRegistrationFee.tsx
│   ├── EOSubscription.tsx
│   └── ClubSubscription.tsx
│
├── sponsors/                  # Sponsorship management
│   ├── SponsorRegistry.tsx
│   ├── SponsorDashboard.tsx
│   ├── ContractManagement.tsx
│   └── PayoutSchedule.tsx
│
├── prizes/                    # Prize & reward distribution
│   ├── PrizeDistribution.tsx
│   ├── PrizePayouts.tsx
│   ├── RewardManagement.tsx
│   └── IncentivePrograms.tsx
│
├── subscriptions/             # Subscription management
│   ├── SubscriptionPlans.tsx
│   ├── SubscriptionRenewals.tsx
│   ├── SubscriptionAnalytics.tsx
│   ├── PlanPricing.tsx
│   └── PlanBenefits.tsx
│
├── accounting/                # Accounting & reconciliation
│   ├── RevenueDashboard.tsx
│   ├── BudgetTracking.tsx
│   ├── ExpenseManagement.tsx
│   ├── FinancialCategories.tsx
│   ├── PlatformFees.tsx
│   └── TransactionAudit.tsx
│
├── admin/                     # Financial administration
│   ├── ManualRefund.tsx
│   ├── AdjustmentRecords.tsx
│   ├── CurrencySettings.tsx
│   ├── ExchangeRates.tsx
│   └── CurrencyConversion.tsx
│
├── reporting/                 # Financial reports & exports
│   ├── YearlyReport.tsx
│   ├── SummaryReport.tsx
│   ├── RevenueExport.tsx
│   ├── PaymentExport.tsx
│   ├── FinancialInsights.tsx
│   └── TaxReports.tsx
│
└── compliance/                # Financial compliance
    ├── TaxConfiguration.tsx
    ├── FinancialCompliance.tsx
    ├── RegulatoryReports.tsx
    ├── TransactionMonitoring.tsx
    └── FraudDetection.tsx
```

---

### 8️⃣ **ANALYTICS SYSTEM** (Modules 451-500)
**Current Pages:** Scattered analytics across multiple folders  
**Purpose:** Data intelligence and visualization

```
modules/analytics/
├── reports/                   # Report generation
│   ├── ReportBuilder.tsx
│   ├── ScheduledReports.tsx
│   ├── ReportTemplates.tsx
│   ├── CustomReports.tsx
│   └── ReportExport.tsx
│
├── visualization/             # Data visualization
│   ├── Dashboard.tsx
│   ├── ChartBuilder.tsx
│   ├── DataVisualization.tsx
│   ├── MetricsDisplay.tsx
│   └── SyntheticDataExplorer.tsx
│
├── data/                      # Data management & export
│   ├── DataExport.tsx
│   ├── DataImport.tsx
│   ├── DataValidation.tsx
│   └── APIExplorer.tsx
│
└── intelligence/              # Business intelligence
    ├── Forecasting.tsx
    ├── TrendAnalysis.tsx
    ├── Predictions.tsx
    └── InsightGeneration.tsx
```

---

### 9️⃣ **SHARED MODULES** (Cross-role utilities)
**Current Pages:** Scattered or new  
**Purpose:** Shared features used across all roles

```
modules/shared/
├── notifications/             # Notification system
│   ├── NotificationCenter.tsx
│   ├── NotificationPreferences.tsx
│   ├── NotificationHistory.tsx
│   └── AlertRules.tsx
│
├── messaging/                 # In-app messaging
│   ├── Inbox.tsx
│   ├── MessageComposer.tsx
│   ├── ChatSessions.tsx
│   └── ThreadView.tsx
│
├── realtime/                  # Real-time updates
│   ├── LiveNotifications.tsx
│   ├── StatusUpdates.tsx
│   ├── PresenceIndicators.tsx
│   └── RealtimeSync.tsx
│
├── uploads/                   # File management
│   ├── FileUploader.tsx
│   ├── DocumentManagement.tsx
│   ├── MediaGallery.tsx
│   └── FileVersioning.tsx
│
├── collaborators/             # Collaboration features
│   ├── SharingSettings.tsx
│   ├── Permissions.tsx
│   ├── Collaborators.tsx
│   └── AccessControl.tsx
│
├── integrations/              # Third-party integrations
│   ├── IntegrationsList.tsx
│   ├── IntegrationSetup.tsx
│   ├── WebhookConfiguration.tsx
│   └── APIManagement.tsx
│
└── search/                    # Cross-module search
    ├── GlobalSearch.tsx
    └── FilteredSearch.tsx
```

---

### 🔟 **PUBLIC MODULES** (No authentication required)
**Current Pages:** Public-facing pages  
**Purpose:** Public visibility & engagement

```
modules/public/
├── competitions/              # Public competition pages
│   ├── PublicCompetitionList.tsx
│   ├── PublicCompetitionPage.tsx
│   ├── PublicSchedule.tsx
│   ├── PublicStandings.tsx
│   └── PublicStatistics.tsx
│
├── clubs/                     # Public club profiles
│   ├── PublicClubList.tsx
│   ├── PublicOrgDirectory.tsx
│   └── PublicClubProfile.tsx
│
├── players/                   # Public player profiles
│   ├── PublicPlayerList.tsx
│   └── PublicPlayerProfile.tsx
│
├── standings/                 # Public standings
│   ├── GlobalStandings.tsx
│   └── LeagueStandings.tsx
│
├── media/                     # Public media galleries
│   ├── PublicMedia.tsx
│   ├── PhotoGallery.tsx
│   ├── VideoPage.tsx
│   └── MediaArchive.tsx
│
└── information/               # Static info pages
    ├── AboutUs.tsx
    ├── Rules.tsx
    ├── FAQ.tsx
    ├── ContactUs.tsx
    └── Help.tsx
```

---

## 📍 ROUTING STRUCTURE

### Owner Routes (Admin Dashboard)
```
/owner
  /dashboard
  /platform-management
    /system-config
    /feature-flags
    /platform-settings
  /users
    /user-management
    /role-management
    /audit-log
  /organizations
    /monitoring
    /approvals
    /billing
  /competitions
    /monitoring
    /approvals
  /players
    /monitoring
    /verification
  /finance
    /revenue
    /reports
    /reconciliation
  /analytics
    /global
    /metrics
    /business-intelligence
  /infrastructure
    /monitoring
    /performance
    /api-status
  /security
    /audit-log
    /compliance
    /incidents
  /developer-tools
    /api-documentation
    /integrations
    /webhooks
```

### Event Organizer Routes
```
/eo
  /dashboard
  /competitions
    /list
    /create
    /[competitionId]/detail
    /[competitionId]/setup
    /[competitionId]/overview
  /tournaments
    /bracket-builder
    /fixture-generator
    /group-allocation
  /teams
    /registrations
    /approval
    /confirmation
    /withdrawal
  /matches
    /schedule
    /management
    /referee-assignment
  /venues
    /management
  /referees
    /assignment
    /registry
  /rankings
    /standings
  /media
    /documents
    /gallery
  /awards
    /setup
    /distribution
  /finance
    /overview
    /reports
  /analytics
    /competition-stats
    /participation
  /reports
```

### Club Routes
```
/club
  /dashboard
  /profile
    /overview
    /branding
    /achievements
  /staff
    /coaches
    /medical
    /registry
  /players
    /list
    /[playerId]/profile
    /[playerId]/contract
    /[playerId]/documents
    /registration
    /eligibility
  /academy
    /registration
    /age-categories
    /talent-development
  /roster
    /squad
    /availability
    /playing-time
  /training
    /schedule
    /attendance
    /planning
    /facilities
  /matches
    /upcoming
    /history
  /finance
    /dashboard
    /budget
    /payroll
    /revenue
  /fans
    /engagement
    /community
    /merchandise
  /media
    /content
    /gallery
  /analytics
    /overview
    /player-stats
    /performance
```

### Match Routes (Cross-role: EO, Club, Shared)
```
/matches/[matchId]
  /setup
    /details
    /venue
    /referees
  /lineups
    /team-[teamId]
    /formation-builder
  /live
    /events
    /timeline
    /statistics
  /post-match
    /summary
    /full-statistics
    /player-ratings
  /analysis
    /tactical
    /performance
    /highlights
  /archive
    /replay
    /statistics
```

### Public Routes
```
/public
  /competitions
    /[competitionId]
      /overview
      /schedule
      /standings
      /statistics
  /clubs
    /directory
    /[clubId]
      /profile
      /teams
      /achievements
  /players
    /directory
    /[playerId]
      /profile
      /statistics
      /highlights
  /standings
    /[competitionId]
  /media
    /gallery
    /videos
```

---

## 🧭 SIDEBAR NAVIGATION STRUCTURE

### Owner Dashboard Navigation

```
┌─ DASHBOARD
│  └─ Overview
│
├─ PLATFORM MANAGEMENT
│  ├─ System Configuration
│  ├─ Feature Flags
│  ├─ Platform Settings
│  └─ Maintenance Mode
│
├─ USERS
│  ├─ User Management
│  ├─ Role Management
│  ├─ Permissions
│  └─ Audit Log
│
├─ ORGANIZATIONS
│  ├─ Monitoring
│  ├─ Approvals
│  ├─ Billing Management
│  └─ Subscriptions
│
├─ COMPETITIONS
│  ├─ Monitoring
│  ├─ Approvals
│  └─ Analytics
│
├─ PLAYERS
│  ├─ Monitoring
│  ├─ Verification
│  └─ Statistics
│
├─ FINANCE
│  ├─ Platform Revenue
│  ├─ Financial Reports
│  ├─ Payment Reconciliation
│  └─ Subscription Management
│
├─ ANALYTICS
│  ├─ Global Analytics
│  ├─ Platform Metrics
│  ├─ User Behavior
│  └─ Business Intelligence
│
├─ INFRASTRUCTURE
│  ├─ System Monitoring
│  ├─ Performance Monitoring
│  ├─ Service Status
│  └─ API Monitoring
│
├─ SECURITY
│  ├─ Audit Logs
│  ├─ Security Audits
│  ├─ Incident Management
│  └─ Compliance Reports
│
└─ DEVELOPER TOOLS
   ├─ API Documentation
   ├─ Integration Management
   └─ Webhook Configuration
```

### Event Organizer Navigation

```
┌─ DASHBOARD
│  └─ Overview
│
├─ COMPETITIONS
│  ├─ My Competitions
│  ├─ Create Competition
│  ├─ Pending Approvals
│  └─ Archived
│
├─ TOURNAMENTS
│  ├─ Bracket Builder
│  ├─ Fixture Generator
│  ├─ Group Allocation
│  └─ Tiebreaker Rules
│
├─ TEAMS
│  ├─ Team Registrations
│  ├─ Registration Status
│  ├─ Team Confirmations
│  └─ Waiting List
│
├─ MATCHES
│  ├─ Schedule
│  ├─ Match Management
│  ├─ Referee Assignment
│  └─ Venues
│
├─ STANDINGS
│  └─ View by Competition
│
├─ MEDIA & DOCS
│  ├─ Documents
│  ├─ Media Gallery
│  └─ Waivers
│
├─ AWARDS
│  ├─ Award Setup
│  ├─ Medal Management
│  └─ Prize Distribution
│
├─ FINANCE
│  ├─ Financial Overview
│  └─ Reports
│
├─ ANALYTICS
│  ├─ Competition Analytics
│  ├─ Participation Stats
│  └─ Trends
│
└─ REPORTS
   └─ Generate / View
```

### Club Dashboard Navigation

```
┌─ DASHBOARD
│  └─ Overview
│
├─ CLUB PROFILE
│  ├─ Club Information
│  ├─ Branding
│  ├─ Achievements
│  └─ History
│
├─ STAFF
│  ├─ Coaches
│  ├─ Medical Team
│  ├─ Staff Registry
│  └─ Assignments
│
├─ PLAYERS
│  ├─ Player Directory
│  ├─ Add New Player
│  ├─ Player Contracts
│  └─ Player Documents
│
├─ ACADEMY
│  ├─ Registrations
│  ├─ Age Categories
│  └─ Talent Development
│
├─ ROSTER
│  ├─ Squad Management
│  ├─ Player Availability
│  ├─ Playing Time
│  └─ Contract Status
│
├─ TRAINING
│  ├─ Training Schedule
│  ├─ Session Planning
│  ├─ Attendance
│  └─ Facilities
│
├─ MATCHES
│  ├─ Upcoming Matches
│  └─ Match History
│
├─ FINANCE
│  ├─ Financial Dashboard
│  ├─ Budget Management
│  ├─ Payroll
│  └─ Reports
│
├─ FANS & COMMUNITY
│  ├─ Engagement
│  ├─ Community
│  ├─ Merchandise
│  └─ Ticket Sales
│
├─ MEDIA
│  ├─ Content Management
│  ├─ Photo Gallery
│  └─ Video Library
│
└─ ANALYTICS
   ├─ Team Performance
   ├─ Player Statistics
   └─ Performance Analysis
```

---

## 🔄 PHASE-BASED MIGRATION PLAN

### Phase 1: Infrastructure Setup (Week 1-2)
**Objective:** Create folder structure without moving files

1. Create all new folders in `modules/`
2. Create routing configuration
3. Create navigation/sidebar components
4. Create module index files

**Files affected:** 0 (pure creation)  
**Risk:** None

### Phase 2: File Migration (Week 2-4)
**Objective:** Move files maintaining imports and functionality

1. Migrate Identity System
2. Migrate Organizations System
3. Migrate Owner System (biggest)
4. Create comprehensive import maps for tooling
5. Update routing references

**Files affected:** ~275 pages  
**Risk:** Import/routing issues (mitigated with automated scripts)

### Phase 3: Refinement & Testing (Week 4-5)
**Objective:** Clean up duplicates, standardize naming, test all routes

1. Consolidate duplicate modules
2. Update component imports
3. Run full test suite
4. Update documentation
5. Team training

**Files affected:** 40-50 pages (consolidation)  
**Risk:** Low (Phase 1 & 2 complete, testing catches issues)

---

## 📋 FILE MIGRATION MAPPING

### Owner System Migration (Admin)
```
pages/admin/PlatformDashboard.tsx          → modules/owner/dashboard/OwnerDashboard.tsx
pages/admin/GlobalAnalytics.tsx            → modules/owner/analytics/GlobalAnalytics.tsx
pages/admin/RevenueAnalytics.tsx           → modules/owner/finance/PlatformRevenue.tsx
pages/admin/SystemMonitoring.tsx           → modules/owner/infrastructure/SystemMonitoring.tsx
pages/admin/UserMonitoring.tsx             → modules/owner/users/UserMonitoring.tsx
pages/admin/AuditLog.tsx                   → modules/owner/security/AuditLog.tsx
pages/owner/*                              → modules/owner/* (already organized)
```

### EO System Migration
```
pages/eo/*                                 → modules/eo/* (mostly organized)
Consolidations needed:
- RefereeAssignment (appears in 2 places) → modules/eo/referees/RefereeAssignment.tsx
- Standings.tsx                            → modules/eo/rankings/Standings.tsx
- PublicSchedule.tsx                       → modules/public/competitions/PublicSchedule.tsx
```

### Club System Migration
```
pages/club/*                               → modules/club/* (already well-organized)
No major changes needed, just verify hierarchy
```

### Match System Migration
```
pages/match/*                              → modules/matches/* (already organized)
```

### Finance System Migration
```
pages/finance/*                            → modules/finance/* (consolidate by category)
pages/club/ClubFinancial.tsx               → modules/club/finance/FinancialDashboard.tsx
pages/owner/OwnerFinancial.tsx             → modules/owner/finance/PlatformFinance.tsx
```

### Analytics Consolidation
```
Scattered analytics files              → modules/analytics/
Global/Platform Analytics             → modules/owner/analytics/
EO Analytics                           → modules/eo/analytics/
Club Analytics                         → modules/club/analytics/
Match Analytics                        → modules/matches/analytics/
```

### Public Routes Migration
```
pages/*/Public*.tsx                    → modules/public/*/
All public-facing pages consolidated here
```

---

## ⚙️ IMPLEMENTATION TOOLS & SCRIPTS

### Script 1: Folder Structure Generator
Create all 500+ module folders automatically based on template.

### Script 2: Import Updater
Scan all files and update import paths as files move.

### Script 3: Route Registry Generator
Auto-generate route configuration from folder structure.

### Script 4: Navigation Generator
Auto-generate sidebar structure from route registry.

### Script 5: Duplicate Detector
Identify and flag duplicate pages before migration.

---

## ✅ QUALITY CHECKLIST

Before:
- [ ] Backup current codebase
- [ ] Document all current routes
- [ ] List all duplicate files
- [ ] Validate all imports compile

After Each Phase:
- [ ] Build succeeds
- [ ] All tests pass
- [ ] No broken imports
- [ ] Routes resolve correctly
- [ ] Navigation renders properly

Final Validation:
- [ ] All 275+ pages accessible via routes
- [ ] No import errors in console
- [ ] All navigation links work
- [ ] Sidebar renders for each role
- [ ] RBAC routes respected

---

## 📈 EXPECTED OUTCOMES

✅ **Structure Benefits:**
- 65% reduction in folder confusion (from 3-4 level mix to consistent 3-level)
- 100% elimination of duplicate pages (consolidated into single locations)
- 500+ module capacity (room for growth)
- Clear role-based separation (Owner/EO/Club clearly isolated)
- Single source of truth for each feature

✅ **Development Benefits:**
- **Faster onboarding:** New developers understand module structure instantly
- **Easier collaboration:** Teams own specific modules, no path conflicts
- **Better testing:** Module isolation enables targeted testing
- **Scalable routing:** Adding 100 new pages is trivial
- **Consistent naming:** PascalCase throughout, descriptive names

✅ **Navigation Benefits:**
- **Role-based UX:** Each role sees only relevant modules
- **Hierarchical menu:** Deep nesting for complex features
- **Automatic linking:** Routes auto-generate from structure
- **Breadcrumbs work naturally:** Path structure reflects navigation

---

## 🚀 NEXT STEPS

1. **Stakeholder Review** → Approve this blueprint (2 days)
2. **Infrastructure Setup** → Create folder/routing skeleton (3 days)
3. **Phase 1 Execution** → Admin system migration (5 days)
4. **Testing Checkpoints** → Build validation every 2 days
5. **Phase 2-3 Execution** → Complete remaining migrations (10 days)
6. **Final Validation** → Full suite testing (3 days)
7. **Team Training** → Document new structure (2 days)

**Total Timeline:** 4-5 weeks  
**Risk Level:** Low  
**Breaking Changes:** Zero (full backward compatibility with migrated imports)

---

## 📚 REFERENCE DOCUMENTS

- `COMPREHENSIVE_STRUCTURE_ANALYSIS.md` - Current state analysis
- `STRUCTURE_QUICK_REFERENCE.md` - At-a-glance current structure
- `STRUCTURE_ISSUES_VISUALIZATION.md` - Problem areas visualization

---

**Created:** March 16, 2026  
**Status:** Ready for Architecture Review  
**Prepared By:** SoccerOS Architecture Team

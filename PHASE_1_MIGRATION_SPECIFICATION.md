# 🎯 PHASE 1: COMPREHENSIVE MIGRATION SPECIFICATION

**Project:** SoccerOS UI Refactoring Blueprint Execution  
**Phase:** Phase 1 - Architecture Reorganization  
**Objective:** Reorganize codebase from role/feature-based chaos to domain-driven structure  
**Scope:** Migrate 275+ pages from existing structure to new modular architecture  
**Timeline:** 3-5 days of focused work  
**Risk Level:** Medium (Large scope, but isolated within src/ folder)  
**Rollback Strategy:** Simple (git revert branch)

---

## 📊 EXECUTIVE SUMMARY

### Current Chaos
```
src/pages/
├── admin/ (39 files, flat) ⚠️ MONOLITHIC
├── competition/ (64 files, flat) 🔴 CRITICAL
├── club/ (48 files, well-org) ✅ EXAMPLE
├── finance/ (40 files, well-org) ✅ EXAMPLE
├── match/ (10 files, good) ✅ GOOD
├── eo/ (8 files) ✅ SMALL
├── owner/ (6 files) ✅ SMALL
├── organization/ (40 files, flat) ⚠️ MONOLITHIC
├── analytics/ (24 files, 4 subdirs) ✅ DECENT
└── public/ (5+ files) ✅ SMALL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: 275+ pages
```

### Target Structure
```
src/
├── core/                                # Framework essentials
│   ├── auth/
│   ├── rbac/
│   ├── layout/
│   └── providers/
│
├── modules/                             # 500+ module target
│   ├── identity/ (40 modules)
│   ├── organizations/ (40 modules)
│   ├── owner/ (50 modules)
│   ├── eo/ (90 modules)
│   ├── club/ (100 modules)
│   ├── matches/ (80 modules)
│   ├── finance/ (50 modules)
│   ├── analytics/ (30 modules)
│   ├── shared/ (20 modules)
│   └── public/ (30 modules)
│
├── components/ (unchanged)
└── lib/ (unchanged)
```

### Migration Strategy
1. **Phase 1a:** Create new `src/modules/` folder structure
2. **Phase 1b:** Move pages from `src/pages/admin/` → `src/modules/owner/`
3. **Phase 1c:** Move pages from `src/pages/` role folders → `src/modules/`
4. **Phase 1d:** Update all imports throughout codebase
5. **Phase 1e:** Update routes in App.tsx
6. **Phase 1f:** Build & verify, deploy

---

## 🏗️ DETAILED FOLDER STRUCTURE DESIGN

### CORE INFRASTRUCTURE (Unchanged Structure)
```
src/core/
├── auth/
│   ├── AuthContext.tsx
│   ├── useAuth.ts
│   └── ProtectedRoute.tsx
│
├── rbac/
│   ├── RoleContext.tsx
│   ├── useRole.ts
│   └── permissions.ts
│
├── layout/
│   ├── AppShell.tsx
│   ├── AppSidebar.tsx
│   └── TopHeader.tsx
│
├── navigation/
│   ├── NavLink.tsx
│   └── navigation-config.ts
│
└── providers/
    ├── RoleProvider.tsx
    └── index.tsx
```

### MODULES STRUCTURE (REORGANIZED)

#### Level 1: IDENTITY SYSTEM (40 modules)
```
modules/identity/
├── authentication/              # Login, registration, recovery
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── PasswordReset.tsx
│   ├── MFASetup.tsx
│   ├── SessionManagement.tsx
│   └── index.ts
│
├── user-profile/               # User settings
│   ├── UserProfile.tsx
│   ├── ProfileSettings.tsx
│   ├── Preferences.tsx
│   ├── PrivacySettings.tsx
│   ├── NotificationPreferences.tsx
│   └── index.ts
│
├── security/                   # Security features
│   ├── TwoFactorAuth.tsx
│   ├── LoginHistory.tsx
│   ├── DeviceManagement.tsx
│   ├── SecurityLog.tsx
│   └── index.ts
│
└── index.ts (barrel export)
```

**Migration Notes:**
- Source: New folder (identity system pages to be created as platform grows)
- Current: No current admin identity pages; these are foundational for expansion

---

#### Level 2: ORGANIZATIONS SYSTEM (40 modules)
```
modules/organizations/
├── registry/                   # Organization catalog
│   ├── OrganizationRegistry.tsx
│   ├── SearchOrganizations.tsx
│   ├── OrganizationCategories.tsx
│   ├── OrganizationFilters.tsx
│   ├── FeaturedOrganizations.tsx
│   └── index.ts
│
├── partnerships/               # Organization partnerships
│   ├── PartnershipRequests.tsx
│   ├── PartnershipAgreements.tsx
│   ├── CollaborationProjects.tsx
│   └── index.ts
│
├── integrations/               # Third-party integrations
│   ├── IntegrationMarketplace.tsx
│   ├── InstalledIntegrations.tsx
│   ├── IntegrationSettings.tsx
│   └── index.ts
│
└── index.ts (barrel export)
```

**Migration Notes:**
- Source: Consolidate from `organization/` (40 pages currently flat)
- Files to move: ClubRegistry, EventOrganizerProfile, etc.

---

#### Level 3: OWNER SYSTEM (50 modules - PHASE 1 FOCUS)
```
modules/owner/
├── dashboard/                  # Owner overview
│   ├── OwnerDashboard.tsx
│   ├── KPIDashboard.tsx
│   ├── ExecutiveReports.tsx
│   ├── NotificationCenter.tsx
│   └── index.ts
│
├── platform-management/        # Platform settings
│   ├── PlatformConfiguration.tsx
│   ├── SystemSettings.tsx
│   ├── FeatureFlags.tsx
│   ├── MaintenanceMode.tsx
│   ├── BrandingConfiguration.tsx
│   └── index.ts
│
├── users/                      # User administration
│   ├── UserManagement.tsx
│   ├── RoleManagement.tsx
│   ├── PermissionManagement.tsx
│   ├── UserMonitoring.tsx
│   ├── UserAuditLog.tsx
│   └── index.ts
│
├── organizations/              # Organization oversight
│   ├── ClubManagement.tsx
│   ├── EOManagement.tsx
│   ├── OrganizationMonitoring.tsx
│   ├── OrganizationApprovals.tsx
│   ├── BillingManagement.tsx
│   └── index.ts
│
├── competitions/               # Competition oversight
│   ├── CompetitionMonitoring.tsx
│   ├── CompetitionApprovals.tsx
│   └── index.ts
│
├── finance/                    # Financial oversight
│   ├── PlatformRevenue.tsx
│   ├── PaymentReconciliation.tsx
│   ├── FinancialReports.tsx
│   ├── SubscriptionManagement.tsx
│   └── index.ts
│
├── analytics/                  # Platform analytics
│   ├── GlobalAnalytics.tsx
│   ├── PlatformMetrics.tsx
│   ├── UserBehavior.tsx
│   ├── BusinessIntelligence.tsx
│   └── index.ts
│
├── infrastructure/             # System monitoring
│   ├── SystemMonitoring.tsx
│   ├── PerformanceMonitoring.tsx
│   ├── APIMonitoring.tsx
│   ├── ServiceMonitoring.tsx
│   ├── LogManagement.tsx
│   └── index.ts
│
├── security/                   # Security administration
│   ├── SecurityAudit.tsx
│   ├── IncidentManagement.tsx
│   ├── ComplianceReports.tsx
│   ├── SecurityAlerts.tsx
│   └── index.ts
│
├── developer-tools/            # Developer resources
│   ├── DeveloperPortal.tsx
│   ├── APIDocumentation.tsx
│   ├── IntegrationManagement.tsx
│   ├── WebhookManagement.tsx
│   └── index.ts
│
├── compliance/                 # Regulatory compliance
│   ├── ComplianceDashboard.tsx
│   ├── TaxConfiguration.tsx
│   ├── FinancialCompliance.tsx
│   ├── CurrencySettings.tsx
│   ├── LocalizationSettings.tsx
│   └── index.ts
│
└── index.ts (barrel export)
```

**Migration Source (39 admin pages → owner system):**
- Dashboard: AdminDashboard → OwnerDashboard
- Platform Management: PlatformConfiguration, GlobalSettings, FeatureFlagManagement, MaintenanceMode
- Users: UserManagement, RoleManagement, PermissionManagement, UserMonitoring
- Organizations: ClubManagement, EventOrganizerManagement, OrganizationMonitoring, OrganizationApprovals, BillingManagement, SubscriptionManagement
- Finance: PlatformBilling, PlatformFeeSettings, PaymentReconciliation, RevenueAnalytics
- Analytics: GlobalAnalytics, RevenueAnalytics
- Infrastructure: SystemMonitoring, PerformanceMonitoring, ServiceMonitoring, SystemLogs, APIMonitoring
- Security: SecurityAlerts, AuditReports, SystemBackup, SystemRestore
- Developer Tools: APIKeyManagement, WebhookManagement, IntegrationSettings
- Compliance: ComplianceDashboard, TaxConfiguration, LocalizationSettings

---

#### Level 4: EO (EVENT ORGANIZER) SYSTEM (90 modules)
```
modules/eo/
├── dashboard/                  # EO overview
│   ├── EODashboard.tsx
│   ├── MyCompetitions.tsx
│   ├── Reports.tsx
│   └── index.ts
│
├── competitions/               # Competition management
│   ├── Competitions.tsx         # List all competitions
│   ├── CreateCompetition.tsx
│   ├── CompetitionDetails.tsx
│   ├── CompetitionProfile.tsx
│   ├── CompetitionSetup.tsx
│   ├── CompetitionConfiguration.tsx
│   └── index.ts
│
├── registrations/              # Team/Club registration
│   ├── ClubRegistrations.tsx
│   ├── RegistrationApproval.tsx
│   ├── RegistrationStatus.tsx
│   ├── RegistrationPayment.tsx
│   ├── RegistrationDeadline.tsx
│   ├── ParticipantRegistration.tsx
│   └── index.ts
│
├── teams/                      # Team management in competitions
│   ├── TeamManagement.tsx
│   ├── TeamConfirmation.tsx
│   ├── TeamSlotManagement.tsx
│   ├── TeamWithdrawal.tsx
│   ├── TeamPerformance.tsx
│   └── index.ts
│
├── matches/                    # Match management
│   ├── MatchManagement.tsx
│   ├── MatchSheet.tsx
│   ├── FixtureGenerator.tsx
│   ├── Schedule.tsx
│   └── index.ts
│
├── brackets/                   # Bracket/Group management
│   ├── BracketBuilder.tsx
│   ├── GroupAllocation.tsx
│   ├── Standings.tsx
│   └── index.ts
│
├── staff/                      # Staff management
│   ├── StaffAssignment.tsx
│   ├── RefereeAssignment.tsx
│   ├── VolunteerManagement.tsx
│   └── index.ts
│
├── rules/                      # Competition rules
│   ├── CompetitionRules.tsx
│   ├── MatchRules.tsx
│   ├── ScoringSystem.tsx
│   ├── TieBreakerRules.tsx
│   ├── DisciplineRules.tsx
│   ├── PlayerEligibilityRules.tsx
│   └── index.ts
│
├── categories/                 # Age/Division categories
│   ├── CompetitionCategories.tsx
│   ├── AgeGroupManagement.tsx
│   ├── DivisionManagement.tsx
│   └── index.ts
│
├── administration/             # Administrative tasks
│   ├── Announcements.tsx
│   ├── OrganizationHierarchy.tsx
│   ├── VenueManagement.tsx
│   ├── UserManagement.tsx
│   └── index.ts
│
├── finance/                    # Competition finance
│   ├── CompetitionBudget.tsx
│   ├── FinancialReports.tsx
│   ├── RevenueDistribution.tsx
│   └── index.ts
│
├── documentation/              # Documents & media
│   ├── DocumentManagement.tsx
│   ├── CompetitionDocuments.tsx
│   ├── CompetitionMedia.tsx
│   ├── MediaManagement.tsx
│   └── index.ts
│
├── results/                    # Results & rankings
│   ├── CompetitionResults.tsx
│   ├── Rankings.tsx
│   ├── MedalManagement.tsx
│   ├── AwardSystem.tsx
│   ├── PrizeDistribution.tsx
│   └── index.ts
│
├── communication/              # Notifications & messages
│   ├── Notifications.tsx
│   ├── Announcements.tsx
│   └── index.ts
│
└── index.ts (barrel export)
```

**Migration Source (64 competition pages → eo system):**
- Dashboard/Overview: CompetitionDashboard, CompetitionOverview
- Competitions: CreateCompetition, CompetitionCreator, CompetitionDetails, CompetitionProfile
- Registrations: ClubRegistration, RegistrationApproval, RegistrationStatus, RegistrationPayment, RegistrationDeadline, ParticipantRegistration
- Teams: TeamConfirmation, TeamSlotManagement, TeamWithdrawal, TeamPerformance
- Matches: MatchManagement, MatchSheet, FixtureGenerator, Schedule (from competition/)
- Brackets: BracketBuilder, GroupAllocation, Standings (from analytics/)
- Staff: StaffAssignment, RefereeAssignment, VolunteerManagement
- Rules: CompetitionRules, ScoringSystem, TieBreakerRules, DisciplineRules, PlayerEligibilityRules
- Categories: CompetitionCategories, AgeGroupManagement
- Admin: OrganizationHierarchy, VenueManagement, UserManagement
- Finance: CompetitionBudget, CompetitionReports
- Documentation: DocumentManagement, CompetitionDocuments, CompetitionMedia
- Results: MedalManagement, AwardSystem, PrizePrizeDistribution
- Notifications: CompetitionNotifications, Announcement

**Public-Facing Split:**
- PublicCompetitionPage, PublicSchedule, PublicStandings, PublicStatistics, PublicMedia → `modules/public/competitions/`

---

#### Level 5: CLUB SYSTEM (100 modules)
```
modules/club/
├── dashboard/                  # Club overview
│   ├── ClubDashboard.tsx       # (from club/core/)
│   ├── ClubOverview.tsx
│   ├── ECard.tsx
│   └── index.ts
│
├── profile/                    # Club identity
│   ├── ClubProfile.tsx
│   ├── ClubBranding.tsx
│   ├── ClubHistory.tsx
│   ├── ClubAchievements.tsx
│   └── index.ts
│
├── players/                    # Player management
│   ├── Players.tsx             # (from club root)
│   ├── PlayerProfile.tsx
│   ├── PlayerRegistration.tsx
│   ├── PlayerContract.tsx
│   ├── PlayerDocuments.tsx
│   ├── PlayerHistory.tsx
│   ├── PlayerInjuryRecord.tsx
│   ├── PlayerPhoto.tsx
│   ├── PlayerSuspension.tsx
│   ├── PlayerTransfer.tsx
│   ├── PlayerVerification.tsx
│   └── index.ts
│
├── roster/                     # Squad management
│   ├── Roster.tsx              # (from club root)
│   ├── RosterManagement.tsx
│   ├── ContractStatus.tsx
│   ├── PlayerAvailability.tsx
│   ├── PlayingTime.tsx
│   ├── SquadPositions.tsx
│   └── index.ts
│
├── staff/                      # Staff management
│   ├── CoachManagement.tsx
│   ├── MedicalStaff.tsx
│   ├── StaffRegistry.tsx
│   ├── StaffRoles.tsx
│   ├── TeamManager.tsx
│   └── index.ts
│
├── academy/                    # Youth/Academy
│   ├── AcademyRegistration.tsx
│   ├── AgeCategory.tsx
│   ├── PlayerPromotion.tsx
│   ├── TalentDevelopment.tsx
│   ├── YouthTeams.tsx
│   └── index.ts
│
├── training/                   # Training management
│   ├── TrainingSchedule.tsx
│   ├── SessionPlanning.tsx
│   ├── CoachFeedback.tsx
│   ├── TrainingAttendance.tsx
│   ├── FacilityManagement.tsx
│   └── index.ts
│
├── operations/                 # Club operations
│   ├── OperationsDashboard.tsx
│   ├── EventManagement.tsx
│   ├── GuestManagement.tsx
│   ├── InventoryManagement.tsx
│   ├── SecurityManagement.tsx
│   └── index.ts
│
├── finance/                    # Club finance
│   ├── ClubFinancial.tsx       # (from club root)
│   ├── FinancialDashboard.tsx
│   ├── BudgetManagement.tsx
│   ├── PayrollManagement.tsx
│   ├── RevenueStreams.tsx
│   ├── FinancialReports.tsx
│   └── index.ts
│
├── analytics/                  # Club analytics
│   ├── CompetitionStatistics.tsx
│   ├── InjuryTrends.tsx
│   ├── MatchAnalysis.tsx
│   ├── PerformanceAnalytics.tsx
│   ├── PlayerStatistics.tsx
│   └── index.ts
│
├── fan/                        # Fan engagement
│   ├── FanEngagement.tsx
│   ├── FanFeedback.tsx
│   ├── MerchandiseCatalog.tsx
│   ├── SocialMedia.tsx
│   ├── TicketSales.tsx
│   └── index.ts
│
├── matches/                    # Match management
│   ├── MatchDay.tsx            # (from club root)
│   ├── MatchHistory.tsx        # (from club root)
│   ├── MatchSchedule.tsx
│   ├── MatchResults.tsx
│   └── index.ts
│
└── index.ts (barrel export)
```

**Migration Source (48 club pages → club system):**
- Already well-organized (use as template)
- Just add logical nesting under modules/club/

---

#### Level 6: MATCHES SYSTEM (80 modules)
```
modules/matches/
├── dashboard/                  # Match overview
│   ├── MatchDashboard.tsx
│   ├── UpcomingMatches.tsx
│   └── index.ts
│
├── scheduling/                 # Match scheduling
│   ├── MatchScheduler.tsx      # (from match/setup/)
│   ├── MatchReschedule.tsx
│   ├── VenueAvailability.tsx
│   └── index.ts
│
├── lineup/                     # Team lineups
│   ├── LineupSubmission.tsx    # (from match/lineup/)
│   ├── StartingXI.tsx
│   ├── Substitutes.tsx
│   └── index.ts
│
├── setup/                      # Match setup
│   ├── RefereeAssignment.tsx   # (from match/setup/)
│   ├── MatchOfficials.tsx
│   ├── MatchPreparation.tsx
│   └── index.ts
│
├── events/                     # Live match events
│   ├── MatchEvents.tsx         # (from match/events/)
│   ├── LiveScore.tsx
│   ├── MomentCapture.tsx
│   └── index.ts
│
├── data/                       # Match statistics
│   ├── MatchStatistics.tsx     # (from match/data/)
│   ├── MatchTimeline.tsx       # (from match/data/)
│   ├── PlayerRatings.tsx       # (from match/data/)
│   ├── TeamStatistics.tsx
│   └── index.ts
│
├── analysis/                   # Match analysis
│   ├── TacticalAnalysis.tsx    # (from match/analytics/)
│   ├── PerformanceAnalysis.tsx
│   ├── PlayerAnalysis.tsx
│   └── index.ts
│
├── archive/                    # Historical matches
│   ├── MatchArchive.tsx        # (from match/archive/)
│   ├── HistoricalRecords.tsx
│   ├── RecordLookup.tsx
│   └── index.ts
│
└── index.ts (barrel export)
```

**Migration Source (10 match pages → matches system):**
- All files from `match/` folder (good structure, just rename/reorganize)

---

#### Level 7: FINANCE SYSTEM (50 modules)
```
modules/finance/
├── dashboard/                  # Finance overview
│   ├── FinancialDashboard.tsx
│   └── index.ts
│
├── payments/                   # Payment management
│   ├── ClubSubscription.tsx
│   ├── EOSubscription.tsx
│   ├── CompetitionRegistrationPayment.tsx
│   ├── PlayerRegistrationFee.tsx
│   ├── PaymentGateway.tsx
│   └── index.ts
│
├── payouts/                    # Payout management
│   ├── PaymentDisbursement.tsx
│   ├── PayoutApprovals.tsx
│   ├── PayoutHistory.tsx
│   ├── PayoutRequests.tsx
│   ├── RevenueDistribution.tsx
│   └── index.ts
│
├── billing/                    # Invoicing
│   ├── InvoiceGenerator.tsx
│   ├── FinancialReports.tsx
│   ├── PaymentStatus.tsx
│   ├── PaymentTracking.tsx
│   ├── RefundManagement.tsx
│   └── index.ts
│
├── accounting/                 # Accounting
│   ├── BudgetTracking.tsx
│   ├── ExpenseManagement.tsx
│   ├── FinancialCategories.tsx
│   ├── PlatformFees.tsx
│   ├── RevenueDashboard.tsx
│   └── index.ts
│
├── analytics/                  # Financial analytics
│   ├── FinancialForecast.tsx
│   ├── FinancialInsights.tsx
│   ├── PaymentTrends.tsx
│   ├── ProfitabilityAnalysis.tsx
│   ├── RevenueAnalytics.tsx
│   └── index.ts
│
├── compliance/                 # Financial compliance
│   ├── FinancialCompliance.tsx
│   ├── RegulatoryReports.tsx
│   ├── TaxConfiguration.tsx
│   ├── TaxReports.tsx
│   ├── TransactionAudit.tsx
│   └── index.ts
│
├── export/                     # Data export
│   ├── InvoiceExport.tsx
│   ├── PaymentExport.tsx
│   ├── RevenueExport.tsx
│   ├── SummaryReport.tsx
│   ├── YearlyReport.tsx
│   └── index.ts
│
├── subscriptions/              # Subscription management
│   ├── PlanBenefits.tsx
│   ├── PlanPricing.tsx
│   ├── SubscriptionAnalytics.tsx
│   ├── SubscriptionPlans.tsx
│   ├── SubscriptionRenewals.tsx
│   └── index.ts
│
└── index.ts (barrel export)
```

**Migration Source (40 finance pages → finance system):**
- All files from `finance/` folder (already well-organized, just move to modules/)

---

#### Level 8: ANALYTICS SYSTEM (30 modules)
```
modules/analytics/
├── match/                      # Match analytics
│   ├── AveragePossession.tsx
│   ├── GoalsPerMatch.tsx
│   ├── MatchResultTrends.tsx
│   ├── ShotAccuracy.tsx
│   ├── WeeklyBreakdown.tsx
│   └── index.ts
│
├── player/                     # Player analytics
│   ├── DisciplineRankings.tsx
│   ├── MinutesPlayedLeaderboard.tsx
│   ├── PlayerPerformanceRankings.tsx
│   ├── TopAssists.tsx
│   ├── TopScorers.tsx
│   └── index.ts
│
├── standings/                  # Competition standings
│   ├── GoalDifference.tsx
│   ├── GroupStandings.tsx
│   ├── KnockoutBrackets.tsx
│   ├── LeagueStandings.tsx
│   ├── TieBreakerRules.tsx
│   └── index.ts
│
├── team/                       # Team analytics
│   ├── CleanSheetStatistics.tsx
│   ├── GoalDistribution.tsx
│   ├── HomeVsAwayPerformance.tsx
│   ├── PossessionTrends.tsx
│   ├── TeamPerformanceOverview.tsx
│   └── index.ts
│
└── index.ts (barrel export)
```

**Migration Source (24 analytics pages → analytics system):**
- All files from `analytics/` folder (already organized by subdomain)

---

#### Level 9: SHARED SYSTEM (20 modules)
```
modules/shared/
├── notifications/              # Cross-role notifications
│   ├── NotificationCenter.tsx
│   ├── NotificationPreferences.tsx
│   └── index.ts
│
├── messaging/                  # Internal messaging
│   ├── MessageInbox.tsx
│   ├── ComposeMessage.tsx
│   ├── Conversations.tsx
│   └── index.ts
│
├── uploads/                    # File management
│   ├── DocumentUpload.tsx
│   ├── FileManager.tsx
│   ├── MediaGallery.tsx
│   └── index.ts
│
├── settings/                   # User settings
│   ├── ProfileSettings.tsx
│   ├── PreferenceSettings.tsx
│   ├── PrivacySettings.tsx
│   └── index.ts
│
└── index.ts (barrel export)
```

**Migration Source:** New folder for shared cross-role functionality

---

#### Level 10: PUBLIC SYSTEM (30 modules)
```
modules/public/
├── competitions/               # Public competition info
│   ├── PublicCompetitionPage.tsx
│   ├── PublicSchedule.tsx
│   ├── PublicStandings.tsx
│   ├── PublicStatistics.tsx
│   ├── PublicMedia.tsx
│   └── index.ts
│
├── clubs/                      # Public club profiles
│   ├── PublicClubProfile.tsx
│   ├── ClubNews.tsx
│   ├── ClubGallery.tsx
│   └── index.ts
│
├── players/                    # Public player profiles
│   ├── PublicPlayerProfile.tsx
│   ├── PlayerStats.tsx
│   └── index.ts
│
├── matches/                    # Public match info
│   ├── PublicMatchDetails.tsx
│   ├── LiveScoreBoard.tsx
│   └── index.ts
│
├── landing/                    # Marketing pages
│   ├── LandingPage.tsx
│   ├── Features.tsx
│   └── index.ts
│
└── index.ts (barrel export)
```

**Migration Source:** Public-facing pages (move from various locations, create new public structure)

---

## 📋 FILE-BY-FILE MIGRATION MAPPING

### PHASE 1a: OWNER SYSTEM (39 admin → owner/modules)

| Current Path | New Path | New Component Name | Type |
|---|---|---|---|
| `pages/admin/AdminDashboard.tsx` | `modules/owner/dashboard/OwnerDashboard.tsx` | OwnerDashboard | Rename |
| `pages/admin/PlatformDashboard.tsx` | `modules/owner/dashboard/OwnerDashboard.tsx` | CONSOLIDATE | Delete |
| `pages/admin/PlatformConfiguration.tsx` | `modules/owner/platform-management/PlatformConfiguration.tsx` | - | Keep |
| `pages/admin/GlobalSettings.tsx` | `modules/owner/platform-management/SystemSettings.tsx` | - | Rename |
| `pages/admin/FeatureFlagManagement.tsx` | `modules/owner/platform-management/FeatureFlags.tsx` | - | Rename |
| `pages/admin/MaintenanceMode.tsx` | `modules/owner/platform-management/MaintenanceMode.tsx` | - | Keep |
| `pages/admin/BrandingConfiguration.tsx` | `modules/owner/platform-management/BrandingConfiguration.tsx` | - | Keep |
| `pages/admin/UserManagement.tsx` | `modules/owner/users/UserManagement.tsx` | - | Keep |
| `pages/admin/RoleManagement.tsx` | `modules/owner/users/RoleManagement.tsx` | - | Keep |
| `pages/admin/PermissionManagement.tsx` | `modules/owner/users/PermissionManagement.tsx` | - | Keep |
| `pages/admin/UserMonitoring.tsx` | `modules/owner/users/UserMonitoring.tsx` | - | Keep |
| `pages/admin/AuditReports.tsx` | `modules/owner/users/UserAuditLog.tsx` | - | Rename |
| `pages/admin/ClubManagement.tsx` | `modules/owner/organizations/ClubManagement.tsx` | - | Keep |
| `pages/admin/EventOrganizerManagement.tsx` | `modules/owner/organizations/EOManagement.tsx` | - | Rename |
| `pages/admin/OrganizationMonitoring.tsx` | `modules/owner/organizations/OrganizationMonitoring.tsx` | - | Keep |
| `pages/admin/OrganizationApprovals.tsx` | `modules/owner/organizations/OrganizationApprovals.tsx` | - | Keep |
| `pages/admin/BillingManagement.tsx` | `modules/owner/organizations/BillingManagement.tsx` | - | Keep |
| `pages/admin/SubscriptionManagement.tsx` | `modules/owner/organizations/SubscriptionManagement.tsx` | - | Keep |
| `pages/admin/CompetitionMonitoring.tsx` | `modules/owner/competitions/CompetitionMonitoring.tsx` | - | Keep |
| `pages/admin/CompetitionApprovals.tsx` | `modules/owner/competitions/CompetitionApprovals.tsx` | - | Keep |
| `pages/admin/PlatformRevenue.tsx` | `modules/owner/finance/PlatformRevenue.tsx` | - | Keep |
| `pages/admin/PaymentReconciliation.tsx` | `modules/owner/finance/PaymentReconciliation.tsx` | - | Keep |
| `pages/admin/PlatformFeeSettings.tsx` | `modules/owner/finance/PlatformFeeSettings.tsx` | - | Keep |
| `pages/admin/GlobalAnalytics.tsx` | `modules/owner/analytics/GlobalAnalytics.tsx` | - | Keep |
| `pages/admin/RevenueAnalytics.tsx` | `modules/owner/analytics/RevenueAnalytics.tsx` | - | Keep |
| `pages/admin/SystemMonitoring.tsx` | `modules/owner/infrastructure/SystemMonitoring.tsx` | - | Keep |
| `pages/admin/PerformanceMonitoring.tsx` | `modules/owner/infrastructure/PerformanceMonitoring.tsx` | - | Keep |
| `pages/admin/APIMonitoring.tsx` | `modules/owner/infrastructure/APIMonitoring.tsx` | - | Keep |
| `pages/admin/ServiceMonitoring.tsx` | `modules/owner/infrastructure/ServiceMonitoring.tsx` | - | Keep |
| `pages/admin/SystemLogs.tsx` | `modules/owner/infrastructure/LogManagement.tsx` | - | Rename |
| `pages/admin/SecurityAlerts.tsx` | `modules/owner/security/SecurityAlerts.tsx` | - | Keep |
| `pages/admin/AuditReports.tsx` | `modules/owner/security/SecurityAudit.tsx` | - | Rename |
| `pages/admin/IncidentManagement.tsx` | `modules/owner/security/IncidentManagement.tsx` | - | Keep |
| `pages/admin/ComplianceDashboard.tsx` | `modules/owner/security/ComplianceReports.tsx` | - | Rename |
| `pages/admin/SystemBackup.tsx` | `modules/owner/infrastructure/SystemBackup.tsx` | - | Keep |
| `pages/admin/SystemRestore.tsx` | `modules/owner/infrastructure/SystemRestore.tsx` | - | Keep |
| `pages/admin/APIKeyManagement.tsx` | `modules/owner/developer-tools/APIKeyManagement.tsx` | - | Keep |
| `pages/admin/WebhookManagement.tsx` | `modules/owner/developer-tools/WebhookManagement.tsx` | - | Keep |
| `pages/admin/IntegrationSettings.tsx` | `modules/owner/developer-tools/IntegrationSettings.tsx` | - | Keep |
| `pages/admin/LocalizationSettings.tsx` | `modules/owner/compliance/LocalizationSettings.tsx` | - | Keep |
| `pages/admin/TaxConfiguration.tsx` | `modules/owner/compliance/TaxConfiguration.tsx` | - | Keep |
| `pages/owner/OwnerOverview.tsx` | `modules/owner/dashboard/OwnerDashboard.tsx` | CONSOLIDATE | Keep |
| `pages/owner/ClubManagement.tsx` | `modules/owner/organizations/ClubManagement.tsx` | DUPLICATE | Delete |
| `pages/owner/EOManagement.tsx` | `modules/owner/organizations/EOManagement.tsx` | DUPLICATE | Delete |
| `pages/owner/OwnerFinancial.tsx` | `modules/owner/finance/OwnerFinancial.tsx` | - | Keep |
| `pages/owner/SystemConfig.tsx` | `modules/owner/platform-management/SystemConfig.tsx` | - | Move |
| `pages/owner/AuditLog.tsx` | `modules/owner/security/AuditLog.tsx` | - | Keep |

**Total: 39 admin files + 6 owner files = 45 files to migrate**

---

### PHASE 1b: COMPETITION → EO SYSTEM (64 competition pages)
- **Source:** `pages/competition/*` (64 files all flat)
- **Target:** `modules/eo/` (organized into 14 subfolders)
- **Strategy:** Map each file to logical EO subdomain based on functionality
- **Mapping document:** See DETAILED MAPPING section below (64-file table)

---

### PHASE 1c: CLUB SYSTEM (48 club pages)
- **Source:** `pages/club/*` (already well-organized)
- **Target:** `modules/club/` (maintain structure, move to modules/)
- **Strategy:** Move entire folder with minimal changes
- **Import update:** All relative imports stay same (within folder structure)

---

### PHASE 1d: OTHER MODULES
- **Finance:** `pages/finance/*` → `modules/finance/` (no change to structure)
- **Match:** `pages/match/*` → `modules/matches/` (rename folder, update imports)
- **Analytics:** `pages/analytics/*` → `modules/analytics/` (no change to structure)
- **EO:** `pages/eo/*` already included in PHASE 1b collision handling

---

## 🔄 ROUTE MIGRATION STRATEGY

### Current Routes (App.tsx)
```tsx
// Current structure (scattered)
import AdminDashboard from './pages/admin/AdminDashboard'
import OwnerOverview from './pages/owner/OwnerOverview'
import ClubOverview from './pages/club/ClubOverview'
import CompetitionDashboard from './pages/competition/CompetitionDashboard'
import MatchScheduler from './pages/match/setup/MatchScheduler'
import FinancialDashboard from './pages/finance/dashboard/FinancialDashboard'

const routes = [
  { path: '/admin/*', element: <AdminLayout /> },
  { path: '/owner/*', element: <OwnerLayout /> },
  { path: '/club/*', element: <ClubLayout /> },
  // ... etc
]
```

### Target Routes (New Structure)
```tsx
// After migration (modular)
import { OwnerDashboard } from './modules/owner/dashboard'
import { ClubOverview } from './modules/club/profile'
import { Competitions } from './modules/eo/competitions'
import { MatchScheduler } from './modules/matches/scheduling'
import { FinancialDashboard } from './modules/finance/dashboard'

const routes = [
  // Owner routes
  { path: '/owner/dashboard', element: <OwnerDashboard /> },
  { path: '/owner/users/*', element: <UserManagement /> },
  { path: '/owner/organizations/*', element: <OrganizationManagement /> },
  
  // EO routes
  { path: '/eo/competitions/*', element: <Competitions /> },
  { path: '/eo/matches/*', element: <MatchManagement /> },
  
  // Club routes
  { path: '/club/players/*', element: <PlayerManagement /> },
  
  // Matches routes
  { path: '/matches/schedule', element: <MatchScheduler /> },
  
  // Finance routes
  { path: '/finance/dashboard', element: <FinancialDashboard /> },
]
```

---

## 🔗 IMPORT UPDATE STRATEGY

### 3-Pass Approach

**PASS 1: Update internal module imports**
- Within each moved folder, update relative paths
- Example: `import { Footer } from '../../components/Footer'` stays same (already at correct depth)

**PASS 2: Update App.tsx imports**
- Change all `./pages/*/` imports to `./modules/*/`
- Use semantic search + replace to find all affected imports

**PASS 3: Update any cross-module imports**
- If one module imports from another, update paths
- Most modules should be isolated (good architectural practice)

### Find all affected imports

```bash
# Find all imports that reference pages/ folder
grep -r "from ['\"].*pages/" src/ --include="*.tsx" --include="*.ts"

# Expected matches:
# - App.tsx (all route imports)
# - Any barrel exports (index.ts files)
# - Any utils that import pages (rare)
```

**Estimated affected files:**
- App.tsx (1 file, ~80+ imports)
- Barrel exports in new modules (10+ files)
- **Total: ~12-15 files need import updates**

---

## ✅ BUILD VERIFICATION CHECKPOINTS

### Checkpoint 1: Pre-Migration
```bash
npm run build
# Expected: 2552 modules, 0 errors, ~13.94s
# Baseline: All accessibility updates integrated
```

### Checkpoint 2: After Folder Creation
```bash
npm run build
# Expected: Same as baseline (no changes yet)
# Should pass: All new folders empty or index.ts barrel exports
```

### Checkpoint 3: After File Moves (admin → owner)
```bash
npm run build
# Expected: Compilation errors (import paths broken)
# Next step: Fix all imports in Phase 1d
```

### Checkpoint 4: After Import Updates
```bash
npm run build
# Expected: 0 errors
# Module count may increase slightly (~2560+)
# Compile time: ~14-15s (normal)
```

### Checkpoint 5: After Route Updates
```bash
npm run dev
# Expected: All routes functional
# Manual test: Navigate through owner/, eo/, club/, finance/ sections
```

### Checkpoint 6: Final Verification
```bash
npm run build && npm run test
# Expected:
# - 0 errors
# - All tests pass
# - No import warnings
# - Compile time < 20s
```

---

## 🛠️ EXECUTION STEPS (Detailed)

### STEP 1: Create new `src/modules` folder structure (15 min)
```bash
cd d:\FOPSDIM\aplikasi\pitch-perfect-pro

# Create main modules folder
mkdir src/modules

# Create all 10 domain subfolders
mkdir src/modules/identity
mkdir src/modules/organizations
mkdir src/modules/owner
mkdir src/modules/eo
mkdir src/modules/club
mkdir src/modules/matches
mkdir src/modules/finance
mkdir src/modules/analytics
mkdir src/modules/shared
mkdir src/modules/public

# Create subfolders within each domain
# (For Phase 1, start with owner system)
mkdir src/modules/owner/dashboard
mkdir src/modules/owner/platform-management
mkdir src/modules/owner/users
mkdir src/modules/owner/organizations
mkdir src/modules/owner/competitions
mkdir src/modules/owner/finance
mkdir src/modules/owner/analytics
mkdir src/modules/owner/infrastructure
mkdir src/modules/owner/security
mkdir src/modules/owner/developer-tools
mkdir src/modules/owner/compliance

# Verify structure
dir /s src/modules
```

### STEP 2: Move admin files to owner system (20 min)
```bash
# Create source/destination lists
# Use PowerShell to move files with logging

# Move files
move src/pages/admin/AdminDashboard.tsx src/modules/owner/dashboard/OwnerDashboard.tsx
move src/pages/admin/PlatformConfiguration.tsx src/modules/owner/platform-management/
move src/pages/admin/GlobalSettings.tsx src/modules/owner/platform-management/
# ... (continue for all 39 files)

# Archive admin folder
move src/pages/admin src/pages/admin_BACKUP
```

### STEP 3: Create barrel exports (10 min)
```bash
# Create index.ts for each owner subdomain
# Example: src/modules/owner/dashboard/index.ts

echo "export { default as OwnerDashboard } from './OwnerDashboard';" > src/modules/owner/dashboard/index.ts
# ... (repeat for each subfolder)

# Create main owner index.ts
echo "export * from './dashboard';" > src/modules/owner/index.ts
# ... (repeat for each domain)
```

### STEP 4: Update App.tsx imports (30 min)
- Find all: `from './pages/admin/...`
- Replace with: `from './modules/owner/...`
- Update component names where renamed
- Build & test

### STEP 5: Build & verify
```bash
npm run build
# Should show: 0 errors
# If errors: Review import paths, check for circular dependencies
```

### STEP 6: Test routes
```bash
npm run dev
# Navigate to /owner/dashboard
# Navigate to /owner/users/management
# Verify all routes functional
```

---

## 📊 RISK ASSESSMENT & MITIGATION

### Low Risk
- ✅ Creating new folders (no deletion)
- ✅ Moving files (git tracks changes)
- ✅ Updating imports (searchable, replaceable)
- ✅ Rollback easy (git revert)

### Medium Risk
- ⚠️ Large number of imports to update (~80+ in App.tsx)
- ⚠️ Component naming changes (AdminDashboard → OwnerDashboard)
- ⚠️ Route structure changes (might need middleware updates)

### Mitigation
1. **Use git branch:** `git checkout -b feat/phase1-migration`
2. **Incremental commits:** After each major category moved
3. **Continuous testing:** `npm run build` after each step
4. **Syntax checker:** Use VS Code find/replace with regex
5. **Import validator:** Custom script to verify all imports resolve
6. **Rollback plan:** `git revert HEAD~1` if critical error

---

## 📈 SUCCESS CRITERIA

✅ Phase 1 is complete when:
1. All 45 admin + owner files moved to `modules/owner/`
2. All imports updated (0 broken import errors)
3. All routes functional (dev server runs without errors)
4. Build succeeds (npm run build = 0 errors)
5. No functionality lost or broken
6. Folder structure matches target design
7. Barrel exports work correctly
8. TypeScript compilation clean

---

## 📝 NOTES & OBSERVATIONS

- **No file deletion:** We're preserving functionality, just reorganizing
- **Barrel exports:** Creating index.ts in each folder for clean imports
- **Accessibility baseline:** 145/169 pages already updated (continues with new structure)
- **Build system:** Vite handles large folder structures efficiently
- **Git tracking:** Large refactors like this show well in git logs with useful history
- **Future expansion:** New 500-module structure ready for growth

---

## ⏱️ TIME ESTIMATE

- **Folder Creation:** 15 min
- **File Moves:** 20 min
- **Barrel Exports:** 10 min
- **Import Updates:** 1 hour
- **Build & Testing:** 30 min
- **Buffer/Debugging:** 30 min
- **Total: 2.5-3 hours for Phase 1**

---

**Document Status:** Ready for Execution  
**Last Updated:** March 2026  
**Next Phase:** Phase 1b - EO System Migration (competition folder)

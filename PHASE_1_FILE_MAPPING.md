# 📋 PHASE 1: DETAILED FILE MAPPING & IMPORT TRACKER

**Purpose:** Track every file move, import change, and route update needed for Phase 1 execution  
**Scope:** 45 files (39 admin + 6 owner) moving to `modules/owner/`  
**Format:** Detailed spreadsheet format for tracking progress  
**Created:** For continuous reference during execution

---

## 🎯 QUICK REFERENCE: FILE COUNT SUMMARY

| Category | Current Location | Target Location | File Count | Status |
|----------|------------------|-----------------|------------|--------|
| Owner Dashboard | `pages/admin/`, `pages/owner/` | `modules/owner/dashboard/` | 2 | 📋 Planned |
| Platform Management | `pages/admin/` | `modules/owner/platform-management/` | 5 | 📋 Planned |
| User Management | `pages/admin/`, `pages/owner/` | `modules/owner/users/` | 5 | 📋 Planned |
| Organizations | `pages/admin/`, `pages/owner/` | `modules/owner/organizations/` | 6 | 📋 Planned |
| Competitions | `pages/admin/` | `modules/owner/competitions/` | 2 | 📋 Planned |
| Finance | `pages/admin/`, `pages/owner/` | `modules/owner/finance/` | 4 | 📋 Planned |
| Analytics | `pages/admin/` | `modules/owner/analytics/` | 2 | 📋 Planned |
| Infrastructure | `pages/admin/` | `modules/owner/infrastructure/` | 6 | 📋 Planned |
| Security | `pages/admin/`, `pages/owner/` | `modules/owner/security/` | 4 | 📋 Planned |
| Developer Tools | `pages/admin/` | `modules/owner/developer-tools/` | 3 | 📋 Planned |
| Compliance | `pages/admin/`, `pages/owner/` | `modules/owner/compliance/` | 3 | 📋 Planned |
| **TOTAL** | - | - | **42** | ✅ Accounted |

---

## 📁 OWNER/DASHBOARD (2 files)

### 1. Owner Overview Dashboard

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/AdminDashboard.tsx` |
| **New Path** | `src/modules/owner/dashboard/OwnerDashboard.tsx` |
| **Component Name** | `AdminDashboard` → `OwnerDashboard` |
| **Operation** | Move + Rename |
| **Import Update** | `import AdminDashboard from './pages/admin/AdminDashboard'` → `import OwnerDashboard from './modules/owner/dashboard'` |
| **Route Update** | `/admin` → `/owner/dashboard` |
| **Internal Imports** | Check for relative imports to update |
| **Priority** | HIGH (primary entry point) |
| **Status** | 📋 Planned |
| **Notes** | Main admin dashboard, rename to Owner context |

### 2. Platform Dashboard (CONSOLIDATE)

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/PlatformDashboard.tsx` |
| **New Path** | CONSOLIDATE WITH OwnerDashboard |
| **Component Name** | `PlatformDashboard` |
| **Operation** | Delete (merge functionality into OwnerDashboard) |
| **Import Update** | Remove from App.tsx |
| **Route Update** | Remove `/platform-dashboard` route |
| **Notes** | Duplicate of AdminDashboard, consolidate before migration |
| **Status** | 📋 Planned |

**Barrel Export:** `src/modules/owner/dashboard/index.ts`
```tsx
export { default as OwnerDashboard } from './OwnerDashboard';
```

---

## 🔧 OWNER/PLATFORM-MANAGEMENT (5 files)

### 1. Platform Configuration

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/PlatformConfiguration.tsx` |
| **New Path** | `src/modules/owner/platform-management/PlatformConfiguration.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Import Update** | Update path in App.tsx |
| **Notes** | Core platform settings |
| **Status** | 📋 Planned |

### 2. Global Settings → System Settings

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/GlobalSettings.tsx` |
| **New Path** | `src/modules/owner/platform-management/SystemSettings.tsx` |
| **Component Name** | `GlobalSettings` → `SystemSettings` |
| **Operation** | Move + Rename |
| **Import Update** | Update path and component name |
| **Notes** | Rename for clarity (global → system) |
| **Status** | 📋 Planned |

### 3. Feature Flags

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/FeatureFlagManagement.tsx` |
| **New Path** | `src/modules/owner/platform-management/FeatureFlags.tsx` |
| **Component Name** | `FeatureFlagManagement` → `FeatureFlags` |
| **Operation** | Move + Rename |
| **Import Update** | Update path and component name |
| **Notes** | Shorten name for consistency |
| **Status** | 📋 Planned |

### 4. Maintenance Mode

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/MaintenanceMode.tsx` |
| **New Path** | `src/modules/owner/platform-management/MaintenanceMode.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 5. Branding Configuration

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/BrandingConfiguration.tsx` |
| **New Path** | `src/modules/owner/platform-management/BrandingConfiguration.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

**Barrel Export:** `src/modules/owner/platform-management/index.ts`
```tsx
export { default as PlatformConfiguration } from './PlatformConfiguration';
export { default as SystemSettings } from './SystemSettings';
export { default as FeatureFlags } from './FeatureFlags';
export { default as MaintenanceMode } from './MaintenanceMode';
export { default as BrandingConfiguration } from './BrandingConfiguration';
```

---

## 👥 OWNER/USERS (5 files)

### 1. User Management

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/UserManagement.tsx` |
| **New Path** | `src/modules/owner/users/UserManagement.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 2. Role Management

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/RoleManagement.tsx` |
| **New Path** | `src/modules/owner/users/RoleManagement.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 3. Permission Management

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/PermissionManagement.tsx` |
| **New Path** | `src/modules/owner/users/PermissionManagement.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 4. User Monitoring

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/UserMonitoring.tsx` |
| **New Path** | `src/modules/owner/users/UserMonitoring.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 5. User Audit Log

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/AuditReports.tsx` (or duplicate in `pages/owner/`) |
| **New Path** | `src/modules/owner/users/UserAuditLog.tsx` |
| **Component Name** | `AuditReports` → `UserAuditLog` |
| **Operation** | Move + Rename |
| **Notes** | Rename to be specific to user audit context |
| **Status** | 📋 Planned |

**Barrel Export:** `src/modules/owner/users/index.ts`
```tsx
export { default as UserManagement } from './UserManagement';
export { default as RoleManagement } from './RoleManagement';
export { default as PermissionManagement } from './PermissionManagement';
export { default as UserMonitoring } from './UserMonitoring';
export { default as UserAuditLog } from './UserAuditLog';
```

---

## 🏢 OWNER/ORGANIZATIONS (6 files)

### 1. Club Management

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/ClubManagement.tsx` OR `src/pages/owner/ClubManagement.tsx` |
| **New Path** | `src/modules/owner/organizations/ClubManagement.tsx` |
| **Component Name** | No change |
| **Operation** | Move (consolidate if duplicated) |
| **Notes** | Referenced in both admin/ and owner/; take from owner/ or merge |
| **Status** | 📋 Planned |

### 2. EO Management

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/EventOrganizerManagement.tsx` OR `src/pages/owner/EOManagement.tsx` |
| **New Path** | `src/modules/owner/organizations/EOManagement.tsx` |
| **Component Name** | `EventOrganizerManagement` → `EOManagement` |
| **Operation** | Move + Rename (or consolidate) |
| **Notes** | Consolidate if duplicated in admin and owner |
| **Status** | 📋 Planned |

### 3. Organization Monitoring

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/OrganizationMonitoring.tsx` |
| **New Path** | `src/modules/owner/organizations/OrganizationMonitoring.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 4. Organization Approvals

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/OrganizationApprovals.tsx` |
| **New Path** | `src/modules/owner/organizations/OrganizationApprovals.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 5. Billing Management

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/BillingManagement.tsx` |
| **New Path** | `src/modules/owner/organizations/BillingManagement.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 6. Subscription Management

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/SubscriptionManagement.tsx` |
| **New Path** | `src/modules/owner/organizations/SubscriptionManagement.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

**Barrel Export:** `src/modules/owner/organizations/index.ts`
```tsx
export { default as ClubManagement } from './ClubManagement';
export { default as EOManagement } from './EOManagement';
export { default as OrganizationMonitoring } from './OrganizationMonitoring';
export { default as OrganizationApprovals } from './OrganizationApprovals';
export { default as BillingManagement } from './BillingManagement';
export { default as SubscriptionManagement } from './SubscriptionManagement';
```

---

## 🏆 OWNER/COMPETITIONS (2 files)

### 1. Competition Monitoring

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/CompetitionMonitoring.tsx` |
| **New Path** | `src/modules/owner/competitions/CompetitionMonitoring.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 2. Competition Approvals

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/CompetitionApprovals.tsx` |
| **New Path** | `src/modules/owner/competitions/CompetitionApprovals.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

**Barrel Export:** `src/modules/owner/competitions/index.ts`
```tsx
export { default as CompetitionMonitoring } from './CompetitionMonitoring';
export { default as CompetitionApprovals } from './CompetitionApprovals';
```

---

## 💰 OWNER/FINANCE (4 files)

### 1. Platform Revenue

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/PlatformRevenue.tsx` |
| **New Path** | `src/modules/owner/finance/PlatformRevenue.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 2. Payment Reconciliation

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/PaymentReconciliation.tsx` |
| **New Path** | `src/modules/owner/finance/PaymentReconciliation.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 3. Platform Fee Settings

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/PlatformFeeSettings.tsx` |
| **New Path** | `src/modules/owner/finance/PlatformFeeSettings.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 4. Owner Financial

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/owner/OwnerFinancial.tsx` |
| **New Path** | `src/modules/owner/finance/OwnerFinancial.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

**Barrel Export:** `src/modules/owner/finance/index.ts`
```tsx
export { default as PlatformRevenue } from './PlatformRevenue';
export { default as PaymentReconciliation } from './PaymentReconciliation';
export { default as PlatformFeeSettings } from './PlatformFeeSettings';
export { default as OwnerFinancial } from './OwnerFinancial';
```

---

## 📊 OWNER/ANALYTICS (2 files)

### 1. Global Analytics

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/GlobalAnalytics.tsx` |
| **New Path** | `src/modules/owner/analytics/GlobalAnalytics.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 2. Revenue Analytics

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/RevenueAnalytics.tsx` |
| **New Path** | `src/modules/owner/analytics/RevenueAnalytics.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

**Barrel Export:** `src/modules/owner/analytics/index.ts`
```tsx
export { default as GlobalAnalytics } from './GlobalAnalytics';
export { default as RevenueAnalytics } from './RevenueAnalytics';
```

---

## 🏗️ OWNER/INFRASTRUCTURE (6 files)

### 1. System Monitoring

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/SystemMonitoring.tsx` |
| **New Path** | `src/modules/owner/infrastructure/SystemMonitoring.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 2. Performance Monitoring

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/PerformanceMonitoring.tsx` |
| **New Path** | `src/modules/owner/infrastructure/PerformanceMonitoring.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 3. API Monitoring

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/APIMonitoring.tsx` |
| **New Path** | `src/modules/owner/infrastructure/APIMonitoring.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 4. Service Monitoring

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/ServiceMonitoring.tsx` |
| **New Path** | `src/modules/owner/infrastructure/ServiceMonitoring.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 5. Log Management

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/SystemLogs.tsx` |
| **New Path** | `src/modules/owner/infrastructure/LogManagement.tsx` |
| **Component Name** | `SystemLogs` → `LogManagement` |
| **Operation** | Move + Rename |
| **Notes** | Rename for consistency with folder name |
| **Status** | 📋 Planned |

### 6. System Backup/Restore (COMBO)

| Field | Value |
|-------|-------|
| **Current Paths** | `src/pages/admin/SystemBackup.tsx`, `src/pages/admin/SystemRestore.tsx` |
| **New Path** | `src/modules/owner/infrastructure/SystemBackupRestore.tsx` |
| **Component Name** | Combine into single component or keep separate |
| **Operation** | Move (+ optional: Consolidate) |
| **Notes** | Can keep separate or create combined backup/restore view |
| **Status** | 📋 Planned |

**Barrel Export:** `src/modules/owner/infrastructure/index.ts`
```tsx
export { default as SystemMonitoring } from './SystemMonitoring';
export { default as PerformanceMonitoring } from './PerformanceMonitoring';
export { default as APIMonitoring } from './APIMonitoring';
export { default as ServiceMonitoring } from './ServiceMonitoring';
export { default as LogManagement } from './LogManagement';
export { default as SystemBackupRestore } from './SystemBackupRestore';
```

---

## 🔒 OWNER/SECURITY (4 files)

### 1. Security Audit

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/AuditReports.tsx` (in security context) |
| **New Path** | `src/modules/owner/security/SecurityAudit.tsx` |
| **Component Name** | `AuditReports` → `SecurityAudit` |
| **Operation** | Move + Rename |
| **Notes** | Different from UserAuditLog (security domain vs user domain) |
| **Status** | 📋 Planned |

### 2. Incident Management

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/IncidentManagement.tsx` |
| **New Path** | `src/modules/owner/security/IncidentManagement.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 3. Compliance Reports

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/ComplianceDashboard.tsx` |
| **New Path** | `src/modules/owner/security/ComplianceReports.tsx` |
| **Component Name** | `ComplianceDashboard` → `ComplianceReports` |
| **Operation** | Move + Rename |
| **Notes** | Rename to be consistent with module purpose |
| **Status** | 📋 Planned |

### 4. Security Alerts

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/SecurityAlerts.tsx` |
| **New Path** | `src/modules/owner/security/SecurityAlerts.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

**Barrel Export:** `src/modules/owner/security/index.ts`
```tsx
export { default as SecurityAudit } from './SecurityAudit';
export { default as IncidentManagement } from './IncidentManagement';
export { default as ComplianceReports } from './ComplianceReports';
export { default as SecurityAlerts } from './SecurityAlerts';
```

---

## 🛠️ OWNER/DEVELOPER-TOOLS (3 files)

### 1. API Key Management

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/APIKeyManagement.tsx` |
| **New Path** | `src/modules/owner/developer-tools/APIKeyManagement.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 2. Webhook Management

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/WebhookManagement.tsx` |
| **New Path** | `src/modules/owner/developer-tools/WebhookManagement.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 3. Integration Settings

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/IntegrationSettings.tsx` |
| **New Path** | `src/modules/owner/developer-tools/IntegrationSettings.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

**Barrel Export:** `src/modules/owner/developer-tools/index.ts`
```tsx
export { default as APIKeyManagement } from './APIKeyManagement';
export { default as WebhookManagement } from './WebhookManagement';
export { default as IntegrationSettings } from './IntegrationSettings';
```

---

## ⚖️ OWNER/COMPLIANCE (3 files)

### 1. Localization Settings

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/LocalizationSettings.tsx` |
| **New Path** | `src/modules/owner/compliance/LocalizationSettings.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 2. Tax Configuration

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/admin/TaxConfiguration.tsx` |
| **New Path** | `src/modules/owner/compliance/TaxConfiguration.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

### 3. System Config (from owner/)

| Field | Value |
|-------|-------|
| **Current Path** | `src/pages/owner/SystemConfig.tsx` |
| **New Path** | `src/modules/owner/compliance/SystemConfig.tsx` |
| **Component Name** | No change |
| **Operation** | Move |
| **Status** | 📋 Planned |

**Barrel Export:** `src/modules/owner/compliance/index.ts`
```tsx
export { default as LocalizationSettings } from './LocalizationSettings';
export { default as TaxConfiguration } from './TaxConfiguration';
export { default as SystemConfig } from './SystemConfig';
```

---

## 🎯 CONSOLIDATION & DELETION CHECKLIST

### Files to DELETE (duplicates):
- ❌ `pages/admin/PlatformDashboard.tsx` → Consolidate into OwnerDashboard
- ❌ `pages/owner/ClubManagement.tsx` → Consolidate if duplicate of admin version
- ❌ `pages/owner/EOManagement.tsx` → Consolidate if duplicate of admin version

### Files to CONSOLIDATE:
- 🔄 AuditReports → Split into UserAuditLog + SecurityAudit (different contexts)
- 🔄 Dashboard files → Consolidate into single OwnerDashboard

---

## 🔗 IMPORT UPDATE TRACKER

### Files that need import updates:

| File | Current Imports | Updated Imports | Status |
|------|-----------------|-----------------|--------|
| `src/App.tsx` | `from './pages/admin/...'` | `from './modules/owner/...'` | ⏳ TODO |
| `src/App.tsx` | `from './pages/owner/...'` | `from './modules/owner/...'` | ⏳ TODO |
| `src/modules/owner/index.ts` | (barrel export) | All subdirs | ⏳ TODO |
| `src/modules/owner/*/index.ts` | (barrel exports) | All components | ⏳ TODO |

### Search patterns for import updates:

```bash
# Find all admin imports
grep -r "from ['\"].*pages/admin" src/ --include="*.tsx" --include="*.ts"

# Find all owner imports
grep -r "from ['\"].*pages/owner" src/ --include="*.tsx" --include="*.ts"

# Find relative imports that might need updating
grep -r "from ['\"]\.\./" src/modules/owner --include="*.tsx" --include="*.ts"
```

**Estimated affected files:** 15-20 files total

---

## ✅ EXECUTION CHECKLIST

### PRE-MIGRATION (Day 0)
- [ ] Create git branch: `git checkout -b feat/phase1-owner-migration`
- [ ] Run baseline build: `npm run build` (should be 2552 modules)
- [ ] Backup pages/admin and pages/owner folders
- [ ] Create this tracking document

### FOLDER STRUCTURE (Day 1 - 15 min)
- [ ] Create `src/modules/` folder
- [ ] Create all 10 domain subfolders
- [ ] Create all owner/ subfolders (11 total)
- [ ] Verify structure with `dir /s src/modules`

### FILE MOVES (Day 1 - 20 min)
- [ ] Move all dashboard files (2)
- [ ] Move all platform-management files (5)
- [ ] Move all users files (5)
- [ ] Move all organizations files (6)
- [ ] Move all competitions files (2)
- [ ] Move all finance files (4)
- [ ] Move all analytics files (2)
- [ ] Move all infrastructure files (6)
- [ ] Move all security files (4)
- [ ] Move all developer-tools files (3)
- [ ] Move all compliance files (3)
- [ ] Verify all 42 files moved successfully
- [ ] Archive old `pages/admin` and `pages/owner` folders

### BARREL EXPORTS (Day 1 - 10 min)
- [ ] Create `src/modules/owner/dashboard/index.ts`
- [ ] Create `src/modules/owner/platform-management/index.ts`
- [ ] Create `src/modules/owner/users/index.ts`
- [ ] Create `src/modules/owner/organizations/index.ts`
- [ ] Create `src/modules/owner/competitions/index.ts`
- [ ] Create `src/modules/owner/finance/index.ts`
- [ ] Create `src/modules/owner/analytics/index.ts`
- [ ] Create `src/modules/owner/infrastructure/index.ts`
- [ ] Create `src/modules/owner/security/index.ts`
- [ ] Create `src/modules/owner/developer-tools/index.ts`
- [ ] Create `src/modules/owner/compliance/index.ts`
- [ ] Create `src/modules/owner/index.ts` (main barrel)

### IMPORT UPDATES (Day 2 - 1 hour)
- [ ] Run grep to find all affected imports
- [ ] Update `src/App.tsx` AdminDashboard import
- [ ] Update all other admin/ imports in App.tsx
- [ ] Update all owner/ imports in App.tsx
- [ ] Verify component name changes (AdminDashboard → OwnerDashboard, etc.)
- [ ] Check for any broken relative imports within moved files

### ROUTE UPDATES (Day 2 - 20 min)
- [ ] Update `/admin/*` routes to `/owner/*`
- [ ] Update component references to use new component names
- [ ] Verify all route paths are unique and non-conflicting
- [ ] Test routes in dev server

### BUILD & VERIFICATION (Day 2 - 30 min)
- [ ] Run `npm run build` (should be 0 errors)
- [ ] Check module count (should be ~2552-2560)
- [ ] Run `npm run dev` (should start without errors)
- [ ] Test navigation to owner routes
- [ ] Verify sidebar/navigation updates

### FINAL CHECKS (Day 2 - 15 min)
- [ ] No broken imports
- [ ] All components render
- [ ] Routes functional
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] Git diff shows expected changes
- [ ] Commit changes: `git commit -m "feat(phase1): migrate admin/owner to modules/owner"`

---

## 📈 SUCCESS CRITERIA

✅ Phase 1 Owner Migration is complete when:

1. ✅ All 42 files successfully moved to `src/modules/owner/`
2. ✅ All subdirectories created (11 folders)
3. ✅ All barrel exports working
4. ✅ `npm run build` returns 0 errors
5. ✅ No broken imports in codebase
6. ✅ All routes functional (`/owner`, `/owner/users`, etc.)
7. ✅ ComponentName changes applied (AdminDashboard → OwnerDashboard)
8. ✅ dev server runs without errors
9. ✅ Navigation updates reflect new structure
10. ✅ Git history shows clean migration

---

**Document Status:** Ready for Execution  
**Last Updated:** March 2026  
**Next Steps:** Begin Phase 1 folder creation and file moves

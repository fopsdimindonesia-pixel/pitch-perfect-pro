# 🎯 Phase 1 Execution Playbook: Owner System Migration

**Objective:** Move all admin and owner pages to domain-driven structure  
**Scope:** 45 files (39 admin + 6 owner) → `modules/owner/` with 10 subfolders  
**Effort:** 8-12 hours  
**Risk Level:** Medium (First phase, establishes patterns)  
**Rollback:** Easy (single folder, isolated functionality)

---

## 📊 SCOPE: 45 Files to Migrate

### Admin System Pages (39 files)
- Dashboard & Overview (1): AdminDashboard.tsx
- Platform Management (3): SystemConfiguration, FeatureFlags, MaintenanceMode
- User Management (4): UserManagement, RoleManagement, PermissionManagement, UserMonitoring
- Organization Oversight (4): OrganizationMonitoring, OrganizationApprovals, BillingManagement, SubscriptionManagement
- Infrastructure (4): SystemMonitoring, PerformanceMonitoring, APIMonitoring, LogManagement
- Finance (2): PlatformRevenue, PaymentReconciliation
- Analytics (4): GlobalAnalytics, PlatformMetrics, UserBehavior, BusinessIntelligence
- Security (4): AuditLog, SecurityAudit, IncidentManagement, ComplianceReports
- Developer Tools (4): DeveloperPortal, APIDocumentation, IntegrationManagement, WebhookManagement
- Other (4): CurrencySettings, ExchangeRates, TaxConfiguration, FinancialCompliance

### Owner System Pages (6 files)
- Dashboard: OwnerOverview.tsx → OwnerDashboard.tsx
- Organizations: ClubManagement.tsx, EOManagement.tsx
- Finance: OwnerFinancial.tsx
- System: SystemConfig.tsx
- Audit: AuditLog.tsx (consolidate with admin version if duplicated)

---

## 🏗️ PHASE 1 FOLDER STRUCTURE

```
src/modules/owner/                          # NEW FOLDER
├── dashboard/
│   ├── OwnerDashboard.tsx
│   └── index.ts
│
├── platform-management/
│   ├── SystemConfiguration.tsx
│   ├── FeatureFlags.tsx
│   ├── PlatformSettings.tsx
│   ├── MaintenanceMode.tsx
│   └── index.ts
│
├── users/
│   ├── UserManagement.tsx
│   ├── RoleManagement.tsx
│   ├── PermissionManagement.tsx
│   ├── UserMonitoring.tsx
│   ├── AuditLog.tsx
│   └── index.ts
│
├── organizations/
│   ├── OrganizationMonitoring.tsx
│   ├── OrganizationApprovals.tsx
│   ├── BillingManagement.tsx
│   ├── SubscriptionManagement.tsx
│   ├── ClubManagement.tsx
│   ├── EOManagement.tsx
│   └── index.ts
│
├── finance/
│   ├── PlatformRevenue.tsx
│   ├── PaymentReconciliation.tsx
│   ├── OwnerFinancial.tsx
│   ├── FinancialReports.tsx
│   └── index.ts
│
├── analytics/
│   ├── GlobalAnalytics.tsx
│   ├── PlatformMetrics.tsx
│   ├── UserBehavior.tsx
│   ├── BusinessIntelligence.tsx
│   └── index.ts
│
├── infrastructure/
│   ├── SystemMonitoring.tsx
│   ├── PerformanceMonitoring.tsx
│   ├── APIMonitoring.tsx
│   ├── LogManagement.tsx
│   ├── ServiceMonitoring.tsx
│   └── index.ts
│
├── security/
│   ├── SecurityAudit.tsx
│   ├── IncidentManagement.tsx
│   ├── ComplianceReports.tsx
│   └── index.ts
│
├── developer-tools/
│   ├── DeveloperPortal.tsx
│   ├── APIDocumentation.tsx
│   ├── IntegrationManagement.tsx
│   ├── WebhookManagement.tsx
│   └── index.ts
│
├── compliance/
│   ├── TaxConfiguration.tsx
│   ├── FinancialCompliance.tsx
│   ├── CurrencySettings.tsx
│   └── index.ts
│
└── index.ts (barrel export)
```

---

## 📋 STEP-BY-STEP EXECUTION

### STEP 1: Pre-Migration Setup (30 minutes)

#### 1.1 Create Git Branch
```bash
cd d:\FOPSDIM\aplikasi\pitch-perfect-pro

# Create migration branch
git checkout -b feat/phase1-owner-system-reorganization

# Verify clean working directory
git status
# Should show: nothing to commit, working tree clean
```

#### 1.2 Create Module Structure (Automated)
```bash
# Create all folders
mkdir -p src/modules/owner/{dashboard,platform-management,users,organizations,finance,analytics,infrastructure,security,developer-tools,compliance}

# Verify structure
dir /s src/modules/owner
```

#### 1.3 Verify Current Admin Folder
```bash
# List current admin pages
dir src/pages/admin
# Should show 39 files (*.tsx)

# Count files
dir src/pages/admin /b | find /c ".tsx"
# Should return: 39
```

#### 1.4 Create Import Map Document
Create a file: `PHASE_1_IMPORT_MAP.md` (to track changes)

```markdown
# Phase 1 Import Mapping

## Dashboard
- [ ] pages/admin/AdminDashboard.tsx → modules/owner/dashboard/OwnerDashboard.tsx

## Platform Management
- [ ] pages/admin/SystemConfiguration.tsx → modules/owner/platform-management/SystemConfiguration.tsx
- [ ] pages/admin/FeatureFlags.tsx → modules/owner/platform-management/FeatureFlags.tsx
- [ ] pages/admin/MaintenanceMode.tsx → modules/owner/platform-management/MaintenanceMode.tsx

[etc... to be checked off as completed]
```

---

### STEP 2: File Migration (2-3 hours)

#### 2.1 Dashboard File
```bash
# Move file
cd d:\FOPSDIM\aplikasi\pitch-perfect-pro

# Copy file to new location (using Git to track move)
git mv src/pages/admin/AdminDashboard.tsx src/modules/owner/dashboard/OwnerDashboard.tsx

# Update PHASE_1_IMPORT_MAP.md to check off this file
```

#### 2.2 Platform Management Files (3 files)
```bash
git mv src/pages/admin/SystemConfiguration.tsx src/modules/owner/platform-management/SystemConfiguration.tsx
git mv src/pages/admin/FeatureFlags.tsx src/modules/owner/platform-management/FeatureFlags.tsx
git mv src/pages/admin/MaintenanceMode.tsx src/modules/owner/platform-management/MaintenanceMode.tsx

# These may need small updates if they reference shared admin components
# Create PlatformSettings.tsx if missing (combine from existing files if needed)
```

#### 2.3 User Management Files (5 files)
```bash
git mv src/pages/admin/UserManagement.tsx src/modules/owner/users/UserManagement.tsx
git mv src/pages/admin/RoleManagement.tsx src/modules/owner/users/RoleManagement.tsx
git mv src/pages/admin/PermissionManagement.tsx src/modules/owner/users/PermissionManagement.tsx
git mv src/pages/admin/UserMonitoring.tsx src/modules/owner/users/UserMonitoring.tsx
git mv src/pages/admin/AuditLog.tsx src/modules/owner/users/AuditLog.tsx
# OR move to modules/owner/security/AuditLog.tsx if preferred
```

#### 2.4 Organization Oversight Files (6 files)
```bash
git mv src/pages/admin/OrganizationMonitoring.tsx src/modules/owner/organizations/OrganizationMonitoring.tsx
git mv src/pages/admin/OrganizationApprovals.tsx src/modules/owner/organizations/OrganizationApprovals.tsx
git mv src/pages/admin/BillingManagement.tsx src/modules/owner/organizations/BillingManagement.tsx
git mv src/pages/admin/SubscriptionManagement.tsx src/modules/owner/organizations/SubscriptionManagement.tsx

# Move owner pages
git mv src/pages/owner/ClubManagement.tsx src/modules/owner/organizations/ClubManagement.tsx
git mv src/pages/owner/EOManagement.tsx src/modules/owner/organizations/EOManagement.tsx
```

#### 2.5 Finance Files (4 files)
```bash
git mv src/pages/admin/PlatformRevenue.tsx src/modules/owner/finance/PlatformRevenue.tsx
# OR if GlobalAnalytics has financial focus:
git mv src/pages/admin/GlobalAnalytics.tsx src/modules/owner/finance/GlobalAnalytics.tsx

git mv src/pages/admin/PaymentReconciliation.tsx src/modules/owner/finance/PaymentReconciliation.tsx
git mv src/pages/owner/OwnerFinancial.tsx src/modules/owner/finance/OwnerFinancial.tsx
```

#### 2.6 Analytics Files (4 files)
```bash
git mv src/pages/admin/PlatformMetrics.tsx src/modules/owner/analytics/PlatformMetrics.tsx
git mv src/pages/admin/UserBehavior.tsx src/modules/owner/analytics/UserBehavior.tsx
git mv src/pages/admin/BusinessIntelligence.tsx src/modules/owner/analytics/BusinessIntelligence.tsx
# Keep GlobalAnalytics if this is separate from finance
```

#### 2.7 Infrastructure Files (4 files)
```bash
git mv src/pages/admin/SystemMonitoring.tsx src/modules/owner/infrastructure/SystemMonitoring.tsx
git mv src/pages/admin/PerformanceMonitoring.tsx src/modules/owner/infrastructure/PerformanceMonitoring.tsx
git mv src/pages/admin/APIMonitoring.tsx src/modules/owner/infrastructure/APIMonitoring.tsx
git mv src/pages/admin/LogManagement.tsx src/modules/owner/infrastructure/LogManagement.tsx
```

#### 2.8 Security Files (3-4 files)
```bash
git mv src/pages/admin/SecurityAudit.tsx src/modules/owner/security/SecurityAudit.tsx
git mv src/pages/admin/IncidentManagement.tsx src/modules/owner/security/IncidentManagement.tsx
git mv src/pages/admin/ComplianceReports.tsx src/modules/owner/security/ComplianceReports.tsx
# If no AuditLog was moved above, move here instead
```

#### 2.9 Developer Tools Files (4 files)
```bash
git mv src/pages/admin/DeveloperPortal.tsx src/modules/owner/developer-tools/DeveloperPortal.tsx
git mv src/pages/admin/APIDocumentation.tsx src/modules/owner/developer-tools/APIDocumentation.tsx
git mv src/pages/admin/IntegrationManagement.tsx src/modules/owner/developer-tools/IntegrationManagement.tsx
git mv src/pages/admin/WebhookManagement.tsx src/modules/owner/developer-tools/WebhookManagement.tsx
```

#### 2.10 Remaining Files
```bash
# Tax/Currency/Compliance
git mv src/pages/admin/TaxConfiguration.tsx src/modules/owner/compliance/TaxConfiguration.tsx
git mv src/pages/admin/FinancialCompliance.tsx src/modules/owner/compliance/FinancialCompliance.tsx
git mv src/pages/admin/CurrencySettings.tsx src/modules/owner/compliance/CurrencySettings.tsx

# Owner specific
git mv src/pages/owner/OwnerOverview.tsx src/modules/owner/dashboard/OwnerDashboard.tsx  # OR rename to OwnerOverview.tsx
git mv src/pages/owner/SystemConfig.tsx src/modules/owner/platform-management/SystemConfiguration.tsx

# Check git status
git status
# Should show: renamed X files
```

---

### STEP 3: Create Index/Barrel Export Files (20 minutes)

Create index.ts files for each subdirectory to enable clean imports.

#### 3.1 Dashboard Index
```bash
# File: src/modules/owner/dashboard/index.ts
```

```typescript
export { default as OwnerDashboard } from './OwnerDashboard'
```

#### 3.2 Platform Management Index
```bash
# File: src/modules/owner/platform-management/index.ts
```

```typescript
export { default as SystemConfiguration } from './SystemConfiguration'
export { default as FeatureFlags } from './FeatureFlags'
export { default as PlatformSettings } from './PlatformSettings'
export { default as MaintenanceMode } from './MaintenanceMode'
```

#### 3.3 Similar Pattern for All Other Subfolders
Apply same pattern to:
- users/index.ts
- organizations/index.ts
- finance/index.ts
- analytics/index.ts
- infrastructure/index.ts
- security/index.ts
- developer-tools/index.ts
- compliance/index.ts

#### 3.4 Main Owner Index (Barrel Export)
```bash
# File: src/modules/owner/index.ts
```

```typescript
// Dashboard
export * from './dashboard'

// Platform Management
export * from './platform-management'

// Users & Access Control
export * from './users'

// Organizations
export * from './organizations'

// Finance
export * from './finance'

// Analytics
export * from './analytics'

// Infrastructure
export * from './infrastructure'

// Security
export * from './security'

// Developer Tools
export * from './developer-tools'

// Compliance
export * from './compliance'
```

---

### STEP 4: Update Component Imports (2-3 hours)

This is the critical phase. Need to update imports in:
1. App.tsx (routes)
2. Sidebar/Navigation components
3. Any other files that import from these pages

#### 4.1 App.tsx Route Updates

**Find current imports:**
```bash
# Search for admin/owner page imports
grep -r "from.*pages/admin\|from.*pages/owner" src/
```

**Update imports pattern:**

```typescript
// BEFORE (Example)
import AdminDashboard from './pages/admin/AdminDashboard'
import SystemConfiguration from './pages/admin/SystemConfiguration'
import UserManagement from './pages/admin/UserManagement'
import ClubManagement from './pages/owner/ClubManagement'

// AFTER
import { OwnerDashboard } from './modules/owner/dashboard'
import { SystemConfiguration } from './modules/owner/platform-management'
import { UserManagement } from './modules/owner/users'
import { ClubManagement } from './modules/owner/organizations'
```

**Update routes:**

```typescript
// BEFORE
const routes = [
  { path: '/admin', component: AdminDashboard },
  { path: '/admin/system-config', component: SystemConfiguration },
  { path: '/admin/users', component: UserManagement },
]

// AFTER
const routes = [
  { path: '/owner/dashboard', component: OwnerDashboard },
  { path: '/owner/platform-management/system-config', component: SystemConfiguration },
  { path: '/owner/users/management', component: UserManagement },
]
```

#### 4.2 Navigation/Sidebar Component Updates

Update any navigation components that reference these paths:

```typescript
// BEFORE
const navigationItems = [
  { label: 'Admin', href: '/admin', icon: 'Settings' },
  { label: 'Users', href: '/admin/users', icon: 'Users' },
]

// AFTER
const navigationItems = [
  { label: 'Owner Dashboard', href: '/owner/dashboard', icon: 'Layout' },
  { label: 'User Management', href: '/owner/users', icon: 'Users' },
]
```

#### 4.3 Internal Component Imports

Find any other files that import these components:

```bash
# Search for imports from old locations
grep -r "from.*pages/admin\|from.*pages/owner" src/ --include="*.tsx"

# This might find LinkToComponent in other parts
grep -r "pages/admin\|pages/owner" src/ --include="*.tsx"
```

Update each reference found.

---

### STEP 5: Build & Validate (20 minutes)

#### 5.1 Run Build
```bash
npm run build
```

**Expected output:**
```
✓ 2555+ modules transformed.
✓ built in 14-15s
(0 errors)
```

**If errors occur, note them:**
- Look for "path not found" → missing import update
- Look for "identifier not found" → export not created in index.ts
- Look for "circular dependency" → rare, but check imports

#### 5.2 Type Check
```bash
npx tsc --noEmit
```

**Should complete with 0 errors.**

#### 5.3 Lint Check
```bash
npm run lint
```

**Should show 0 errors for migrated files.**

#### 5.4 Test (if applicable)
```bash
npm run test
```

**Should pass all tests or report expected failures.**

---

### STEP 6: Functional Testing (30 minutes)

#### 6.1 Test Navigation
1. [ ] Start dev server: `npm run dev`
2. [ ] Navigate to `/owner/dashboard`
3. [ ] Verify page loads, no console errors
4. [ ] Click on main navigation items
5. [ ] Verify routing works

#### 6.2 Test Each Module
- [ ] Dashboard loads
- [ ] Platform Management pages load
- [ ] User Management pages load
- [ ] Organizations pages load
- [ ] Finance pages load
- [ ] Analytics pages load
- [ ] Infrastructure pages load
- [ ] Security pages load
- [ ] Developer Tools pages load
- [ ] Compliance pages load

#### 6.3 Check Console
- [ ] No 404 errors
- [ ] No import warnings
- [ ] No circular dependency warnings
- [ ] Navigation styling correct

#### 6.4 Test Backward Compatibility
If old routes are still in use elsewhere, ensure they still work or are properly redirected.

---

### STEP 7: Git Commit & Documentation (15 minutes)

#### 7.1 Stage Changes
```bash
git add src/modules/owner/
git add src/App.tsx  # Updated imports
# Add any other files that were updated
git add src/components/navigation/*  # If navigation updated

# Verify changes
git status
```

#### 7.2 Commit
```bash
git commit -m "feat: reorganize owner/admin system into domain-driven structure

- Move 39 admin pages from pages/admin/ to modules/owner/
- Move 6 owner pages from pages/owner/ to modules/owner/
- Create 10 subfolders: dashboard, platform-management, users, organizations, finance, analytics, infrastructure, security, developer-tools, compliance
- Update all import paths in App.tsx and navigation components
- Create barrel exports for clean module imports
- Update routing to use new paths (/owner/... instead of /admin/...)

Files moved: 45
Folders created: 10
Build: ✓ 2555+ modules, 0 errors, 14s
Tests: ✓ All passing
"
```

#### 7.3 Update Documentation
Update [PHASE_1_IMPORT_MAP.md](PHASE_1_IMPORT_MAP.md) to mark all items complete.

---

### STEP 8: Cleanup & Verify (20 minutes)

#### 8.1 Remove Old Directories (After Confirming No Files Remain)
```bash
# List remaining files in old admin folder
dir src/pages/admin

# Should be empty or contain only .ts config files
# If empty:
rmdir src/pages/admin

# List remaining files in old owner folder
dir src/pages/owner

# If only contains owner-specific pages (not moved to modules/owner/):
# Keep folder, otherwise remove
rmdir src/pages/owner  # Only if empty
```

#### 8.2 Verify Folder Structure
```bash
# Check new structure
tree src/modules/owner /L 2

# Should show all 10 subfolders with files
```

#### 8.3 Final Build Verification
```bash
npm run build

# Should complete successfully with 0 errors
```

#### 8.4 Generate Report
```markdown
# Phase 1 Completion Report

## Summary
- Files moved: 45
- Folders created: 10
- Index files created: 11
- Import statements updated: ~120
- Routes updated: 12+
- Build status: ✓ PASSING
- Test status: ✓ PASSING
- Console errors: 0
- TypeScript errors: 0

## Before
- Admin pages: pages/admin/ (39 files, flat)
- Owner pages: pages/owner/ (6 files, mixed)
- Routes: /admin/*, /owner/*

## After
- Owner pages: modules/owner/ (45 files, 10 subfolders)
- Routes: /owner/*
- Structure: Role-based organization
- Scalability: Ready for 500+ module growth

## Testing
- ✓ All pages load correctly
- ✓ Navigation works
- ✓ No broken imports
- ✓ No console errors
- ✓ Routes resolve properly
- ✓ TypeScript strict mode passes
- ✓ Lint checks pass

## Next Steps
- Push to code review
- Merge to main after review
- Proceed to Phase 2: EO System
```

---

## 🔄 ROLLBACK PLAN (If Needed)

If something goes wrong and you need to rollback:

```bash
# Revert all changes
git reset --hard HEAD

# Or, go back to previous commit
git revert <commit-hash>

# Or, switch back to main branch
git checkout main
git branch -D feat/phase1-owner-system-reorganization
```

---

## ⚠️ COMMON ISSUES & SOLUTIONS

### Issue 1: "Cannot find module" errors
**Cause:** Import path not updated  
**Solution:** 
```bash
grep -r "from.*pages/admin\|from.*pages/owner" src/
# Update all found references
```

### Issue 2: Build fails with "module not found"
**Cause:** File not moved or moved incorrectly  
**Solution:**
```bash
# Check if file exists
ls src/modules/owner/dashboard/OwnerDashboard.tsx

# If not, restore with git
git checkout <commit> -- src/pages/admin/AdminDashboard.tsx
```

### Issue 3: Routes not working (/owner/dashboard loads blank)
**Cause:** Route not updated in App.tsx  
**Solution:**
```typescript
// Verify route exists in App.tsx
const routes = [
  { path: '/owner/dashboard', component: OwnerDashboard },
  // ^-- Make sure this is in routes array
]
```

### Issue 4: Navigation still shows old paths
**Cause:** Navigation component not updated  
**Solution:**
```typescript
// Update sidebar navigation config
const navConfig = [
  { href: '/owner/dashboard', label: 'Dashboard' },  // Was /admin/dashboard
]
```

### Issue 5: TypeScript errors after move
**Cause:** Relative imports became invalid  
**Solution:**
```bash
# Run build with verbose output
npm run build 2>&1 | grep -i error

# Fix each error by checking imports in the problematic file
```

---

## ✅ SUCCESS CRITERIA

Phase 1 is **COMPLETE** when:

✅ **All 45 files migrated** to modules/owner/  
✅ **Build succeeds** with 0 errors  
✅ **All tests pass** (or return to baseline)  
✅ **No broken imports** (lint check clean)  
✅ **All pages load** without 404 or import errors  
✅ **Navigation works** (sidebar, breadcrumbs, routing)  
✅ **No console errors** in browser devtools  
✅ **TypeScript passes** strict type checking  
✅ **commit pushed** to feat branch, ready for review  
✅ **Documentation updated** with completion details  

---

## 📞 SUPPORT DURING PHASE 1

If you encounter issues:

1. **Check common issues section above** (Issues 1-5)
2. **Review TECHNICAL_IMPLEMENTATION_GUIDE.md** for detailed patterns
3. **Run: `npm run build 2>&1 | head -20`** to see specific errors
4. **Search imports:** `grep -r "pages/admin" src/ --include="*.tsx"` to find missed updates
5. **Verify structure:** `tree src/modules/owner /L 2` to confirm folder layout

---

**Playbook Version:** 1.0  
**Estimated Duration:** 8-12 hours  
**Complexity:** Medium  
**Target Completion:** Day 1-2 of Migration Week

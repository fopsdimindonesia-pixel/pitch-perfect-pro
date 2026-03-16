# 🔄 PHASE 1: ROUTE MIGRATION & NAVIGATION STRATEGY

**Purpose:** Define every route change needed for Phase 1, including navigation updates  
**Scope:** All routes in `App.tsx` pointing to admin/ and owner/ pages  
**Format:** Comprehensive migration guide with before/after examples  
**Created:** For accurate route configuration during execution

---

## 📊 ROUTE MIGRATION OVERVIEW

### Current Routes (Before Migration)
```tsx
// src/App.tsx - Current routes (scattered)
const routes = [
  { path: '/admin/dashboard', element: <AdminDashboard /> },
  { path: '/admin/users', element: <UserManagement /> },
  { path: '/admin/platform/*', element: <PlatformConfiguration /> },
  { path: '/owner/overview', element: <OwnerOverview /> },
  { path: '/owner/clubs', element: <ClubManagement /> },
  // ... scattered across multiple imports
]
```

### Target Routes (After Migration)
```tsx
// src/App.tsx - Unified routes (organized)
const routes = [
  // Owner domain
  { path: '/owner/dashboard', element: <OwnerDashboard /> },
  { path: '/owner/platform/*', element: <PlatformConfiguration /> },
  { path: '/owner/users/*', element: <UserManagement /> },
  { path: '/owner/organizations/*', element: <OrganizationManagement /> },
  // ... organized by module structure
]
```

---

## 🗺️ DETAILED ROUTE MAPPING

### ADMIN ROUTES → OWNER ROUTES

#### Dashboard Routes

| Current Route | New Route | Current Component | New Component | Navigation |
|---|---|---|---|---|
| `/admin` | `/owner/dashboard` | `AdminDashboard` | `OwnerDashboard` | Main dashboard |
| `/admin/dashboard` | `/owner/dashboard` | `AdminDashboard` | `OwnerDashboard` | Redirect to /owner/dashboard |
| `/admin/overview` | `/owner/dashboard` | `PlatformDashboard` | `OwnerDashboard` | Consolidate |

**Route Implementation:**
```tsx
{
  path: '/owner',
  element: <ProtectedRoute roles={['owner']} component={OwnerLayout} />,
  children: [
    { path: 'dashboard', element: <OwnerDashboard /> },
    { path: '', element: <Navigate to="dashboard" replace /> },
  ]
}
```

---

#### Platform Management Routes

| Current Route | New Route | Component Name | Notes |
|---|---|---|---|
| `/admin/platform-config` | `/owner/platform-management/configuration` | `PlatformConfiguration` | Rename component path |
| `/admin/settings` | `/owner/platform-management/settings` | `SystemSettings` | Rename component |
| `/admin/feature-flags` | `/owner/platform-management/features` | `FeatureFlags` | Redirect legacy |
| `/admin/maintenance` | `/owner/platform-management/maintenance` | `MaintenanceMode` | New structure |
| `/admin/branding` | `/owner/platform-management/branding` | `BrandingConfiguration` | New structure |

**Route Implementation:**
```tsx
{
  path: 'platform-management',
  children: [
    { path: 'configuration', element: <PlatformConfiguration /> },
    { path: 'settings', element: <SystemSettings /> },
    { path: 'features', element: <FeatureFlags /> },
    { path: 'maintenance', element: <MaintenanceMode /> },
    { path: 'branding', element: <BrandingConfiguration /> },
  ]
}
```

---

#### User Management Routes

| Current Route | New Route | Component Name | Notes |
|---|---|---|---|
| `/admin/users` | `/owner/users/list` | `UserManagement` | List all users |
| `/admin/users/:id` | `/owner/users/:id` | `UserProfile` | View user detail |
| `/admin/roles` | `/owner/users/roles` | `RoleManagement` | Role management |
| `/admin/permissions` | `/owner/users/permissions` | `PermissionManagement` | Permission management |
| `/admin/user-monitoring` | `/owner/users/monitoring` | `UserMonitoring` | User activity monitoring |
| `/admin/audit-logs` | `/owner/users/audit-logs` | `UserAuditLog` | Audit trail |

**Route Implementation:**
```tsx
{
  path: 'users',
  children: [
    { path: 'list', element: <UserManagement /> },
    { path: ':id', element: <UserProfile /> },
    { path: 'roles', element: <RoleManagement /> },
    { path: 'permissions', element: <PermissionManagement /> },
    { path: 'monitoring', element: <UserMonitoring /> },
    { path: 'audit-logs', element: <UserAuditLog /> },
  ]
}
```

---

#### Organization Management Routes

| Current Route | New Route | Component Name | Notes |
|---|---|---|---|
| `/admin/organizations` | `/owner/organizations/list` | `OrganizationMonitoring` | List orgs |
| `/admin/clubs` | `/owner/organizations/clubs` | `ClubManagement` | Club management |
| `/admin/eos` | `/owner/organizations/eos` | `EOManagement` | EO management |
| `/admin/org-approvals` | `/owner/organizations/approvals` | `OrganizationApprovals` | Approvals |
| `/admin/billing` | `/owner/organizations/billing` | `BillingManagement` | Billing |
| `/admin/subscriptions` | `/owner/organizations/subscriptions` | `SubscriptionManagement` | Subscriptions |

**Route Implementation:**
```tsx
{
  path: 'organizations',
  children: [
    { path: 'list', element: <OrganizationMonitoring /> },
    { path: 'clubs', element: <ClubManagement /> },
    { path: 'eos', element: <EOManagement /> },
    { path: 'approvals', element: <OrganizationApprovals /> },
    { path: 'billing', element: <BillingManagement /> },
    { path: 'subscriptions', element: <SubscriptionManagement /> },
  ]
}
```

---

#### Competition Oversight Routes

| Current Route | New Route | Component Name | Notes |
|---|---|---|---|
| `/admin/competitions` | `/owner/competitions/monitoring` | `CompetitionMonitoring` | Monitor comps |
| `/admin/competition-approvals` | `/owner/competitions/approvals` | `CompetitionApprovals` | Approve comps |

**Route Implementation:**
```tsx
{
  path: 'competitions',
  children: [
    { path: 'monitoring', element: <CompetitionMonitoring /> },
    { path: 'approvals', element: <CompetitionApprovals /> },
  ]
}
```

---

#### Financial Oversight Routes

| Current Route | New Route | Component Name | Notes |
|---|---|---|---|
| `/admin/revenue` | `/owner/finance/revenue` | `PlatformRevenue` | Revenue tracking |
| `/admin/payments` | `/owner/finance/payments` | `PaymentReconciliation` | Payment recon |
| `/admin/platform-fees` | `/owner/finance/fees` | `PlatformFeeSettings` | Fee settings |
| `/owner/financial` | `/owner/finance/overview` | `OwnerFinancial` | Owner financial view |

**Route Implementation:**
```tsx
{
  path: 'finance',
  children: [
    { path: 'revenue', element: <PlatformRevenue /> },
    { path: 'payments', element: <PaymentReconciliation /> },
    { path: 'fees', element: <PlatformFeeSettings /> },
    { path: 'overview', element: <OwnerFinancial /> },
  ]
}
```

---

#### Analytics Routes

| Current Route | New Route | Component Name | Notes |
|---|---|---|---|
| `/admin/analytics` | `/owner/analytics/global` | `GlobalAnalytics` | Platform analytics |
| `/admin/revenue-analytics` | `/owner/analytics/revenue` | `RevenueAnalytics` | Revenue trends |

**Route Implementation:**
```tsx
{
  path: 'analytics',
  children: [
    { path: 'global', element: <GlobalAnalytics /> },
    { path: 'revenue', element: <RevenueAnalytics /> },
  ]
}
```

---

#### Infrastructure Routes

| Current Route | New Route | Component Name | Notes |
|---|---|---|---|
| `/admin/system-monitoring` | `/owner/infrastructure/system` | `SystemMonitoring` | System health |
| `/admin/performance` | `/owner/infrastructure/performance` | `PerformanceMonitoring` | App performance |
| `/admin/api-monitoring` | `/owner/infrastructure/api` | `APIMonitoring` | API usage |
| `/admin/services` | `/owner/infrastructure/services` | `ServiceMonitoring` | Service status |
| `/admin/logs` | `/owner/infrastructure/logs` | `LogManagement` | System logs |
| `/admin/backup` | `/owner/infrastructure/backup` | `SystemBackupRestore` | Backup/Restore |

**Route Implementation:**
```tsx
{
  path: 'infrastructure',
  children: [
    { path: 'system', element: <SystemMonitoring /> },
    { path: 'performance', element: <PerformanceMonitoring /> },
    { path: 'api', element: <APIMonitoring /> },
    { path: 'services', element: <ServiceMonitoring /> },
    { path: 'logs', element: <LogManagement /> },
    { path: 'backup', element: <SystemBackupRestore /> },
  ]
}
```

---

#### Security Routes

| Current Route | New Route | Component Name | Notes |
|---|---|---|---|
| `/admin/security-audit` | `/owner/security/audit` | `SecurityAudit` | Security audit |
| `/admin/incidents` | `/owner/security/incidents` | `IncidentManagement` | Incident tracking |
| `/admin/compliance` | `/owner/security/compliance` | `ComplianceReports` | Compliance |
| `/admin/security-alerts` | `/owner/security/alerts` | `SecurityAlerts` | Alert management |

**Route Implementation:**
```tsx
{
  path: 'security',
  children: [
    { path: 'audit', element: <SecurityAudit /> },
    { path: 'incidents', element: <IncidentManagement /> },
    { path: 'compliance', element: <ComplianceReports /> },
    { path: 'alerts', element: <SecurityAlerts /> },
  ]
}
```

---

#### Developer Tools Routes

| Current Route | New Route | Component Name | Notes |
|---|---|---|---|
| `/admin/api-keys` | `/owner/developer-tools/keys` | `APIKeyManagement` | API key mgmt |
| `/admin/webhooks` | `/owner/developer-tools/webhooks` | `WebhookManagement` | Webhook mgmt |
| `/admin/integrations` | `/owner/developer-tools/integrations` | `IntegrationSettings` | Integration mgmt |

**Route Implementation:**
```tsx
{
  path: 'developer-tools',
  children: [
    { path: 'keys', element: <APIKeyManagement /> },
    { path: 'webhooks', element: <WebhookManagement /> },
    { path: 'integrations', element: <IntegrationSettings /> },
  ]
}
```

---

#### Compliance Routes

| Current Route | New Route | Component Name | Notes |
|---|---|---|---|
| `/admin/localization` | `/owner/compliance/localization` | `LocalizationSettings` | Localization |
| `/admin/tax` | `/owner/compliance/tax` | `TaxConfiguration` | Tax settings |
| `/owner/system-config` | `/owner/compliance/config` | `SystemConfig` | System config |

**Route Implementation:**
```tsx
{
  path: 'compliance',
  children: [
    { path: 'localization', element: <LocalizationSettings /> },
    { path: 'tax', element: <TaxConfiguration /> },
    { path: 'config', element: <SystemConfig /> },
  ]
}
```

---

## 🧭 NAVIGATION STRUCTURE

### Sidebar Menu Before Migration (Admin)
```
Dashboard
├── Platform Overview
├── User Management
│   ├── Users
│   ├── Roles
│   └── Permissions
├── Organizations
│   ├── Clubs
│   ├── Event Organizers
│   └── Billing
├── Competition Monitoring
├── Financial Reports
├── Analytics
├── System Status
├── Security
│   ├── Audit Logs
│   ├── Incident Response
│   └── Alerts
└── Developer Tools
```

### Sidebar Menu After Migration (Owner)
```
📊 Owner Dashboard
├── ⚙️  Platform Management
│   ├── Platform Configuration
│   ├── System Settings
│   ├── Feature Flags
│   ├── Maintenance Mode
│   └── Branding
├── 👥 User Management
│   ├── Users
│   ├── Roles & Permissions
│   └── Audit Logs
├── 🏢 Organizations
│   ├── Club Management
│   ├── Event Organizers
│   ├── Approvals
│   └── Billing & Subscriptions
├── 🏆 Competition Oversight
│   ├── Monitor Competitions
│   └── Approvals
├── 💰 Financial Overview
│   ├── Revenue Dashboard
│   ├── Payment Reconciliation
│   └── Platform Fees
├── 📈 Analytics
│   ├── Global Metrics
│   └── Revenue Trends
├── 🏗️  Infrastructure
│   ├── System Monitoring
│   ├── Performance
│   ├── API Usage
│   ├── Service Status
│   └── Backups
├── 🔒 Security
│   ├── Security Audits
│   ├── Incident Management
│   ├── Compliance
│   └── Alerts
├── 🔧 Developer Tools
│   ├── API Keys
│   ├── Webhooks
│   └── Integrations
└── ⚖️  Compliance
    ├── Localization
    ├── Tax Configuration
    └── System Config
```

---

## 🎨 App.tsx Route Configuration Template

### Before Migration (Current)
```tsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Import Admin Components
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import RoleManagement from './pages/admin/RoleManagement'
import ClubManagement from './pages/admin/ClubManagement'
import EventOrganizerManagement from './pages/admin/EventOrganizerManagement'
// ... 30+ more imports

// Import Owner Components
import OwnerOverview from './pages/owner/OwnerOverview'
import OwnerFinancial from './pages/owner/OwnerFinancial'
// ... etc

const adminRoutes = [
  { path: 'dashboard', element: <AdminDashboard /> },
  { path: 'users', element: <UserManagement /> },
  { path: 'roles', element: <RoleManagement /> },
  // ... scattered organization
]

const ownerRoutes = [
  { path: 'overview', element: <OwnerOverview /> },
  { path: 'financial', element: <OwnerFinancial /> },
  // ... limited coverage
]

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          {adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="/owner" element={<OwnerLayout />}>
          {ownerRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

### After Migration (New)
```tsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './core/auth/ProtectedRoute'

// Import Owner Module (organized)
import {
  OwnerDashboard,
  PlatformConfiguration,
  SystemSettings,
  FeatureFlags,
  MaintenanceMode,
  BrandingConfiguration,
  UserManagement,
  RoleManagement,
  PermissionManagement,
  UserMonitoring,
  UserAuditLog,
  ClubManagement,
  EOManagement,
  OrganizationMonitoring,
  OrganizationApprovals,
  BillingManagement,
  SubscriptionManagement,
  CompetitionMonitoring,
  CompetitionApprovals,
  PlatformRevenue,
  PaymentReconciliation,
  PlatformFeeSettings,
  OwnerFinancial,
  GlobalAnalytics,
  RevenueAnalytics,
  SystemMonitoring,
  PerformanceMonitoring,
  APIMonitoring,
  ServiceMonitoring,
  LogManagement,
  SystemBackupRestore,
  SecurityAudit,
  IncidentManagement,
  ComplianceReports,
  SecurityAlerts,
  APIKeyManagement,
  WebhookManagement,
  IntegrationSettings,
  LocalizationSettings,
  TaxConfiguration,
  SystemConfig,
} from './modules/owner'

// Owner Routes - Organized by Domain
const ownerRoutes = [
  {
    path: '/owner',
    element: <ProtectedRoute roles={['owner']} component={OwnerLayout} />,
    children: [
      // Dashboard
      { path: 'dashboard', element: <OwnerDashboard /> },
      
      // Platform Management
      {
        path: 'platform-management',
        children: [
          { path: 'configuration', element: <PlatformConfiguration /> },
          { path: 'settings', element: <SystemSettings /> },
          { path: 'features', element: <FeatureFlags /> },
          { path: 'maintenance', element: <MaintenanceMode /> },
          { path: 'branding', element: <BrandingConfiguration /> },
        ],
      },
      
      // User Management
      {
        path: 'users',
        children: [
          { path: 'list', element: <UserManagement /> },
          { path: 'roles', element: <RoleManagement /> },
          { path: 'permissions', element: <PermissionManagement /> },
          { path: 'monitoring', element: <UserMonitoring /> },
          { path: 'audit-logs', element: <UserAuditLog /> },
        ],
      },
      
      // Organizations
      {
        path: 'organizations',
        children: [
          { path: 'list', element: <OrganizationMonitoring /> },
          { path: 'clubs', element: <ClubManagement /> },
          { path: 'eos', element: <EOManagement /> },
          { path: 'approvals', element: <OrganizationApprovals /> },
          { path: 'billing', element: <BillingManagement /> },
          { path: 'subscriptions', element: <SubscriptionManagement /> },
        ],
      },
      
      // Competitions
      {
        path: 'competitions',
        children: [
          { path: 'monitoring', element: <CompetitionMonitoring /> },
          { path: 'approvals', element: <CompetitionApprovals /> },
        ],
      },
      
      // Finance
      {
        path: 'finance',
        children: [
          { path: 'revenue', element: <PlatformRevenue /> },
          { path: 'payments', element: <PaymentReconciliation /> },
          { path: 'fees', element: <PlatformFeeSettings /> },
          { path: 'overview', element: <OwnerFinancial /> },
        ],
      },
      
      // Analytics
      {
        path: 'analytics',
        children: [
          { path: 'global', element: <GlobalAnalytics /> },
          { path: 'revenue', element: <RevenueAnalytics /> },
        ],
      },
      
      // Infrastructure
      {
        path: 'infrastructure',
        children: [
          { path: 'system', element: <SystemMonitoring /> },
          { path: 'performance', element: <PerformanceMonitoring /> },
          { path: 'api', element: <APIMonitoring /> },
          { path: 'services', element: <ServiceMonitoring /> },
          { path: 'logs', element: <LogManagement /> },
          { path: 'backup', element: <SystemBackupRestore /> },
        ],
      },
      
      // Security
      {
        path: 'security',
        children: [
          { path: 'audit', element: <SecurityAudit /> },
          { path: 'incidents', element: <IncidentManagement /> },
          { path: 'compliance', element: <ComplianceReports /> },
          { path: 'alerts', element: <SecurityAlerts /> },
        ],
      },
      
      // Developer Tools
      {
        path: 'developer-tools',
        children: [
          { path: 'keys', element: <APIKeyManagement /> },
          { path: 'webhooks', element: <WebhookManagement /> },
          { path: 'integrations', element: <IntegrationSettings /> },
        ],
      },
      
      // Compliance
      {
        path: 'compliance',
        children: [
          { path: 'localization', element: <LocalizationSettings /> },
          { path: 'tax', element: <TaxConfiguration /> },
          { path: 'config', element: <SystemConfig /> },
        ],
      },
      
      // Default redirect
      { path: '', element: <Navigate to="dashboard" replace /> },
    ],
  },
]

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {ownerRoutes}
        {/* Other role routes will be added in subsequent phases */}
        <Route path="*" element: <NotFound /> />
      </Routes>
    </BrowserRouter>
  )
}
```

---

## 🔀 REDIRECT IMPLEMENTATION (For Legacy URLs)

### Redirects to handle old admin URLs automatically

```tsx
// Compatibility redirects
const legacyRedirects = [
  { from: '/admin', to: '/owner/dashboard' },
  { from: '/admin/dashboard', to: '/owner/dashboard' },
  { from: '/admin/users', to: '/owner/users/list' },
  { from: '/admin/roles', to: '/owner/users/roles' },
  { from: '/admin/permissions', to: '/owner/users/permissions' },
  { from: '/admin/organizations', to: '/owner/organizations/list' },
  { from: '/admin/clubs', to: '/owner/organizations/clubs' },
  { from: '/admin/eos', to: '/owner/organizations/eos' },
  { from: '/admin/competitions', to: '/owner/competitions/monitoring' },
  { from: '/admin/revenue', to: '/owner/finance/revenue' },
  { from: '/admin/payments', to: '/owner/finance/payments' },
  { from: '/admin/analytics', to: '/owner/analytics/global' },
  { from: '/admin/system-monitoring', to: '/owner/infrastructure/system' },
  { from: '/admin/performance', to: '/owner/infrastructure/performance' },
  { from: '/admin/security-audit', to: '/owner/security/audit' },
  { from: '/admin/api-keys', to: '/owner/developer-tools/keys' },
  { from: '/admin/webhooks', to: '/owner/developer-tools/webhooks' },
  { from: '/owner/overview', to: '/owner/dashboard' },
  { from: '/owner/financial', to: '/owner/finance/overview' },
]

// Implementation in App.tsx
const redirectRoutes = legacyRedirects.map(({ from, to }) => (
  <Route key={from} path={from} element={<Navigate to={to} replace />} />
))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {redirectRoutes}
        {ownerRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
```

---

## ✅ ROUTE TESTING CHECKLIST

### Pre-Migration Testing (Baseline)
- [ ] All routes load without errors
- [ ] Navigation works
- [ ] Protected routes require authentication
- [ ] Build: `npm run build` = 0 errors
- [ ] Dev: `npm run dev` starts successfully

### Post-Migration Testing (Verification)
- [ ] All new routes load correctly
  - [ ] `/owner/dashboard` loads OwnerDashboard
  - [ ] `/owner/users/list` loads UserManagement
  - [ ] `/owner/platform-management/configuration` loads PlatformConfiguration
  - [ ] All 30+ new routes functional
- [ ] Legacy redirects work
  - [ ] `/admin` redirects to `/owner/dashboard`
  - [ ] `/admin/users` redirects to `/owner/users/list`
  - [ ] All legacy URLs redirect correctly
- [ ] Sidebar/navigation updated
  - [ ] Menu structure matches new routes
  - [ ] Active route highlighting works
  - [ ] Navigation links functional
- [ ] Build remains clean
  - [ ] `npm run build` = 0 errors
  - [ ] No broken imports
  - [ ] No TypeScript errors
- [ ] Route parameter passing works
  - [ ] User ID parameters work: `/owner/users/:id`
  - [ ] Query params work: `/owner/users?sort=name`
- [ ] Protected routes still work
  - [ ] Unauthorized users redirected to login
  - [ ] Authorized users can access routes
- [ ] Browser history works
  - [ ] Back button navigates correctly
  - [ ] Forward button works
  - [ ] Direct URL navigation works

---

## 🐛 TROUBLESHOOTING

### Common Issues & Fixes

**Issue: Route not found**
```
Error: Route "/owner/users" not found
```
**Fix:** Check route path spelling, verify barrel export includes component

**Issue: Component name mismatch**
```
Error: <OwnerDashboard /> is not defined
```
**Fix:** Ensure import statement matches component export name

**Issue: Protected route not working**
```
Error: Cannot read property 'roles' of undefined
```
**Fix:** Verify ProtectedRoute component receives role prop correctly

**Issue: Redirects not working**
```
Error: Redirect loop detected
```
**Fix:** Check redirect destination doesn't redirect back to original URL

---

## 📋 ROUTE MIGRATION SUMMARY TABLE

| Category | Routes Count | Status |
|----------|--------------|--------|
| Dashboard | 1 | ⏳ TODO |
| Platform Management | 5 | ⏳ TODO |
| User Management | 5 | ⏳ TODO |
| Organizations | 6 | ⏳ TODO |
| Competitions | 2 | ⏳ TODO |
| Finance | 4 | ⏳ TODO |
| Analytics | 2 | ⏳ TODO |
| Infrastructure | 6 | ⏳ TODO |
| Security | 4 | ⏳ TODO |
| Developer Tools | 3 | ⏳ TODO |
| Compliance | 3 | ⏳ TODO |
| **TOTAL** | **42** | ⏳ **TODO** |

---

**Document Status:** Ready for Implementation  
**Last Updated:** March 2026  
**Next Phase:** Apply route changes during migration execution

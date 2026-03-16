# PHASE 1b EXECUTION CHECKLIST
## EO (Event Organizer) System - Step-by-Step Playbook

**Document Version:** 1.0  
**Created:** March 2026  
**Purpose:** Day-by-day execution guide with specific commands  
**Status:** Ready for Execution  
**Estimated Duration:** 2-3 hours (can be condensed to 1 day or spread across 2 days)  

---

## TABLE OF CONTENTS

1. [Pre-Execution Setup](#pre-execution-setup)
2. [Day 1: Folder Creation (30 min)](#day-1-folder-creation-30-min)
3. [Day 2: File Moves & Barrel Exports (1-1.5 hours)](#day-2-file-moves--barrel-exports-1-15-hours)
4. [Day 3: Import Updates & Testing (30-45 min)](#day-3-import-updates--testing-30-45-min)
5. [Common Issues & Quick Fixes](#common-issues--quick-fixes)
6. [Final Verification](#final-verification)
7. [Troubleshooting Support](#troubleshooting-support)

---

## PRE-EXECUTION SETUP

### Before You Start

Ensure these prerequisites are met:

**1. Project State Verification**
```bash
# Navigate to project directory
cd d:\FOPSDIM\aplikasi\pitch-perfect-pro

# Verify git is clean (no uncommitted changes)
git status
# Expected: On branch ..., nothing to commit, working tree clean

# Verify latest build passes
npm run build
# Expected: Build succeeds, 0 errors, 2552 modules
```

**2. Terminal Setup**
- Open PowerShell terminal
- Navigate to project: `cd d:\FOPSDIM\aplikasi\pitch-perfect-pro`
- Keep terminal open throughout execution

**3. Documents Ready**
- [ ] PHASE_1b_MIGRATION_SPECIFICATION.md (read beforehand)
- [ ] PHASE_1b_FILE_MAPPING.md (reference during file moves)
- [ ] PHASE_1b_ROUTES_STRATEGY.md (reference during import updates)
- [ ] This checklist open for step-by-step commands

**4. Estimated Time Blocks**
- Day 1: 30 minutes (can do anytime)
- Day 2: 1-1.5 hours (can do anytime)
- Day 3: 30-45 minutes (can do anytime)
- Total: 2-3 hours (can be condensed to 1 day if needed)

---

## DAY 1: FOLDER CREATION (30 min)

### Objective
Create the target folder structure for EO system migration: `src/modules/eo/` with 5 subfolders.

### Step 1: Create Parent Folder

```powershell
# Create parent folder
New-Item -ItemType Directory -Path "src/modules/eo" -Force
```

**Verify:**
```powershell
Get-Item src/modules/eo
# Expected: Directory exists with Mode "d-----"
```

### Step 2: Create All Subfolders

```powershell
# Create all 5 subfolders in one command
@("dashboard", "competitions", "registrations", "standings", "schedule", "reports") | 
ForEach-Object { New-Item -ItemType Directory -Path "src/modules/eo/$_" -Force }
```

**Verify:**
```powershell
Get-ChildItem src/modules/eo -Directory
# Expected output:
#     Directory: D:\FOPSDIM\aplikasi\pitch-perfect-pro\src\modules\eo
#
# Mode                 LastWriteTime         Length Name
# ----                 -------------         ------ ----
# d-----         3/16/2026   2:00 PM                dashboard
# d-----         3/16/2026   2:00 PM                competitions
# d-----         3/16/2026   2:00 PM                registrations
# d-----         3/16/2026   2:00 PM                standings
# d-----         3/16/2026   2:00 PM                schedule
# d-----         3/16/2026   2:00 PM                reports
```

### Step 3: Verify Complete Folder Structure

```powershell
# List complete tree structure
tree /F src/modules/eo
# Expected: Parent + 6 subdirectories (no files yet)

# Or use alternative if tree not available:
Get-ChildItem -Path "src/modules/eo" -Recurse | ForEach-Object { Write-Host $_.FullName }
```

### Step 4: Build Verification - After Folder Creation

```powershell
# Run build to verify no issues from folder creation
npm run build
# Expected: Success, ~11-12 seconds, 0 errors
```

### Day 1 Checkpoint ✓

If you see this:
```
✓ npm run build succeeds with 0 errors
✓ All 5 subfolders exist in src/modules/eo/
✓ Folder structure matches expected layout
```

**You're ready for Day 2!**

---

## DAY 2: FILE MOVES & BARREL EXPORTS (1-1.5 hours)

### Objective
Copy all 8 EO files to their new locations under `src/modules/eo/[subdomain]/` and create barrel export (index.ts) files.

### Part A: Copy All 8 Files (15 minutes)

**Copy Files to New Locations:**

```powershell
# 1. Copy EOOverview.tsx to dashboard
Copy-Item -Path "src/pages/eo/EOOverview.tsx" -Destination "src/modules/eo/dashboard/EOOverview.tsx" -Force
Write-Host "✓ Copied EOOverview to dashboard"

# 2. Copy Competitions.tsx to competitions
Copy-Item -Path "src/pages/eo/Competitions.tsx" -Destination "src/modules/eo/competitions/Competitions.tsx" -Force
Write-Host "✓ Copied Competitions to competitions"

# 3. Copy CreateCompetition.tsx to competitions
Copy-Item -Path "src/pages/eo/CreateCompetition.tsx" -Destination "src/modules/eo/competitions/CreateCompetition.tsx" -Force
Write-Host "✓ Copied CreateCompetition to competitions"

# 4. Copy ClubRegistrations.tsx to registrations
Copy-Item -Path "src/pages/eo/ClubRegistrations.tsx" -Destination "src/modules/eo/registrations/ClubRegistrations.tsx" -Force
Write-Host "✓ Copied ClubRegistrations to registrations"

# 5. Copy Standings.tsx to standings
Copy-Item -Path "src/pages/eo/Standings.tsx" -Destination "src/modules/eo/standings/Standings.tsx" -Force
Write-Host "✓ Copied Standings to standings"

# 6. Copy Schedule.tsx to schedule
Copy-Item -Path "src/pages/eo/Schedule.tsx" -Destination "src/modules/eo/schedule/Schedule.tsx" -Force
Write-Host "✓ Copied Schedule to schedule"

# 7. Copy Reports.tsx to reports
Copy-Item -Path "src/pages/eo/Reports.tsx" -Destination "src/modules/eo/reports/Reports.tsx" -Force
Write-Host "✓ Copied Reports to reports"

# 8. Copy MatchSheet.tsx to reports
Copy-Item -Path "src/pages/eo/MatchSheet.tsx" -Destination "src/modules/eo/reports/MatchSheet.tsx" -Force
Write-Host "✓ Copied MatchSheet to reports"

Write-Host "All 8 files copied successfully!"
```

**Verify Files Copied:**

```powershell
# Verify each file exists
@(
    "src/modules/eo/dashboard/EOOverview.tsx",
    "src/modules/eo/competitions/Competitions.tsx",
    "src/modules/eo/competitions/CreateCompetition.tsx",
    "src/modules/eo/registrations/ClubRegistrations.tsx",
    "src/modules/eo/standings/Standings.tsx",
    "src/modules/eo/schedule/Schedule.tsx",
    "src/modules/eo/reports/Reports.tsx",
    "src/modules/eo/reports/MatchSheet.tsx"
) | ForEach-Object { 
    if (Test-Path $_) {
        Write-Host "✓ $_"
    } else {
        Write-Host "✗ MISSING: $_"
    }
}
```

### Part B: Create Barrel Export Files (30 minutes)

Creating `index.ts` files for each subdomain to re-export components.

**1. Create Dashboard Barrel Export**

File: `src/modules/eo/dashboard/index.ts`

```typescript
export { default as EOOverview } from './EOOverview';
```

**How to Create:**
```powershell
# Using PowerShell to create the file
@"
export { default as EOOverview } from './EOOverview';
"@ | Out-File -Path "src/modules/eo/dashboard/index.ts" -Encoding UTF8
```

**2. Create Competitions Barrel Export**

File: `src/modules/eo/competitions/index.ts`

```typescript
export { default as Competitions } from './Competitions';
export { default as CreateCompetition } from './CreateCompetition';
```

**How to Create:**
```powershell
@"
export { default as Competitions } from './Competitions';
export { default as CreateCompetition } from './CreateCompetition';
"@ | Out-File -Path "src/modules/eo/competitions/index.ts" -Encoding UTF8
```

**3. Create Registrations Barrel Export**

File: `src/modules/eo/registrations/index.ts`

```typescript
export { default as ClubRegistrations } from './ClubRegistrations';
```

**How to Create:**
```powershell
@"
export { default as ClubRegistrations } from './ClubRegistrations';
"@ | Out-File -Path "src/modules/eo/registrations/index.ts" -Encoding UTF8
```

**4. Create Standings Barrel Export**

File: `src/modules/eo/standings/index.ts`

```typescript
export { default as Standings } from './Standings';
```

**How to Create:**
```powershell
@"
export { default as Standings } from './Standings';
"@ | Out-File -Path "src/modules/eo/standings/index.ts" -Encoding UTF8
```

**5. Create Schedule Barrel Export**

File: `src/modules/eo/schedule/index.ts`

```typescript
export { default as Schedule } from './Schedule';
```

**How to Create:**
```powershell
@"
export { default as Schedule } from './Schedule';
"@ | Out-File -Path "src/modules/eo/schedule/index.ts" -Encoding UTF8
```

**6. Create Reports Barrel Export**

File: `src/modules/eo/reports/index.ts`

```typescript
export { default as Reports } from './Reports';
export { default as MatchSheet } from './MatchSheet';
```

**How to Create:**
```powershell
@"
export { default as Reports } from './Reports';
export { default as MatchSheet } from './MatchSheet';
"@ | Out-File -Path "src/modules/eo/reports/index.ts" -Encoding UTF8
```

**7. Create Main Barrel Export**

File: `src/modules/eo/index.ts`

```typescript
// Dashboard
export { default as EOOverview } from './dashboard/EOOverview';

// Competitions
export { default as Competitions } from './competitions/Competitions';
export { default as CreateCompetition } from './competitions/CreateCompetition';

// Registrations
export { default as ClubRegistrations } from './registrations/ClubRegistrations';

// Standings
export { default as Standings } from './standings/Standings';

// Schedule
export { default as Schedule } from './schedule/Schedule';

// Reports
export { default as Reports } from './reports/Reports';
export { default as MatchSheet } from './reports/MatchSheet';
```

**How to Create:**
```powershell
@"
// Dashboard
export { default as EOOverview } from './dashboard/EOOverview';

// Competitions
export { default as Competitions } from './competitions/Competitions';
export { default as CreateCompetition } from './competitions/CreateCompetition';

// Registrations
export { default as ClubRegistrations } from './registrations/ClubRegistrations';

// Standings
export { default as Standings } from './standings/Standings';

// Schedule
export { default as Schedule } from './schedule/Schedule';

// Reports
export { default as Reports } from './reports/Reports';
export { default as MatchSheet } from './reports/MatchSheet';
"@ | Out-File -Path "src/modules/eo/index.ts" -Encoding UTF8
```

**Verify All Barrel Exports Created:**

```powershell
# Check all index.ts files exist
@(
    "src/modules/eo/index.ts",
    "src/modules/eo/dashboard/index.ts",
    "src/modules/eo/competitions/index.ts",
    "src/modules/eo/registrations/index.ts",
    "src/modules/eo/standings/index.ts",
    "src/modules/eo/schedule/index.ts",
    "src/modules/eo/reports/index.ts"
) | ForEach-Object {
    if (Test-Path $_) {
        Write-Host "✓ $_"
    } else {
        Write-Host "✗ MISSING: $_"
    }
}
```

### Part C: Build Verification - After Files & Barrel Exports

```powershell
# Build should show import errors (expected - imports not updated yet)
npm run build
# Expected: Some errors about missing imports, but barrel exports are in place
```

### Day 2 Checkpoint ✓

If you see:
```
✓ All 8 files moved to new locations
✓ All 7 barrel export (index.ts) files created
✓ Folder structure is complete
```

**You're ready for Day 3!**

---

## DAY 3: IMPORT UPDATES & TESTING (30-45 min)

### Objective
Update import paths in App.tsx and verify all routes work.

### Step 1: Update Imports in App.tsx

Find the EO import section in `src/App.tsx` and update it.

**Current Imports (Before):**
Look for lines like:
```typescript
import { EOOverview } from "./pages/eo/EOOverview";
import { Competitions, CreateCompetition } from "./pages/eo/Competitions";
// ... etc
```

**New Imports (After):**
Replace with:
```typescript
import { EOOverview } from "./modules/eo/dashboard";
import { Competitions, CreateCompetition } from "./modules/eo/competitions";
import { ClubRegistrations } from "./modules/eo/registrations";
import { Standings } from "./modules/eo/standings";
import { Schedule } from "./modules/eo/schedule";
import { Reports, MatchSheet } from "./modules/eo/reports";
```

**Alternative (Simpler) - Using Main Barrel Export:**
Or replace all with single import:
```typescript
import { EOOverview, Competitions, CreateCompetition, ClubRegistrations, Standings, Schedule, Reports, MatchSheet } from "./modules/eo";
```

### Step 2: Verify Route Definitions Exist

The routes should already be in App.tsx and shouldn't need changes:

```typescript
<Route path="/eo/overview" element={<EOOverview />} />
<Route path="/eo/competitions" element={<Competitions />} />
<Route path="/eo/create-competition" element={<CreateCompetition />} />
<Route path="/eo/registrations" element={<ClubRegistrations />} />
<Route path="/eo/standings" element={<Standings />} />
<Route path="/eo/schedule" element={<Schedule />} />
<Route path="/eo/reports" element={<Reports />} />
<Route path="/eo/match-sheet" element={<MatchSheet />} />
```

If these routes don't exist, add them.

### Step 3: Build Verification - After Imports Updated

```powershell
# Build should now succeed with 0 errors
npm run build
# Expected: Success, ~11-12 seconds, 0 errors, 2552 modules
```

**If build fails:**
1. Check error message
2. Verify import paths match exactly
3. Check no typos in component names
4. See troubleshooting section below

### Step 4: Start Dev Server

```powershell
# Start development server
npm run dev
# Expected: Output shows "VITE v5.x.x ready in XXXms"
# Expected: Server ready at http://localhost:8080/
```

Keep this running for testing.

### Step 5: Test Routes in Browser

Open browser and visit these URLs. Each should load without errors:

**Test URLs:**

1. http://localhost:8080/eo/overview
   - Expected: EOOverview component loads
   - Expected: Dashboard with metrics displayed

2. http://localhost:8080/eo/competitions
   - Expected: Competitions component loads
   - Expected: List of competitions displayed

3. http://localhost:8080/eo/create-competition
   - Expected: CreateCompetition component loads
   - Expected: Form displayed

4. http://localhost:8080/eo/registrations
   - Expected: ClubRegistrations component loads
   - Expected: Registrations list displayed

**Check Browser Console:**
- Should be completely clean
- No error messages
- No warnings

### Step 6: Test Navigation

1. Click on EO system in sidebar menu
2. Verify menu items appear
3. Click "Kompetisi" (Competitions)
4. Verify navigation works and component loads
5. Click back to "Overview"
6. Verify navigation is responsive

### Day 3 Checkpoint ✓

If you see:
```
✓ npm run build shows 0 errors
✓ Dev server starts successfully
✓ All /eo/* routes load without errors
✓ Browser console is clean
✓ Navigation menu works
```

**Phase 1b Execution Complete!**

---

## COMMON ISSUES & QUICK FIXES

### Issue 1: Build Errors - "Cannot find module"

**Error:** 
```
Error: Cannot find module './modules/eo/dashboard'
```

**Fix:**
1. Verify files exist: `ls src/modules/eo/*/`
2. Verify barrel exports exist: `ls src/modules/eo/*/index.ts`
3. Check spelling of import paths - must match exactly
4. Rebuild: `npm run build`

---

### Issue 2: Component Not Defined

**Error:**
```
ReferenceError: EOOverview is not defined
```

**Fix:**
1. Verify import exists in App.tsx
2. Check component name matches filename
3. Verify component is exported from index.ts
4. Rebuild: `npm run build`

---

### Issue 3: Routes Not Working (404)

**Error:** Visiting http://localhost:8080/eo/overview shows "not found"

**Fix:**
1. Verify imports in App.tsx work: `npm run build` should pass
2. Verify route definition exists:
   ```typescript
   <Route path="/eo/overview" element={<EOOverview />} />
   ```
3. Restart dev server: `npm run dev`
4. Check browser console for errors

---

### Issue 4: Stale Cache

**Error:** Changes don't take effect, old errors persist

**Fix:**
```powershell
# Clear build artifacts and rebuild
Remove-Item -Path dist -Recurse -Force
npm run build

# OR restart dev server
npm run dev
```

---

### Issue 5: Import Path Wrong

**Error:**
```
Module not found: Error: Can't resolve './modules/eo/competitions'
```

**Fix:**
Make sure import path matches exactly where files are:
```typescript
// Check what's in the folder
ls src/modules/eo/competitions/

// Correct import
import { Competitions } from "./modules/eo/competitions";

// Not this
import { Competitions } from "./modules/eo/Competitions"; // ✗ Case sensitive!
```

---

### Issue 6: TypeScript Compilation Error

**Error:**
```
TS1149: File X is a file and cannot be imported as a module
```

**Fix:**
1. Verify it's a `.ts` or `.tsx` file
2. Make sure the import has `.ts` or `.tsx` extension removed
3. Reload window: Ctrl+Shift+P → "Reload Window"

---

## FINAL VERIFICATION

### Complete Checklist (After Day 3)

Run this verification checklist to confirm Phase 1b is complete:

```powershell
# 1. Verify all files moved
Write-Host "Checking files..."
@(
    "src/modules/eo/dashboard/EOOverview.tsx",
    "src/modules/eo/competitions/Competitions.tsx",
    "src/modules/eo/competitions/CreateCompetition.tsx",
    "src/modules/eo/registrations/ClubRegistrations.tsx",
    "src/modules/eo/standings/Standings.tsx",
    "src/modules/eo/schedule/Schedule.tsx",
    "src/modules/eo/reports/Reports.tsx",
    "src/modules/eo/reports/MatchSheet.tsx"
) | ForEach-Object {
    if (Test-Path $_) { Write-Host "✓ $_" } 
    else { Write-Host "✗ MISSING: $_" }
}

# 2. Verify all barrel exports created
Write-Host "`nChecking barrel exports..."
@(
    "src/modules/eo/index.ts",
    "src/modules/eo/dashboard/index.ts",
    "src/modules/eo/competitions/index.ts",
    "src/modules/eo/registrations/index.ts",
    "src/modules/eo/standings/index.ts",
    "src/modules/eo/schedule/index.ts",
    "src/modules/eo/reports/index.ts"
) | ForEach-Object {
    if (Test-Path $_) { Write-Host "✓ $_" } 
    else { Write-Host "✗ MISSING: $_" }
}

# 3. Verify build succeeds
Write-Host "`nRunning build..."
npm run build
```

### Manual Verification Checklist

- [ ] All 8 component files in `src/modules/eo/[subdomain]/`
- [ ] All 7 `index.ts` barrel export files exist
- [ ] `src/App.tsx` imports from `./modules/eo/*` (not `./pages/eo/`)
- [ ] `npm run build` succeeds with 0 errors
- [ ] Dev server starts: `npm run dev`
- [ ] All routes load without 404 or errors
- [ ] Browser console is clean (no errors)
- [ ] Navigation menu works

---

## TROUBLESHOOTING SUPPORT

### If Something Breaks

**Option 1: Quick Rollback**
If you need to undo Phase 1b and start over:
```bash
git reset --hard HEAD
# This goes back to where Phase 1b started
```

**Option 2: Check Specific File**
If import is wrong:
```bash
# View App.tsx around import section
grep -n "modules/eo" src/App.tsx
# This shows which lines have /modules/eo imports
```

**Option 3: Get Detailed Error**
```bash
# Rebuild with detailed output
npm run build 2>&1 | head -50
# Shows first 50 lines of build output
```

### Need Help?

Reference these docs:
- **For file locations:** PHASE_1b_FILE_MAPPING.md
- **For route details:** PHASE_1b_ROUTES_STRATEGY.md
- **For strategy:** PHASE_1b_MIGRATION_SPECIFICATION.md

---

## DAY-BY-DAY TIME ESTIMATE

| Day | Task | Duration | Commands |
|-----|------|----------|----------|
| 1 | Create folders | 5 min | New-Item (create 5 folders) |
| 1 | Build verify | 15 min | npm run build |
| 2 | Copy 8 files | 10 min | Copy-Item (8 files) |
| 2 | Create 7 barrel exports | 20 min | Out-File (7 index.ts files) |
| 3 | Update imports | 5 min | Edit App.tsx |
| 3 | Build verify | 10 min | npm run build |
| 3 | Dev server + browser test | 15 min | npm run dev + manual testing |
| **Total** | **All Phase 1b** | **~90 minutes** | **Ready!** |

---

## NEXT STEPS AFTER PHASE 1b

Once Phase 1b is complete:

1. **Commit progress to git**
   ```bash
   git add -A
   git commit -m "feat(phase1b): EO system reorganization complete"
   ```

2. **Plan Phase 2** (future migrations)
   - Club system (pages/club/ → modules/club/)
   - Admin system (any remaining files)
   - Continue pattern

3. **Celebrate!** 🎉
   - Phase 1 (Owner system): ✅ Complete
   - Phase 1b (EO system): ✅ Complete
   - Codebase now 50% reorganized

---

**Document Status:** ✅ Ready for execution  
**Recommended Next:** Follow this checklist step-by-step starting Day 1  
**Time Estimate:** 2-3 hours total (or 90 minutes condensed)

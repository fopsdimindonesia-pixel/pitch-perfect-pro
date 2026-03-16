# 🎯 IMMEDIATE ACTION ITEMS & PRIORITY FIX LIST

**Generated:** March 16, 2026 | **Urgency Level:** HIGH | **Time to Complete:** 4-8 hours this week

---

## ⚡ CRITICAL PATH (DO TODAY - 30 MIN)

### 1. Fix TypeScript Config - Enable strictNullChecks ✅ (15 min)

**Current State:** StatusCode issue in api.ts just fixed
**Next Step:** Enable stricter type checking to prevent similar issues

**File:** `tsconfig.json`

```json
{
  "compilerOptions": {
    // Add this line:
    "strictNullChecks": true,        // Enforce null/undefined safety
    "noImplicitAny": true,            // Disallow any types
    "noImplicitReturns": true,        // Functions must return
    "noUnusedLocals": false,          // (keep false for now)
    "noUnusedParameters": false       // (keep false for now)
  }
}
```

**Then:** Run `npm run build` to see new errors
**Expected:** ~30-50 new type errors to fix

**Impact:** 🟢 Prevents future bugs immediately

---

### 2. Organize App.tsx Routes (1 hour)

**Current State:** 89 routes in single array - HARD TO READ

**File:** `src/App.tsx` (lines 10-90)

**BEFORE:**
```typescript
const routes = [
  { path: '/owner/*', element: <OwnerLayout/> },
  { path: '/eo/*', element: <EOLayout/> },
  { path: '/club/*', element: <ClubLayout/> },
  { path: '/match/*', element: <MatchScheduler/> },  // Scattered
  { path: '/match/lineup', element: <LineupSubmission/> },
  { path: '/match/events', element: <MatchEvents/> },
  // ... 80 more routes
];
```

**AFTER:**
```typescript
// Group 1: Domain routes (migrated modules)
const domainRoutes = [
  { path: '/owner/*', element: <OwnerLayout/> },
  { path: '/eo/*', element: <EOLayout/> },
  { path: '/club/*', element: <ClubLayout/> },
];

// Group 2: Match routes (needs migration)
const matchRoutes = [
  { path: '/match/setup', element: <MatchScheduler/> },
  { path: '/match/lineup', element: <LineupSubmission/> },
  { path: '/match/events', element: <MatchEvents/> },
  // ... match routes
];

// Group 3: Competition routes (needs migration)
const competitionRoutes = [
  { path: '/competition/overview', element: <CompetitionOverview/> },
  // ... competition routes
];

// Combined routing
const routes = [
  ...domainRoutes,
  ...matchRoutes,
  ...competitionRoutes,
  { path: '*', element: <NotFound/> }
];
```

**Impact:** 🟢 Better readability, easier to maintain

---

### 3. Add 404 Page to Routes (15 min)

**Current State:** NotFound.tsx exists but not used

**File:** `src/App.tsx` - add at END of routes array

```typescript
{
  path: '*',
  element: <NotFound />
}
```

**Why:** Users get proper 404 page instead of blank screen

**Impact:** 🟢 Better UX

---

## 🔴 CRITICAL FIXES (DO THIS WEEK - 4 HOURS)

### 4. Install & Configure Testing Infrastructure (2 hours)

**Status:** REQUIRED FOR SAFE REFACTORING

#### Step 1: Install Dependencies (15 min)
```bash
npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

#### Step 2: Setup vitest.config.ts (30 min)
**File:** `vitest.config.ts` (CREATE NEW)

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
      ]
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
});
```

#### Step 3: Create Test Setup File (30 min)
**File:** `src/test/setup.ts` (CREATE NEW)

```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

#### Step 4: Write First Test (45 min)
**File:** `src/lib/utils.test.ts` (CREATE NEW)

```typescript
import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn - Class Name Merger', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toContain('px-4');
    expect(result).toContain('py-1');
  });

  it('should handle conditional classes', () => {
    const result = cn('px-2', { 'py-4': true, 'text-lg': false });
    expect(result).toContain('px-2');
    expect(result).toContain('py-4');
    expect(result).not.toContain('text-lg');
  });

  it('should handle undefined/null', () => {
    const result = cn('px-2', null, undefined, 'py-1');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
  });
});
```

#### Step 5: Add Test Scripts to package.json (5 min)
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

**Verification:**
```bash
npm test        # Should pass with 1 test passing
```

**Impact:** 🔴 CRITICAL - Enables safe refactoring

---

### 5. Fix TypeScript Errors in api.ts (30 min) - ALREADY DONE ✅

**Status:** ✅ COMPLETED in previous session

**What was fixed:**
- statusCode property in ApiResponse<T> made required
- Matches ApiError class declaration
- Error 2687 resolved

**Verification:**
```bash
npm run build    # Should have 0 errors
```

---

### 6. Setup Git Pre-commit Hooks (1 hour)

**Why:** Catch errors before they reach repository

#### Step 1: Install husky (10 min)
```bash
npm install --save-dev husky
npx husky install
```

#### Step 2: Create Pre-commit Hook (20 min)
**File:** `.husky/pre-commit` (AUTO-CREATED - then edit)

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run test
npm run build
```

#### Step 3: Create Commit Message Hook (20 min)
**File:** `.husky/commit-msg`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx commitlint --edit "$1"
```

**Impact:** 🟢 Prevents broken code in repo

---

## 🟠 HIGH PRIORITY (WEEK 1-2)

### 7. Create useApi Custom Hook (2 hours)

**Why:** Current code fetches data manually in 50+ places

**File:** `src/hooks/useApi.ts` (CREATE NEW)

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

interface UseApiOptions {
  retry?: number;
  staleTime?: number;
  cacheTime?: number;
}

/**
 * Hook for GET requests with caching
 * Usage: const { data, isLoading, error } = useApi('/users', 'users');
 */
export function useApi<T>(
  endpoint: string,
  queryKey: string,
  options: UseApiOptions = {}
) {
  return useQuery<T>({
    queryKey: [queryKey],
    queryFn: () => api.fetch<T>(endpoint),
    retry: options.retry ?? 3,
    staleTime: options.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options.cacheTime ?? 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook for POST/PUT/DELETE with error handling
 * Usage: const { mutate } = useApiMutation((data) => api.fetch('/users', { method: 'POST', body: JSON.stringify(data) }));
 */
export function useApiMutation<TData, TResponse>(
  mutationFn: (data: TData) => Promise<TResponse>,
  onSuccessCallback?: (data: TResponse) => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      onSuccessCallback?.(data);
    },
    onError: (error: Error) => {
      console.error('Mutation failed:', error.message);
    }
  });
}
```

**Before/After Comparison:**

```typescript
// ❌ BEFORE: Manual state management
function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.getPlayers()
      .then(setPlayers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton />;
  if (error) return <Error />;
  return <div>{players.map(...)}</div>;
}

// ✅ AFTER: Using custom hook
function PlayerList() {
  const { data: players, isLoading, error } = useApi('/players', 'players');

  if (isLoading) return <Skeleton />;
  if (error) return <Error />;
  return <div>{players.map(...)}</div>;
}
```

**Impact:** 🟠 Reduces code by 50%, improves consistency

---

### 8. Create useFormValidation Hook (2 hours)

**Why:** Validation scattered across 30+ forms

**File:** `src/hooks/useFormValidation.ts` (CREATE NEW)

```typescript
import { useState, useCallback } from 'react';
import { ValidationSchema } from '@/lib/validation';

export function useFormValidation<T extends Record<string, any>>(
  initialData: T,
  onSubmit: (data: T) => void,
  schema?: ValidationSchema
) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((fieldName: keyof T, value: any) => {
    if (!schema) return true;

    const fieldSchema = schema[fieldName];
    if (!fieldSchema) return true;

    try {
      fieldSchema.parse(value);
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
      return true;
    } catch (error: any) {
      const errorMessage = error.errors?.[0]?.message || 'Invalid value';
      setErrors(prev => ({ ...prev, [fieldName]: errorMessage }));
      return false;
    }
  }, [schema]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    handleBlur(e);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name as keyof T, value);
  }, [validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: any = {};
    for (const key in schema) {
      if (!validateField(key as keyof T, formData[key])) {
        newErrors[key] = true;
      }
    }

    if (Object.keys(newErrors).length === 0) {
      await onSubmit(formData);
    }

    setIsSubmitting(false);
  };

  return {
    formData,
    setFormData,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
```

**Impact:** 🟠 Simplifies 30+ form components

---

### 9. Add ESLint Rules Enhancement (1 hour)

**File:** `eslint.config.js`

```javascript
export default [
  // ... existing config
  {
    rules: {
      // Prevent dead code
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      
      // Performance
      'prefer-const': 'error',
      
      // Type safety
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-return-types': 'warn',
      
      // Code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'complexity': ['warn', { max: 5 }],
      
      // React best practices
      'react/react-in-jsx-scope': 'off', // React 17+
      'react/no-unescaped-entities': 'warn',
      'react-hooks/rules-of-hooks': 'error',
    }
  }
];
```

**Run:** `npm run lint` to validate

**Impact:** 🟢 Enforces code quality

---

## 🟡 MEDIUM PRIORITY (WEEK 2-3)

### 10. Create Match Module Structure (12 hours)

**Status:** Not started | **Files to migrate:** 40 | **Effort:** 12 hours

**This is the LARGEST migration after club/**

#### Step 1: Create Folder Structure (15 min)
```bash
mkdir -p src/modules/match/{setup,lineup,events,data,analytics,archive}
```

#### Step 2: Copy Files (2 hours)
```bash
# Copy each category
cp -r src/pages/match/setup/* src/modules/match/setup/
cp -r src/pages/match/lineup/* src/modules/match/lineup/
cp -r src/pages/match/events/* src/modules/match/events/
cp -r src/pages/match/data/* src/modules/match/data/
cp -r src/pages/match/analytics/* src/modules/match/analytics/
cp -r src/pages/match/archive/* src/modules/match/archive/
```

#### Step 3: Create Barrel Exports (30 min)
**File:** `src/modules/match/index.ts`

```typescript
// setup
export { MatchScheduler } from './setup/MatchScheduler';
export { RefereeAssignment } from './setup/RefereeAssignment';

// lineup
export { LineupSubmission } from './lineup/LineupSubmission';

// events
export { MatchEvents } from './events/MatchEvents';

// data
export { MatchTimeline } from './data/MatchTimeline';
export { MatchStatistics } from './data/MatchStatistics';
export { PlayerRatings } from './data/PlayerRatings';

// ... export all 40 components
```

#### Step 4: Update Imports (3 hours)
```bash
# In src/App.tsx, replace:
import MatchScheduler from "./pages/match/setup/MatchScheduler";
# With:
import { MatchScheduler } from "./modules/match";
```

#### Step 5: Verify Build (1 hour)
```bash
npm run build    # Should pass
npm run dev      # Test routes in browser
```

#### Step 6: Git Commit (15 min)
```bash
git add -A
git commit -m "feat(phase1d): Create match module with 40 files"
```

**Impact:** 🟠 Maintains architectural consistency

---

### 11. Create Advanced Contexts (3 hours)

**Missing:** AuthContext, ThemeContext, NotificationContext

**File:** `src/context/` (CREATE NEW FILES)

```typescript
// AuthContext.tsx - User login state
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'owner' | 'eo' | 'club' | 'user';
}

export const AuthContext = createContext<{
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

// ThemeContext.tsx - Dark mode, brand colors
export const ThemeContext = createContext<{
  isDark: boolean;
  toggleDarkMode: () => void;
  primaryColor: string;
}>({
  isDark: false,
  toggleDarkMode: () => {},
  primaryColor: '#1e40af',
});

// NotificationContext.tsx - Toast queue management
export const NotificationContext = createContext<{
  notify: (message: string, type: 'success' | 'error' | 'info') => void;
  notifications: Array<{ id: string; message: string; type: string }>;
}>({
  notify: () => {},
  notifications: [],
});
```

**Impact:** 🟠 Improves state management, reduces prop drilling

---

## 📊 TRACKING CHECKLIST

Copy this and track daily progress:

```
THIS WEEK (Week 1) - CRITICAL FIXES
□ Day 1 (15 min) - Enable strictNullChecks in tsconfig
□ Day 1 (1 hour) - Organize App.tsx routes 
□ Day 1 (15 min) - Add NotFound to routes
□ Day 2 (2 hours) - Setup testing infrastructure
□ Day 2 (2 hours) - Create useApi hook
□ Day 3 (2 hours) - Create useFormValidation hook  
□ Day 3 (1 hour) - Enhance ESLint rules
□ Day 4 (1 hour) - Setup Git pre-commit hooks
□ Day 5 (4 hours) - Fix TypeScript errors from strictNullChecks

PROGRESS: ▓░░░░░░░░░ 0/18 tasks

WEEK 2 - MEDIUM PRIORITY
□ Create match module (12 hours)
□ Create competition module (8 hours)
□ Create advanced contexts (3 hours)
□ Write 10 unit tests (5 hours)
□ Fix accessibility issues (4 hours)

PROGRESS: ▓░░░░░░░░░ 0/32 tasks
```

---

## 📈 SUCCESS METRICS

After completing these items, you should see:

✅ **Build Time:** Still <16s (no regression)
✅ **Test Coverage:** 5-10% (started!)
✅ **Type Errors:** Down from ~150 to ~30-50
✅ **Import Consistency:** Improved organization
✅ **Code Quality:** ESLint stricter
✅ **Developer Experience:** Git hooks catching issues

---

## 🚨 COMMON PITFALLS TO AVOID

### ❌ Pitfall 1: Fixing All TypeScript Errors at Once
**Problem:** Overwhelming, takes too long
**Solution:** Fix by file, commit incremental improvements

### ❌ Pitfall 2: Over-Engineering Test Setup
**Problem:** Spending time on perfect setup instead of writing tests
**Solution:** Simple setup first, add complexity later

### ❌ Pitfall 3: Not Testing Migration
**Problem:** Routes break, build fails, nobody knows why
**Solution:** Test each step: npm run build, then manual route check

### ❌ Pitfall 4: Forgetting to Update Imports
**Problem:** Old imports still work locally but fail in CI/CD
**Solution:** Search project for old import patterns after migration

### ❌ Pitfall 5: Not Committing Between Steps
**Problem:** Can't rollback if something breaks mid-task
**Solution:** Commit after each logical step (even if incomplete)

---

## 💡 TIME-SAVING TIPS

1. **Use find & replace for imports:**
   - Find: `from "./pages/match/`
   - Replace: `from "./modules/match/`
   - Check "Replace All"

2. **Run tests in watch mode while developing:**
   ```bash
   npm run test:watch
   ```

3. **Use TypeScript compiler for quick checks:**
   ```bash
   npm run build    # Much faster than full test suite
   ```

4. **Create a checklist template for similar tasks:**
   - Use for match, competition, finance, organization modules

5. **Batch similar changes together:**
   - Fix all tsconfig issues → commit
   - Create all hooks → commit
   - Then move to migrations

---

## 📞 WHEN YOU GET STUCK

### Type Error Help
```bash
npm run build 2>&1 | grep "error TS"   # Show only errors
```

### Build Issues
```bash
npm run build --debug    # Verbose output
npm run build --analyze  # Bundle analysis
```

### Route Issues
```bash
# Test in browser at http://localhost:8080
# Check console for import errors
# Verify barrel exports have all components
```

### Test Issues
```bash
npm run test:watch       # Re-run on file change
npm run test:coverage    # Show coverage report
```

---

## ✅ DEFINITION OF DONE

A task is **COMPLETE** when:

1. ✅ Code written and working locally
2. ✅ Tests passing (if applicable)
3. ✅ Build passes: `npm run build` (0 errors)
4. ✅ No console warnings/errors
5. ✅ Changes committed to git
6. ✅ Updated related documentation
7. ✅ Code reviewed (team/senior dev)

---

**Next Steps:** Pick 1-2 items from "Critical Path" section above and start today. Report progress daily.

**Questions?** Refer to STRUCTURE_ANALYSIS_&_REFINEMENT.md for detailed context.

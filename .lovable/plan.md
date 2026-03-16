

# Refactor: Unified Competition Setup Module

## Problem Analysis

4 separate pages that should be one connected flow are completely disconnected:

1. **CreateCompetition** — standalone stepper with local state, doesn't write to CompetitionContext
2. **CompetitionCategories** — placeholder showing 1 row from ageGroup, no real CRUD
3. **CompetitionRules** — hardcoded text in local `useState`, not saved to any shared state
4. **EligibilityRules** — basic form with no persistence, disconnected from competition data

Each page has its own `CompetitionSwitcher`, duplicated header patterns, and zero data sharing between them.

## Solution: Unified Competition Setup Hub

Replace these 4 separate routes with a single **CompetitionSetup** page using tabs, plus extend CompetitionContext to hold categories, rules, and eligibility config.

### Architecture

```text
CompetitionContext (extended)
├── competitions[]
├── activeCompetition
├── competitionConfig: {          ← NEW
│     categories: Category[]
│     rules: { general, match, discipline }
│     eligibility: { maxAge, requireBirthCert, requireConsent, deadline, allowExceptions }
│   }
├── addCompetition(form)          ← NEW (CreateCompetition writes here)
├── updateConfig(partial)         ← NEW (tabs write here)
└── existing: matches, registrations, standings
```

### New Page: CompetitionSetup.tsx

Single page at `/eo/competition/setup` with 5 tabs:

| Tab | Content |
|-----|---------|
| **Buat Baru** | The existing stepper form (from CreateCompetition), but `onSubmit` calls `addCompetition()` on context |
| **Profil** | Competition name, description, format, dates — editable fields from activeCompetition |
| **Kategori** | Multi-category CRUD table: add/edit/delete age groups with team count, max players, status |
| **Peraturan** | Three sub-tabs (General, Match, Discipline) with editable textareas, saved per competition |
| **Kelayakan** | Age requirements, registration deadline, document requirements — all connected to context |

### File Changes

1. **Extend `CompetitionContext.tsx`** — Add `competitionConfig` state with categories/rules/eligibility per competition, `addCompetition()` and `updateConfig()` methods
2. **Create `src/modules/eo/competitions/setup/CompetitionSetup.tsx`** — Unified tabbed page combining all 4 functions
3. **Delete standalone files**: `CreateCompetition.tsx` (both copies), `CompetitionCategories.tsx`, `CompetitionRules.tsx`, `EligibilityRules.tsx`
4. **Update `App.tsx`** — Replace 5 routes (`/create`, `/categories`, `/rules`, `/eligibility`, `/profile`) with single `/eo/competition/setup` route
5. **Update `AppSidebar.tsx`** — Replace 5 sidebar items under "Setup & Rules" with single "Competition Setup" link
6. **Update `index.ts`** exports

### Sidebar (Before → After)

```text
Before:                          After:
Setup & Rules                    Setup & Rules
├── Create Competition           └── Competition Setup  ← single entry
├── Competition Profile
├── Categories
├── Rules
└── Eligibility
```

### What stays unchanged
- CompetitionSwitcher component (reused inside Setup page)
- All other competition sub-pages (Registration, Tools, Operations, etc.)
- Validation utilities in `src/lib/validation.ts`


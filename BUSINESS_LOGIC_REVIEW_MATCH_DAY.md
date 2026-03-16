# Business Logic Review: `/club/match-day` (LineupManagement)

## Executive Summary

The **LineupManagement** component (at `/club/match-day` route) manages pre-match lineup preparation with formation selection, captain assignment, and squad management. The current implementation is **UI-complete but business logic is partially stubbed** – key operations lack backend integration and comprehensive validation.

**Status:** ✅ Ready for MVP | ⚠️ Requires API Implementation | 🔴 Missing Validation

---

## Core Business Logic Flow

```
┌─────────────────────────────────────────────────────────────┐
│  LINEUP MANAGEMENT WORKFLOW                                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. User loads /club/match-day                              │
│     ↓                                                        │
│  2. System fetches upcoming match & squad data              │
│     ↓                                                        │
│  3. User selects formation (4-3-3, 4-2-3-1, etc)           │
│     ↓                                                        │
│  4. User assigns captain from starting XI                   │
│     ↓                                                        │
│  5. User reviews lineup on pitch visualization              │
│     ↓                                                        │
│  6. User saves as DRAFT or submits FINAL                    │
│     ↓                                                        │
│  7. System sends to Event Organizer                         │
│     ↓                                                        │
│  8. Lineup locked until match starts                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## State Management Analysis

### Current State
```typescript
const [submitted, setSubmitted] = useState(false);        // ✅ Submission status
const [formation, setFormation] = useState("4-3-3");      // ✅ Formation selection
const [captain, setCaptain] = useState(9);                // ✅ Captain number
const [subs, setSubs] = useState<SubstitutionRecord[]>([]); // ✅ Substitutions
const [activeTab, setActiveTab] = useState("overview");   // ✅ Tab navigation
```

### Issues Identified

#### 🔴 **Issue 1: No Match/Squad Data from Backend**
```typescript
// Current (mock data only):
const upcomingMatch = mockMatches.find((m) => m.status === "Scheduled") || mockMatches[3];

// Should be:
// - GET /api/matches/upcoming
// - GET /api/club/squad
// - Handle loading/error states
```

**Impact:** 
- Cannot handle multiple upcoming matches
- No match details (competition ID, deadline)
- No dynamic squad loading
- No eligibility validation

**Business Logic Gap:** Team might have multiple matches scheduled; system should:
1. Display all upcoming matches
2. Allow user to select which match to prepare
3. Fetch eligible squad for that match
4. Enforce submission deadlines

---

#### ⚠️ **Issue 2: Captain Selection Not Validated**
```typescript
const handleSaveAsDraft = () => {
  toast({
    title: "Lineup Saved",
    description: "Formasi dan pemain tersimpan sebagai draft.",
  });
  // What actually happens? Nothing persisted!
};
```

**Current Flow:**
1. User selects captain via button/dropdown ✅
2. User clicks "Save as Draft"
3. Toast notification shows ✅
4. **STATE IS LOST** on page refresh ❌

**Missing Validations:**
```typescript
// ❌ Missing:
- Captain must be in Starting XI
- Captain cannot be suspended/injured
- Captain cannot be under verification
- Formation must be complete (11 players)
- Formation must be valid (not all GK)
- No duplicate players in XI
```

---

#### 🔴 **Issue 3: No Submission Workflow**
```typescript
const handleSubmitLineup = () => {
  setSubmitted(true);  // Just changes UI state
  toast({
    title: "Lineup Submitted! ✓",
    description: "Starting XI dan bangku cadangan telah dikirim ke Event Organizer.",
  });
  // But nothing actually submitted!
};
```

**What's Missing:**
1. ❌ No POST request to backend
2. ❌ No error handling
3. ❌ No submission timestamp
4. ❌ No confirmation dialog
5. ❌ No EO notification
6. ❌ Cannot undo submission

**Expected Workflow:**
```typescript
const handleSubmitLineup = async () => {
  try {
    // 1. Validation
    if (!validateLineup()) throw new Error("Invalid lineup");
    
    // 2. Confirmation dialog
    if (!await confirmSubmission()) return;
    
    // 3. API call
    const response = await api.post('/lineups/submit', {
      matchId: upcomingMatch.id,
      formation,
      captain,
      startingXI: mockLineupData.startingXI,
      bench: mockLineupData.bench,
      submittedAt: new Date().toISOString(),
    });
    
    // 4. Handle success
    setSubmitted(true);
    toast({ title: "Success", description: response.data.message });
    
    // 5. Redirect to confirmation page
    navigate(`/club/lineups/${response.data.lineupId}`);
  } catch (error) {
    toast({ title: "Error", description: error.message, variant: "destructive" });
  }
};
```

---

## Business Rules Analysis

### ✅ **Implemented Rules**

1. **Formation Selection**
   - User can select from 5 predefined formations
   - Formation label updates dynamically

2. **Captain Assignment**
   - Captain must be from Starting XI (enforced by UI)
   - Visual highlight shows selected captain
   - Captain number displayed in header

### ❌ **Missing Rules**

#### Rule 1: Player Eligibility
```typescript
// Missing:
- Captain cannot be SUSPENDED
- Captain cannot be INJURED  
- Captain cannot be under VERIFICATION
- Captain must have played minimum X matches
- Captain must meet age requirements
```

**Business Context:** Rules prevent illegal lineups

```typescript
// Example: Check eligibility
interface Player {
  number: number;
  name: string;
  position: string;
  rating: number;
  eligibility: "Verified" | "Pending" | "Suspended";  // Exists in data!
  injuryStatus?: "Fit" | "Injured";                   // May exist
  age?: number;                                        // May exist
}

// Missing logic:
const canBeCaptain = (player: Player): boolean => {
  return (
    player.eligibility === "Verified" &&
    player.injuryStatus !== "Injured" &&
    player.age >= 18 &&
    player.rating >= 6.5  // Minimum rating
  );
};
```

#### Rule 2: Formation Validity
```typescript
// Missing:
- Exactly 11 players in Starting XI
- Formation matches player positions
  - 4-3-3: 1 GK, 4 DEF, 3 MID, 3 FWD
  - 4-2-3-1: 1 GK, 4 DEF, 2 MID, 3 MID/FWD, 1 FWD
- No more than 1 goalkeeper in XI
- Cannot submit during blackout period
```

#### Rule 3: Submission Deadlines
```typescript
// Missing:
- Submission closes X hours before match
- Cannot edit after submission
- Cannot submit after deadline
- Display countdown timer
```

#### Rule 4: Draft Persistence
```typescript
// Current:
const handleSaveAsDraft = () => {
  toast({ title: "Lineup Saved" });
  // LOST on page refresh!
};

// Should:
// - Save to localStorage (temporary)
// - Save to backend/database (permanent)
// - Load draft automatically on page revisit
// - Allow restore of previous drafts
```

---

## Data Flow Issues

### Issue: Substitution Management

```typescript
// Current state:
const [subs, setSubs] = useState<SubstitutionRecord[]>([]);

interface SubstitutionRecord {
  out: string;      // Player name (string hardcoded)
  in: string;       // Player name (string hardcoded)
  minute: number;   // When substitution happened
}
```

**Problems:**
1. ❌ Substitutions shown in UI but never persisted
2. ❌ No "Add Substitution" button (only Remove)
3. ❌ Cannot record substitutions until match starts
4. ❌ Player names are strings (not IDs) - violates data integrity
5. ❌ No validation (can't sub out a player not in XI)
6. ❌ Not included in submission payload

**Should Be:**
```typescript
interface SubstitutionRecord {
  matchId: string;           // Foreign key
  minuteOccurred: number;    // When it happened
  playerOutId: number;       // Player jersey number (not name)
  playerInId: number;        // Player jersey number (not name)
  reason?: string;           // Optional: injury, tactical, fatigue
  recordedBy: number;        // User ID who recorded it
  recordedAt: string;        // ISO timestamp
}

// Only populate during/after match, not pre-match
// Currently showing in "Substitutions Tab" which shouldn't show pre-match
```

---

## Missing Business Rules Checklist

### Pre-Submission Validation
```typescript
❌ Validate captain eligibility
❌ Validate 11 players selected
❌ Validate formation structure
❌ Validate no duplicate players
❌ Validate no players under injury/suspension
❌ Check submission deadline not passed
❌ Check match not already started
❌ Verify user is authorized to submit
❌ Check for previous submissions (prevent duplicates)
```

### Submission Workflow
```typescript
❌ Send lineup to backend API
❌ Store submission timestamp
❌ Generate submission ID
❌ Notify Event Organizer
❌ Lock lineup from further edits
❌ Store audit trail (who, when, what changed)
❌ Generate PDF receipt
```

### Draft Management
```typescript
❌ Auto-save drafts periodically
❌ Store multiple draft versions
❌ Allow draft comparison
❌ Handle draft expiration
❌ Conflict resolution (multiple users)
```

---

## API Integration Gaps

### Required Endpoints

#### 1. **GET /api/matches/upcoming**
```typescript
// Current:
const upcomingMatch = mockMatches.find((m) => m.status === "Scheduled");

// Required API:
interface MatchResponse {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competitionName: string;
  status: "Scheduled" | "InProgress" | "Completed";
  submissionDeadline: string;  // ISO datetime
  canEditLineup: boolean;       // Business rule: past deadline?
}

// Usage:
useEffect(() => {
  const matches = await fetch('/api/matches/upcoming').then(r => r.json());
  setMatches(matches);
  setSelectedMatch(matches[0]); // Allow user to pick
}, []);
```

#### 2. **GET /api/club/squad**
```typescript
interface SquadPlayer {
  number: number;
  name: string;
  position: "GK" | "DEF" | "MID" | "FWD";
  rating: number;
  eligibility: "Verified" | "Pending" | "Suspended";
  injuryStatus: "Fit" | "Injured";
  appearances: number;           // Career stats
  goals: number;
  assists: number;
  disciplineCards: number;
}

// Usage:
useEffect(() => {
  const squad = await fetch('/api/club/squad').then(r => r.json());
  setStartingXI(squad.filter(p => p.eligible));
  setBench(squad.filter(p => !p.eligible));
}, []);
```

#### 3. **POST /api/lineups/submit**
```typescript
interface SubmitLineupRequest {
  matchId: string;
  formation: string;
  captainNumber: number;
  startingWeatherXI: {
    playerNumber: number;
    position: string;
  }[];
  bench: {
    playerNumber: number;
  }[];
  submittedAt: string;  // ISO datetime
  ipAddress?: string;   // Audit trail
  userAgent?: string;   // Audit trail
}

interface SubmitLineupResponse {
  success: boolean;
  lineupId: string;
  message: string;
  acknowledgedBy?: {
    eoId: string;
    timestamp: string;
  };
}
```

#### 4. **POST /api/lineups/draft**
```typescript
interface SaveDraftRequest {
  matchId: string;
  formation: string;
  captainNumber: number;
  startingXI: number[];  // Player numbers
  bench: number[];       // Player numbers
  autoSave?: boolean;    // true if auto-saving
}

// Usage:
const autoSaveDraft = () => {
  const draftData = {
    matchId: upcomingMatch.id,
    formation,
    captainNumber: captain,
    startingXI: mockLineupData.startingXI.map(p => p.number),
    bench: mockLineupData.bench.map(p => p.number),
    autoSave: true,
  };
  
  api.post('/lineups/draft', draftData).catch(error => {
    console.error('Auto-save failed:', error);
  });
};

// Auto-save every 30 seconds
useEffect(() => {
  const interval = setInterval(autoSaveDraft, 30000);
  return () => clearInterval(interval);
}, [formation, captain]);
```

#### 5. **GET /api/lineups/:matchId/latest**
```typescript
// Load most recent draft on page load
interface LineupResponse {
  id: string;
  matchId: string;
  formation: string;
  captain: number;
  startingXI: number[];
  bench: number[];
  status: "Draft" | "Submitted" | "Locked";
  savedAt: string;
  submittedAt?: string;
}

// Usage:
useEffect(() => {
  const loadDraft = async () => {
    const lineup = await fetch(
      `/api/lineups/${upcomingMatch.id}/latest`
    ).then(r => r.json());
    
    if (lineup) {
      setFormation(lineup.formation);
      setCaptain(lineup.captain);
      setSubmitted(lineup.status === "Submitted");
    }
  };
  
  loadDraft();
}, [upcomingMatch.id]);
```

---

## State Management Recommendations

### Current Issue:
- All state lost on page refresh
- No persistence mechanism
- No error handling

### Solution: Implement Data Persistence

```typescript
// 1. Local Storage (temporary)
useEffect(() => {
  const saved = localStorage.getItem(`lineup-draft-${upcomingMatch.id}`);
  if (saved) {
    const { formation: f, captain: c } = JSON.parse(saved);
    setFormation(f);
    setCaptain(c);
  }
}, []);

// 2. Auto-save to local storage
useEffect(() => {
  const draft = { formation, captain, timestamp: Date.now() };
  localStorage.setItem(`lineup-draft-${upcomingMatch.id}`, JSON.stringify(draft));
}, [formation, captain, upcomingMatch.id]);

// 3. Backend persistence (actual save)
const handleSaveAsDraft = async () => {
  try {
    const response = await api.post('/lineups/draft', {
      matchId: upcomingMatch.id,
      formation,
      captain,
      startingXI: mockLineupData.startingXI.map(p => p.number),
      bench: mockLineupData.bench.map(p => p.number),
    });
    
    toast({
      title: "Draft Saved",
      description: `Saved at ${new Date().toLocaleTimeString()}`,
    });
    
    // Clear auto-draft after successful save
    localStorage.removeItem(`lineup-draft-${upcomingMatch.id}`);
  } catch (error) {
    toast({
      title: "Save Failed",
      description: error.message,
      variant: "destructive",
    });
  }
};
```

---

## Business Rule Implementation Priority

### Phase 1 - MVP (Current)
```
✅ Formation selection
✅ Captain selection UI
❌ → Add: Player eligibility validation
❌ → Add: Formation validity check (11 players, right positions)
```

### Phase 2 - Core Business Logic
```
❌ Backend API integration
❌ Submission workflow with validation
❌ Draft persistence
❌ Submission deadline enforcement
❌ Error handling & recovery
```

### Phase 3 - Advanced Rules
```
❌ Auto-save with conflict resolution
❌ Multiple draft management
❌ Audit trail & compliance
❌ Real-time squad updates
❌ SMS/Push notifications
```

---

## Security & Compliance Issues

### Issue 1: Authorization
```typescript
// Missing:
- Verify user is club captain/coach
- Verify user has permission for this match
- Verify match belongs to user's club
```

### Issue 2: Audit Trail
```typescript
// Missing:
- Who submitted the lineup?
- When was it submitted?
- Did it change after submission?
- Who approved it?
```

### Issue 3: Conflict Prevention
```typescript
// Missing:
- Prevent duplicate submissions
- Handle simultaneous edits (two coaches editing same lineup)
- Lock lineup after submission deadline
```

---

## Recommendations Summary

### Critical (Do First)
1. **Add Validation Logic**
   - Captain eligibility check
   - Formation structure validation
   - 11 players exactly requirement

2. **Implement Draft Persistence**
   - Backend save/load
   - Auto-save interval
   - Conflict handling

3. **Connect to Backend APIs**
   - Match fetching
   - Squad loading
   - Submission endpoint

### Important (Do Next)
4. Add submission confirmation dialog
5. Implement proper error handling
6. Add submission deadline enforcement
7. Lock lineup after submission

### Nice-to-Have (Future)
8. Auto-save indication
9. Revision history
10. Comparison with previous lineups
11. Squad analytics/recommendations

---

## Testing Checklist

### Unit Tests Needed
```typescript
❌ validateLineup(lineup): boolean
❌ canPlayerBeCaptain(player): boolean
❌ isFormationValid(formation, players): boolean
❌ getPlayerEligibility(player): EligibilityStatus
❌ formatFormationName(formation): string
```

### Integration Tests Needed
```typescript
❌ Submit lineup happy path
❌ Submit with invalid formation
❌ Submit after deadline
❌ Load draft on page load
❌ Save draft without network
❌ Conflict resolution (simultaneous edit)
```

### E2E Tests Needed
```typescript
❌ Full lineup creation → submission → confirmation
❌ Draft save and restore
❌ Error on submission failure
❌ Mobile responsiveness during workflow
```

---

## Conclusion

**Current State:** ✅ UI Complete | ⚠️ Business Logic Partial | 🔴 Backend Not Integrated

The LineupManagement component provides excellent UI/UX for lineup preparation but lacks:
1. Data persistence (everything lost on refresh)
2. Comprehensive validation rules
3. Backend API integration
4. Error handling
5. Security/authorization checks

**Recommendation:** This is suitable for **internal demo/prototype** but requires Phase 2 work before production deployment.

**Effort Estimate:**
- Phase 1 (Validation): 4-6 hours
- Phase 2 (Backend Integration): 6-8 hours
- Phase 3 (Advanced Features): 8-12 hours

---

**Review Completed:** March 16, 2025  
**Component:** `/src/modules/club/operations/LineupManagement.tsx`  
**Route:** `/club/match-day`, `/club/lineup`

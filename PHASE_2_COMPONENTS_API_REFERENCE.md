# 📚 PHASE 2 COMPONENTS - API REFERENCE

**Quick Component Lookup**  
**Last Updated:** March 16, 2026

---

## 🎨 Component Overview

| Component | Location | Purpose | Key Props |
|-----------|----------|---------|-----------|
| ValidationErrorAlert | `components/registration/` | Display blocking errors | `errors`, `onDismiss` |
| ValidationWarningAlert | `components/registration/` | Display warnings | `warnings`, `onOverride` |
| RegistrationDetails | `components/registration/` | Show registration info | `registration`, `constraints` |
| ValidationSummary | `components/registration/` | Show all validators | `result`, `expandable` |

---

## ❌ ValidationErrorAlert

**Purpose:** Display blocking validation errors that prevent approval

**Import:**
```typescript
import { ValidationErrorAlert } from "@/components/registration/ValidationErrorAlert";
```

**Props:**
```typescript
interface ValidationErrorAlertProps {
  errors: ValidationError[];      // Array of errors to display
  onDismiss?: () => void;         // Called when user dismisses
  className?: string;              // Additional CSS classes
}
```

**ValidationError Type:**
```typescript
interface ValidationError {
  code: string;                   // e.g., "PAYMENT_NOT_VERIFIED"
  message: string;                // User-facing message
  severity: "error" | "warning";  // Error level
  field?: string;                 // Related field
  details?: Record<string, any>;  // Additional info
  hint?: string;                  // How to fix
  action?: string;                // Suggested action
}
```

**Example Usage:**
```typescript
import { ValidationErrorAlert } from "@/components/registration/ValidationErrorAlert";

function MyComponent({ validationErrors }) {
  if (!validationErrors.length) return null;

  return (
    <ValidationErrorAlert
      errors={validationErrors}
      onDismiss={() => console.log("Dismissed")}
      className="mb-4"
    />
  );
}
```

**Display Format:**
```
┌─────────────────────────────────────┐
│ ⚠️  Validasi Gagal - 3 masalah      │
├─────────────────────────────────────┤
│ ✕ Terlalu Sedikit Pemain          │
│   Registrasi memiliki 8 pemain,   │
│   tetapi minimum adalah 11        │
│   💡 Hint: Tambahkan minimal 3 pe │
│                                   │
│ ✕ Pembayaran Belum Dikonfirmasi   │
│   Status pembayaran masih Unpaid  │
│   💡 Hint: Konfirmasi pembayaran  │
│                                   │
└─────────────────────────────────────┘
```

**Styling:**
- Color: Red/Destructive theme (bg-destructive/5)
- Icon: AlertTriangle (red)
- Text: destructive foreground color
- Layout: Alert component with icon + content

**Error Codes Reference:**
```
ROSTER_TOO_SMALL         → "Terlalu Sedikit Pemain"
ROSTER_TOO_LARGE         → "Terlalu Banyak Pemain"
PLAYERS_EXCEED_AGE_LIMIT → "Ada Pemain Melebihi Batas Usia"
SUSPENDED_PLAYERS        → "Ada Pemain yang Dilarang"
PAYMENT_NOT_VERIFIED     → "Pembayaran Belum Dikonfirmasi"
NO_SLOTS_AVAILABLE       → "Kuota Penuh"
INVALID_REGISTRATION     → "Data Registrasi Tidak Valid"
```

---

## ⚠️ ValidationWarningAlert

**Purpose:** Display non-blocking warnings with manual override option

**Import:**
```typescript
import { ValidationWarningAlert } from "@/components/registration/ValidationWarningAlert";
```

**Props:**
```typescript
interface ValidationWarningAlertProps {
  warnings: ValidationError[];           // Array of warnings
  onOverride?: () => void;               // Called when override clicked
  overrideButtonLabel?: string;          // Button text
  className?: string;                    // Additional CSS classes
}
```

**Example Usage:**
```typescript
import { ValidationWarningAlert } from "@/components/registration/ValidationWarningAlert";

function ApprovalFlow({ warnings }) {
  const [isOverriding, setIsOverriding] = useState(false);

  return (
    <ValidationWarningAlert
      warnings={warnings}
      overrideButtonLabel="Override & Approve"
      onOverride={() => {
        setIsOverriding(true);
        proceedWithApproval();
      }}
    />
  );
}
```

**Display Format:**
```
┌─────────────────────────────────────┐
│ ℹ️  2 Peringatan - Tinjau Sebelum  │
├─────────────────────────────────────┤
│ • Pemain Mendekati Jumlah Minimum  │
│   25 pemain, close to minimum (11) │
│   💡 Tinjau kembali roster        │
│                                   │
│ • Kuota Terbatas                  │
│   Hanya 2 slot tersisa untuk klub │
│   💡 Pertimbangkan timing         │
│                                   │
│ ┌─────────────────────────────────┐
│ │ [Override & Approve]            │
│ └─────────────────────────────────┘
└─────────────────────────────────────┘
```

**Styling:**
- Color: Amber/Warning theme (bg-amber-50)
- Icon: AlertCircle (amber)
- Override button: Amber border + text
- Shows contextual advice

**Warning Codes Reference:**
```
ROSTER_CLOSE_TO_MINIMUM  → "Pemain Mendekati Jumlah Minimum"
PLAYERS_AT_AGE_LIMIT     → "Ada Pemain di Batas Usia Maksimum"
PENDING_ELIGIBILITY      → "Status Kelayakan Pemain Tertunda"
PARTIAL_PAYMENT          → "Pembayaran Belum Lengkap"
LIMITED_SLOTS            → "Kuota Terbatas"
```

---

## 👥 RegistrationDetails

**Purpose:** Display complete registration info including player roster and constraints

**Import:**
```typescript
import { RegistrationDetails } from "@/components/registration/RegistrationDetails";
```

**Props:**
```typescript
interface RegistrationDetailsProps {
  registration: Registration;           // The registration object
  constraints: CompetitionConstraints;  // Competition rules
  className?: string;                   // Additional CSS classes
}
```

**Registration Type:**
```typescript
interface Registration {
  id: string;
  clubId: string;
  clubName: string;
  competitionId: string;
  competitionName: string;
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
  fee: number;
  playerCount: number;
  players?: RegistrationPlayer[];
  competitionConstraints: CompetitionConstraints;
  validationStatus?: ValidationStatus;
  submittedAt?: string;
  reviewedBy?: string;
  approvalNotes?: string;
  registeredAt: string;
}
```

**RegistrationPlayer Type:**
```typescript
interface RegistrationPlayer {
  playerId: string;
  name: string;
  age: number;
  dob: string;
  position: string;
  eligibility: "Verified" | "Suspended" | "Pending" | "Ineligible";
  ageValid?: boolean;
  eligibilityValid?: boolean;
}
```

**CompetitionConstraints Type:**
```typescript
interface CompetitionConstraints {
  minRosterSize: number;    // e.g., 11
  maxRosterSize: number;    // e.g., 25
  ageGroup: string;         // e.g., "U13"
  maxTeams: number;         // Total possible
  slotsAvailable: number;   // Remaining slots
}
```

**Example Usage:**
```typescript
import { RegistrationDetails } from "@/components/registration/RegistrationDetails";
import { Dialog, DialogContent } from "@/components/ui/dialog";

function DetailsModal({ registration, open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <RegistrationDetails
          registration={registration}
          constraints={registration.competitionConstraints}
        />
      </DialogContent>
    </Dialog>
  );
}
```

**Display Format:**
```
┌──────────────────────────────────────┐
│ Syarat Kompetisi                  🏆 │
├──────────────────────────────────────┤
│ Min Pemain │ Max Pemain │ Batas Usia │
│    11      │    25      │  13 tahun  │
│ Kuota Tersisa: 5/16                 │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Status Pemain (22 terdaftar)      👥 │
├──────────────────────────────────────┤
│ Persyaratan Roster: 22 / 11-25      │
│ Status: ✓ Valid                      │
│                                      │
│ Nama        │ Usia │ Posisi │ Status│
│ ─────────────────────────────────────│
│ Rido Wibowo │ 12   │ GK     │ ✓     │
│ Adi Sukma   │ 13   │ CB     │ ✓     │
│ ...more rows...                      │
└──────────────────────────────────────┘
```

**Features:**
- Constraint cards (4 columns)
- Roster status summary
- Player table with:
  - Name, Age, Position, Status
  - Age violation badges
  - Eligibility status colored badges
- Scrollable for many players
- Responsive layout

---

## 📋 ValidationSummary

**Purpose:** Display overview of all 5 validators at a glance

**Import:**
```typescript
import { ValidationSummary } from "@/components/registration/ValidationSummary";
```

**Props:**
```typescript
interface ValidationSummaryProps {
  result: ValidationResult;    // Validation result to summarize
  className?: string;          // Additional CSS classes
  expandable?: boolean;        // Allow expanding details
}
```

**ValidationResult Type:**
```typescript
interface ValidationResult {
  registrationId: string;
  isValid: boolean;
  timestamp: string;
  errors: ValidationError[];
  warnings: ValidationError[];
  validations: {
    rosterSize: ValidatorResult;
    playerAges: ValidatorResult;
    playerEligibility: ValidatorResult;
    payment: ValidatorResult;
    slotAvailability: ValidatorResult;
  };
}
```

**ValidatorResult Type:**
```typescript
interface ValidatorResult {
  isValid: boolean;
  hasWarning?: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  details?: string;
}
```

**Example Usage:**
```typescript
import { ValidationSummary } from "@/components/registration/ValidationSummary";
import { registrationValidator } from "@/services/registrationValidator";

async function ValidationFlow() {
  const result = await registrationValidator.validateRegistration(
    regId,
    { registration, competition }
  );

  return (
    <ValidationSummary
      result={result}
      className="mb-4"
    />
  );
}
```

**Display Format:**
```
┌────────────────────────────────────┐
│ 📋 Ringkasan Validasi              │
│                 ▢ 0 Error ▢ 0 Warn │
├────────────────────────────────────┤
│ 👥 Jumlah Pemain          ✓ Valid  │
│    Pemain sudah sesuai ketentuan   │
│                                    │
│ 🎂 Batas Usia             ✓ Valid  │
│    Semua pemain memenuhi batas     │
│                                    │
│ ✅ Kelayakan Pemain       ✓ Valid  │
│    Semua pemain layak bermain      │
│                                    │
│ 💳 Pembayaran             ✓ Valid  │
│    Pembayaran sudah dikonfirmasi   │
│                                    │
│ 🏆 Kuota Tersedia         ✓ Valid  │
│    Masih ada kuota untuk klub      │
├────────────────────────────────────┤
│ Status Keseluruhan: ✓ Siap Disetujui
│ Waktu validasi: 14:23:45          │
└────────────────────────────────────┘
```

**5 Validators Displayed:**
1. **👥 Jumlah Pemain** - Roster size validation
2. **🎂 Batas Usia** - Age limit validation
3. **✅ Kelayakan Pemain** - Eligibility validation
4. **💳 Pembayaran** - Payment status validation
5. **🏆 Kuota Tersedia** - Slot availability validation

**Status Indicators:**
- ✓ Green: Valid, no issues
- ⚠ Amber: Warning, investigate but may proceed
- ✕ Red: Error, blocks approval

---

## 🔄 Helper Components

### ValidationStatusIndicator

**Purpose:** Small reusable widget showing validation status

**Import:**
```typescript
import { ValidationStatusIndicator } from "@/components/registration/ValidationSummary";
```

**Usage:**
```typescript
<ValidationStatusIndicator isValid={true} />
// Renders: ✓ Valid

<ValidationStatusIndicator isValid={false} />
// Renders: ⚠ Ada Masalah
```

---

## 🔧 Common Patterns

### Pattern 1: Basic Validation Display

```typescript
import { ValidationSummary } from "@/components/registration/ValidationSummary";
import { ValidationErrorAlert } from "@/components/registration/ValidationErrorAlert";

function ValidationDisplay({ validationResult }) {
  return (
    <>
      <ValidationSummary result={validationResult} />
      {validationResult.errors.length > 0 && (
        <ValidationErrorAlert errors={validationResult.errors} />
      )}
    </>
  );
}
```

### Pattern 2: Approval Flow

```typescript
async function handleApprove(registration) {
  // Run validation
  const result = await registrationValidator.validateRegistration(
    registration.id,
    { registration, competition: {...} }
  );

  // Store result
  setValidation(result);

  // Check for blocking errors
  const errors = result.errors.filter(e => e.severity === "error");
  if (errors.length > 0) {
    toast.error(`Validasi Gagal: ${errors.length} masalah`);
    return;
  }

  // Show confirmation with warnings if any
  setConfirmDialogOpen(true);
}
```

### Pattern 3: Details Modal

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RegistrationDetails } from "@/components/registration/RegistrationDetails";

function DetailsModal({ registration, open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{registration.clubName}</DialogTitle>
        </DialogHeader>
        <RegistrationDetails
          registration={registration}
          constraints={registration.competitionConstraints}
        />
      </DialogContent>
    </Dialog>
  );
}
```

---

## 🎨 Styling & Customization

### Tailwind Classes Used

**Colors:**
- Error/Destructive: `text-destructive`, `bg-destructive/5`, `border-destructive/50`
- Warning/Amber: `text-amber-600`, `bg-amber-50`, `border-amber-500/50`
- Success/Green: `text-green-700`, `bg-green-50`

**Spacing:**
- Padding: `p-3`, `p-4`, `p-6`
- Margins: `mt-2`, `mb-3`, `gap-2`, `gap-3`
- Borders: `border`, `border-l-2`

**Typography:**
- Titles: `font-semibold`, `font-bold`
- Body: `text-sm`, `text-xs`
- Uppercase: `uppercase`, `tracking-wider`

**Layout:**
- Grid: `grid`, `grid-cols-2`, `grid-cols-4`
- Flex: `flex`, `items-center`, `justify-between`
- Responsive: `md:grid-cols-4`, `sm:text-left`

### Custom Styling

```typescript
// Add custom classes
<ValidationErrorAlert
  errors={errors}
  className="border-l-4 border-l-destructive shadow-lg"
/>

// Override defaults
<ValidationSummary
  result={result}
  className="rounded-none border-0"
/>
```

---

## 📱 Responsive Behavior

### Mobile (< 640px)
- Grid columns stack to 1
- Details modal takes 95% width
- Table columns may wrap
- Buttons full-width on small screens

### Tablet (640px - 1024px)
- Grid columns: 2-4
- Modal: max-w-lg
- Table scrollable with horizontal scroll

### Desktop (> 1024px)
- Grid columns: 4
- Modal: max-w-2xl
- Full responsive with all features

---

## ⚡ Performance Notes

### Memo & Optimization
- Components use `React.forwardRef` if needed
- Table rendering optimized for large rosters
- Modals lazy load content
- Validation runs async (no blocking)

### Rendering
- ValidationErrorAlert: Renders only if errors
- ValidationWarningAlert: Renders only if warnings
- RegistrationDetails: Full page in modal (scrollable)
- ValidationSummary: Always renders

---

## 🔗 Related Components

### Used Base Components
- `Alert`, `AlertTitle`, `AlertDescription` from `@/components/ui/alert`
- `Badge` from `@/components/ui/badge`
- `Button` from `@/components/ui/button`
- `Card`, `CardContent`, `CardHeader`, `CardTitle` from `@/components/ui/card`
- `Dialog`, `DialogContent`, etc. from `@/components/ui/dialog`
- `Table`, `TableBody`, etc. from `@/components/ui/table`

### Validator Service
- `registrationValidator` from `@/services/registrationValidator`
- `ValidationResult` type from `@/types/registration`

---

## 🐛 Troubleshooting

### Issue: Component not rendering
**Solution:** Check import paths and ensure files exist in correct location

### Issue: Styles not applying
**Solution:** Ensure Tailwind CSS module loaded, check class names

### Issue: Scrolling not working in modal
**Solution:** Add `max-h-[80vh] overflow-y-auto` to DialogContent

### Issue: Warnings not appearing
**Solution:** Check `warnings` array is not empty, verify severity is "warning"

---

## 📞 Support

For questions or issues:
1. Check component file JSDoc comments
2. Review integration guide: REGISTRATION_VALIDATOR_INTEGRATION_GUIDE.md
3. Check phase 2 testing guide: PHASE_2_TESTING_GUIDE.md
4. Review example implementations in ClubRegistrations.tsx


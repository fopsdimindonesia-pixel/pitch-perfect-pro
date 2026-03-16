# Club Competition Registration Module

## 📋 Analisis Modul Club Eksisting

### Struktur Modul Club
```
club/
├── index.ts                    (Barrel export)
├── dashboard/                  (Overview dan statistik)
├── core/                       (Club profile, branding, history)
├── players/                    (Player management & registration)
├── roster/                     (Squad management)
├── staff/                      (Coach, medical staff)
├── training/                   (Training schedule & attendance)
├── academy/                    (Youth development)
├── analytics/                  (Statistics & performance)
├── finance/                    (Budget & payroll)
├── operations/                 (Match day, lineup)
└── fan/                        (Ticket, merchandise)
```

### Karakteristik Modul Club:
- **Fokus**: Squad management, training, match operations, finance
- **Pola UI**: Card-based layouts, tables, status badges
- **State Management**: useState hooks, optional context
- **Data Flow**: Mock data dari lib/mockData.ts, mockClubData.ts
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

---

## 🎯 Modul Baru: Competition Registration

### 1. Kebutuhan Bisnis

#### Use Case 1: Daftar Kompetisi Dibuka
**Aktor**: Club Manager  
**Tujuan**: Melihat daftar kompetisi yang sedang buka pendaftaran
**Flow**:
- Lihat semua kompetisi dari berbagai EO
- Filter berdasarkan status tulis, umur, EO
- Lihat deadline dan kuota klub
- Lanjut ke detail kompetisi

**Data Diperlukan**:
- ID Kompetisi, Nama, Format
- Status registrasi, Deadline, Kuota
- Fee, EO Name, Age Group, Lokasi
- Tim sudah terdaftar vs slot tersedia

---

#### Use Case 2: Kompetisi Overview/Profile
**Aktor**: Club Manager  
**Tujuan**: Melihat detail kompetisi sebelum mendaftar
**Flow**:
- Tampilkan informasi kompetisi lengkap
- Rules & requirement
- Fee breakdown
- Timeline event
- Requirement dokumen untuk registrasi

**Data Diperlukan**:
- Kompetisi: nama, format, usia, lokasi, periode
- EO detail: nama, kontak
- Regulations: qualification, squad size, player age
- Schedule: registration deadline, competition dates
- Documents required
- Registration price & payment terms

---

#### Use Case 3: Workflow Registrasi
**Aktor**: Club Manager  
**Tujuan**: Mendaftar klub ke kompetisi
**Flow** (Multi-step):

**Step 1: Konfirmasi Informasi Klub**
- Tampilkan klub info (auto-filled dari club profile)
- Edit allowed fields jika diperlukan
- Validasi team size requirement

**Step 2: Pilih Squad Pemain**
- Daftar pemain klub yang eligible
- Tambah/hapus pemain untuk registrasi
- Validasi range umur, jumlah pemain
- Confirm shirt numbers

**Step 3: Upload Dokumen**
- KTP/Passpor manager
- Surat kuasa (jika perlu)
- Bukti pembayaran fee
- Dokumen lainnya sesuai requirement

**Step 4: Review & Submit**
- Summary info klub, squad, dokumen
- Confirm terms & conditions
- Submit registrasi
- Tampilkan confirmation

---

#### Use Case 4: Upload Bukti Pendaftaran
**Aktor**: Club Manager  
**Tujuan**: Upload dokumen pendukung registrasi
**Flow**:
- Drag-drop atau pilih file
- Preview dokumen
- Validasi format & ukuran
- Multiple file upload dengan tracking
- Edit/delete dokumen
- Status approval dokumen

**Data Diperlukan**:
- Document type classification
- File size, format validation rules
- Upload status tracking
- Approval status

---

### 2. Module Architecture

```
club/competition-registration/
├── index.ts                              (Barrel export)
├── pages/
│   ├── AvailableCompetitions.tsx        (1. Lists)
│   ├── CompetitionDetail.tsx             (2. Detail & Profile)
│   └── RegistrationFlow.tsx              (3-4. Multi-step workflow)
├── components/
│   ├── CompetitionCard.tsx               (Card component for list)
│   ├── CompetitionHeader.tsx             (Header dengan info utama)
│   ├── RequirementsCard.tsx              (Requirements & rules)
│   ├── StepIndicator.tsx                 (Multi-step progress)
│   ├── SquadSelector.tsx                 (Player selection)
│   ├── DocumentUploadArea.tsx            (Drag-drop upload)
│   ├── RegistrationSummary.tsx           (Review step)
│   └── RegistrationConfirmation.tsx      (Success state)
├── hooks/
│   ├── useCompetitionRegistration.ts     (Main business logic)
│   ├── useDocumentUpload.ts              (File upload logic)
│   └── useRegistrationStep.ts            (Step navigation)
├── lib/
│   ├── types/
│   │   └── index.ts                     (Types & interfaces)
│   ├── utils/
│   │   ├── validation.ts                 (Form validation)
│   │   └── formatters.ts                 (Data formatting)
│   └── constants.ts                      (Constants & configs)
├── context/
│   └── RegistrationContext.tsx           (Registration state)
└── __tests__/                            (Unit tests)
```

---

### 3. Data Model

#### Types & Interfaces

```typescript
// Competition
interface Competition {
  id: string;
  eoId: string;
  eoName: string;
  name: string;
  format: "League" | "Knockout" | "Group+KO";
  ageGroup: string;
  status: "Draft" | "Registration Open" | "Active" | "Finished";
  description: string;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  registrationFee: number;
  maxWildcard: number;
  currentClubs: number;
  totalSlots: number;
  slotsAvailable: number;
  location?: string;
  regulations?: {
    minPlayers: number;
    maxPlayers: number;
    minPlayerAge: number;
    maxPlayerAge: number;
    minSquadSize: number;
  };
  documents?: DocumentRequirement[];
}

// Registration
interface CompetitionRegistration {
  id: string;
  clubId: string;
  competitionId: string;
  status: "Draft" | "Submitted" | "Approved" | "Rejected";
  stepCompleted: 1 | 2 | 3 | 4;
  club: ClubInfo;
  squad: RegistrationPlayer[];
  documents: UploadedDocument[];
  submittedAt?: string;
  approvedAt?: string;
  notes?: string;
}

// Registration Player
interface RegistrationPlayer {
  id: string;
  playerId: string;
  name: string;
  position: string;
  birthDate: string;
  age: number;
  shirtNumber: number;
  nationality: string;
  idNumber: string;
  eligible: boolean;
}

// Document Upload
interface UploadedDocument {
  id: string;
  type: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  status: "Pending" | "Approved" | "Rejected";
  notes?: string;
  url: string;
}

interface DocumentRequirement {
  id: string;
  type: string;
  label: string;
  required: boolean;
  acceptedFormats: string[];
  maxFileSize: number;
  description?: string;
}
```

---

### 4. UI/UX Components

#### 1. Available Competitions List
- **Grid/Table View**: Sortable, filterable
- **Cards**: Competition name, EO, format, age group, deadline, fee
- **Status Badge**: Open, Closing soon, Full, Closed
- **CTA Button**: View Details / Register
- **Filters**: EO, Format, Age Group, Status, Price range

#### 2. Competition Detail/Profile
- **Hero Section**: Logo EO, competition name, banner
- **Info Section**: Format, duration, location, rules
- **Requirements Card**: Squad size, player age, eligible positions
- **Timeline**: Registration close, competition start, end
- **Documents Required**: List dengan file types, max size
- **Fee Breakdown**: Registration fee, payment method, deadline
- **CTA**: Register Now (dengan validation)

#### 3. Registration Workflow - Multi-step
- **Step 1: Club Confirmation**
  - Club info (auto-filled)
  - Contact person validation
  - Team officials list
  
- **Step 2: Squad Selection**
  - List semua pemain club
  - Checkbox select untuk registration
  - Age validation visual feedback
  - Position distribution chart
  
- **Step 3: Document Upload**
  - Drag-drop area
  - File preview
  - Upload progress
  - Delete/replace option
  
- **Step 4: Review & Submit**
  - Summary semua info
  - Confirm terms
  - Payment info (jika belum bayar)
  - Submit button

#### 4. Document Upload Component
- **Drag-drop area dengan fallback file picker**
- **Preview thumbnail untuk images**
- **File list dengan delete action**
- **Status indicator**: Uploading, Success, Error
- **Auto-sizing**: Responsive container

---

### 5. State Management Strategy

#### Option 1: Context + useReducer (Recommended)
```typescript
interface RegistrationState {
  step: 1 | 2 | 3 | 4;
  club: ClubInfo;
  selectedPlayers: Set<string>;
  documents: UploadedDocument[];
  errors: Record<string, string>;
  isSubmitting: boolean;
  submitSuccess: boolean;
}

type RegistrationAction = 
  | { type: "SET_STEP"; payload: 1 | 2 | 3 | 4 }
  | { type: "ADD_PLAYER"; payload: string }
  | { type: "REMOVE_PLAYER"; payload: string }
  | { type: "ADD_DOCUMENT"; payload: UploadedDocument }
  // ... more actions
```

#### Option 2: Local State + Custom Hooks (Simpler)
- Gunakan useState untuk setiap step
- useCompetitionRegistration hook untuk orchestration
- Simpler untuk module scope

**Pilihan: Option 2** untuk simplicity & maintainability

---

### 6. Mock Data Struktur

```typescript
// Extended mockCompetitions dengan registration-specific fields
export const mockCompetitions = [
  {
    id: "comp-1",
    eoId: "eo-1",
    eoName: "PSSI Makassar",
    name: "Liga Makassar U13",
    format: "League",
    ageGroup: "U13",
    status: "Registration Open", // Changed
    description: "Kompetisi tahunan sepak bola kelompok umur 13 tahun di Makassar",
    registrationDeadline: "2024-02-28", // New field
    startDate: "2024-03-01",
    endDate: "2024-06-30",
    registrationFee: 500000,
    maxWildcard: 2,
    currentClubs: 6,
    totalSlots: 8,
    slotsAvailable: 2,
    location: "Makassar, South Sulawesi",
    regulations: {
      minPlayers: 18,
      maxPlayers: 23,
      minPlayerAge: 12,
      maxPlayerAge: 13,
      minSquadSize: 18,
    },
    documents: [
      { id: "doc-1", type: "manager-id", label: "Manager KTP", required: true, ... },
      { id: "doc-2", type: "player-list", label: "Daftar Pemain", required: true, ... },
    ]
  }
]

// Registration instances
export const mockRegistrations = [
  {
    id: "reg-club1-comp1",
    clubId: "club-1",
    competitionId: "comp-1",
    status: "Submitted",
    stepCompleted: 4,
    club: { id: "club-1", name: "SSB Garuda Muda", ... },
    squad: [ ... ],
    documents: [ ... ],
    submittedAt: "2024-02-15T10:30:00Z",
  }
]
```

---

## 💻 Implementation Roadmap

### Phase 1: Foundation (Completed First)
- ✅ Type definitions
- ✅ Mock data structure
- ✅ Custom hooks
- ✅ Utils & validators

### Phase 2: Components (Atomic)
- ✅ CompetitionCard
- ✅ CompetitionHeader
- ✅ RequirementsCard
- ✅ DocumentUploadArea
- ✅ SquadSelector
- ✅ StepIndicator

### Phase 3: Features
- ✅ AvailableCompetitions page
- ✅ CompetitionDetail page
- ✅ RegistrationFlow (multi-step)
- ✅ RegistrationContext

### Phase 4: Integration
- ✅ Add to club/index.ts
- ✅ Add routes to App.tsx
- ✅ Add sidebar navigation
- ✅ Testing & validation

---

## 📦 Clean Code Principles Applied

### 1. **Single Responsibility**
- Setiap component punya satu tanggung jawab
- Hooks terpisah untuk concerns berbeda
- Utils terpisah untuk logic reusable

### 2. **DRY (Don't Repeat Yourself)**
- Shared types di folder types/
- Reusable components & hooks
- Constants di constants.ts

### 3. **Naming Conventions**
- Components: PascalCase (CompetitionCard)
- Hooks: useXxx (useCompetitionRegistration)
- Utils: camelCase (formatDate)
- Constants: UPPERCASE (MAX_FILE_SIZE)

### 4. **File Organization**
- Logical grouping: pages/, components/, hooks/
- Types isolated: lib/types/
- Utils isolated: lib/utils/
- Constants isolated: lib/constants.ts

### 5. **Error Handling**
- Validation functions clean & testable
- User-friendly error messages
- Graceful degradation

### 6. **Documentation**
- JSDoc comments untuk kompleks functions
- Inline comments untuk logic unik
- README untuk overview modul

---

## 📊 Mockup & Design Reference

### 1. Available Competitions - List View
```
┌─────────────────────────────────────────────┐
│ Available Competitions for Registration     │
│ Filter: [Status ▼] [EO ▼] [Price ▼]       │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ Liga Makassar U13                       │ │
│ │ PSSI Makassar • League • U13            │ │
│ │ Deadline: 28 Feb 2024 | 6/8 slots full │ │
│ │ Fee: Rp 500.000                         │ │
│ │              [View Details] [Register]  │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ Cup Makassar U15                        │ │
│ │ PSSI Makassar • Knockout • U15          │ │
│ │ Deadline: 31 Mar 2024 | 12/16 slots    │ │
│ │ Fee: Rp 750.000                         │ │
│ │              [View Details] [Register]  │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### 2. Competition Detail - Profile
```
┌──────────────────────────────────────────────────┐
│ [PSSI Logo] Liga Makassar U13                   │
│ PSSI Makassar • League Format • 2024            │
├──────────────────────────────────────────────────┤
│ ┌────────────────┐ ┌────────────────────────┐  │
│ │ INFORMATION    │ │ REQUIREMENTS           │  │
│ ├────────────────┤ ├────────────────────────┤  │
│ │Duration:       │ │ Squad Size: 18-23     │  │
│ │ 1 Mar - 30 Jun │ │ Player Age: 12-13     │  │
│ │                │ │ Min Verified: 15      │  │
│ │Location:       │ │                        │  │
│ │ Makassar, SSU  │ │ DOCUMENTS REQUIRED     │  │
│ │                │ │ □ Manager ID          │  │
│ │Fee:            │ │ □ Player List         │  │
│ │ Rp 500.000     │ │ □ Payment Proof       │  │
│ │                │ │ □ Club Letter         │  │
│ │Deadline:       │ └────────────────────────┘  │
│ │ 28 Feb 2024    │                            │
│ │ ⏱️ 5 days left │                            │
│ └────────────────┘                            │
│                                               │
│ [Register Now]                                 │
└──────────────────────────────────────────────────┘
```

### 3. Registration Flow - Multi-step
```
Step Progress:
━━━━━━━━━━━━━━━━━━ (1/4)

STEP 1: CONFIRM CLUB INFO
┌────────────────────────────────┐
│ Club: SSB Garuda Muda          │
│ City: Makassar                 │
│ Manager: [Text Field]          │
│ Phone: [Text Field]            │
│ Email: [...@club.id]           │
├────────────────────────────────┤
│ [Previous]         [Next Step] │
└────────────────────────────────┘

━━━━━━━━━━━━━━━━━ (2/4)

STEP 2: SELECT SQUAD
┌────────────────────────────────┐
│ Squad Selection (18-23 players)│
│ Selected: 19/23                │
├────────────────────────────────┤
│ Position: GK | CB | ... | ST   │
│ ☑ Player 1 | #1 | GK | Age... │
│ ☐ Player 2 | #2 | CM | Age... │
│ ...                            │
│ [+ Add from bench]             │
├────────────────────────────────┤
│ [Previous]         [Next Step] │
└────────────────────────────────┘

━━━━━━━━━━━━━━ (3/4)

STEP 3: UPLOAD DOCUMENTS
┌────────────────────────────────┐
│ Required Documents             │
├────────────────────────────────┤
│ 📄 Manager ID (KTP)            │
│ ⬜ Drag & drop or click        │
│                                │
│ 📄 Player List                 │
│ ✓ playerlist.pdf              │
│ [×]                            │
│                                │
│ 📄 Payment Proof               │
│ ⬜ Drag & drop or click        │
│                                │
│ [Previous]         [Next Step] │
└────────────────────────────────┘

━━━━━ (4/4)

STEP 4: REVIEW & CONFIRM
┌────────────────────────────────┐
│ SUMMARY                        │
├────────────────────────────────┤
│ Club: SSB Garuda Muda          │
│ Squad: 19 players (eligible)   │
│ Documents: 3/3 uploaded        │
│ Fee: Rp 500.000 (not paid)     │
├────────────────────────────────┤
│ ☑ I agree to terms             │
│ [Previous] [Cancel] [Submit]   │
└────────────────────────────────┘
```

---

## ✅ Success Criteria

1. ✅ Modul tersebut accessible dari sidebar
2. ✅ List kompetisi dengan filter & sort
3. ✅ Detail kompetisi menampilkan semua info
4. ✅ Multi-step workflow berjalan smooth
5. ✅ Document upload dengan validation
6. ✅ Responsive design di mobile
7. ✅ Accessibility features (ARIA, keyboard nav)
8. ✅ Clean code structure & maintainable

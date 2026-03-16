# 🧪 PHASE 2 TESTING GUIDE

**Quick Reference:** Test all 5 validation scenarios  
**Estimated Time:** 10-15 minutes  
**Prerequisites:** Application running, logged in as EO

---

## 🎯 TESTING CHECKLIST

### Setup
- [ ] Start development server: `npm run dev`
- [ ] Navigate to EO Dashboard → Club Registration
- [ ] Verify 5 test registrations visible in Pending table

---

## 📋 TEST SCENARIOS

### ✅ Scenario 1: Valid Registration (Auto-Approvable)
**Registration:** REG-1 (22 players, Paid, All verified)

**Steps:**
1. Find "REG-1" in Pending table
2. Click "Approve" button
3. Wait for validation (⏳ Validasi...)
4. Observe: ValidationSummary card appears with all ✓ checks
5. Confirm dialog shows "Setujui Registrasi"
6. Click "Setujui" button
7. **Expected:** Toast "Registrasi Disetujui" appears
8. **Result:** Verify registration moved to "Approved" status

**What to Check:**
- ✅ Validation runs automatically
- ✅ All 5 validators show green ✓
- ✅ No ValidationErrorAlert shown
- ✅ Confirm dialog available
- ✅ Status updates to "Approved"

---

### ⚠️ Scenario 2: Unpaid Registration
**Registration:** REG-2 (18 players, Unpaid)

**Steps:**
1. Find "REG-2" in Pending table
2. Click "Approve" button
3. Wait for validation
4. Observe: ValidationErrorAlert appears
5. **Expected Error:** "Pembayaran Belum Dikonfirmasi"
6. Check ValidationSummary - Payment validator shows ✕
7. Confirm dialog should NOT appear
8. Try clicking "Approve" again - same error occurs
9. Click "Reject" button (this works without validation)
10. **Expected:** Toast "Registrasi Ditolak"

**What to Check:**
- ✅ Validation runs and catches payment error
- ✅ ValidationErrorAlert displays payment issue
- ✅ Confirm dialog blocked (not shown)
- ✅ Error message suggests what to fix
- ✅ Reject works independently
- ✅ Status updates to "Rejected"

---

### 👥 Scenario 3: Too Few Players
**Registration:** REG-3 (8 players, need 11 minimum)

**Steps:**
1. Find "REG-3" in Pending table
2. Click "Details" button
3. Observe: Modal shows player roster (8 players)
4. See constraints: "Min Pemain: 11"
5. See compliance badge: "Kurang 3" (red)
6. Close modal
7. Click "Approve"
8. Wait for validation
9. **Expected Error:** "Terlalu Sedikit Pemain"
10. ValidationErrorAlert shows: "Kurang 3 pemain"
11. Hint suggests: "Tambahkan minimal 3 pemain"
12. Confirm dialog NOT shown

**What to Check:**
- ✅ Details modal shows full player list
- ✅ Constraints displayed correctly
- ✅ Roster badge shows deficit
- ✅ Validation catches roster error
- ✅ Error message is specific (3 players needed)
- ✅ Hint provided for resolution

---

### 🚫 Scenario 4: Suspended Player
**Registration:** REG-4 (20 players, 1 suspended)

**Steps:**
1. Find "REG-4" in Pending table
2. Click "Details" button
3. Scroll player table
4. Find suspended player - check eligibility badge (red "Dilarang")
5. Close modal
6. Click "Approve"
7. Wait for validation
8. **Expected Error:** "Ada Pemain yang Dilarang"
9. ValidationErrorAlert shows suspended player info
10. Confirm dialog NOT shown

**What to Check:**
- ✅ Details modal highlights suspended player
- ✅ Eligibility badge red for suspended
- ✅ Validation catches eligibility error
- ✅ Error message identifies issue type
- ✅ Hint: "Hapus atau ubah pemain yang dilarang"

---

### ✅ Scenario 5: Already Approved Reference
**Registration:** REG-5 (status already "Approved")

**Steps:**
1. Scroll to "Semua Registrasi" section
2. Find "REG-5"
3. Verify status shows "Approved" badge (green)
4. Note: REG-5 is **not** in Pending table (only pending shown there)
5. Check registration date (should show registration timestamp)

**What to Check:**
- ✅ Approved registrations not in Pending section
- ✅ Status badge displays "Approved"
- ✅ All registrations visible in "Semua Registrasi" section
- ✅ Metadata displayed correctly

---

## 🔍 COMPONENT TESTING

### ValidationSummary Component Tests

**S1 Test:** Valid registration scenario
```
Expected 5 validators visible: 👥 🎂 ✅ 💳 🏆
All should show: ✓ Valid (green)
Overall status: "Siap Disetujui"
```

**S2 Test:** Unpaid scenario
```
Expected 5 validators visible
💳 Payment validator shows: ✕ Gagal (red)
Others show: ✓ Valid (green)
Overall status: "Ada Masalah"
Error count: 1
```

**S3 Test:** Too few players
```
Expected 5 validators visible
👥 Roster validator shows: ✕ Gagal (red)
Others show: ✓ Valid (green)
Error details: "Pemain lebih sedikit dari minimum"
Action: "Tambahkan pemain"
```

---

### ValidationErrorAlert Component Tests

**Test:** Error display format
```
Should show:
- Icon: AlertTriangle (red)
- Title: "Validasi Gagal - X masalah"
- For each error:
  * Error title (translated)
  * Full message
  * Details section
  * Hint section (💡)
  * Action suggestion
```

---

### ValidationWarningAlert Component Tests

**Test:** Warning scenario (if data has warnings)
```
Should show:
- Icon: AlertCircle (amber)
- Title: "X Peringatan"
- For each warning:
  * Title
  * Message
  * Details
  * Hint
- Override button (if applicable)
```

---

### RegistrationDetails Component Tests

**Test:** Details modal content
```
Should display:
- Header: Club name + competition + date
- Constraints card:
  * Min Pemain: XX
  * Max Pemain: XX
  * Batas Usia: XX tahun
  * Kuota Tersisa: XX/XX
- Roster status:
  * Current count
  * Min-Max requirement
  * Compliance badge
- Player table:
  * Columns: Nama | Usia | Posisi | Status
  * Age violation badges (if any)
  * Eligibility badges
- Scrollable (for long rosters)
```

---

## 📊 VALIDATION FLOW VERIFICATION

### Approval Flow Test

**Steps:**
1. Click "Approve" on REG-1
2. Monitor:
   - [ ] Button changes to "⏳ Validasi..."
   - [ ] Other buttons disabled during validation
   - [ ] No page refresh
3. Validation completes:
   - [ ] ValidationSummary appears
   - [ ] No ValidationErrorAlert shown
   - [ ] Confirm dialog appears
4. Click "Setujui":
   - [ ] Dialog closes
   - [ ] Registration status updates
   - [ ] Toast notification shows
   - [ ] Table refreshes

**Timing:** Validation should complete in < 1 second

---

### Error Block Flow Test

**Steps:**
1. Try to approve REG-2 (unpaid)
2. Monitor:
   - [ ] Validation runs (loading spinner)
   - [ ] Page does NOT navigate
3. Validation fails:
   - [ ] ValidationSummary appears
   - [ ] ValidationErrorAlert appears (red)
   - [ ] Confirm dialog does NOT appear
4. Check error details:
   - [ ] Error code visible
   - [ ] User-friendly message shown
   - [ ] Hint provided
   - [ ] Action suggested

**Key:** Approval blocked completely ✓

---

## 🎨 UI/UX VERIFICATION CHECKLIST

### Visual Design
- [ ] Error alerts use red/destructive colors
- [ ] Warning alerts use amber/warning colors
- [ ] Success states use green
- [ ] Icons are consistent (AlertTriangle, AlertCircle, etc.)
- [ ] Spacing and padding consistent
- [ ] Font sizes readable
- [ ] Mobile responsive (test on phone if possible)

### Accessibility
- [ ] Tab navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present on alerts
- [ ] Dialogs modal (focus trapped)
- [ ] Error messages clear
- [ ] Hints helpful

### Responsiveness
- [ ] Details modal scrollable on mobile
- [ ] Table responsive (columns stack on mobile)
- [ ] Buttons accessible (tap targets > 44px)
- [ ] Text readable on small screens

---

## 🐛 COMMON ISSUES TO CHECK

### Loading States
- [ ] "Validasi..." text shows during validation
- [ ] Approve button loading state matches other buttons in app
- [ ] Other buttons disabled during validation

### Error Messages
- [ ] Error titles are translated to Indonesian
- [ ] Messages are clear and actionable
- [ ] Hints start with 💡
- [ ] No console errors in browser DevTools

### Modal/Dialog
- [ ] Details modal scrollable for long rosters
- [ ] Confirm dialog buttons have correct labels
- [ ] Close buttons work
- [ ] Escape key closes dialogs

### Data Display
- [ ] Player ages correct
- [ ] Eligibility statuses accurate
- [ ] Constraints correctly populated
- [ ] Badges shown for violations

---

## 🚀 MANUAL TESTING SCRIPT

```bash
# 1. Start dev server
npm run dev

# 2. Open browser and navigate to:
# http://localhost:5173/eo/registrations

# 3. Run through scenarios in order:
# S1 (Valid) → S2 (Unpaid) → S3 (Too Few) → S4 (Suspended) → S5 (Approved)

# 4. For each scenario:
# - Click Approve and observe validation
# - Click Details to see full registration
# - Check error messages
# - Verify UI updates

# 5. Check browser console for errors:
open DevTools: F12
Check Console tab: Should have no errors ✓

# 6. Run integration tests:
npm run test -- phase2-integration.test.ts
```

---

## ✅ TESTING COMPLETION CHECKLIST

### Scenario Testing
- [ ] S1: Valid - Approved successfully
- [ ] S2: Unpaid - Error blocked approval
- [ ] S3: Too Few - Roster error shown
- [ ] S4: Suspended - Eligibility error shown
- [ ] S5: Already Approved - Status visible

### Component Testing
- [ ] ValidationSummary shows all 5 validators
- [ ] ValidationErrorAlert displays errors correctly
- [ ] ValidationWarningAlert (if warnings exist)
- [ ] RegistrationDetails modal shows full info
- [ ] All buttons responsive and functional

### UI/UX Testing
- [ ] Colors and styling consistent
- [ ] Accessibility features work
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Smooth animations/transitions

### Data Testing
- [ ] Player data correct
- [ ] Constraint values accurate
- [ ] Status updates reflected
- [ ] Toast notifications appear
- [ ] Table refreshes

### Performance
- [ ] Validation completes in < 1 sec
- [ ] No page lag or freezing
- [ ] Modal opens/closes smoothly
- [ ] No memory leaks (check DevTools)

---

## 📝 TESTING NOTES

### If Issues Found

1. **Validation not running:**
   - Check console for errors
   - Verify registrationValidator imported correctly
   - Check mock data has competitionConstraints

2. **Components not rendering:**
   - Verify imports are correct
   - Check for TypeScript errors
   - Run `npm run type-check`

3. **Styling issues:**
   - Verify Tailwind CSS loaded
   - Check class names spelled correctly
   - Clear browser cache (Ctrl+Shift+Delete)

4. **Modal not scrolling:**
   - Check `max-h-[80vh]` class applied
   - Verify overflow-y-auto class present
   - Test on different screen sizes

---

## 🎓 NEXT STEPS AFTER TESTING

If all tests pass ✅:
1. Run full test suite: `npm run test`
2. Build project: `npm run build`
3. Check for build errors
4. Deploy to staging environment
5. Conduct UAT with end users (EOs)

If issues found ❌:
1. Log issues in issue tracker
2. Fix in code
3. Re-run test scenario
4. Verify fix doesn't break other tests

---

## 📞 TESTING SUPPORT

### Questions or Issues?
- Check console errors: F12 → Console tab
- Verify mock data: src/lib/mockData.ts
- Review validator logic: src/services/registrationValidator.ts
- Check component props: Component file JSDoc

### Expected Behavior Summary
- ✅ Valid data: Approved
- ❌ Invalid data: Error shown, approval blocked
- ⚠️ Warnings: Shown but allow override
- 🔒 Details: Modal shows all info
- 📊 Summary: All 5 validators visible


/**
 * Unit Tests for Registration Validator Service
 * 
 * Tests all 5 validators and utility functions
 * Target coverage: 80%+
 * 
 * @since 2026-03-16
 * @version 1.0.0
 */

import { describe, it, expect, beforeEach } from "vitest";
import { registrationValidator } from "@/services/registrationValidator";
import type {
  Registration,
  Player,
  Competition,
  CompetitionConstraints,
  ValidationResult,
} from "@/types/registration";

// ═══════════════════════════════════════════════════════════════════════════
// TEST FIXTURES & SETUP
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Create a valid test player
 */
const createTestPlayer = (overrides = {}): Player => ({
  id: "test-p1",
  clubId: "test-club",
  name: "Test Player",
  dob: "2011-03-15",
  age: 12,
  position: "ST",
  idNumber: "7371000001",
  eligibility: "Verified",
  ...overrides,
});

/**
 * Create a valid test registration
 */
const createTestRegistration = (overrides = {}): Registration => ({
  id: "test-reg",
  clubId: "test-club",
  clubName: "Test Club",
  competitionId: "test-comp",
  competitionName: "Test Competition",
  status: "Pending",
  paymentStatus: "Paid",
  registeredAt: "2024-03-15",
  fee: 500000,
  playerCount: 22,
  players: Array(22).fill(null).map((_, i) => createTestPlayer({ id: `test-p${i}`, name: `Player ${i}` })),
  competitionConstraints: {
    minRosterSize: 11,
    maxRosterSize: 25,
    ageLimit: 13,
    maxTeams: 8,
    currentRegistrations: 6,
    slotsAvailable: 2,
  },
  submittedAt: "2024-03-15T10:00:00Z",
});

/**
 * Create test context for validation
 */
const createTestContext = (overrides = {}) => ({
  registration: createTestRegistration(overrides.registration),
  competition: {
    id: "test-comp",
    eoId: "test-eo",
    name: "Test Competition",
    ageGroup: "U13",
    format: "League" as const,
    status: "Active" as const,
    startDate: "2024-04-01",
    endDate: "2024-06-30",
  },
  club: {
    id: "test-club",
    eoId: "test-eo",
    name: "Test Club",
    city: "Test City",
    status: "Verified" as const,
    registeredAt: "2024-01-01",
  },
  players: createTestRegistration().players,
  competitionConstraints: {
    minRosterSize: 11,
    maxRosterSize: 25,
    ageLimit: 13,
    maxTeams: 8,
    currentRegistrations: 6,
    slotsAvailable: 2,
  },
  ...overrides,
});

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATOR 1: ROSTER SIZE TESTS
// ═══════════════════════════════════════════════════════════════════════════

describe("RegistrationValidator - Roster Size", () => {
  it("should pass when roster size is within limits", async () => {
    const context = createTestContext({
      players: Array(15)
        .fill(null)
        .map((_, i) => createTestPlayer({ id: `p${i}` })),
      registration: createTestRegistration({ playerCount: 15 }),
      competitionConstraints: {
        minRosterSize: 11,
        maxRosterSize: 25,
        ageLimit: 13,
        maxTeams: 8,
        currentRegistrations: 6,
        slotsAvailable: 2,
      },
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.rosterSize.valid).toBe(true);
    expect(result.validations.rosterSize.errors.length).toBe(0);
  });

  it("should fail when roster size is below minimum", async () => {
    const context = createTestContext({
      players: Array(8)
        .fill(null)
        .map((_, i) => createTestPlayer({ id: `p${i}` })),
      registration: createTestRegistration({ playerCount: 8 }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.rosterSize.valid).toBe(false);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.code === "ROSTER_TOO_SMALL")).toBe(true);
  });

  it("should fail when roster size exceeds maximum", async () => {
    const context = createTestContext({
      players: Array(30)
        .fill(null)
        .map((_, i) => createTestPlayer({ id: `p${i}` })),
      registration: createTestRegistration({ playerCount: 30 }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.rosterSize.valid).toBe(false);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.code === "ROSTER_TOO_LARGE")).toBe(true);
  });

  it("should warn when roster size is close to minimum", async () => {
    const context = createTestContext({
      players: Array(12)
        .fill(null)
        .map((_, i) => createTestPlayer({ id: `p${i}` })),
      registration: createTestRegistration({ playerCount: 12 }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.rosterSize.valid).toBe(true);
    expect(result.warnings.some((w) => w.code === "ROSTER_CLOSE_TO_MINIMUM")).toBe(true);
  });

  it("should handle minimum roster size of 11", async () => {
    const context = createTestContext({
      players: Array(11)
        .fill(null)
        .map((_, i) => createTestPlayer({ id: `p${i}` })),
      registration: createTestRegistration({ playerCount: 11 }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.rosterSize.valid).toBe(true);
    expect(result.validations.rosterSize.errors.length).toBe(0);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATOR 2: PLAYER AGE TESTS
// ═══════════════════════════════════════════════════════════════════════════

describe("RegistrationValidator - Player Age", () => {
  it("should pass when all players are within age limit", async () => {
    const players = Array(5)
      .fill(null)
      .map((_, i) =>
        createTestPlayer({
          id: `p${i}`,
          age: 10 + i, // Ages 10-14
        })
      );

    const context = createTestContext({
      players,
      registration: createTestRegistration({ playerCount: 5, players }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.playerAges.valid).toBe(true);
    expect(result.validations.playerAges.errors.length).toBe(0);
  });

  it("should fail when player exceeds age limit", async () => {
    const players = [
      createTestPlayer({ id: "p1", age: 12 }),
      createTestPlayer({ id: "p2", age: 14 }), // 14 > 13 limit
      createTestPlayer({ id: "p3", age: 12 }),
    ];

    const context = createTestContext({
      players,
      registration: createTestRegistration({ playerCount: 3, players }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.playerAges.valid).toBe(false);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.code === "PLAYERS_EXCEED_AGE_LIMIT")).toBe(true);
  });

  it("should warn when player is at age limit", async () => {
    const players = Array(5)
      .fill(null)
      .map((_, i) =>
        createTestPlayer({
          id: `p${i}`,
          age: i === 0 ? 13 : 12, // One player at limit
        })
      );

    const context = createTestContext({
      players,
      registration: createTestRegistration({ playerCount: 5, players }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.playerAges.valid).toBe(true);
    expect(result.warnings.some((w) => w.code === "PLAYERS_AT_AGE_LIMIT")).toBe(true);
  });

  it("should detect multiple overage players", async () => {
    const players = [
      createTestPlayer({ id: "p1", age: 14 }),
      createTestPlayer({ id: "p2", age: 15 }),
      createTestPlayer({ id: "p3", age: 12 }),
    ];

    const context = createTestContext({
      players,
      registration: createTestRegistration({ playerCount: 3, players }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    const ageError = result.errors.find((e) => e.code === "PLAYERS_EXCEED_AGE_LIMIT");
    expect(ageError?.details?.invalidCount).toBe(2);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATOR 3: PLAYER ELIGIBILITY TESTS
// ═══════════════════════════════════════════════════════════════════════════

describe("RegistrationValidator - Player Eligibility", () => {
  it("should pass when all players are verified", async () => {
    const players = Array(5)
      .fill(null)
      .map((_, i) => createTestPlayer({ id: `p${i}`, eligibility: "Verified" }));

    const context = createTestContext({
      players,
      registration: createTestRegistration({ playerCount: 5, players }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.playerEligibility.valid).toBe(true);
    expect(result.validations.playerEligibility.errors.length).toBe(0);
  });

  it("should fail when player is suspended", async () => {
    const players = [
      createTestPlayer({ id: "p1", eligibility: "Verified" }),
      createTestPlayer({ id: "p2", eligibility: "Suspended" }),
      createTestPlayer({ id: "p3", eligibility: "Verified" }),
    ];

    const context = createTestContext({
      players,
      registration: createTestRegistration({ playerCount: 3, players }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.playerEligibility.valid).toBe(false);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.code === "SUSPENDED_PLAYERS")).toBe(true);
  });

  it("should warn when player eligibility is pending", async () => {
    const players = [
      createTestPlayer({ id: "p1", eligibility: "Verified" }),
      createTestPlayer({ id: "p2", eligibility: "Pending" }),
      createTestPlayer({ id: "p3", eligibility: "Verified" }),
    ];

    const context = createTestContext({
      players,
      registration: createTestRegistration({ playerCount: 3, players }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.playerEligibility.valid).toBe(true);
    expect(result.warnings.some((w) => w.code === "PENDING_ELIGIBILITY")).toBe(true);
  });

  it("should detect multiple suspended players", async () => {
    const players = [
      createTestPlayer({ id: "p1", eligibility: "Suspended" }),
      createTestPlayer({ id: "p2", eligibility: "Suspended" }),
      createTestPlayer({ id: "p3", eligibility: "Verified" }),
    ];

    const context = createTestContext({
      players,
      registration: createTestRegistration({ playerCount: 3, players }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    const suspendError = result.errors.find((e) => e.code === "SUSPENDED_PLAYERS");
    expect(suspendError?.details?.suspendedCount).toBe(2);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATOR 4: PAYMENT TESTS
// ═══════════════════════════════════════════════════════════════════════════

describe("RegistrationValidator - Payment", () => {
  it("should pass when payment is paid", async () => {
    const context = createTestContext({
      registration: createTestRegistration({ paymentStatus: "Paid" }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.payment.valid).toBe(true);
    expect(result.validations.payment.errors.length).toBe(0);
  });

  it("should fail when payment is unpaid", async () => {
    const context = createTestContext({
      registration: createTestRegistration({ paymentStatus: "Unpaid" }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.payment.valid).toBe(false);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.code === "PAYMENT_NOT_VERIFIED")).toBe(true);
  });

  it("should warn when payment is partial", async () => {
    const context = createTestContext({
      registration: createTestRegistration({ paymentStatus: "Partial" }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.payment.valid).toBe(true);
    expect(result.warnings.some((w) => w.code === "PARTIAL_PAYMENT")).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATOR 5: SLOT AVAILABILITY TESTS
// ═══════════════════════════════════════════════════════════════════════════

describe("RegistrationValidator - Slot Availability", () => {
  it("should pass when slots are available", async () => {
    const context = createTestContext({
      competitionConstraints: {
        minRosterSize: 11,
        maxRosterSize: 25,
        ageLimit: 13,
        maxTeams: 8,
        currentRegistrations: 6,
        slotsAvailable: 2,
      },
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.slotAvailability.valid).toBe(true);
    expect(result.validations.slotAvailability.errors.length).toBe(0);
  });

  it("should fail when no slots are available", async () => {
    const context = createTestContext({
      competitionConstraints: {
        minRosterSize: 11,
        maxRosterSize: 25,
        ageLimit: 13,
        maxTeams: 8,
        currentRegistrations: 8,
        slotsAvailable: 0,
      },
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.slotAvailability.valid).toBe(false);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.code === "NO_SLOTS_AVAILABLE")).toBe(true);
  });

  it("should warn when only 1-2 slots remaining", async () => {
    const context = createTestContext({
      competitionConstraints: {
        minRosterSize: 11,
        maxRosterSize: 25,
        ageLimit: 13,
        maxTeams: 8,
        currentRegistrations: 7,
        slotsAvailable: 1,
      },
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.slotAvailability.valid).toBe(true);
    expect(result.warnings.some((w) => w.code === "LIMITED_SLOTS")).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// COMBINED VALIDATION TESTS
// ═══════════════════════════════════════════════════════════════════════════

describe("RegistrationValidator - Combined Scenarios", () => {
  it("should pass completely valid registration", async () => {
    const context = createTestContext();
    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
    expect(registrationValidator.canAutoApprove(result)).toBe(true);
  });

  it("should fail with multiple errors", async () => {
    const players = [
      createTestPlayer({ id: "p1", age: 14, eligibility: "Suspended" }), // Over age + suspended
      createTestPlayer({ id: "p2", age: 12, eligibility: "Verified" }),
    ];

    const context = createTestContext({
      players,
      registration: createTestRegistration({
        playerCount: 2,
        players,
        paymentStatus: "Unpaid",
      }),
      competitionConstraints: {
        minRosterSize: 11,
        maxRosterSize: 25,
        ageLimit: 13,
        maxTeams: 8,
        currentRegistrations: 8,
        slotsAvailable: 0,
      },
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
    expect(registrationValidator.canAutoApprove(result)).toBe(false);
    expect(registrationValidator.canManuallyApprove(result)).toBe(false);
  });

  it("should allow manual approval with only warnings", async () => {
    const context = createTestContext({
      competitionConstraints: {
        minRosterSize: 11,
        maxRosterSize: 25,
        ageLimit: 13,
        maxTeams: 8,
        currentRegistrations: 7,
        slotsAvailable: 1, // Will trigger LIMITED_SLOTS warning
      },
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(registrationValidator.canManuallyApprove(result)).toBe(true);
    expect(registrationValidator.canAutoApprove(result)).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTION TESTS
// ═══════════════════════════════════════════════════════════════════════════

describe("RegistrationValidator - Utility Functions", () => {
  it("should generate validation report", async () => {
    const context = createTestContext();
    const result = await registrationValidator.validateRegistration("test-reg", context);
    const report = registrationValidator.generateReport(result);

    expect(report).toContain("VALIDATION REPORT");
    expect(report).toContain("ALL VALIDATIONS PASSED");
    expect(report.length).toBeGreaterThan(100);
  });

  it("should get error messages", async () => {
    const context = createTestContext({
      registration: createTestRegistration({ paymentStatus: "Unpaid" }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);
    const messages = registrationValidator.getErrorMessages(result);

    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0]).toContain("Payment");
  });

  it("should get warning messages", async () => {
    const context = createTestContext({
      competitionConstraints: {
        minRosterSize: 11,
        maxRosterSize: 25,
        ageLimit: 13,
        maxTeams: 8,
        currentRegistrations: 7,
        slotsAvailable: 1,
      },
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);
    const messages = registrationValidator.getWarningMessages(result);

    expect(messages.length).toBeGreaterThan(0);
  });

  it("should find error by code", async () => {
    const context = createTestContext({
      registration: createTestRegistration({ paymentStatus: "Unpaid" }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);
    const error = registrationValidator.getErrorByCode(result, "PAYMENT_NOT_VERIFIED");

    expect(error).toBeDefined();
    expect(error?.code).toBe("PAYMENT_NOT_VERIFIED");
  });

  it("should return undefined for non-existent error code", async () => {
    const context = createTestContext();
    const result = await registrationValidator.validateRegistration("test-reg", context);
    const error = registrationValidator.getErrorByCode(result, "NON_EXISTENT");

    expect(error).toBeUndefined();
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// EDGE CASES AND BOUNDARY TESTS
// ═══════════════════════════════════════════════════════════════════════════

describe("RegistrationValidator - Edge Cases", () => {
  it("should handle exactly minimum roster size", async () => {
    const players = Array(11)
      .fill(null)
      .map((_, i) => createTestPlayer({ id: `p${i}` }));

    const context = createTestContext({
      players,
      registration: createTestRegistration({ playerCount: 11, players }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.rosterSize.valid).toBe(true);
  });

  it("should handle exactly maximum roster size", async () => {
    const players = Array(25)
      .fill(null)
      .map((_, i) => createTestPlayer({ id: `p${i}` }));

    const context = createTestContext({
      players,
      registration: createTestRegistration({ playerCount: 25, players }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.rosterSize.valid).toBe(true);
  });

  it("should handle empty player list", async () => {
    const context = createTestContext({
      players: [],
      registration: createTestRegistration({ playerCount: 0, players: [] }),
    });

    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.rosterSize.valid).toBe(false);
    expect(result.errors.some((e) => e.code === "ROSTER_TOO_SMALL")).toBe(true);
  });

  it("should include all 5 validators in result", async () => {
    const context = createTestContext();
    const result = await registrationValidator.validateRegistration("test-reg", context);

    expect(result.validations.rosterSize).toBeDefined();
    expect(result.validations.playerAges).toBeDefined();
    expect(result.validations.playerEligibility).toBeDefined();
    expect(result.validations.payment).toBeDefined();
    expect(result.validations.slotAvailability).toBeDefined();
  });
});

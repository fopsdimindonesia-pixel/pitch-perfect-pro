/**
 * Group Allocation API
 * Handles saving and loading group allocations to/from backend
 */

export interface GroupAllocationData {
  competitionId: string;
  groups: Array<{
    id: string;
    name: string;
    clubIds: string[];
  }>;
  lockedAt?: string; // ISO timestamp when locked
  savedAt: string; // ISO timestamp
}

/**
 * Save group allocation to backend
 * Simulates API call with delay (500-1500ms)
 */
export async function saveGroupAllocation(
  competitionId: string,
  groups: Array<{ id: string; name: string; clubIds: string[] }>,
  isLocked: boolean
): Promise<{ success: boolean; data: GroupAllocationData; message: string }> {
  try {
    // Simulate network delay (500-1500ms)
    const delay = Math.random() * 1000 + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // In production, this would be:
    // const response = await fetch(`/api/competitions/${competitionId}/groups`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ groups, isLocked }),
    // });

    const data: GroupAllocationData = {
      competitionId,
      groups,
      ...(isLocked && { lockedAt: new Date().toISOString() }),
      savedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data,
      message: "Alokasi grup berhasil disimpan ke server",
    };
  } catch (error) {
    return {
      success: false,
      data: null as any,
      message: "Gagal menyimpan alokasi grup: " + (error as Error).message,
    };
  }
}

/**
 * Load group allocation from backend
 * Simulates API call with delay (500-1000ms)
 */
export async function loadGroupAllocation(
  competitionId: string
): Promise<{ success: boolean; data?: GroupAllocationData; message: string }> {
  try {
    // Simulate network delay (500-1000ms)
    const delay = Math.random() * 500 + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // In production, this would be:
    // const response = await fetch(`/api/competitions/${competitionId}/groups`);
    // const data = await response.json();

    // For now, return null to indicate no saved allocation
    return {
      success: true,
      message: "Data alokasi grup belum tersimpan",
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal memuat alokasi grup: " + (error as Error).message,
    };
  }
}

/**
 * Publish locked group allocation (finalize for fixture generation)
 */
export async function publishLockedAllocation(
  competitionId: string,
  groups: Array<{ id: string; name: string; clubIds: string[] }>
): Promise<{ success: boolean; message: string }> {
  try {
    const delay = Math.random() * 1000 + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // In production: POST /api/competitions/{id}/groups/publish
    return {
      success: true,
      message: "Alokasi grup terkunci dan siap untuk generate fixture",
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mempublikasikan alokasi grup: " + (error as Error).message,
    };
  }
}

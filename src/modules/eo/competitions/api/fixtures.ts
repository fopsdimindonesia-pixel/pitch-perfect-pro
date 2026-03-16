/**
 * Fixtures API
 * Handles saving and loading match fixtures to/from backend
 */

import { MatchData } from "../context/CompetitionContext";

export interface FixtureSaveRequest {
  competitionId: string;
  format: "league" | "knockout" | "hybrid";
  matches: MatchData[];
  venueMappings?: Record<string, string>; // { matchId: venueId }
}

export interface FixtureSaveResponse {
  success: boolean;
  competitionId: string;
  matchCount: number;
  savedAt: string;
  message: string;
}

/**
 * Save fixtures to backend
 * Simulates API call with delay (1000-2000ms due to large payload)
 */
export async function saveFixtures(
  competitionId: string,
  matches: MatchData[],
  format: "league" | "knockout" | "hybrid",
  venueMappings?: Record<string, string>
): Promise<{ success: boolean; data?: FixtureSaveResponse; message: string }> {
  try {
    // Simulate network delay (larger payload, 1000-2000ms)
    const delay = Math.random() * 1000 + 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // In production, this would be:
    // const response = await fetch(`/api/competitions/${competitionId}/fixtures`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ format, matches, venueMappings }),
    // });

    const data: FixtureSaveResponse = {
      success: true,
      competitionId,
      matchCount: matches.length,
      savedAt: new Date().toISOString(),
      message: `${matches.length} pertandingan berhasil disimpan`,
    };

    return {
      success: true,
      data,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal menyimpan fixture: " + (error as Error).message,
    };
  }
}

/**
 * Load fixtures from backend
 * Simulates API call with delay (500-1000ms)
 */
export async function loadFixtures(
  competitionId: string
): Promise<{ success: boolean; data?: MatchData[]; message: string }> {
  try {
    // Simulate network delay (500-1000ms)
    const delay = Math.random() * 500 + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // In production, this would be:
    // const response = await fetch(`/api/competitions/${competitionId}/fixtures`);
    // const data = await response.json();

    // For now, return empty array to indicate no saved fixtures
    return {
      success: true,
      data: [],
      message: "Fixture belum tersimpan untuk kompetisi ini",
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal memuat fixture: " + (error as Error).message,
    };
  }
}

/**
 * Clear all fixtures for a competition
 */
export async function clearFixtures(
  competitionId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const delay = Math.random() * 500 + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // In production: DELETE /api/competitions/{id}/fixtures
    return {
      success: true,
      message: "Semua fixture berhasil dihapus",
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal menghapus fixture: " + (error as Error).message,
    };
  }
}

/**
 * Publish fixtures (finalize for match management)
 */
export async function publishFixtures(
  competitionId: string,
  matches: MatchData[]
): Promise<{ success: boolean; message: string }> {
  try {
    const delay = Math.random() * 1000 + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // In production: POST /api/competitions/{id}/fixtures/publish
    return {
      success: true,
      message: `${matches.length} pertandingan dipublikasikan dan siap dikelola`,
    };
  } catch (error) {
    return {
      success: false,
      message: "Gagal mempublikasikan fixture: " + (error as Error).message,
    };
  }
}

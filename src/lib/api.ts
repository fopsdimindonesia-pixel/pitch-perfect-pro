/**
 * API Service Layer
 * Centralized API client with error handling and type safety
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  details?: unknown;
}

class ApiClient {
  private baseUrl: string = '/api';

  /**
   * Generic fetch wrapper with error handling
   */
  async fetch<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `HTTP ${response.status}`,
          response.status,
          errorData.details,
        );
      }

      const data: T = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error',
        500,
      );
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'DELETE',
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.fetch<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

/**
 * Type-safe API response handler
 */
export const handleApiResponse = <T>(
  response: ApiResponse<T>,
): T | never => {
  if (!response.success || !response.data) {
    throw new ApiError(
      response.error || 'Unknown error',
      response.statusCode || 500,
    );
  }
  return response.data;
};

/**
 * Format API error for UI display
 */
export const formatApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

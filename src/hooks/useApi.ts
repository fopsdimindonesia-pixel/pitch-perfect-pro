/**
 * useApi Hook
 * Custom hook for data fetching with loading, error, and caching support
 */

import { useState, useEffect, useCallback } from 'react';
import { apiClient, ApiError, formatApiError } from '@/lib/api';

export interface UseApiOptions {
  /** Auto-fetch on mount */
  autoFetch?: boolean;
  /** Cache duration in milliseconds */
  cacheTime?: number;
  /** On success callback */
  onSuccess?: <T>(data: T) => void;
  /** On error callback */
  onError?: (error: ApiError) => void;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Simple in-memory cache
const cache = new Map<string, CacheEntry<unknown>>();

export const useApi = <T = unknown>(
  endpoint: string,
  options: UseApiOptions = {},
) => {
  const { autoFetch = true, cacheTime = 0, onSuccess, onError } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Get from cache if valid
   */
  const getFromCache = useCallback((): T | null => {
    if (cacheTime <= 0) return null;

    const cached = cache.get(endpoint) as CacheEntry<T> | undefined;
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > cacheTime;
    if (isExpired) {
      cache.delete(endpoint);
      return null;
    }

    return cached.data;
  }, [endpoint, cacheTime]);

  /**
   * Fetch data
   */
  const fetch = useCallback(async () => {
    // Check cache first
    const cached = getFromCache();
    if (cached) {
      setData(cached);
      setLoading(false);
      return cached;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await apiClient.get<T>(endpoint);

      // Store in cache
      if (cacheTime > 0) {
        cache.set(endpoint, {
          data: result,
          timestamp: Date.now(),
        });
      }

      setData(result);
      onSuccess?.(result);

      return result;
    } catch (err) {
      const apiError = err instanceof ApiError ? err : new ApiError(
        formatApiError(err),
        500,
      );
      setError(apiError.message);
      onError?.(apiError);
    } finally {
      setLoading(false);
    }
  }, [endpoint, cacheTime, getFromCache, onSuccess, onError]);

  /**
   * Refetch data (bypass cache)
   */
  const refetch = useCallback(async () => {
    cache.delete(endpoint); // Clear cache
    return fetch();
  }, [endpoint, fetch]);

  /**
   * Auto-fetch on mount or endpoint change
   */
  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
  }, [autoFetch, fetch]);

  return {
    data,
    error,
    loading,
    fetch,
    refetch,
  };
};

/**
 * useMutation Hook
 * For POST, PUT, DELETE, PATCH operations
 */

export type HttpMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface UseMutationOptions {
  onSuccess?: <T>(data: T) => void;
  onError?: (error: ApiError) => void;
  clearCache?: string[]; // Endpoints to clear from cache after mutation
}

export const useMutation = <TData = unknown, TPayload = unknown>(
  method: HttpMethod,
  endpoint: string,
  options: UseMutationOptions = {},
) => {
  const { onSuccess, onError, clearCache = [] } = options;

  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Execute mutation
   */
  const mutate = useCallback(
    async (payload?: TPayload): Promise<TData | null> => {
      try {
        setLoading(true);
        setError(null);

        let result: TData;

        switch (method.toUpperCase()) {
          case 'POST':
            result = await apiClient.post<TData>(endpoint, payload);
            break;
          case 'PUT':
            result = await apiClient.put<TData>(endpoint, payload);
            break;
          case 'DELETE':
            result = await apiClient.delete<TData>(endpoint);
            break;
          case 'PATCH':
            result = await apiClient.patch<TData>(endpoint, payload);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        // Clear specified cache entries
        clearCache.forEach((key) => cache.delete(key));

        setData(result);
        onSuccess?.(result);

        return result;
      } catch (err) {
        const apiError = err instanceof ApiError ? err : new ApiError(
          formatApiError(err),
          500,
        );
        setError(apiError.message);
        onError?.(apiError);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [method, endpoint, onSuccess, onError, clearCache],
  );

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    error,
    loading,
    mutate,
    reset,
  };
};

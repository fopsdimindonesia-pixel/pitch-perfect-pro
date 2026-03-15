import { describe, it, expect, beforeEach, vi } from 'vitest';
import { apiClient, ApiError, formatApiError, handleApiResponse } from './api';

describe('API Client', () => {
  let fetchSpy: any;

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, 'fetch').mockClear();
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiClient.get('/test');
    expect(result).toEqual(mockData);
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should handle 404 errors', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Not found' }),
    });

    try {
      await apiClient.get('/notfound');
      expect.fail('Should have thrown error');
    } catch (error: any) {
      expect(error instanceof ApiError).toBe(true);
      expect(error.statusCode).toBe(404);
    }
  });

  it('should handle network errors', async () => {
    fetchSpy.mockRejectedValueOnce(new Error('Network error'));

    try {
      await apiClient.get('/test');
      expect.fail('Should have thrown error');
    } catch (error: any) {
      expect(error instanceof ApiError).toBe(true);
      expect(error.message).toContain('Network error');
    }
  });

  it('should handle malformed JSON response', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    try {
      await apiClient.get('/test');
      expect.fail('Should have thrown error');
    } catch (error: any) {
      expect(error instanceof ApiError).toBe(true);
      expect(error.statusCode).toBe(500);
    }
  });

  it('should format API errors', () => {
    const apiError = new ApiError('Test error', 400);
    const formatted = formatApiError(apiError);
    expect(formatted).toBe('Test error');
  });

  it('should handle generic errors in formatter', () => {
    const error = new Error('Generic error');
    const formatted = formatApiError(error);
    expect(formatted).toBe('Generic error');
  });
});

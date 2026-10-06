import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit, getClientIp } from '../../src/lib/rateLimit';

describe('Rate Limiter', () => {
  it('should allow requests within limit', () => {
    const key = `test-ip-${Date.now()}`;
    const r1 = checkRateLimit(key, 3, 10000);
    const r2 = checkRateLimit(key, 3, 10000);
    const r3 = checkRateLimit(key, 3, 10000);

    expect(r1.success).toBe(true);
    expect(r2.success).toBe(true);
    expect(r3.success).toBe(true);
    expect(r3.remaining).toBe(0);
  });

  it('should block requests exceeding the limit', () => {
    const key = `test-block-${Date.now()}`;
    checkRateLimit(key, 2, 10000);
    checkRateLimit(key, 2, 10000);
    const blocked = checkRateLimit(key, 2, 10000);

    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it('should extract client IP from x-forwarded-for header', () => {
    const mockReq = {
      headers: {
        get: (h) => (h === 'x-forwarded-for' ? '203.0.113.195, 70.41.3.18' : null)
      }
    };
    expect(getClientIp(mockReq)).toBe('203.0.113.195');
  });

  it('should fallback to 127.0.0.1 if no IP headers exist', () => {
    const mockReq = {
      headers: {
        get: () => null
      }
    };
    expect(getClientIp(mockReq)).toBe('127.0.0.1');
  });
});

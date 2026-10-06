/**
 * In-Memory Token Bucket / Sliding Window Rate Limiter
 * Provides IP and User-based rate limiting for Next.js Route Handlers.
 * In a multi-instance cluster, this can be swapped with Redis, but provides immediate protection out-of-the-box.
 */

const tracker = new Map();

// Periodic cleanup of expired rate limit entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of tracker.entries()) {
      if (now > record.resetTime) {
        tracker.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

/**
 * Check if a request exceeds the specified rate limit
 * @param {string} key - Identifier (e.g., IP address or userId + route)
 * @param {number} limit - Maximum allowed requests within the window
 * @param {number} windowMs - Window duration in milliseconds (default: 60s)
 * @returns {{ success: boolean, remaining: number, resetTime: number }}
 */
export function checkRateLimit(key, limit = 60, windowMs = 60 * 1000) {
  const now = Date.now();
  let record = tracker.get(key);

  if (!record || now > record.resetTime) {
    record = {
      count: 1,
      resetTime: now + windowMs,
    };
    tracker.set(key, record);
    return {
      success: true,
      remaining: limit - 1,
      resetTime: record.resetTime,
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * Extract client IP from Next.js request headers
 * @param {Request} request
 * @returns {string}
 */
export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

// src/utils/rateLimit.js
// Simple client-side rate limiting using localStorage
// For production, combine with server-side rate limiting

const RATE_LIMIT_WINDOW_MS = 60 * 1000  // 1 minute
const MAX_REQUESTS = 10                   // 10 requests per minute

/**
 * Check if the current user has exceeded the rate limit
 * @param {string} action - The action being rate-limited (e.g., 'create_wishlist')
 * @returns {boolean} true if rate limited (should block), false if OK
 */
export function isRateLimited(action = 'default') {
  try {
    const key = `wishpanda_rate_${action}`
    const raw = localStorage.getItem(key)
    const now = Date.now()

    let requests = []
    if (raw) {
      requests = JSON.parse(raw)
      // Remove requests outside the window
      requests = requests.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
    }

    if (requests.length >= MAX_REQUESTS) {
      return true // Rate limited
    }

    // Record this request
    requests.push(now)
    localStorage.setItem(key, JSON.stringify(requests))
    return false // OK
  } catch {
    return false // If localStorage fails, don't block
  }
}

/**
 * Get remaining requests in current window
 * @param {string} action
 * @returns {number}
 */
export function getRemainingRequests(action = 'default') {
  try {
    const key = `wishpanda_rate_${action}`
    const raw = localStorage.getItem(key)
    const now = Date.now()

    if (!raw) return MAX_REQUESTS

    let requests = JSON.parse(raw)
    requests = requests.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
    return Math.max(0, MAX_REQUESTS - requests.length)
  } catch {
    return MAX_REQUESTS
  }
}
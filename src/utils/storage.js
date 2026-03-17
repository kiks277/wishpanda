// src/utils/storage.js
// LocalStorage wrapper with automatic expiration

const DEFAULT_TTL_MINUTES = 30

/**
 * Save data to localStorage with an expiration timestamp
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 * @param {number} ttlMinutes - Time to live in minutes (default: 30)
 */
export function setWithExpiry(key, data, ttlMinutes = DEFAULT_TTL_MINUTES) {
  try {
    const item = {
      data,
      expiresAt: Date.now() + (ttlMinutes * 60 * 1000),
    }
    localStorage.setItem(key, JSON.stringify(item))
  } catch {
    // localStorage might not be available
  }
}

/**
 * Get data from localStorage, returning null if expired
 * Automatically cleans up expired data
 * @param {string} key - Storage key
 * @returns {any|null} The stored data, or null if expired/missing
 */
export function getWithExpiry(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null

    const item = JSON.parse(raw)

    // Check if it has the expiry format
    if (!item.expiresAt) {
      // Legacy data without expiry — return as-is
      return item
    }

    // Check if expired
    if (Date.now() > item.expiresAt) {
      // Expired — clean up and return null
      localStorage.removeItem(key)
      return null
    }

    return item.data
  } catch {
    return null
  }
}

/**
 * Remove a key from localStorage
 * @param {string} key - Storage key
 */
export function removeStorage(key) {
  try {
    localStorage.removeItem(key)
  } catch {}
}

/**
 * Clean up all expired WishPanda keys
 * Call this on app load
 */
export function cleanupExpiredStorage() {
  try {
    const keysToCheck = [
      'wishpanda_temp_session',
      'wishpanda_temp_slug',
    ]
    keysToCheck.forEach(key => {
      getWithExpiry(key) // This auto-removes if expired
    })
  } catch {}
}
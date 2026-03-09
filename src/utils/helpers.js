// src/utils/helpers.js
// Helper functions used across the app

// Generate a random short slug for public wishlist URLs
// Example output: "k7x2m9"
export function generateSlug() {
  return Math.random().toString(36).slice(2, 8)
}

// Format a date to a readable string
// Example: "Jan 15, 2025"
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
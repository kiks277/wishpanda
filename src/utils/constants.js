// src/utils/constants.js
// Central place for values we reuse across the app

export const EVENT_TYPES = [
  'Birthday',
  'Wedding',
  'Baby Shower',
  'Christmas',
  'Other',
]

export const HOBBIES = [
  { name: 'Gaming', emoji: '🎮' },
  { name: 'Books', emoji: '📚' },
  { name: 'Cooking', emoji: '🍳' },
  { name: 'Tech', emoji: '💻' },
  { name: 'Fitness', emoji: '💪' },
  { name: 'Travel', emoji: '✈️' },
]

export const FREE_PLAN_LIMITS = {
  maxGifts: 5,
  maxGenerateRefreshes: 2,
}

export const PRO_PLAN_LIMITS = {
  maxGifts: 20,
  maxGenerateRefreshes: Infinity,
}
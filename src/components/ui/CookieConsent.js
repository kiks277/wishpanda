// src/components/ui/CookieConsent.js
'use client'

import { useState, useEffect } from 'react'

const COOKIE_KEY = 'wishpanda_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,      // Always enabled
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user already made a choice
    try {
      const saved = localStorage.getItem(COOKIE_KEY)
      if (!saved) {
        // First visit — show the banner after a short delay
        const timer = setTimeout(() => setVisible(true), 1500)
        return () => clearTimeout(timer)
      } else {
        // Load saved preferences
        setPreferences(JSON.parse(saved))
      }
    } catch {
      setVisible(true)
    }
  }, [])

  function handleAcceptAll() {
    const allAccepted = { necessary: true, analytics: true, marketing: true }
    savePreferences(allAccepted)
  }

  function handleRejectNonEssential() {
    const essentialOnly = { necessary: true, analytics: false, marketing: false }
    savePreferences(essentialOnly)
  }

  function handleSavePreferences() {
    savePreferences(preferences)
  }

  function savePreferences(prefs) {
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs))
    } catch {}
    setPreferences(prefs)
    setVisible(false)
    setShowPreferences(false)

    // If analytics accepted, you would load analytics scripts here
    // Example: if (prefs.analytics) { loadGoogleAnalytics() }
    // If marketing accepted, load ad scripts
    // Example: if (prefs.marketing) { loadAdSense() }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-panda-cream
                      overflow-hidden animate-fade-in">

        {!showPreferences ? (
          // ── Main banner ──
          <div className="p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🍪</span>
              <div>
                <h3 className="font-bold text-sm text-panda-dark">We use cookies</h3>
                <p className="text-xs text-panda-mid mt-1 leading-relaxed">
                  We use cookies to improve your experience, analyze site traffic, and show
                  relevant ads. You can choose which cookies to allow.
                  See our <a href="/cookies" className="text-panda-gold font-semibold hover:underline">Cookie Policy</a>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <button onClick={handleAcceptAll}
                className="flex-1 py-2.5 rounded-full font-bold text-white text-xs
                           bg-gradient-to-r from-panda-gold to-panda-gold-dark shadow-sm">
                Accept All
              </button>
              <button onClick={handleRejectNonEssential}
                className="flex-1 py-2.5 rounded-full font-bold text-panda-dark text-xs
                           border-2 border-panda-cream hover:border-panda-gold transition-colors">
                Reject Non-Essential
              </button>
              <button onClick={() => setShowPreferences(true)}
                className="w-full py-2 text-xs font-semibold text-panda-mid hover:text-panda-dark transition-colors">
                Manage Preferences
              </button>
            </div>
          </div>
        ) : (
          // ── Preferences panel ──
          <div className="p-5">
            <h3 className="font-bold text-sm text-panda-dark mb-3">Cookie Preferences</h3>

            {/* Necessary — always on */}
            <div className="flex items-center justify-between py-3 border-b border-panda-cream">
              <div>
                <p className="font-bold text-sm text-panda-dark">Necessary</p>
                <p className="text-xs text-panda-mid">Required for the app to work (login, sessions)</p>
              </div>
              <div className="w-10 h-6 bg-panda-green rounded-full flex items-center justify-end px-0.5">
                <div className="w-5 h-5 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between py-3 border-b border-panda-cream">
              <div>
                <p className="font-bold text-sm text-panda-dark">Analytics</p>
                <p className="text-xs text-panda-mid">Help us understand how you use the app</p>
              </div>
              <button
                onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors
                           ${preferences.analytics ? 'bg-panda-green justify-end' : 'bg-gray-300 justify-start'}`}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-bold text-sm text-panda-dark">Marketing</p>
                <p className="text-xs text-panda-mid">Personalized ads from Google AdSense</p>
              </div>
              <button
                onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors
                           ${preferences.marketing ? 'bg-panda-green justify-end' : 'bg-gray-300 justify-start'}`}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={handleSavePreferences}
                className="flex-1 py-2.5 rounded-full font-bold text-white text-xs
                           bg-gradient-to-r from-panda-gold to-panda-gold-dark shadow-sm">
                Save Preferences
              </button>
              <button onClick={() => setShowPreferences(false)}
                className="px-4 py-2.5 rounded-full font-bold text-panda-mid text-xs">
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Helper: check if a cookie category was accepted
 * Use this before loading any analytics/marketing scripts
 */
export function isCookieCategoryAccepted(category) {
  try {
    const saved = localStorage.getItem(COOKIE_KEY)
    if (!saved) return false
    const prefs = JSON.parse(saved)
    return prefs[category] === true
  } catch {
    return false
  }
}
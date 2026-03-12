// src/app/try/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { EVENT_TYPES, HOBBIES, FREE_PLAN_LIMITS } from '@/utils/constants'
import { generateSuggestions } from '@/utils/giftSuggestions'
import { generateSlug } from '@/utils/helpers'
import PandaLogo from '@/components/ui/PandaLogo'
import PandaIcon from '@/components/ui/PandaIcon'
import GiftCard from '@/components/gifts/GiftCard'
import ManualGiftForm from '@/components/gifts/ManualGiftForm'

export default function TryFreePage() {
  const router = useRouter()
  const supabase = createClient()

  // Steps: 'setup' | 'gifts' | 'done'
  const [step, setStep] = useState('setup')

  // Wishlist data
  const [title, setTitle] = useState('')
  const [eventType, setEventType] = useState('')
  const [selectedHobbies, setSelectedHobbies] = useState([])

  // Gifts
  const [gifts, setGifts] = useState([])
  const [showGenerator, setShowGenerator] = useState(false)
  const [showManualForm, setShowManualForm] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [generating, setGenerating] = useState(false)
  const [genCount, setGenCount] = useState(0)

  // Result
  const [publicSlug, setPublicSlug] = useState(null)
  const [showSignupPrompt, setShowSignupPrompt] = useState(false)

  // Toast
  const [toast, setToast] = useState(null)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  function toggleHobby(name) {
    setSelectedHobbies(prev =>
      prev.includes(name) ? prev.filter(h => h !== name) : [...prev, name]
    )
  }

  // Move to gifts step
  function handleNext() {
    if (!title || !eventType) return
    setStep('gifts')
  }

  // Generate AI suggestions
  function handleGenerate() {
    if (genCount >= FREE_PLAN_LIMITS.maxGenerateRefreshes) {
      showToast('Free limit reached! Sign up for more.')
      return
    }
    setGenerating(true)
    setTimeout(() => {
      const results = generateSuggestions(eventType, selectedHobbies)
      setSuggestions(results)
      setGenCount(prev => prev + 1)
      setGenerating(false)
    }, 1200)
  }

  // Add a gift
  function handleAddGift(giftData) {
    if (gifts.length >= FREE_PLAN_LIMITS.maxGifts) {
      setShowSignupPrompt(true)
      return
    }
    const newGift = {
      id: Math.random().toString(36).slice(2, 9),
      name: giftData.name,
      price: giftData.price,
      link: giftData.link || null,
      description: giftData.description || null,
      status: 'available',
    }
    setGifts(prev => [...prev, newGift])
    showToast(`Added "${giftData.name}"!`)
  }

  // Remove a gift
  function handleRemoveGift(giftId) {
    setGifts(prev => prev.filter(g => g.id !== giftId))
    showToast('Gift removed')
  }

  // Publish the wishlist
  async function handlePublish() {
    if (gifts.length === 0) {
      showToast('Add at least one gift first!')
      return
    }

    const slug = generateSlug()
    const sessionId = Math.random().toString(36).slice(2, 15)

    // Save to temp tables
    const { data: wlData, error: wlError } = await supabase
      .from('temp_wishlists')
      .insert({
        session_id: sessionId,
        title,
        event_type: eventType,
        hobbies: selectedHobbies,
        public_slug: slug,
      })
      .select()
      .single()

    if (wlError) {
      showToast('Error creating wishlist. Please try again.')
      return
    }

    // Save gifts
    const giftsToInsert = gifts.map((g, i) => ({
      temp_wishlist_id: wlData.id,
      name: g.name,
      price: g.price,
      link: g.link,
      description: g.description,
      status: 'available',
      sort_order: i,
    }))

    await supabase.from('temp_gifts').insert(giftsToInsert)

    // Save session for later claiming
    try {
      localStorage.setItem('wishpanda_temp_session', sessionId)
      localStorage.setItem('wishpanda_temp_slug', slug)
    } catch {}

    setPublicSlug(slug)
    setStep('done')
  }

  // ─── STEP 1: SETUP ───────────────────────────
  if (step === 'setup') {
    return (
      <div className="min-h-screen bg-panda-cream">
        <div className="max-w-lg mx-auto p-5">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 text-sm text-panda-mid font-semibold
                       hover:text-panda-dark transition-colors mb-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-7 animate-fade-in">
            <div className="text-center mb-5">
              <PandaLogo size={70} />
              <h2 className="font-display font-extrabold text-xl text-panda-dark mt-2">
                Create Free Wishlist
              </h2>
              <p className="text-xs text-panda-mid mt-1">
                No account needed · Up to {FREE_PLAN_LIMITS.maxGifts} gifts
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-bold text-panda-mid mb-2">Wishlist Name</label>
              <input
                type="text"
                placeholder="My Birthday Wishlist"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                           text-panda-dark text-sm focus:border-panda-gold focus:outline-none transition-colors"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-bold text-panda-mid mb-2">Event Type</label>
              <div className="flex flex-wrap gap-2">
                {EVENT_TYPES.map((et) => (
                  <button
                    key={et}
                    onClick={() => setEventType(et)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all
                               ${eventType === et
                                 ? 'bg-panda-gold text-white border-panda-gold'
                                 : 'bg-white text-panda-dark border-gray-200 hover:border-panda-gold'}`}
                  >
                    {et}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-panda-mid mb-2">Interests & Hobbies</label>
              <div className="flex flex-wrap gap-2">
                {HOBBIES.map((hobby) => (
                  <button
                    key={hobby.name}
                    onClick={() => toggleHobby(hobby.name)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all
                               flex items-center gap-1
                               ${selectedHobbies.includes(hobby.name)
                                 ? 'bg-panda-gold text-white border-panda-gold'
                                 : 'bg-white text-panda-dark border-gray-200 hover:border-panda-gold'}`}
                  >
                    {hobby.emoji} {hobby.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!title || !eventType}
              className="w-full py-4 rounded-full font-bold text-white text-sm
                         bg-gradient-to-r from-panda-gold to-panda-gold-dark
                         shadow-md hover:shadow-lg transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next — Add Gifts 🎁
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── STEP 2: ADD GIFTS ────────────────────────
  if (step === 'gifts') {
    return (
      <div className="min-h-screen bg-panda-cream">
        <div className="max-w-xl mx-auto p-5">
          <button
            onClick={() => setStep('setup')}
            className="flex items-center gap-1 text-sm text-panda-mid font-semibold
                       hover:text-panda-dark transition-colors mb-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>

          <div className="mb-5 animate-fade-in">
            <h2 className="font-display font-extrabold text-2xl text-panda-dark">{title}</h2>
            <p className="text-sm text-panda-mid mt-1">
              {eventType} · Free mode · {gifts.length}/{FREE_PLAN_LIMITS.maxGifts} gifts
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mb-5">
            <button
              onClick={() => { setShowGenerator(!showGenerator); setShowManualForm(false) }}
              className={`flex-1 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-1.5 transition-all
                         ${showGenerator
                           ? 'bg-gradient-to-r from-panda-gold to-panda-gold-dark text-white shadow-md'
                           : 'bg-white text-panda-dark border-2 border-panda-gold hover:bg-panda-light'}`}
            >
              ✨ AI Suggest
            </button>
            <button
              onClick={() => { setShowManualForm(!showManualForm); setShowGenerator(false) }}
              className={`flex-1 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-1.5 transition-all
                         ${showManualForm
                           ? 'bg-gradient-to-r from-panda-gold to-panda-gold-dark text-white shadow-md'
                           : 'bg-white text-panda-dark border-2 border-panda-gold hover:bg-panda-light'}`}
            >
              + Add Manual
            </button>
          </div>

          {/* AI Generator */}
          {showGenerator && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-panda-gold/30 mb-5 animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm">✨ Gift Suggestions</span>
                <span className="text-xs text-panda-mid">{genCount}/{FREE_PLAN_LIMITS.maxGenerateRefreshes} refreshes</span>
              </div>
              {suggestions.length === 0 && !generating ? (
                <button onClick={handleGenerate}
                  className="w-full py-3 rounded-full font-bold text-white text-sm bg-gradient-to-r from-panda-gold to-panda-gold-dark shadow-md">
                  Generate Gift Ideas 🎁
                </button>
              ) : generating ? (
                <div className="text-center py-8">
                  <PandaLogo size={60} animate />
                  <p className="text-panda-mid text-sm mt-3">Finding perfect gifts...</p>
                </div>
              ) : (
                <>
                  {suggestions.map((sg, i) => (
                    <div key={i} className="flex items-center gap-3 py-3 animate-fade-in"
                         style={{ animationDelay: `${i * 0.1}s`, borderBottom: i < suggestions.length - 1 ? '1px solid #EAE9E1' : 'none' }}>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-panda-dark">{sg.name}</div>
                        <div className="text-xs text-panda-mid mt-0.5">{sg.description}</div>
                        <div className="text-sm font-bold text-panda-green mt-1">${sg.price}</div>
                      </div>
                      <button onClick={() => handleAddGift(sg)}
                        className="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-panda-gold hover:bg-panda-gold-dark transition-colors">
                        Add
                      </button>
                    </div>
                  ))}
                  <button onClick={handleGenerate}
                    className="w-full mt-3 py-2.5 rounded-full font-bold text-sm bg-white text-panda-dark border-2 border-panda-gold hover:bg-panda-light transition-all">
                    🔄 Refresh Suggestions
                  </button>
                </>
              )}
            </div>
          )}

          {/* Manual form */}
          {showManualForm && (
            <div className="mb-5">
              <ManualGiftForm onAdd={handleAddGift} />
            </div>
          )}

          {/* Gift list */}
          <div className="mb-5">
            <h3 className="font-bold text-base text-panda-dark mb-3">
              Gifts ({gifts.length}/{FREE_PLAN_LIMITS.maxGifts})
            </h3>
            {gifts.length === 0 ? (
              <div className="text-center py-8 text-panda-mid text-sm">
                Add gifts using AI suggestions or manually!
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {gifts.map((gift) => (
                  <GiftCard key={gift.id} gift={gift} onDelete={handleRemoveGift} />
                ))}
              </div>
            )}
          </div>

          {/* Publish button */}
          {gifts.length > 0 && (
            <button
              onClick={handlePublish}
              className="w-full py-4 rounded-full font-bold text-white text-base
                         bg-gradient-to-r from-panda-green to-panda-green-dark
                         shadow-md hover:shadow-lg transition-all mb-3"
            >
              Publish Wishlist 🚀
            </button>
          )}

          {/* Signup prompt */}
          <div className="bg-panda-gold/10 border-2 border-panda-gold/20 rounded-2xl p-4 text-center">
            <p className="text-sm text-panda-dark font-semibold">
              Want to save, edit, and create more wishlists?
            </p>
            <button
              onClick={() => router.push('/auth')}
              className="mt-2 px-6 py-2 rounded-full text-sm font-bold text-white
                         bg-gradient-to-r from-panda-gold to-panda-gold-dark"
            >
              Create an Account
            </button>
          </div>

          {/* Toast */}
          {toast && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-panda-dark text-white
                            px-7 py-3 rounded-full text-sm font-bold shadow-lg z-50 animate-fade-in">
              {toast}
            </div>
          )}

          {/* Signup limit modal */}
          {showSignupPrompt && (
            <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-5"
                 onClick={() => setShowSignupPrompt(false)}>
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center animate-fade-in"
                   onClick={(e) => e.stopPropagation()}>
                <PandaLogo size={80} />
                <h3 className="font-display font-extrabold text-xl text-panda-dark mt-4">
                  Free Limit Reached
                </h3>
                <p className="text-panda-mid text-sm mt-2">
                  Sign up to add more gifts, save your wishlists, and unlock all features!
                </p>
                <button
                  onClick={() => router.push('/auth')}
                  className="w-full mt-5 py-3 rounded-full font-bold text-white text-sm
                             bg-gradient-to-r from-panda-gold to-panda-gold-dark shadow-md">
                  Create Account
                </button>
                <button
                  onClick={() => { setShowSignupPrompt(false); router.push('/auth') }}
                  className="w-full mt-2 py-3 rounded-full font-bold text-panda-dark text-sm
                             border-2 border-panda-gold">
                  Log In
                </button>
                <button onClick={() => setShowSignupPrompt(false)}
                  className="mt-3 text-sm text-panda-mid font-semibold">
                  Maybe later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ─── STEP 3: DONE ────────────────────────────
  return (
    <div className="min-h-screen bg-panda-cream">
      <div className="max-w-lg mx-auto p-5">
        <div className="text-center animate-fade-in">
          <PandaLogo size={100} animate />
          <h2 className="font-display font-extrabold text-2xl text-panda-dark mt-4">
            Your wishlist is live! 🎉
          </h2>
          <p className="text-panda-mid text-sm mt-2">{title} · {gifts.length} gifts</p>

          {/* Share link */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-panda-cream mt-6
                          flex items-center gap-2">
            <code className="flex-1 text-sm text-panda-dark font-semibold text-left truncate">
              wishpanda.space/w/{publicSlug}
            </code>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(`https://wishpanda.space/w/${publicSlug}`)
                showToast('Link copied! 📋')
              }}
              className="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-panda-gold"
            >
              Copy
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => router.push(`/w/${publicSlug}`)}
              className="w-full py-3 rounded-full font-bold text-white text-sm
                         bg-gradient-to-r from-panda-green to-panda-green-dark shadow-md"
            >
              View Public Page
            </button>
            <button
              onClick={() => router.push('/auth')}
              className="w-full py-3 rounded-full font-bold text-panda-dark text-sm
                         bg-white border-2 border-panda-gold"
            >
              Create Account to Save & Edit
            </button>
            <button
              onClick={() => { setStep('setup'); setGifts([]); setPublicSlug(null) }}
              className="text-sm text-panda-mid font-semibold"
            >
              Create another wishlist
            </button>
          </div>
        </div>

        {toast && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-panda-dark text-white
                          px-7 py-3 rounded-full text-sm font-bold shadow-lg z-50 animate-fade-in">
            {toast}
          </div>
        )}
      </div>
    </div>
  )
}
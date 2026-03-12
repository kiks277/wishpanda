// src/app/wishlist/[id]/page.js
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { generateSuggestions } from '@/utils/giftSuggestions'
import { FREE_PLAN_LIMITS } from '@/utils/constants'
import PandaLogo from '@/components/ui/PandaLogo'
import GiftCard from '@/components/gifts/GiftCard'
import ManualGiftForm from '@/components/gifts/ManualGiftForm'
import UpgradeModal from '@/components/ui/UpgradeModal'
import AdBanner from '@/components/layout/AdBanner'
import ShareCard from '@/components/wishlist/ShareCard'
import { EVENT_TYPES } from '@/utils/constants'
import EditGiftModal from '@/components/gifts/EditGiftModal'

export default function WishlistEditPage() {
  const { id } = useParams()
  const router = useRouter()
  const supabase = createClient()
  const [showShareCard, setShowShareCard] = useState(false)

  // State
  const [wishlist, setWishlist] = useState(null)
  const [gifts, setGifts] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editEventType, setEditEventType] = useState('')
  const [editingGift, setEditingGift] = useState(null)

  // UI panels
  const [showGenerator, setShowGenerator] = useState(false)
  const [showManualForm, setShowManualForm] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)

  // Generator state
  const [suggestions, setSuggestions] = useState([])
  const [generating, setGenerating] = useState(false)
  const [genCount, setGenCount] = useState(0)

  // Toast
  const [toast, setToast] = useState(null)

  // Copy link
  const [copied, setCopied] = useState(false)

  const isPro = profile?.plan_type === 'pro'

  // Show a toast message
  function showToast(message) {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  // Load wishlist data
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }

      // Get profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile(profileData)

      // Get wishlist with gifts
      const { data: wishlistData } = await supabase
        .from('wishlists')
        .select('*')
        .eq('id', id)
        .single()
      setWishlist(wishlistData)

      // Get gifts separately so we can manage them easily
      const { data: giftsData } = await supabase
        .from('gifts')
        .select('*')
        .eq('wishlist_id', id)
        .order('created_at', { ascending: true })
      setGifts(giftsData || [])

      setLoading(false)

              // Add after setWishlist(wishlistData):
    setEditTitle(wishlistData?.title || '')
    setEditEventType(wishlistData?.event_type || '')
    }

    loadData()

  }, [id])

  //Save Function
  async function handleSaveTitle() {
  const { error } = await supabase
    .from('wishlists')
    .update({ title: editTitle, event_type: editEventType })
    .eq('id', id)

  if (!error) {
    setWishlist(prev => ({ ...prev, title: editTitle, event_type: editEventType }))
    setIsEditingTitle(false)
    showToast('Wishlist updated!')
    }
  }

  //Save for UpdatedGift

  async function handleSaveGift(updatedGift) {
  const { error } = await supabase
    .from('gifts')
    .update({
      name: updatedGift.name,
      price: updatedGift.price,
      link: updatedGift.link,
      description: updatedGift.description,
    })
    .eq('id', updatedGift.id)

  if (!error) {
    setGifts(prev => prev.map(g => g.id === updatedGift.id ? { ...g, ...updatedGift } : g))
    setEditingGift(null)
    showToast('Gift updated!')
  }
}
  // Generate AI suggestions
  function handleGenerate() {
    if (!isPro && genCount >= FREE_PLAN_LIMITS.maxGenerateRefreshes) {
      setShowUpgrade(true)
      return
    }

    setGenerating(true)
    // Simulate a short delay to feel like "AI processing"
    setTimeout(() => {
      const results = generateSuggestions(
        wishlist.event_type,
        wishlist.hobbies
      )
      setSuggestions(results)
      setGenCount(prev => prev + 1)
      setGenerating(false)
    }, 1200)
  }

  // Add a gift to the database
  async function handleAddGift(giftData) {
    if (!isPro && gifts.length >= FREE_PLAN_LIMITS.maxGifts) {
      setShowUpgrade(true)
      return
    }

    const { data, error } = await supabase
      .from('gifts')
      .insert({
        wishlist_id: id,
        name: giftData.name,
        price: giftData.price,
        link: giftData.link || null,
        description: giftData.description || null,
        status: 'available',
        sort_order: gifts.length,
      })
      .select()
      .single()

    if (error) {
      showToast('Error adding gift')
      return
    }

    // Add to local state immediately
    setGifts(prev => [...prev, data])
    showToast(`Added "${giftData.name}"!`)
  }

  // Delete a gift from the database
  async function handleDeleteGift(giftId) {
    await supabase.from('gifts').delete().eq('id', giftId)
    setGifts(prev => prev.filter(g => g.id !== giftId))
    showToast('Gift removed')
  }

  // Copy share link
  function handleCopyLink() {
    const url = `wishpanda.space/w/${wishlist.public_slug}`
    navigator.clipboard?.writeText(url).catch(() => {})
    setCopied(true)
    showToast('Link copied! 📋')
    setTimeout(() => setCopied(false), 2000)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-panda-cream flex flex-col items-center justify-center">
        <PandaLogo size={70} animate />
        <p className="text-panda-mid font-semibold mt-4">Loading wishlist...</p>
      </div>
    )
  }

  // Not found
  if (!wishlist) {
    return (
      <div className="min-h-screen bg-panda-cream flex flex-col items-center justify-center">
        <PandaLogo size={70} />
        <p className="text-panda-mid font-semibold mt-4">Wishlist not found</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 px-6 py-2 rounded-full font-bold text-white text-sm
                     bg-gradient-to-r from-panda-gold to-panda-gold-dark"
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-panda-cream">
      <div className="max-w-xl mx-auto p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-1 text-sm text-panda-mid font-semibold
                       hover:text-panda-dark transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
          
          <button
            onClick={() => setShowShareCard(true)}
             className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold
              text-white bg-panda-gold hover:bg-panda-gold-dark transition-colors"
          >
          📤 Share
          </button>
          
          <button
            onClick={() => router.push(`/w/${wishlist.public_slug}`)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold
                       text-white bg-panda-green hover:bg-panda-green-dark transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Preview
          </button>
          
        </div>

        {/* Title — editable */}
<div className="mb-5 animate-fade-in">
  {isEditingTitle ? (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-panda-gold/30">
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                   text-panda-dark text-sm font-bold focus:border-panda-gold focus:outline-none
                   transition-colors mb-3"
      />
      <div className="flex flex-wrap gap-2 mb-3">
        {EVENT_TYPES.map((et) => (
          <button key={et} onClick={() => setEditEventType(et)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all
                       ${editEventType === et
                         ? 'bg-panda-gold text-white border-panda-gold'
                         : 'bg-white text-panda-dark border-gray-200'}`}>
            {et}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={handleSaveTitle}
          className="px-5 py-2 rounded-full text-sm font-bold text-white bg-panda-gold">
          Save
        </button>
        <button onClick={() => setIsEditingTitle(false)}
          className="px-5 py-2 rounded-full text-sm font-bold text-panda-mid">
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="font-display font-extrabold text-2xl text-panda-dark">
          {wishlist.title}
        </h2>
        <p className="text-sm text-panda-mid mt-1">
          {wishlist.event_type}
          {wishlist.hobbies?.length > 0 && ` · ${wishlist.hobbies.join(', ')}`}
        </p>
      </div>
      <button onClick={() => setIsEditingTitle(true)}
        className="p-2 rounded-xl hover:bg-panda-light transition-colors text-panda-mid">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>
    </div>
  )}
</div>

        {/* Share link */}
        <div className="bg-panda-gold/10 border-2 border-panda-gold/20 rounded-2xl p-3.5
                        flex items-center gap-2.5 mb-5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8a7a" strokeWidth="2" strokeLinecap="round">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
          <code className="flex-1 text-sm text-panda-dark font-semibold">
            wishpanda.space/w/{wishlist.public_slug}
          </code>
          <button
            onClick={handleCopyLink}
            className={`px-4 py-1.5 rounded-full text-sm font-bold text-white transition-colors
                       ${copied ? 'bg-panda-green' : 'bg-panda-gold hover:bg-panda-gold-dark'}`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-5">
          <button
            onClick={() => { setShowGenerator(!showGenerator); setShowManualForm(false) }}
            className={`flex-1 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-1.5
                       transition-all
                       ${showGenerator
                         ? 'bg-gradient-to-r from-panda-gold to-panda-gold-dark text-white shadow-md'
                         : 'bg-white text-panda-dark border-2 border-panda-gold hover:bg-panda-light'}`}
          >
            ✨ AI Suggest
          </button>
          <button
            onClick={() => { setShowManualForm(!showManualForm); setShowGenerator(false) }}
            className={`flex-1 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-1.5
                       transition-all
                       ${showManualForm
                         ? 'bg-gradient-to-r from-panda-gold to-panda-gold-dark text-white shadow-md'
                         : 'bg-white text-panda-dark border-2 border-panda-gold hover:bg-panda-light'}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Manual
          </button>
        </div>

        {/* AI Generator Panel */}
        {showGenerator && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-panda-gold/30 mb-5 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-sm text-panda-dark">✨ Gift Suggestions</span>
              {!isPro && (
                <span className="text-xs text-panda-mid">
                  {genCount}/{FREE_PLAN_LIMITS.maxGenerateRefreshes} refreshes used
                </span>
              )}
            </div>

            {/* No suggestions yet */}
            {suggestions.length === 0 && !generating && (
              <button
                onClick={handleGenerate}
                className="w-full py-3 rounded-full font-bold text-white text-sm
                           bg-gradient-to-r from-panda-gold to-panda-gold-dark
                           shadow-md hover:shadow-lg transition-all"
              >
                Generate Gift Ideas 🎁
              </button>
            )}

            {/* Loading */}
            {generating && (
              <div className="text-center py-8">
                <PandaLogo size={60} animate />
                <p className="text-panda-mid text-sm mt-3">Finding perfect gifts...</p>
              </div>
            )}

            {/* Suggestions list */}
            {suggestions.length > 0 && !generating && (
              <>
                {suggestions.map((sg, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-3 animate-fade-in"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      borderBottom: i < suggestions.length - 1 ? '1px solid #EAE9E1' : 'none',
                    }}
                  >
                    <div className="flex-1">
                      <div className="font-bold text-sm text-panda-dark">{sg.name}</div>
                      <div className="text-xs text-panda-mid mt-0.5">{sg.description}</div>
                      <div className="text-sm font-bold text-panda-green mt-1">${sg.price}</div>
                    </div>
                    <button
                      onClick={() => handleAddGift(sg)}
                      className="px-4 py-1.5 rounded-full text-sm font-bold text-white
                                 bg-panda-gold hover:bg-panda-gold-dark transition-colors"
                    >
                      Add
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleGenerate}
                  className="w-full mt-3 py-2.5 rounded-full font-bold text-sm
                             bg-white text-panda-dark border-2 border-panda-gold
                             hover:bg-panda-light transition-all"
                >
                  🔄 Refresh Suggestions
                </button>
              </>
            )}
          </div>
        )}

        {/* Manual add form */}
        {showManualForm && (
          <div className="mb-5">
            <ManualGiftForm onAdd={handleAddGift} />
          </div>
        )}

        {/* Gift list */}
        <div className="mb-4">
          <h3 className="font-bold text-base text-panda-dark mb-3">
            Gifts ({gifts.length}{!isPro ? `/${FREE_PLAN_LIMITS.maxGifts}` : ''})
          </h3>

          {gifts.length === 0 ? (
            <div className="text-center py-8 text-panda-mid text-sm">
              No gifts yet. Use AI suggestions or add manually!
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {gifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onDelete={handleDeleteGift}
                   onEdit={setEditingGift}
                />

                
                
              ))}
            </div>
            
          )}
          {editingGift && (
                  <EditGiftModal
                    gift={editingGift}
                     onSave={handleSaveGift}
                   onClose={() => setEditingGift(null)}
                  />
                )}
        </div>

        

        {/* Ad banner */}
        {!isPro && <AdBanner position="bottom" />}

        {/* Toast notification */}
        {toast && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-panda-dark text-white
                          px-7 py-3 rounded-full text-sm font-bold shadow-lg z-50 animate-fade-in">
            {toast}
          </div>
        )}

        {/* Upgrade modal */}
        {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
        {showShareCard && (
          <ShareCard
            title={wishlist.title}
            eventType={wishlist.event_type}
            ownerName={profile?.display_name || profile?.email?.split('@')[0]}
            giftCount={gifts.length}
            onClose={() => setShowShareCard(false)}
          />
        )}
          
      </div>
    </div>
  )
}
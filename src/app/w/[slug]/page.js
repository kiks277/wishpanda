// src/app/w/[slug]/page.js
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import PandaLogo from '@/components/ui/PandaLogo'
import PandaIcon from '@/components/ui/PandaIcon'
import AdBanner from '@/components/layout/AdBanner'
import SurpriseMessageModal from '@/components/gifts/SurpriseMessageModal'
export default function PublicWishlistPage() {
  const { slug } = useParams()
  const supabase = createClient()

  const [wishlist, setWishlist] = useState(null)
  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [justChosen, setJustChosen] = useState(null)
  const [toast, setToast] = useState(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [pendingGiftId, setPendingGiftId] = useState(null)

  function showToast(message) {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  // Load wishlist by slug
  useEffect(() => {
    async function loadWishlist() {
      // Try regular wishlists first
      let { data: wishlistData } = await supabase
        .from('wishlists')
        .select('*')
        .eq('public_slug', slug)
        .single()

      let isTemp = false

      // If not found, try temp wishlists
      if (!wishlistData) {
        const { data: tempData } = await supabase
          .from('temp_wishlists')
          .select('*')
          .eq('public_slug', slug)
          .single()

        if (!tempData) {
          setNotFound(true)
          setLoading(false)
          return
        }

        wishlistData = tempData
        isTemp = true
      }

      setWishlist({ ...wishlistData, isTemp })

      // Load gifts from the appropriate table
      const giftsTable = isTemp ? 'temp_gifts' : 'gifts'
      const foreignKey = isTemp ? 'temp_wishlist_id' : 'wishlist_id'

      const { data: giftsData } = await supabase
        .from(giftsTable)
        .select('*')
        .eq(foreignKey, wishlistData.id)
        .order('sort_order', { ascending: true })

      setGifts(giftsData || [])
      setLoading(false)
    }

    loadWishlist()
  }, [slug])

  // Set up real-time subscription
  // When someone marks a gift as chosen, everyone sees it update live
  useEffect(() => {
    if (!wishlist) return

    const channel = supabase
      .channel('public-gifts')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'gifts',
          filter: `wishlist_id=eq.${wishlist.id}`,
        },
        (payload) => {
          // Update the gift in local state when database changes
          setGifts(prev =>
            prev.map(g => g.id === payload.new.id ? payload.new : g)
          )
        }
      )
      .subscribe()

    // Cleanup: unsubscribe when the page closes
    return () => {
      supabase.removeChannel(channel)
    }
  }, [wishlist])

  // Mark a gift as chosen
 async function handleMarkChosen(giftId) {
  const gift = gifts.find(g => g.id === giftId)
  if (gift?.status === 'chosen') return

  // Show surprise message modal first
  setPendingGiftId(giftId)
  setShowMessageModal(true)
}

async function completeMarkChosen(messageData) {
  const giftId = pendingGiftId
  setShowMessageModal(false)
  setPendingGiftId(null)

  // Update gift status
  const { error } = await supabase
    .from('gifts')
    .update({ status: 'chosen' })
    .eq('id', giftId)

  if (error) {
    showToast('Something went wrong. Please try again.')
    return
  }

  // Create selection record
  await supabase.from('gift_selections').insert({
    gift_id: giftId,
    selected_by: messageData?.name || 'Anonymous visitor',
  })

  // Save surprise message if provided
  if (messageData?.message) {
    await supabase.from('messages').insert({
      wishlist_id: wishlist.id,
      gift_id: giftId,
      name: messageData.name || 'Anonymous',
      message: messageData.message,
    })
  }

  // Create notification for wishlist owner
  const gift = gifts.find(g => g.id === giftId)
  if (wishlist.user_id) {
    await supabase.from('notifications').insert({
      user_id: wishlist.user_id,
      type: 'gift_claimed',
      message: `Someone reserved "${gift?.name}" from your wishlist "${wishlist.title}"`,
      gift_id: giftId,
      wishlist_id: wishlist.id,
    })
  }

  // Update local state
  setGifts(prev => prev.map(g => g.id === giftId ? { ...g, status: 'chosen' } : g))
  setJustChosen(giftId)
  setTimeout(() => setJustChosen(null), 1500)
  showToast('Gift marked as chosen! 🎉')
}

function handleSkipMessage() {
  completeMarkChosen({ name: 'Anonymous' })
}

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-panda-cream flex flex-col items-center justify-center">
        <PandaLogo size={80} animate />
        <p className="text-panda-mid font-semibold mt-4">Loading wishlist...</p>
      </div>
    )
  }

  // Not found state
  if (notFound) {
    return (
      <div className="min-h-screen bg-panda-cream flex flex-col items-center justify-center p-5">
        <PandaLogo size={90} />
        <h2 className="font-display font-extrabold text-xl text-panda-dark mt-4">
          Wishlist Not Found
        </h2>
        <p className="text-panda-mid text-sm mt-2 text-center">
          This link might be invalid or the wishlist may have been deleted.
        </p>
      </div>
    )
  }

  // Count stats
  const availableCount = gifts.filter(g => g.status === 'available').length
  const chosenCount = gifts.filter(g => g.status === 'chosen').length

  return (
    <div className="min-h-screen bg-panda-cream">
      <div className="max-w-lg mx-auto p-5">

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <PandaIcon size={28} />
          <span className="font-display font-extrabold text-base text-panda-dark">
            Wish<span className="text-panda-gold">Panda</span>
          </span>
        </div>

        {/* Ad banner */}
        <AdBanner position="top" />

        {/* Hero section */}
        <div className="text-center mb-7 animate-fade-in">
          <PandaLogo size={80} />
          <h1 className="font-display font-extrabold text-2xl text-panda-dark mt-3">
            {wishlist.title}
          </h1>
          <p className="text-panda-mid text-sm mt-1">
            {wishlist.event_type} · {gifts.length} gift{gifts.length !== 1 ? 's' : ''}
          </p>

          {/* Stats pills */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="text-xs font-bold text-panda-green bg-panda-green/10 px-3 py-1 rounded-full">
              {availableCount} available
            </span>
            {chosenCount > 0 && (
              <span className="text-xs font-bold text-panda-pink bg-panda-pink/10 px-3 py-1 rounded-full">
                {chosenCount} chosen
              </span>
            )}
          </div>

          {/* Instruction */}
          <p className="text-xs text-panda-gold font-semibold mt-4 bg-panda-gold/10
                        inline-block px-4 py-1.5 rounded-full">
            Tap a gift to mark it as chosen
          </p>
        </div>

        {/* Gift list */}
        {gifts.length === 0 ? (
          <div className="text-center py-10">
            <PandaLogo size={80} />
            <p className="text-panda-mid mt-3">This wishlist is empty.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {gifts.map((gift, i) => {
              const isChosen = gift.status === 'chosen'
              const wasJustChosen = justChosen === gift.id

              return (
                <div
                  key={gift.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden animate-fade-in transition-all"
                  style={{
                    animationDelay: `${i * 0.06}s`,
                    opacity: isChosen ? 0.6 : 1,
                    border: wasJustChosen
                      ? '2px solid #a8c5a0'
                      : '1px solid #EAE9E1',
                  }}
                >
                  {/* Gift info */}
                  <div className="p-4 flex gap-3.5 items-start">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                                    ${isChosen ? 'bg-panda-cream' : 'bg-panda-gold/10'}`}>
                      {isChosen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a8c5a0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D2B986" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="8" width="18" height="13" rx="2" />
                          <path d="M12 8v13" />
                          <path d="M3 13h18" />
                          <path d="M12 8c-1.5-2-4-3-4-3s1.5-2 4 0c2.5-2 4 0 4 0s-2.5 1-4 3z" fill="#D2B986" opacity="0.3" />
                        </svg>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className={`font-bold text-base
                                      ${isChosen ? 'line-through text-panda-mid' : 'text-panda-dark'}`}>
                        {gift.name}
                      </div>
                      {gift.description && (
                        <div className="text-sm text-panda-mid mt-1">{gift.description}</div>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-base font-extrabold text-panda-green">
                          ${gift.price}
                        </span>
                        {gift.link && (
                          <a
                            href={gift.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-panda-gold font-bold hover:underline
                                       flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                            </svg>
                            Shop
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action bar */}
                  <div className={`px-4 py-2.5 border-t
                                  ${isChosen ? 'bg-panda-green/5 border-panda-cream' : 'bg-panda-light border-panda-cream'}`}>
                    {isChosen ? (
                      <div className="flex items-center gap-2 text-panda-green font-bold text-sm">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a8c5a0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Already chosen by someone
                      </div>
                    ) : (
                      <button
                        onClick={() => handleMarkChosen(gift.id)}
                        className="w-full py-2.5 rounded-full font-bold text-white text-sm
                                   bg-gradient-to-r from-panda-gold to-panda-gold-dark
                                   shadow-sm hover:shadow-md transition-all"
                      >
                        🎁 Mark as Chosen
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Viral loop banner */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-panda-cream text-center mt-6 animate-fade-in">
       <div className="text-3xl mb-2">🎁</div>
        <h3 className="font-display font-extrabold text-lg text-panda-dark">
          Create your own wishlist in 10 seconds
        </h3>
        <p className="text-sm text-panda-mid mt-1">
          No sign-up required. Share with friends and avoid duplicate gifts.
         </p>
       <button
         onClick={() => window.location.href = '/try'}
         className="mt-4 px-8 py-3 rounded-full font-bold text-white text-sm
               bg-gradient-to-r from-panda-gold to-panda-gold-dark
               shadow-md hover:shadow-lg transition-all"
        >
          Create Mine 🐼
         </button>
      </div>

        {/* Footer */}
        <div className="text-center py-8 text-sm text-panda-mid">
          Made with 🐼 <span className="font-bold">WishPanda</span>
        </div>

        {/* Bottom ad */}
        <AdBanner position="bottom" />

        {showMessageModal && (
          <SurpriseMessageModal
            giftName={gifts.find(g => g.id === pendingGiftId)?.name || 'this gift'}
            onSubmit={completeMarkChosen}
           onSkip={handleSkipMessage}
          />
        )}

        {/* Toast */}
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
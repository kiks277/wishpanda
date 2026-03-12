// src/app/dashboard/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import PandaIcon from '@/components/ui/PandaIcon'
import PandaLogo from '@/components/ui/PandaLogo'
import AdBanner from '@/components/layout/AdBanner'
import NotificationBell from '@/components/ui/NotificationBell'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [wishlists, setWishlists] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const [messages, setMessages] = useState([])

  // Load user data and wishlists on page load
  useEffect(() => {
    async function loadData() {
      // Get the logged-in user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }
      setUser(user)

      // Get user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile(profileData)

      // Get all wishlists for this user, including gift counts
      const { data: wishlistData } = await supabase
        .from('wishlists')
        .select(`
          *,
          gifts (id, status)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setWishlists(wishlistData || [])
      
      // Load surprise messages for all user's wishlists
      const wishlistIds = (wishlistData || []).map(w => w.id)
        if (wishlistIds.length > 0) {
          const { data: messagesData } = await supabase
            .from('messages')
            .select('*, gifts(name)')
            .in('wishlist_id', wishlistIds)
            .order('created_at', { ascending: false })
            .limit(10)
            setMessages(messagesData || [])
        }
      setLoading(false)
    }
    loadData()
  }, [])

  // Logout function
  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  // Delete a wishlist
  async function handleDelete(wishlistId) {
    const confirmed = window.confirm('Are you sure you want to delete this wishlist?')
    if (!confirmed) return

    await supabase.from('wishlists').delete().eq('id', wishlistId)

    // Remove from local state so UI updates immediately
    setWishlists(prev => prev.filter(w => w.id !== wishlistId))
  }

  // Calculate stats
  const totalGifts = wishlists.reduce((sum, w) => sum + (w.gifts?.length || 0), 0)
  const chosenGifts = wishlists.reduce(
    (sum, w) => sum + (w.gifts?.filter(g => g.status === 'chosen').length || 0), 0
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-panda-cream flex flex-col items-center justify-center">
        <PandaLogo size={80} animate />
        <p className="text-panda-mid font-semibold mt-4">Loading your wishlists...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-panda-cream">
      <div className="max-w-xl mx-auto p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <PandaIcon size={36} />
            <h1 className="font-display font-extrabold text-xl text-panda-dark">
              Wish<span className="text-panda-gold">Panda</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Plan badge */}
            <span className={`text-xs font-extrabold uppercase tracking-wide px-3 py-1 rounded-full
              ${profile?.plan_type === 'pro'
                ? 'bg-gradient-to-r from-panda-gold to-panda-gold-dark text-white'
                : 'bg-panda-light text-panda-mid'}`}
            >
              {profile?.plan_type || 'free'}
            </span>
            <NotificationBell userId={user?.id} />

            <button
              onClick={handleLogout}
              className="text-sm text-panda-mid font-semibold hover:text-panda-dark transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Ad banner — only for free users */}
        {profile?.plan_type !== 'pro' && <AdBanner position="top" />}

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
              { label: 'Wishlists', value: wishlists.length, colorClass: 'stat-gold' },
              { label: 'Gifts Added', value: totalGifts, colorClass: 'stat-green' },
              { label: 'Gifts Chosen', value: chosenGifts, colorClass: 'stat-pink' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`bg-white rounded-2xl p-4 text-center shadow-sm
                            border-t-[3px] animate-fade-in ${stat.colorClass}`}
              >
              <div className={`text-2xl font-extrabold ${stat.colorClass}`}>
                {stat.value}
              </div>
              <div className="text-xs font-bold text-panda-mid mt-1">{stat.label}</div>
               </div>
          ))}
        </div>

        {/* Create wishlist button */}
        <button
          onClick={() => router.push('/wishlist/create')}
          className="w-full py-4 rounded-full font-bold text-white text-base
                     bg-gradient-to-r from-panda-gold to-panda-gold-dark
                     shadow-md hover:shadow-lg transition-all mb-6
                     flex items-center justify-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create New Wishlist
        </button>

        {/* Wishlists list */}
        {wishlists.length === 0 ? (
          <div className="text-center py-10 animate-fade-in">
            <PandaLogo size={90} />
            <p className="text-panda-mid font-semibold mt-4">
              No wishlists yet. Create your first one!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {wishlists.map((wl, i) => (
              <div
                key={wl.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-panda-cream
                           flex items-center justify-between cursor-pointer
                           hover:shadow-md transition-all animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => router.push(`/wishlist/${wl.id}`)}
              >
                <div>
                  <div className="font-bold text-panda-dark">{wl.title}</div>
                  <div className="text-sm text-panda-mid mt-1">
                    {wl.event_type} · {wl.gifts?.length || 0} gift{(wl.gifts?.length || 0) !== 1 ? 's' : ''}
                    {wl.gifts?.some(g => g.status === 'chosen') && (
                      <span> · {wl.gifts.filter(g => g.status === 'chosen').length} chosen</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(wl.id) }}
                  className="p-2 rounded-xl bg-red-50 text-panda-pink-dark
                             hover:bg-red-100 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M10 11v6" /><path d="M14 11v6" />
                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Surprise Messages */}
        {messages.length > 0 && (
          <div className="mt-6">
           <h3 className="font-bold text-base text-panda-dark mb-3">💌 Surprise Messages</h3>
          <div className="flex flex-col gap-2">
         {messages.map((msg) => (
           <div key={msg.id} className="bg-white rounded-2xl p-4 shadow-sm border border-panda-cream animate-fade-in">
             <div className="flex items-start justify-between">
               <div>
                <span className="font-bold text-sm text-panda-dark">{msg.name || 'Anonymous'}</span>
                <span className="text-xs text-panda-mid ml-2">for {msg.gifts?.name || 'a gift'}</span>
              </div>
              </div>
              <p className="text-sm text-panda-mid mt-1">{msg.message}</p>
            </div>
      ))}
    </div>
  </div>
)}

        {/* Bottom ad */}
        {profile?.plan_type !== 'pro' && <AdBanner position="bottom" />}
      </div>
    </div>
  )


}
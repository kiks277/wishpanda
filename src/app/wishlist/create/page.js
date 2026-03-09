// src/app/wishlist/create/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { EVENT_TYPES, HOBBIES } from '@/utils/constants'
import { generateSlug } from '@/utils/helpers'
import PandaLogo from '@/components/ui/PandaLogo'

export default function CreateWishlistPage() {
  const [title, setTitle] = useState('')
  const [eventType, setEventType] = useState('')
  const [selectedHobbies, setSelectedHobbies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  // Toggle a hobby on/off
  function toggleHobby(hobbyName) {
    setSelectedHobbies(prev =>
      prev.includes(hobbyName)
        ? prev.filter(h => h !== hobbyName)   // Remove if already selected
        : [...prev, hobbyName]                 // Add if not selected
    )
  }

  // Save the wishlist to Supabase
  async function handleCreate() {
    if (!title || !eventType) return

    setLoading(true)
    setError(null)

    try {
      // Get the current user's ID
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not logged in')

      // Insert the wishlist into the database
      const { data, error: insertError } = await supabase
        .from('wishlists')
        .insert({
          user_id: user.id,
          title: title,
          event_type: eventType,
          hobbies: selectedHobbies,
          public_slug: generateSlug(),
        })
        .select()       // Return the inserted row
        .single()       // We only inserted one row

      if (insertError) throw insertError

      // Success! Navigate to the wishlist edit page
      router.push(`/wishlist/${data.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-panda-cream">
      <div className="max-w-lg mx-auto p-5">

        {/* Back button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-1 text-sm text-panda-mid font-semibold
                     hover:text-panda-dark transition-colors mb-4"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-lg p-7 animate-fade-in">

          {/* Header */}
          <div className="text-center mb-5">
            <PandaLogo size={70} />
            <h2 className="font-display font-extrabold text-xl text-panda-dark mt-2">
              New Wishlist
            </h2>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Wishlist name */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-panda-mid mb-2">
              Wishlist Name
            </label>
            <input
              type="text"
              placeholder="My Birthday Wishlist"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                         text-panda-dark text-sm focus:border-panda-gold focus:outline-none
                         transition-colors"
            />
          </div>

          {/* Event type */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-panda-mid mb-2">
              Event Type
            </label>
            <div className="flex flex-wrap gap-2">
              {EVENT_TYPES.map((et) => (
                <button
                  key={et}
                  onClick={() => setEventType(et)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border-2
                             transition-all
                             ${eventType === et
                               ? 'bg-panda-gold text-white border-panda-gold'
                               : 'bg-white text-panda-dark border-gray-200 hover:border-panda-gold'
                             }`}
                >
                  {et}
                </button>
              ))}
            </div>
          </div>

          {/* Hobbies / Interests */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-panda-mid mb-2">
              Interests & Hobbies
            </label>
            <div className="flex flex-wrap gap-2">
              {HOBBIES.map((hobby) => (
                <button
                  key={hobby.name}
                  onClick={() => toggleHobby(hobby.name)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border-2
                             transition-all flex items-center gap-1
                             ${selectedHobbies.includes(hobby.name)
                               ? 'bg-panda-gold text-white border-panda-gold'
                               : 'bg-white text-panda-dark border-gray-200 hover:border-panda-gold'
                             }`}
                >
                  {hobby.emoji} {hobby.name}
                </button>
              ))}
            </div>
          </div>

          {/* Create button */}
          <button
            onClick={handleCreate}
            disabled={!title || !eventType || loading}
            className="w-full py-4 rounded-full font-bold text-white text-sm
                       bg-gradient-to-r from-panda-gold to-panda-gold-dark
                       shadow-md hover:shadow-lg transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Wishlist 🎉'}
          </button>
        </div>
      </div>
    </div>
  )
}
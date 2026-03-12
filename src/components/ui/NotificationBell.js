// src/components/ui/NotificationBell.js
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const supabase = createClient()

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    if (!userId) return
    loadNotifications()

    // Real-time subscription
    const channel = supabase
      .channel('notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        setNotifications(prev => [payload.new, ...prev])
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [userId])

  async function loadNotifications() {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)
    setNotifications(data || [])
  }

  async function markAllRead() {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false)
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="relative">
      <button
        onClick={() => { setShowDropdown(!showDropdown); if (!showDropdown) markAllRead() }}
        className="relative p-2 rounded-xl hover:bg-panda-light transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a8a7a" strokeWidth="2" strokeLinecap="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-panda-pink rounded-full
                           text-white text-xs font-bold flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-panda-cream
                        z-50 overflow-hidden animate-fade-in">
          <div className="p-3 border-b border-panda-cream flex items-center justify-between">
            <span className="font-bold text-sm text-panda-dark">Notifications</span>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-panda-gold font-semibold">
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-panda-mid">
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className={`p-3 border-b border-panda-cream last:border-none
                                           ${!n.read ? 'bg-panda-gold/5' : ''}`}>
                  <p className="text-sm text-panda-dark">{n.message}</p>
                  <p className="text-xs text-panda-mid mt-1">{timeAgo(n.created_at)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
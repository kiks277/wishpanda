// src/components/wishlist/ShareCard.js
'use client'

import { useRef } from 'react'

export default function ShareCard({ title, eventType, ownerName, giftCount, onClose }) {
  const cardRef = useRef(null)

  async function handleDownload() {
    // Use html2canvas approach with a canvas element
    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1920
    const ctx = canvas.getContext('2d')

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920)
    gradient.addColorStop(0, '#EAE9E1')
    gradient.addColorStop(1, '#f5f4ef')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1080, 1920)

    // Decorative circle
    ctx.beginPath()
    ctx.arc(540, 600, 200, 0, Math.PI * 2)
    ctx.fillStyle = '#D2B98620'
    ctx.fill()

    // Panda emoji (placeholder)
    ctx.font = '120px serif'
    ctx.textAlign = 'center'
    ctx.fillText('🐼', 540, 620)

    // Title
    ctx.font = 'bold 64px Quicksand, sans-serif'
    ctx.fillStyle = '#3a3a3a'
    ctx.fillText(title, 540, 820)

    // Event type
    ctx.font = '36px Nunito, sans-serif'
    ctx.fillStyle = '#8a8a7a'
    ctx.fillText(`${eventType} · ${giftCount} gifts`, 540, 890)

    // Message
    ctx.font = 'bold 42px Nunito, sans-serif'
    ctx.fillStyle = '#3a3a3a'
    const name = ownerName || 'Someone'
    ctx.fillText(`${name} created a wishlist!`, 540, 1020)

    ctx.font = '36px Nunito, sans-serif'
    ctx.fillStyle = '#8a8a7a'
    ctx.fillText('Help make their day special 🎉', 540, 1080)

    // Branding
    ctx.font = 'bold 32px Quicksand, sans-serif'
    ctx.fillStyle = '#D2B986'
    ctx.fillText('WishPanda', 540, 1700)

    ctx.font = '24px Nunito, sans-serif'
    ctx.fillStyle = '#8a8a7a'
    ctx.fillText('wishpanda.space', 540, 1750)

    // Download
    const link = document.createElement('a')
    link.download = `wishpanda-${title.toLowerCase().replace(/\s+/g, '-')}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  function handleShare(platform) {
    const url = window.location.href
    const text = `Check out my ${eventType} wishlist on WishPanda! 🎁`

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      messenger: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    }

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-5"
         onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-fade-in"
           onClick={(e) => e.stopPropagation()}>

        {/* Preview card */}
        <div ref={cardRef}
             className="bg-panda-cream rounded-2xl p-6 text-center mb-5">
          <div className="text-5xl mb-3">🐼</div>
          <h3 className="font-display font-extrabold text-lg text-panda-dark">{title}</h3>
          <p className="text-xs text-panda-mid mt-1">{eventType} · {giftCount} gifts</p>
          <p className="text-sm font-bold text-panda-dark mt-3">
            {ownerName || 'Someone'} created a wishlist!
          </p>
          <p className="text-xs text-panda-mid">Help make their day special 🎉</p>
          <p className="text-xs text-panda-gold font-bold mt-3">wishpanda.space</p>
        </div>

        {/* Share buttons */}
        <div className="flex flex-col gap-2">
          <button onClick={handleDownload}
            className="w-full py-3 rounded-full font-bold text-white text-sm
                       bg-gradient-to-r from-panda-gold to-panda-gold-dark shadow-md">
            📥 Download for Instagram Story
          </button>
          <button onClick={() => handleShare('facebook')}
            className="w-full py-3 rounded-full font-bold text-white text-sm bg-blue-600">
            📘 Share to Facebook
          </button>
          <button onClick={() => handleShare('whatsapp')}
            className="w-full py-3 rounded-full font-bold text-white text-sm bg-green-500">
            💬 Share via WhatsApp
          </button>
          <button onClick={() => handleShare('twitter')}
            className="w-full py-3 rounded-full font-bold text-white text-sm bg-black">
            Share on X
          </button>
          <button onClick={onClose}
            className="text-sm text-panda-mid font-semibold mt-1">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
// src/components/wishlist/ShareCard.js
'use client'

import { useRef } from 'react'

export default function ShareCard({ title, eventType, ownerName, giftCount, slug, onClose }) {
  const wishlistUrl = `wishpanda.space/w/${slug}`
  const fullUrl = `https://wishpanda.space/w/${slug}`

  async function handleDownload() {
    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1920
    const ctx = canvas.getContext('2d')

    // ── Background gradient ──
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920)
    gradient.addColorStop(0, '#EAE9E1')
    gradient.addColorStop(0.6, '#f5f4ef')
    gradient.addColorStop(1, '#EAE9E1')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1080, 1920)

    // ── Decorative elements ──
    // Top circle
    ctx.beginPath()
    ctx.arc(540, 500, 220, 0, Math.PI * 2)
    ctx.fillStyle = '#D2B98615'
    ctx.fill()

    // Inner circle
    ctx.beginPath()
    ctx.arc(540, 500, 140, 0, Math.PI * 2)
    ctx.fillStyle = '#D2B98620'
    ctx.fill()

    // ── Panda emoji ──
    ctx.font = '140px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('🐼', 540, 500)

    // ── Event type badge ──
    ctx.font = 'bold 28px sans-serif'
    ctx.fillStyle = '#D2B986'
    ctx.fillText(eventType.toUpperCase(), 540, 700)

    // ── Title ──
    ctx.font = 'bold 72px sans-serif'
    ctx.fillStyle = '#3a3a3a'
    // Word wrap for long titles
    const words = title.split(' ')
    let lines = []
    let currentLine = ''
    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      if (ctx.measureText(testLine).width > 900) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    })
    lines.push(currentLine)

    const titleStartY = 800
    lines.forEach((line, i) => {
      ctx.fillText(line, 540, titleStartY + (i * 85))
    })

    // ── Gift count ──
    const afterTitle = titleStartY + (lines.length * 85) + 30
    ctx.font = '36px sans-serif'
    ctx.fillStyle = '#8a8a7a'
    ctx.fillText(`${giftCount} gift${giftCount !== 1 ? 's' : ''} on the list`, 540, afterTitle)

    // ── Message ──
    ctx.font = 'bold 44px sans-serif'
    ctx.fillStyle = '#3a3a3a'
    const name = ownerName || 'Someone'
    ctx.fillText(`${name} created a wishlist!`, 540, afterTitle + 100)

    ctx.font = '36px sans-serif'
    ctx.fillStyle = '#8a8a7a'
    ctx.fillText('Help make their day special 🎉', 540, afterTitle + 160)

    // ── Dark overlay bar at the bottom for the link ──
    ctx.fillStyle = 'rgba(58, 58, 58, 0.9)'
    roundRect(ctx, 60, 1580, 960, 200, 30)
    ctx.fill()

    // ── Wishlist URL (visible in image) ──
    ctx.font = 'bold 36px sans-serif'
    ctx.fillStyle = '#D2B986'
    ctx.fillText('🔗 View Wishlist:', 540, 1650)

    ctx.font = 'bold 32px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(wishlistUrl, 540, 1710)

    // ── Branding ──
    ctx.font = 'bold 28px sans-serif'
    ctx.fillStyle = '#D2B986'
    ctx.fillText('WishPanda', 540, 1850)

    ctx.font = '22px sans-serif'
    ctx.fillStyle = '#8a8a7a'
    ctx.fillText('Create your own wishlist for free', 540, 1885)

    // ── Download ──
    const link = document.createElement('a')
    link.download = `wishpanda-${title.toLowerCase().replace(/\s+/g, '-')}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  function handleShare(platform) {
    const text = `Check out my ${eventType} wishlist on WishPanda! 🎁`
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + fullUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(fullUrl)}`,
      messenger: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(fullUrl)}&app_id=0&redirect_uri=${encodeURIComponent(fullUrl)}`,
    }
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400')
    }
  }

  function handleCopyLink() {
    navigator.clipboard?.writeText(fullUrl)
  }

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-5"
         onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-fade-in"
           onClick={(e) => e.stopPropagation()}>

        {/* Preview card */}
        <div className="bg-panda-cream rounded-2xl p-6 text-center mb-4">
          <div className="text-5xl mb-3">🐼</div>
          <h3 className="font-display font-extrabold text-lg text-panda-dark">{title}</h3>
          <p className="text-xs text-panda-mid mt-1">{eventType} · {giftCount} gifts</p>
          <p className="text-sm font-bold text-panda-dark mt-3">
            {ownerName || 'Someone'} created a wishlist!
          </p>
          <p className="text-xs text-panda-mid">Help make their day special 🎉</p>
          {/* Link visible in preview */}
          <div className="mt-3 bg-panda-dark/90 rounded-xl p-2.5">
            <p className="text-xs text-panda-gold font-bold">🔗 View Wishlist:</p>
            <p className="text-xs text-white font-semibold">{wishlistUrl}</p>
          </div>
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
          <button onClick={() => { handleCopyLink(); }}
            className="w-full py-2.5 rounded-full font-bold text-panda-dark text-sm
                       border-2 border-panda-cream hover:border-panda-gold transition-colors">
            📋 Copy Link
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

// Helper: draw rounded rectangle on canvas
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}
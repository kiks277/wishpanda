// src/components/ui/LoadingScreen.js
'use client'

import PandaLogo from './PandaLogo'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-panda-cream">
      {/* Bouncing panda */}
      <PandaLogo size={120} animate />

      {/* App name */}
      <h1 className="font-display font-extrabold text-3xl text-panda-dark mt-5 tracking-tight">
        Wish<span className="text-panda-gold">Panda</span>
      </h1>

      {/* Loading message */}
      <p className="text-panda-mid text-sm font-semibold mt-2">
        Preparing your wishlist...
      </p>

      {/* Animated dots */}
      <div className="flex gap-2 mt-5">
        <div className="w-2.5 h-2.5 rounded-full bg-panda-gold animate-dot-1"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-panda-gold animate-dot-2"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-panda-gold animate-dot-3"></div>
      </div>
    </div>
  )
}
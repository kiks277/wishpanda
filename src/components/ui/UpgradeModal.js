// src/components/ui/UpgradeModal.js
'use client'

import PandaLogo from './PandaLogo'

export default function UpgradeModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <PandaLogo size={80} />

        <h3 className="font-display font-extrabold text-xl text-panda-dark mt-4">
          Free Limit Reached
        </h3>
        <p className="text-panda-mid text-sm mt-2 leading-relaxed">
          You've reached your free limit. Upgrade to WishPanda Pro
          for more gifts and unlimited AI suggestions!
        </p>

        {/* Features list */}
        <div className="bg-panda-gold/8 border-2 border-panda-gold/20 rounded-2xl p-4 mt-5 text-left">
          {[
            'Up to 20 gifts per wishlist',
            'Unlimited AI suggestions',
            'Priority generation',
            'No ads',
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 text-sm text-panda-dark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a8c5a0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {feature}
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-3 rounded-full font-bold text-white text-sm
                     bg-gradient-to-r from-panda-gold to-panda-gold-dark
                     shadow-md hover:shadow-lg transition-all
                     flex items-center justify-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#D2B986" stroke="#b89a5e" strokeWidth="1.5">
            <path d="M2 20h20L19 8l-5 5-2-7-2 7-5-5z" />
          </svg>
          Upgrade to Pro — $4.99/mo
        </button>

        <button
          onClick={onClose}
          className="mt-2 text-sm text-panda-mid font-semibold hover:text-panda-dark transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}
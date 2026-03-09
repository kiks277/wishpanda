// src/components/layout/LegalPageLayout.js
// Shared layout wrapper for all legal/policy pages

import Link from 'next/link'
import PandaIcon from '@/components/ui/PandaIcon'

export default function LegalPageLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-panda-cream">
      <div className="max-w-2xl mx-auto px-5 py-10">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-panda-mid font-semibold
                       hover:text-panda-dark transition-colors mb-6"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to WishPanda
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <PandaIcon size={32} />
            <span className="font-display font-extrabold text-base text-panda-dark">
              Wish<span className="text-panda-gold">Panda</span>
            </span>
          </div>

          <h1 className="font-display font-extrabold text-3xl text-panda-dark">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-panda-mid mt-2">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-panda-cream p-8">
          <div className="legal-content">
            {children}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-8 text-center text-sm text-panda-mid">
          <Link href="/privacy" className="hover:text-panda-gold transition-colors mx-2">Privacy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-panda-gold transition-colors mx-2">Terms</Link>
          <span>·</span>
          <Link href="/cookies" className="hover:text-panda-gold transition-colors mx-2">Cookies</Link>
          <span>·</span>
          <Link href="/data-policy" className="hover:text-panda-gold transition-colors mx-2">Data</Link>
          <span>·</span>
          <Link href="/refund-policy" className="hover:text-panda-gold transition-colors mx-2">Refund</Link>
          <span>·</span>
          <Link href="/contact" className="hover:text-panda-gold transition-colors mx-2">Contact</Link>
        </div>
      </div>
    </div>
  )
}
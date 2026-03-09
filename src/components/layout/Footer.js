// src/components/layout/Footer.js
import Link from 'next/link'

const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Data Policy', href: '/data-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-white/60 border-t border-panda-cream mt-auto">
      <div className="max-w-2xl mx-auto px-5 py-6">
        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-panda-mid hover:text-panda-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-panda-mid">
          © 2026 Wish<span className="text-panda-gold font-bold">Panda</span>. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
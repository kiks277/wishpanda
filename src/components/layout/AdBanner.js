// src/components/layout/AdBanner.js
// Placeholder for Google AdSense ads — only shown to free users

export default function AdBanner({ position = 'top' }) {
  return (
    <div
      className={`bg-panda-cream border border-dashed border-panda-gold/30 rounded-xl
                  py-3 px-5 text-center text-xs font-semibold text-panda-mid tracking-wide
                  ${position === 'top' ? 'mb-4' : 'mt-4'}`}
      style={{
        background: 'repeating-linear-gradient(45deg, #EAE9E1, #EAE9E1 10px, #e4e3db 10px, #e4e3db 20px)',
      }}
    >
      AD SPACE — GOOGLE ADSENSE
    </div>
  )
}
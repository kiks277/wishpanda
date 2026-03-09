// src/components/ui/PandaLogo.js
// The panda mascot SVG — used in headers and empty states

export default function PandaLogo({ size = 60, animate = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={animate ? 'animate-panda-bounce' : ''}
    >
      {/* Ears */}
      <circle cx="30" cy="25" r="18" fill="#3a3a3a" />
      <circle cx="90" cy="25" r="18" fill="#3a3a3a" />
      <circle cx="30" cy="25" r="10" fill="#e8b4b8" opacity="0.5" />
      <circle cx="90" cy="25" r="10" fill="#e8b4b8" opacity="0.5" />
      {/* Head */}
      <ellipse cx="60" cy="60" rx="42" ry="40" fill="#fff" />
      {/* Eye patches */}
      <ellipse cx="42" cy="52" rx="14" ry="12" fill="#3a3a3a" transform="rotate(-8 42 52)" />
      <ellipse cx="78" cy="52" rx="14" ry="12" fill="#3a3a3a" transform="rotate(8 78 52)" />
      {/* Eyes */}
      <circle cx="42" cy="52" r="5" fill="#fff" />
      <circle cx="78" cy="52" r="5" fill="#fff" />
      <circle cx="44" cy="52" r="2.5" fill="#3a3a3a" />
      <circle cx="80" cy="52" r="2.5" fill="#3a3a3a" />
      {/* Eye shine */}
      <circle cx="45" cy="50" r="1.2" fill="#fff" />
      <circle cx="81" cy="50" r="1.2" fill="#fff" />
      {/* Nose */}
      <ellipse cx="60" cy="68" rx="5" ry="3.5" fill="#3a3a3a" />
      {/* Mouth */}
      <path d="M52 74 Q60 82 68 74" stroke="#3a3a3a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="32" cy="68" r="6" fill="#e8b4b8" opacity="0.35" />
      <circle cx="88" cy="68" r="6" fill="#e8b4b8" opacity="0.35" />
    </svg>
  )
}
// src/components/ui/PandaIcon.js
// Small panda icon for the header/navbar

export default function PandaIcon({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx="10" cy="8" r="6" fill="#3a3a3a" />
      <circle cx="30" cy="8" r="6" fill="#3a3a3a" />
      <ellipse cx="20" cy="22" rx="15" ry="14" fill="#fff" stroke="#e0ddd4" strokeWidth="1" />
      <ellipse cx="14" cy="19" rx="5" ry="4" fill="#3a3a3a" />
      <ellipse cx="26" cy="19" rx="5" ry="4" fill="#3a3a3a" />
      <circle cx="14" cy="19" r="2" fill="#fff" />
      <circle cx="26" cy="19" r="2" fill="#fff" />
      <ellipse cx="20" cy="25" rx="2.5" ry="1.5" fill="#3a3a3a" />
      <path d="M16 28 Q20 32 24 28" stroke="#3a3a3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}
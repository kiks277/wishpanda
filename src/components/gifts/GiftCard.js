// src/components/gifts/GiftCard.js
'use client'

export default function GiftCard({ gift, onDelete, onEdit, showDelete = true }) {
  const isChosen = gift.status === 'chosen'

  return (
    <div
      className={`bg-white rounded-2xl p-4 shadow-sm border border-panda-cream
                  flex items-center gap-3 animate-fade-in transition-all
                  ${isChosen ? 'opacity-55' : ''}`}
    >
      {/* Icon */}
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                       ${isChosen ? 'bg-panda-cream' : 'bg-panda-gold/10'}`}>
        {isChosen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a8c5a0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D2B986" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="13" rx="2" />
            <path d="M12 8v13" />
            <path d="M3 13h18" />
            <path d="M12 8c-1.5-2-4-3-4-3s1.5-2 4 0c2.5-2 4 0 4 0s-2.5 1-4 3z" fill="#D2B986" opacity="0.3" />
          </svg>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className={`font-bold text-sm ${isChosen ? 'line-through text-panda-mid' : 'text-panda-dark'}`}>
          {gift.name}
        </div>
        {gift.description && (
          <div className="text-xs text-panda-mid mt-0.5 truncate">{gift.description}</div>
        )}
        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm font-bold text-panda-green">${gift.price}</span>
          {gift.link && gift.link !== '#' && (
            <a
              href={gift.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-panda-gold font-bold hover:underline flex items-center gap-1"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
              Shop
            </a>
          )}
        </div>
      </div>

      {/* Edit button */}
      {onEdit && (
        <button
          onClick={() => onEdit(gift)}
          className="p-2 rounded-xl text-panda-mid hover:bg-panda-light transition-colors flex-shrink-0"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      )}

      {/* Delete button */}
      {showDelete && (
        <button
          onClick={() => onDelete(gift.id)}
          className="p-2 rounded-xl text-panda-pink-dark hover:bg-red-50 transition-colors flex-shrink-0"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6" /><path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </button>
      )}
    </div>
  )
}


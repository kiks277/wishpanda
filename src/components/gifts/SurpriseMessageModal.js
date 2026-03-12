// src/components/gifts/SurpriseMessageModal.js
'use client'

import { useState } from 'react'

export default function SurpriseMessageModal({ giftName, onSubmit, onSkip }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit() {
    onSubmit({ name: name || 'Anonymous', message })
  }

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-fade-in">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">💌</div>
          <h3 className="font-display font-extrabold text-lg text-panda-dark">
            Leave a surprise message!
          </h3>
          <p className="text-sm text-panda-mid mt-1">
            For the person receiving <strong>{giftName}</strong>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-xs font-bold text-panda-mid mb-1">Your Name (optional)</label>
            <input
              type="text"
              placeholder="Secret Santa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                         text-panda-dark text-sm focus:border-panda-gold focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-panda-mid mb-1">Message</label>
            <textarea
              placeholder="Can't wait to see your face when you open this! 🎉"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                         text-panda-dark text-sm focus:border-panda-gold focus:outline-none
                         transition-colors resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!message}
          className="w-full mt-4 py-3 rounded-full font-bold text-white text-sm
                     bg-gradient-to-r from-panda-gold to-panda-gold-dark shadow-md
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send Message 💌
        </button>
        <button onClick={onSkip}
          className="w-full mt-2 text-sm text-panda-mid font-semibold text-center">
          Skip
        </button>
      </div>
    </div>
  )
}
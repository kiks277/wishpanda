// src/components/gifts/ManualGiftForm.js
'use client'

import { useState } from 'react'

export default function ManualGiftForm({ onAdd }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit() {
    if (!name || !price) return

    onAdd({
      name,
      price: parseFloat(price),
      link: link || null,
      description: description || null,
    })

    // Clear the form
    setName('')
    setPrice('')
    setLink('')
    setDescription('')
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-panda-green/30 animate-fade-in">
      <span className="font-bold text-sm text-panda-dark block mb-3">
        Add Gift Manually
      </span>

      <div className="flex flex-col gap-2.5">
        <input
          type="text"
          placeholder="Gift name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                     text-panda-dark text-sm focus:border-panda-gold focus:outline-none
                     transition-colors"
        />

        <div className="grid grid-cols-2 gap-2.5">
          <input
            type="number"
            placeholder="Price *"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                       text-panda-dark text-sm focus:border-panda-gold focus:outline-none
                       transition-colors"
          />
          <input
            type="text"
            placeholder="Store link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                       text-panda-dark text-sm focus:border-panda-gold focus:outline-none
                       transition-colors"
          />
        </div>

        <input
          type="text"
          placeholder="Short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                     text-panda-dark text-sm focus:border-panda-gold focus:outline-none
                     transition-colors"
        />

        <button
          onClick={handleSubmit}
          disabled={!name || !price}
          className="w-full py-3 rounded-full font-bold text-white text-sm
                     bg-gradient-to-r from-panda-gold to-panda-gold-dark
                     shadow-md hover:shadow-lg transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Gift 🎁
        </button>
      </div>
    </div>
  )
}
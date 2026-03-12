// src/components/gifts/EditGiftModal.js
'use client'

import { useState } from 'react'

export default function EditGiftModal({ gift, onSave, onClose }) {
  const [name, setName] = useState(gift.name)
  const [price, setPrice] = useState(gift.price?.toString() || '')
  const [link, setLink] = useState(gift.link || '')
  const [description, setDescription] = useState(gift.description || '')

  function handleSave() {
    if (!name || !price) return
    onSave({
      ...gift,
      name,
      price: parseFloat(price),
      link: link || null,
      description: description || null,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-5"
         onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-fade-in"
           onClick={(e) => e.stopPropagation()}>
        <h3 className="font-display font-extrabold text-lg text-panda-dark mb-4">Edit Gift</h3>

        <div className="flex flex-col gap-3">
          <input type="text" placeholder="Gift name" value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                       text-panda-dark text-sm focus:border-panda-gold focus:outline-none transition-colors" />
          <div className="grid grid-cols-2 gap-3">
            <input type="number" placeholder="Price" value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                         text-panda-dark text-sm focus:border-panda-gold focus:outline-none transition-colors" />
            <input type="text" placeholder="Store link" value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                         text-panda-dark text-sm focus:border-panda-gold focus:outline-none transition-colors" />
          </div>
          <input type="text" placeholder="Description" value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                       text-panda-dark text-sm focus:border-panda-gold focus:outline-none transition-colors" />
        </div>

        <div className="flex gap-2 mt-4">
          <button onClick={handleSave} disabled={!name || !price}
            className="flex-1 py-3 rounded-full font-bold text-white text-sm
                       bg-gradient-to-r from-panda-gold to-panda-gold-dark shadow-md
                       disabled:opacity-50">
            Save Changes
          </button>
          <button onClick={onClose}
            className="px-5 py-3 rounded-full font-bold text-panda-mid text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
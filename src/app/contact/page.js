// src/app/contact/page.js
'use client'

import { useState } from 'react'
import LegalPageLayout from '@/components/layout/LegalPageLayout'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    // In production, you would send this to an API endpoint or email service
    // For now, we'll just show a success message
    console.log('Contact form:', { name, email, message })
    setSubmitted(true)
  }

  return (
    <LegalPageLayout title="Contact Us">

      <h2>Get in Touch</h2>
      <p>
        Have a question, feedback, or need help? We'd love to hear from you.
        Reach out using any of the methods below.
      </p>

      <h2>Email Support</h2>
      <p>
        For general inquiries, account issues, or support requests, email us at:
      </p>
      <p>
        <a href="mailto:support@wishpanda.space">
          <strong>support@wishpanda.space</strong>
        </a>
      </p>
      <p>
        We typically respond within 1–2 business days.
      </p>

      <h2>Contact Form</h2>

      {submitted ? (
        <div className="bg-panda-green/10 border-2 border-panda-green/30 rounded-2xl p-6 text-center">
          <p className="text-panda-dark font-bold text-base">Thank you! 🐼</p>
          <p className="text-panda-mid text-sm mt-1">
            We've received your message and will get back to you soon.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-2">
          <div>
            <label className="block text-xs font-bold text-panda-mid mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Panda McPandaface"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                         text-panda-dark text-sm focus:border-panda-gold focus:outline-none
                         transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-panda-mid mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="panda@email.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                         text-panda-dark text-sm focus:border-panda-gold focus:outline-none
                         transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-panda-mid mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you?"
              rows={5}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                         text-panda-dark text-sm focus:border-panda-gold focus:outline-none
                         transition-colors resize-none"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!name || !email || !message}
            className="w-full py-3 rounded-full font-bold text-white text-sm
                       bg-gradient-to-r from-panda-gold to-panda-gold-dark
                       shadow-md hover:shadow-lg transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Message 🐼
          </button>
        </div>
      )}

      <h2>Other Ways to Reach Us</h2>
      <ul>
        <li><strong>Bug reports:</strong> Email us with "Bug Report" in the subject line</li>
        <li><strong>Feature requests:</strong> We'd love to hear your ideas — email us anytime</li>
        <li><strong>Account deletion:</strong> Email us with "Delete Account" in the subject line</li>
        <li><strong>Data requests:</strong> Email us with "Data Export" in the subject line</li>
      </ul>

    </LegalPageLayout>
  )
}
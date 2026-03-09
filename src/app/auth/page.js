// src/app/auth/page.js
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  // Handle email/password login or signup
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        // LOGIN
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        // SIGNUP
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
      }

      // Success — redirect to dashboard
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle Google login
  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-panda-cream flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center animate-fade-in">

        {/* Panda Icon */}
        <div className="mb-4">
          <svg width="50" height="50" viewBox="0 0 40 40" className="mx-auto">
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
        </div>

        {/* Title */}
        <h1 className="font-display font-extrabold text-2xl text-panda-dark">
          {isLogin ? 'Welcome back!' : 'Join WishPanda'}
        </h1>
        <p className="text-panda-mid text-sm mt-1">
          {isLogin ? 'Log in to manage your wishlists' : 'Create an account to get started'}
        </p>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="mt-6 text-left">
          <label className="block text-xs font-bold text-panda-mid mb-1">Email</label>
          <input
            type="email"
            placeholder="panda@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                       text-panda-dark text-sm focus:border-panda-gold focus:outline-none
                       transition-colors"
          />
        </div>

        <div className="mt-4 text-left">
          <label className="block text-xs font-bold text-panda-mid mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-panda-light
                       text-panda-dark text-sm focus:border-panda-gold focus:outline-none
                       transition-colors"
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          className="w-full mt-6 py-3 rounded-full font-bold text-white text-sm
                     bg-gradient-to-r from-panda-gold to-panda-gold-dark
                     shadow-md hover:shadow-lg transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Please wait...' : isLogin ? 'Log In 🐼' : 'Sign Up 🐼'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-panda-mid font-semibold">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google login button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-full font-bold text-panda-dark text-sm
                     bg-white border-2 border-panda-gold
                     hover:bg-panda-light transition-all
                     flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Toggle login/signup */}
        <p className="mt-6 text-sm text-panda-mid">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => { setIsLogin(!isLogin); setError(null) }}
            className="text-panda-gold font-bold cursor-pointer hover:underline"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
        </p>
      </div>
    </div>
  )
}
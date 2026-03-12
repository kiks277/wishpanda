// src/app/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import LoadingScreen from '@/components/ui/LoadingScreen'
import OnboardingScreen from '@/components/ui/OnboardingScreen'
import PandaLogo from '@/components/ui/PandaLogo'
import PandaIcon from '@/components/ui/PandaIcon'

export default function Home() {
  const [screen, setScreen] = useState('loading')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const timer = setTimeout(() => {
      checkNextScreen()
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  async function checkNextScreen() {
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      router.push('/dashboard')
      return
    }

    let hasSeenOnboarding = false
    try {
      hasSeenOnboarding = localStorage.getItem('wishpanda_onboarding_done') === 'true'
    } catch {}

    if (hasSeenOnboarding) {
      setScreen('landing')
    } else {
      setScreen('onboarding')
    }
  }

  function handleOnboardingFinish() {
    try {
      localStorage.setItem('wishpanda_onboarding_done', 'true')
    } catch {}
    setScreen('landing')
  }

  if (screen === 'loading') return <LoadingScreen />
  if (screen === 'onboarding') return <OnboardingScreen onFinish={handleOnboardingFinish} />

  // Landing page
  return (
    <div className="min-h-screen bg-panda-cream">
      <div className="max-w-lg mx-auto px-5 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <PandaIcon size={36} />
            <span className="font-display font-extrabold text-xl text-panda-dark">
              Wish<span className="text-panda-gold">Panda</span>
            </span>
          </div>
          <button
            onClick={() => router.push('/auth')}
            className="px-5 py-2 rounded-full text-sm font-bold text-panda-gold
                       border-2 border-panda-gold hover:bg-panda-gold hover:text-white
                       transition-all"
          >
            Log In
          </button>
        </div>

        {/* Hero */}
        <div className="text-center mb-10 animate-fade-in">
          <PandaLogo size={110} animate />
          <h1 className="font-display font-extrabold text-3xl text-panda-dark mt-6 leading-tight">
            Create your dream<br />
            <span className="text-panda-gold">gift wishlist</span>
          </h1>
          <p className="text-panda-mid text-base mt-3 leading-relaxed">
            Share a link with friends and family. They pick gifts,
            you avoid duplicates. No sign-up required to start!
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 mb-10">
          <button
            onClick={() => router.push('/try')}
            className="w-full py-4 rounded-full font-bold text-white text-base
                       bg-gradient-to-r from-panda-gold to-panda-gold-dark
                       shadow-lg hover:shadow-xl transition-all
                       flex items-center justify-center gap-2"
          >
            🎁 Create Free Wishlist
          </button>
          <button
            onClick={() => router.push('/auth')}
            className="w-full py-3 rounded-full font-bold text-panda-dark text-sm
                       bg-white border-2 border-panda-cream
                       hover:border-panda-gold transition-all"
          >
            I already have an account
          </button>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-4">
          {[
            { emoji: '✨', title: 'AI Gift Suggestions', desc: 'Get personalized gift ideas based on hobbies and interests' },
            { emoji: '🔗', title: 'Shareable Link', desc: 'Generate a public link anyone can view — no app needed' },
            { emoji: '🎯', title: 'No Duplicates', desc: 'When someone picks a gift, others can see it\'s taken' },
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-panda-cream
                                    flex items-start gap-3 animate-fade-in"
                 style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="text-2xl">{feature.emoji}</span>
              <div>
                <div className="font-bold text-sm text-panda-dark">{feature.title}</div>
                <div className="text-xs text-panda-mid mt-0.5">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
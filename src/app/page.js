// src/app/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import LoadingScreen from '@/components/ui/LoadingScreen'
import OnboardingScreen from '@/components/ui/OnboardingScreen'

export default function Home() {
  const [screen, setScreen] = useState('loading')  // 'loading' | 'onboarding' | 'redirecting'
  const router = useRouter()
  const supabase = createClient()

  // Step 1: Show loading screen, then decide what's next
  useEffect(() => {
    const timer = setTimeout(() => {
      checkNextScreen()
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  async function checkNextScreen() {
    // Check if user is already logged in
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // Already logged in — skip everything, go to dashboard
      router.push('/dashboard')
      return
    }

    // Check if user has seen onboarding before
    let hasSeenOnboarding = false
    try {
      hasSeenOnboarding = localStorage.getItem('wishpanda_onboarding_done') === 'true'
    } catch {
      // localStorage might not be available
    }

    if (hasSeenOnboarding) {
      // Already seen onboarding — go straight to auth
      router.push('/auth')
    } else {
      // First time — show onboarding
      setScreen('onboarding')
    }
  }

  function handleOnboardingFinish() {
    // Remember that onboarding is done
    try {
      localStorage.setItem('wishpanda_onboarding_done', 'true')
    } catch {
      // Ignore if localStorage is not available
    }

    // Go to auth page
    setScreen('redirecting')
    router.push('/auth')
  }

  // Render the current screen
  if (screen === 'loading' || screen === 'redirecting') {
    return <LoadingScreen />
  }

  if (screen === 'onboarding') {
    return <OnboardingScreen onFinish={handleOnboardingFinish} />
  }

  return <LoadingScreen />
}
// src/components/ui/OnboardingScreen.js
'use client'

import { useState } from 'react'
import PandaLogo from './PandaLogo'

const slides = [
  {
    title: 'Create your dream wishlist',
    description: 'Add gifts you would love to receive for any occasion — birthdays, weddings, holidays, and more.',
    mood: 'happy',
  },
  {
    title: 'Share with friends',
    description: 'Generate a unique public link anyone can view — no account needed for your friends and family.',
    mood: 'excited',
  },
  {
    title: 'No more duplicate gifts!',
    description: 'When someone selects a gift, it becomes unavailable to others. Everyone sees updates in real time.',
    mood: 'happy',
  },
]

export default function OnboardingScreen({ onFinish }) {
  const [currentStep, setCurrentStep] = useState(0)

  const slide = slides[currentStep]
  const isLastStep = currentStep === slides.length - 1

  function handleNext() {
    if (isLastStep) {
      onFinish()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  function handleSkip() {
    onFinish()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-panda-cream p-6">

      {/* Slide content — key forces re-render for animation */}
      <div key={currentStep} className="text-center max-w-sm animate-fade-in">
        {/* Panda illustration */}
        <PandaLogo size={110} animate />

        {/* Title */}
        <h2 className="font-display font-extrabold text-2xl text-panda-dark mt-6 leading-tight">
          {slide.title}
        </h2>

        {/* Description */}
        <p className="text-panda-mid text-sm mt-3 leading-relaxed">
          {slide.description}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {slides.map((_, i) => (
          <div
            key={i}
            className="h-2.5 rounded-full transition-all duration-300"
            style={{
              width: i === currentStep ? 28 : 10,
              backgroundColor: i === currentStep ? '#D2B986' : '#d9d6cd',
            }}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-8">
        {!isLastStep && (
          <button
            onClick={handleSkip}
            className="px-4 py-2 text-sm font-semibold text-panda-mid
                       hover:text-panda-dark transition-colors"
          >
            Skip
          </button>
        )}
        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-full font-bold text-white text-sm
                     bg-gradient-to-r from-panda-gold to-panda-gold-dark
                     shadow-md hover:shadow-lg transition-all"
        >
          {isLastStep ? 'Get Started 🐼' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
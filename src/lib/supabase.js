// src/lib/supabase.js
// This file creates two Supabase clients:
// 1. A browser client (for components that run in the browser)
// 2. A server client (for server components and API routes)

import { createBrowserClient } from '@supabase/ssr'

// Browser client — use this in client components ('use client')
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
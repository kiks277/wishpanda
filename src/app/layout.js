// src/app/layout.js
import './globals.css'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'WishPanda — Create & Share Gift Wishlists',
  description: 'Create shareable gift wishlists for birthdays, weddings, and holidays. Your friends can view and mark gifts as chosen.',
  keywords: ['wishlist', 'gift list', 'birthday', 'wedding', 'gift registry'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body antialiased min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
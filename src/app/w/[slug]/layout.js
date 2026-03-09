// src/app/w/[slug]/layout.js
// This adds metadata for SEO and social media previews

export const metadata = {
  title: 'WishPanda — Gift Wishlist',
  description: 'Check out this gift wishlist and mark gifts as chosen!',
  openGraph: {
    title: 'WishPanda — Gift Wishlist',
    description: 'Check out this gift wishlist and mark gifts as chosen!',
    type: 'website',
  },
}

export default function PublicWishlistLayout({ children }) {
  return <>{children}</>
}
// src/components/ui/TempDisclaimer.js
// Shows a warning that temporary wishlists expire after 7 days

export default function TempDisclaimer() {
  return (
    <div className="bg-panda-gold/10 border-2 border-panda-gold/25 rounded-2xl p-3.5
                    flex items-start gap-2.5 text-sm">
      <span className="text-base flex-shrink-0 mt-0.5">⏳</span>
      <div>
        <p className="font-bold text-panda-dark text-sm">Temporary Wishlist</p>
        <p className="text-panda-mid text-xs mt-0.5">
          This wishlist link is available for <strong>7 days only</strong>.
          Create an account to save it permanently.
        </p>
      </div>
    </div>
  )
}
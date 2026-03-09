// src/app/data-policy/page.js
import LegalPageLayout from '@/components/layout/LegalPageLayout'

export const metadata = {
  title: 'Data Policy — WishPanda',
  description: 'Learn what data WishPanda stores and how you can manage or delete it.',
}

export default function DataPolicyPage() {
  return (
    <LegalPageLayout title="Data Policy" lastUpdated="March 10, 2026">

      <h2>What Data We Store</h2>
      <p>WishPanda stores the following user data in our database:</p>
      <ul>
        <li><strong>Account data:</strong> Your email address, display name, and account type (free or pro)</li>
        <li><strong>Wishlist data:</strong> Titles, event types, hobbies/interests, and public share slugs for each wishlist you create</li>
        <li><strong>Gift data:</strong> Gift names, prices, store links, descriptions, images, and status (available or chosen) for each gift in your wishlists</li>
        <li><strong>Selection data:</strong> When a visitor marks a gift as chosen, we record which gift was selected and the timestamp</li>
        <li><strong>Authentication data:</strong> Encrypted password hash and session tokens managed by Supabase Auth</li>
      </ul>
      <p>
        We do <strong>not</strong> store payment card numbers directly. All payment processing
        is handled by our payment provider.
      </p>

      <h2>Where Data Is Stored</h2>
      <p>
        Your data is stored on Supabase's cloud infrastructure. Our database is hosted
        in a secure data center with encryption at rest and in transit. Access to the
        database is restricted through Row Level Security policies, ensuring that users
        can only access their own data.
      </p>

      <h2>How Long Data Is Retained</h2>
      <ul>
        <li><strong>Active accounts:</strong> Data is retained for as long as your account remains active</li>
        <li><strong>Deleted accounts:</strong> All personal data is permanently removed within 30 days of account deletion</li>
        <li><strong>Public wishlists:</strong> When a wishlist is deleted, it is immediately removed and the share link stops working</li>
        <li><strong>Anonymized analytics:</strong> Aggregated, non-identifiable usage data may be retained indefinitely for service improvement</li>
      </ul>

      <h2>How to Request Data Deletion</h2>
      <p>You can delete your data in several ways:</p>
      <ul>
        <li><strong>Delete individual wishlists:</strong> Use the trash icon on the dashboard to remove specific wishlists and all their associated gifts</li>
        <li><strong>Delete individual gifts:</strong> Use the trash icon on the wishlist edit page to remove specific gifts</li>
        <li><strong>Delete your account:</strong> Contact us at <a href="mailto:support@wishpanda.space">support@wishpanda.space</a> to request full account deletion</li>
      </ul>

      <h2>How Account Deletion Works</h2>
      <p>When you request account deletion:</p>
      <ul>
        <li>Your profile, all wishlists, all gifts, and all selection records are permanently deleted</li>
        <li>Public share links immediately stop working</li>
        <li>Your authentication data is removed from Supabase Auth</li>
        <li>This action is irreversible — we cannot recover deleted data</li>
        <li>The deletion process is completed within 30 days</li>
      </ul>

      <h2>Data Export</h2>
      <p>
        You have the right to request a copy of your data. Contact us
        at <a href="mailto:support@wishpanda.space">support@wishpanda.space</a> and we
        will provide an export of your account data, wishlists, and gifts in a standard format
        within 10 business days.
      </p>

      <h2>Contact Us</h2>
      <p>
        For any questions about your data or to make a data-related request,
        contact us at <a href="mailto:support@wishpanda.space">support@wishpanda.space</a>.
      </p>

    </LegalPageLayout>
  )
}
// src/app/privacy/page.js
import LegalPageLayout from '@/components/layout/LegalPageLayout'

export const metadata = {
  title: 'Privacy Policy — WishPanda',
  description: 'Learn how WishPanda collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="March 10, 2026">

      <h2>Introduction</h2>
      <p>
        Welcome to WishPanda. We are committed to protecting your privacy and ensuring your
        personal information is handled responsibly. This Privacy Policy explains how we collect,
        use, store, and protect your data when you use our service.
      </p>
      <p>
        By using WishPanda, you agree to the practices described in this policy. If you do not
        agree, please do not use the service.
      </p>

      <h2>Information We Collect</h2>
      <p>We collect the following types of information:</p>
      <ul>
        <li><strong>Account information:</strong> Email address and password when you create an account.</li>
        <li><strong>Profile information:</strong> Display name and account preferences.</li>
        <li><strong>Wishlist data:</strong> Wishlist titles, event types, hobbies, and gift details you add to your wishlists.</li>
        <li><strong>Usage data:</strong> How you interact with the app, pages visited, and features used.</li>
        <li><strong>Device information:</strong> Browser type, operating system, and device identifiers.</li>
        <li><strong>Google account data:</strong> If you sign in with Google, we receive your name and email from your Google profile.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Create and manage your account</li>
        <li>Store and display your wishlists and gifts</li>
        <li>Generate shareable public links for your wishlists</li>
        <li>Process gift selections from visitors</li>
        <li>Improve and optimize the app experience</li>
        <li>Send important service updates and notifications</li>
        <li>Display relevant advertisements to free-tier users</li>
      </ul>

      <h2>Cookies and Tracking</h2>
      <p>
        WishPanda uses cookies and similar technologies to maintain your login session,
        remember your preferences, and analyze how the service is used. For more details,
        please see our <a href="/cookies">Cookie Policy</a>.
      </p>

      <h2>Third-Party Services</h2>
      <p>We use the following third-party services to operate WishPanda:</p>
      <ul>
        <li><strong>Supabase:</strong> Provides authentication and database services. Your account data and wishlist information are stored securely on Supabase servers.</li>
        <li><strong>Vercel:</strong> Hosts and serves the WishPanda application. Vercel may collect access logs including IP addresses.</li>
        <li><strong>Google AdSense:</strong> Displays advertisements to free-tier users. Google may use cookies to serve personalized ads based on your browsing history.</li>
        <li><strong>Google OAuth:</strong> If you choose to sign in with Google, authentication is handled through Google's OAuth service.</li>
      </ul>
      <p>
        Each of these services has its own privacy policy. We encourage you to review them.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your data. All data
        is transmitted over encrypted HTTPS connections. Database access is protected by
        Row Level Security policies ensuring users can only access their own data.
        However, no method of transmission over the internet is 100% secure, and we cannot
        guarantee absolute security.
      </p>

      <h2>Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your account and associated data</li>
        <li>Export your wishlist data</li>
        <li>Opt out of personalized advertising</li>
        <li>Withdraw consent for data processing at any time</li>
      </ul>
      <p>
        To exercise any of these rights, please contact us at the email address listed below.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain your data for as long as your account is active. If you delete your account,
        your personal data and wishlists will be permanently removed within 30 days. Some
        anonymized usage data may be retained for analytics purposes.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        WishPanda is not intended for children under the age of 13. We do not knowingly
        collect personal information from children. If you believe a child has provided us
        with personal data, please contact us immediately.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of significant
        changes by posting a notice on the app or sending you an email. Continued use of
        WishPanda after changes constitutes acceptance of the updated policy.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or our data practices,
        please contact us at <a href="mailto:support@wishpanda.space">support@wishpanda.space</a> or
        visit our <a href="/contact">Contact page</a>.
      </p>

    </LegalPageLayout>
  )
}
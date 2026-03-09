
// src/app/cookies/page.js
import LegalPageLayout from '@/components/layout/LegalPageLayout'

export const metadata = {
  title: 'Cookie Policy — WishPanda',
  description: 'Learn how WishPanda uses cookies and similar technologies.',
}

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="March 10, 2026">

      <h2>What Are Cookies</h2>
      <p>
        Cookies are small text files that are stored on your device when you visit a website.
        They are widely used to make websites work efficiently, provide a better user experience,
        and give website owners useful information.
      </p>

      <h2>How WishPanda Uses Cookies</h2>
      <p>We use cookies for the following purposes:</p>
      <ul>
        <li><strong>Authentication cookies:</strong> These keep you logged in as you navigate between pages. Without these, you would need to log in on every page. These are essential for the app to function.</li>
        <li><strong>Preference cookies:</strong> These remember your settings and choices, such as whether you have completed the onboarding flow. This prevents you from seeing the onboarding screens every time you visit.</li>
        <li><strong>Session cookies:</strong> These are temporary cookies that are deleted when you close your browser. They help maintain your session state.</li>
      </ul>

      <h2>Analytics Cookies</h2>
      <p>
        We may use analytics cookies to understand how visitors interact with WishPanda. This
        data helps us improve the app experience. Analytics data is collected in aggregate
        and does not identify individual users. We may use services such as Vercel Analytics
        for this purpose.
      </p>

      <h2>Advertising Cookies</h2>
      <p>
        For free-tier users, WishPanda displays advertisements through Google AdSense.
        Google may set cookies on your device to serve personalized ads based on your
        browsing history and interests. You can opt out of personalized advertising by
        visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google's Ad Settings</a>.
      </p>

      <h2>Third-Party Cookies</h2>
      <p>
        Some cookies on WishPanda are set by third-party services we use:
      </p>
      <ul>
        <li><strong>Supabase:</strong> Sets authentication cookies to manage your login session securely.</li>
        <li><strong>Google:</strong> May set cookies for OAuth authentication and ad personalization.</li>
        <li><strong>Vercel:</strong> May set cookies for performance monitoring and analytics.</li>
      </ul>

      <h2>Managing Cookies</h2>
      <p>
        You can control and manage cookies through your browser settings. Most browsers allow you to:
      </p>
      <ul>
        <li>View what cookies are stored on your device</li>
        <li>Delete all or specific cookies</li>
        <li>Block cookies from all or specific websites</li>
        <li>Set preferences for first-party vs third-party cookies</li>
      </ul>
      <p>
        Please note that blocking essential cookies (like authentication cookies) will prevent
        you from logging in to WishPanda. You can still view public wishlist pages without cookies.
      </p>
      <p>
        For more information about managing cookies, visit your browser's help documentation
        or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">allaboutcookies.org</a>.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in technology
        or legal requirements. Any updates will be posted on this page with a revised date.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about our use of cookies, contact us
        at <a href="mailto:support@wishpanda.space">support@wishpanda.space</a>.
      </p>

    </LegalPageLayout>
  )
}
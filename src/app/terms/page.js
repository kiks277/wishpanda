// src/app/terms/page.js
import LegalPageLayout from '@/components/layout/LegalPageLayout'

export const metadata = {
  title: 'Terms of Service — WishPanda',
  description: 'Read the terms and conditions for using WishPanda.',
}

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="March 10, 2026">

      <h2>Acceptance of Terms</h2>
      <p>
        By accessing or using WishPanda, you agree to be bound by these Terms of Service.
        If you do not agree to these terms, you may not use the service. These terms apply
        to all visitors, users, and others who access or use WishPanda.
      </p>

      <h2>User Accounts</h2>
      <p>
        To use certain features of WishPanda, you must create an account. You are responsible for:
      </p>
      <ul>
        <li>Providing accurate and complete registration information</li>
        <li>Maintaining the security of your password</li>
        <li>All activities that occur under your account</li>
        <li>Notifying us immediately of any unauthorized use</li>
      </ul>
      <p>
        You must be at least 13 years old to create an account. By creating an account,
        you represent that you meet this age requirement.
      </p>

      <h2>Acceptable Use</h2>
      <p>You agree not to use WishPanda to:</p>
      <ul>
        <li>Violate any applicable laws or regulations</li>
        <li>Post false, misleading, or fraudulent content</li>
        <li>Harass, abuse, or harm other users</li>
        <li>Attempt to gain unauthorized access to other accounts</li>
        <li>Interfere with or disrupt the service or servers</li>
        <li>Use the service for any commercial purpose beyond its intended use</li>
        <li>Upload malicious code, viruses, or harmful data</li>
        <li>Scrape or collect data from the service without permission</li>
      </ul>

      <h2>User Content</h2>
      <p>
        You retain ownership of any content you create on WishPanda, including wishlists,
        gift descriptions, and other user-generated content. By posting content, you grant
        WishPanda a non-exclusive, royalty-free license to display and distribute your content
        as necessary to provide the service (for example, showing your wishlist on the public
        share page).
      </p>
      <p>
        You are solely responsible for the content you create. WishPanda does not endorse
        or verify user content.
      </p>

      <h2>Service Availability</h2>
      <p>
        WishPanda is provided on an "as is" and "as available" basis. We strive to maintain
        high availability but do not guarantee uninterrupted or error-free operation. We
        reserve the right to modify, suspend, or discontinue any part of the service at
        any time with or without notice.
      </p>

      <h2>Free and Paid Plans</h2>
      <p>
        WishPanda offers both free and paid subscription plans. Free plans are subject to
        limitations on the number of gifts and AI generation refreshes. Paid plans offer
        expanded features as described on the app. Pricing and features are subject to change
        with reasonable notice.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, WishPanda and its operators shall not be
        liable for any indirect, incidental, special, consequential, or punitive damages,
        including but not limited to loss of data, profits, or goodwill, arising from your
        use of or inability to use the service.
      </p>
      <p>
        WishPanda is not responsible for the quality, safety, or legality of gifts listed
        by users, or for any transactions that occur between users and third-party retailers.
      </p>

      <h2>Account Termination</h2>
      <p>
        We reserve the right to suspend or terminate your account at any time if you violate
        these terms or engage in activity that is harmful to the service or other users. You
        may also delete your account at any time through the app settings or by contacting support.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We may revise these Terms of Service from time to time. Material changes will be
        communicated through the app or via email. Your continued use of WishPanda after
        such changes constitutes your acceptance of the new terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms shall be governed by and construed in accordance with applicable laws,
        without regard to conflict of law provisions.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about these Terms of Service, please contact us
        at <a href="mailto:support@wishpanda.space">support@wishpanda.space</a> or
        visit our <a href="/contact">Contact page</a>.
      </p>

    </LegalPageLayout>
  )
}
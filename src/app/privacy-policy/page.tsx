export const metadata = {
  title: "Privacy Policy | StayGenie",
  description: "Learn how StayGenie collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main
  className="
    mx-auto max-w-4xl px-6 py-24
    prose max-w-none
    prose-neutral
    [&_*]:text-black
  "
>


      <h1>Privacy Policy</h1>
      <p><strong>StayGenie is a product of KayKay Tech LLC.</strong></p>

      <h2>1. Information We Collect</h2>
      <p>
        We may collect, store, and process the following categories of information,
        as well as other information that may be collected in the future in connection
        with new features, services, integrations, business operations, or legal requirements.
      </p>
      <ul>
        <li><strong>Account Information:</strong> Email address, encrypted password, profile preferences.</li>
        <li><strong>Search Data:</strong> Text and voice queries, destinations, dates, preferences.</li>
        <li><strong>Usage Data:</strong> App interactions, features used, session duration.</li>
        <li><strong>Travel & Booking Data:</strong> Destinations, price ranges, referral activity.</li>
        <li><strong>Device Information:</strong> Device type, OS, identifiers, IP address.</li>
        <li><strong>Location Data:</strong> Approximate location based on IP (with permission).</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>Provide and improve AI-powered services</li>
        <li>Personalize recommendations</li>
        <li>Train and enhance AI models</li>
        <li>Process bookings and referrals</li>
        <li>Security and fraud prevention</li>
        <li>Legal compliance</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>We do not sell personal data.</p>
      <ul>
        <li>Hotel partners for booking fulfillment</li>
        <li>Service providers (analytics, payments, infrastructure)</li>
        <li>Affiliate partners (anonymized data)</li>
        <li>Legal authorities when required</li>
      </ul>

      <h2>4. AI and Machine Learning</h2>
      <p>Your interactions may be used to train and improve our models.</p>

      <h2>5. Data Retention</h2>
      <p>Account data is retained while your account remains active.</p>

      <h2>6. Children’s Privacy</h2>
      <p>StayGenie is not intended for users under 18.</p>

      <h2>7. Cookies and Tracking</h2>
      <p>We use cookies and similar technologies to improve experience and analytics.</p>

      <h2>8. International Users</h2>
      <p>Your data may be processed in the United States.</p>

      <h2>9. Changes</h2>
      <p>This policy may be updated periodically.</p>

      <h2>10. Your Rights</h2>
      <ul>
        <li>Request access or correction</li>
        <li>Request deletion</li>
        <li>Opt out of marketing</li>
      </ul>

      <h2>11. Contact</h2>
      <p>Email: <a href="mailto:support@staygenie.app">support@staygenie.com</a></p>
    </main>
  );
}

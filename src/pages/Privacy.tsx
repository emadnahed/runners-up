import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose max-w-none">
          <p className="mb-4">
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform and services ("Services"). Please read this policy carefully to understand our practices regarding your information.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            1. Information We Collect
          </h2>
          <p className="mb-4">We collect several types of information from and about users of our Services, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Account Information:</strong> Name, email, username, password, and profile information</li>
            <li><strong>Educational Records:</strong> Course enrollments, progress, assignments, grades, and certifications</li>
            <li><strong>Payment Information:</strong> Billing details for course purchases (handled securely by our payment processors)</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage statistics</li>
            <li><strong>Communications:</strong> Messages, forum posts, and other content you submit</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our educational services</li>
            <li>Process enrollments and manage your learning experience</li>
            <li>Communicate about courses, updates, and important notices</li>
            <li>Monitor and evaluate student performance and engagement</li>
            <li>Ensure platform security and prevent fraud</li>
            <li>Comply with legal obligations and educational requirements</li>
            <li>Conduct research and analysis to enhance our offerings</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            3. Information Sharing and Disclosure
          </h2>
          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Instructors:</strong> To facilitate course delivery and provide feedback</li>
            <li><strong>Educational Institutions:</strong> For accredited programs and certifications</li>
            <li><strong>Service Providers:</strong> Companies that provide services on our behalf (e.g., payment processing, hosting)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            4. Data Security and Retention
          </h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We retain your information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            5. Children's Privacy
          </h2>
          <p className="mb-4">
            Our Services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we learn we have collected such information, we will take steps to delete it promptly.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            6. Your Rights and Choices
          </h2>
          <p className="mb-4">You may have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access and receive a copy of your personal data</li>
            <li>Update or correct inaccuracies in your information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent where applicable</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p className="mb-4">
            Paymadi Technologies LLP
            <br />
            Email: privacy@paymadi.com
            <br />
            Phone: +91 99000 77752
            <br />
            Mailing Address: 21ST STAGE, 4TH BLOCK, HBR LAYOUT,<br />
            Kalyananagar, Bangalore North,<br />
            Bangalore - 560043, Karnataka
          </p>
          <p className="text-sm text-muted-foreground mt-8">
            Last updated: May 27, 2025
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Privacy;

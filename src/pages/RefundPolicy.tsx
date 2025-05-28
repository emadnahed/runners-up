import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold mb-8">Refunds and Cancellation Policy</h1>

        <div className="prose max-w-none">
          <p className="mb-4">
            At Runners Up, we strive to provide high-quality educational content and ensure your complete satisfaction. This Refund and Cancellation Policy outlines the terms and conditions for requesting refunds and cancellations for our courses and services.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            1. Refund Policy
          </h2>
          <p className="mb-4">
            We offer a 1-day refund policy from the date of purchase. If you are not satisfied with your course purchase, you may request a full refund within this period, provided you have not accessed more than 20% of the course content.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            2. How to Request a Refund
          </h2>
          <p className="mb-4">
            To request a refund, please contact our support team at support@runnersup.com with your order details and reason for the refund. Refund requests must include your full name, email address, and order number. We will process your request within 3-5 business days.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            3. Non-Refundable Items
          </h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Courses accessed beyond 20% of the content</li>
            <li>Downloadable course materials</li>
            <li>Certificates of completion</li>
            <li>Bundled courses if any course in the bundle has been accessed</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            4. Processing Time
          </h2>
          <p className="mb-4">
            Approved refunds will be processed within 7-10 business days. The time it takes for the refund to reflect in your account may vary depending on your payment method and financial institution.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            5. Course Cancellation
          </h2>
          <p className="mb-4">
            Runners Up reserves the right to cancel any course due to insufficient enrollment or unforeseen circumstances. In such cases, enrolled students will be notified and offered the option to transfer to another course or receive a full refund.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            6. Subscription Cancellation
          </h2>
          <p className="mb-4">
            For subscription-based services, you may cancel your subscription at any time. The cancellation will be effective at the end of the current billing cycle, and you will retain access to the service until that date. No partial refunds will be provided for the unused portion of the subscription period.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            7. Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions about our Refund and Cancellation Policy, please contact us at:
          </p>
          <p className="mb-4">
            Email: hello@paymadi.com<br />
            Phone: +91 99000 77752<br />
          </p>
          <p className="text-sm text-gray-500 mt-8">
            Last updated: May 28, 2025
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default RefundPolicy;

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>

        <div className="prose max-w-none">
          <p className="mb-4">
            Welcome to our Educational Portal. These Terms and Conditions ("Terms") govern your access to and use of our online learning platform, including all courses, content, and services (collectively, the "Services") provided by our educational institution.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our Services. These Terms apply to all learners, instructors, and other users of the platform.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            2. User Accounts
          </h2>
          <p className="mb-4">
            To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating an account and keep it updated.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Course Enrollment and Access</h2>
          <p className="mb-4">
            When you enroll in a course, you receive a limited, non-exclusive, non-transferable license to view the course content for personal, non-commercial, educational purposes. Course materials are protected by copyright and other intellectual property laws.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            4. Academic Integrity
          </h2>
          <p className="mb-4">
            You agree to complete all coursework with academic integrity. This means submitting only your own work, properly citing sources, and not engaging in any form of cheating or plagiarism. Violations may result in course failure or account termination.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">
            5. Payment and Refunds
          </h2>
          <p className="mb-4">
            Course fees are due at the time of enrollment. We offer a 1-day refund policy from the date of purchase. To request a refund, please contact our support team. Once the refund period has passed, all sales are final.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">
            6. User Conduct
          </h2>
          <p className="mb-4">
            You agree not to: share your login credentials, upload inappropriate content, harass other users, disrupt the learning environment, or use the Services for any illegal purpose. We reserve the right to terminate accounts that violate these terms.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            7. Limitation of Liability
          </h2>
          <p className="mb-4">
            Our Services are provided "as is" without warranties of any kind. We do not guarantee that the Services will be uninterrupted or error-free. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">
            8. Modifications to Terms
          </h2>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. We will provide notice of material changes through our Services or via email. Your continued use of the Services after such modifications constitutes acceptance of the new Terms.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            Contact Information
          </h2>
          <p className="mb-4">
            If you have any questions about these Terms and Conditions, please contact us:
          </p>
          <p className="mb-4">
            Paymadi Technologies LLP
            <br />
            Email: support@paymadi.com
            <br />
            Phone: +91 9876543210
          </p>
          <p className="text-sm text-muted-foreground mt-8">
            Last updated: May 27, 2025
          </p>
        </div>
      </div>      
    </div>
  );
};

export default Terms;

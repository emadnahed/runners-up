import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">About Us</h1>

          <div className="prose max-w-none">
            <p className="mb-6">
              Paymadi Technologies LLP, operating under the brand
              name Edu-Madi, is a leading provider of the quality education in
              India. We are dedicated to bringing you the finest selection of
              courses, faculties, and the digital infrastructure that delivers exceptional
              quality and user experience.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="mb-6">
              At Edu-Madi, our mission is to make quality education accessible
              to everyone. We believe that quality education should not be a luxury,
              but an essential tool for enhancing daily life.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                <strong>Quality:</strong> We carefully curate our courses
                selection to ensure only the best courses reach our
                customers.
              </li>
              <li className="mb-2">
                <strong>Innovation:</strong> We stay at the forefront of education
                to bring you the latest and most innovative courses.
              </li>
              <li className="mb-2">
                <strong>Customer Service:</strong> We are committed to providing
                exceptional customer service and support throughout your
                education journey.
              </li>
              <li className="mb-2">
                <strong>Integrity:</strong> We maintain transparency in our
                operations and pricing to build long lasting relationships with our
                customers.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              Contact Information
            </h2>
            <p className="mb-2">
              
              <br />
              Building No./Flat No.: No 37/1
              Road/Street: 1st Main Road M M Layout
              Locality/Sub Locality: Kavalbysandra
              City/Town/Village: Bengaluru
              District: Bengaluru Urban
              State: Karnataka
              PIN Code: 560032
            </p>
            <p className="mb-2">
              {/* Email: contact@ethora.com
              <br /> */}
              Phone: +919900077752
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;

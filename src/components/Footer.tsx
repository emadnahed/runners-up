import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-gray-50 border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Edu-Madi
              </span>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Paymadi Technologies LLP
            </p>
            <p className="text-sm text-gray-500">
              Your trusted destination for quality education
            </p>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/refundpolicy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out">
                  Refunds and Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <span className="font-medium text-gray-700 w-16">Phone:</span>
                <a href="tel:++919900077752" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out">
                  +91 99000 77752
                </a>
              </div>
              <div className="flex items-start">
                <span className="font-medium text-gray-700 w-16">Address:</span>
                <address className="not-italic">
                  Building No./Flat No.: No 37/1<br />
                  Road/Street: 1st Main Road M M Layout<br />
                  Locality/Sub Locality: Kavalbysandra<br />
                  City/Town/Village: Bengaluru<br />
                  District: Bengaluru Urban<br />
                  State: Karnataka<br />
                  PIN Code: 560032
                </address>
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-500 transition-colors duration-200 ease-in-out"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-500 transition-colors duration-200 ease-in-out"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-pink-500 transition-colors duration-200 ease-in-out"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} Paymadi Technologies LLP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="md:w-1/4">
            <h3 className="text-3xl font-semibold text-orange-500 mb-4">
              Vik's
            </h3>
            <p className="text-gray-400 mt-4">
              Our commitment to excellence extends beyond our products; we're dedicated to providing a seamless shopping experience and unparalleled customer service
            </p>
          </div>
          <div className="md:w-1/4 mt-6 md:mt-0">
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <ul className="mt-4">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-400 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="md:w-1/4 mt-6 md:mt-0">
            <h4 className="text-xl font-semibold">Social Media</h4>
            <ul className="mt-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaFacebook className="mr-2 inline" /> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaTwitter className="mr-2 inline" /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaInstagram className="mr-2 inline" /> Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="md:w-1/4 mt-6 md:mt-0">
            <h4 className="text-xl font-semibold">Contact</h4>
            <address className="mt-4">
              <p>
                <FaEnvelope className="mr-2 inline" /> Email: info@example.com
              </p>
              <p>
                <FaPhone className="mr-2 inline" /> Phone: +1 (123) 456-7890
              </p>
            </address>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4">
            Subscribe to Our Newsletter
          </h4>
          <form>
            <div className="flex items-center md:w-3/4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 rounded-l bg-gray-100"
              />
              <button
                type="submit"
                className="bg-orange-500 text-black px-4 py-2 rounded-r hover:bg-orange-500"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Copyright Information */}
        <div className="mt-8 text-center text-gray-400">
          &copy; 2023 Vik's. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;

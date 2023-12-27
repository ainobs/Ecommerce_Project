// ForgotPassword.tsx

import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    // Handle the logic for sending reset password instructions
    // This could involve making an API call to your server

    // For demonstration purposes, just show a success message
    setSuccessMessage(`Password reset instructions sent to ${email}`);
    setError('');
    setEmail('');
  };

  return (
    <div
      className="flex relative h-screen items-center justify-center bg-opacity-20"
      style={{
        backgroundImage: 'url("/images/forgot.jpg")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Link
        to="/"
        className="absolute top-8 left-8 text-2xl font-bold text-orange-500"
      >
        Logo
      </Link>
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm mb-2">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-2">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className={`border-2 ${
                  error ? 'border-red-500' : 'border-gray-300'
                } rounded-md pl-8 py-2 w-full focus:outline-none focus:border-orange-500`}
                placeholder="Enter your email"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          </div>

          {successMessage && (
            <div className="mb-4 text-green-600 text-sm">{successMessage}</div>
          )}

          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600 w-full"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

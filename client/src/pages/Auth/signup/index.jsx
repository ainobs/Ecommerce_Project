// SignUp.tsx

import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const SignUp = () => {
  const { signup, error } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const names = formData.fullName.split(/\s+/).filter(Boolean);
    // Basic form validation
    const newErrors = {
      fullName: names.length < 2 ? 'Enter full name' : '',
      email: formData.email.trim() === '' ? 'Email is required' : '',
      password: formData.password.trim() === '' ? 'Password is required' : '',
      agreeTerms:
        formData.agreeTerms === false
          ? 'Please agree to the terms and conditions'
          : '',
    };

    setErrors(newErrors);

    // Check if there are no errors
    if (!Object.values(newErrors).some((error) => error !== '')) {
      // Handle form submission or API call here
      const result = await signup({
        email: formData.email,
        password: formData.password,
        firstName: names[0],
        lastName: names[1],
      });
      if (result) {
        setShowSuccessPopup(true);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Column with Image */}
      <div className="hidden lg:block lg:w-1/2 bg-cover relative">
        {/* You can replace the image URL with your own */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <Link
          to="/"
          className="absolute top-8 left-8 text-2xl font-bold text-orange-500"
        >
          Logo
        </Link>
        <img
          src="/images/signup.jpg"
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Column with Form */}
      <div className="w-full lg:w-1/2 bg-white p-8 lg:p-24">
        <div className="flex justify-center">
          {showSuccessPopup ? (
            <div className="  p-4 ">
              <div className="flex justify-center">
                <FaCheck className="text-orange-500 text-3xl " />
              </div>
              <h3 className="text-center text-lg font-semibold mt-4">
                Account created successfully
              </h3>
              <p className="text-center mt-2">
                Your accoun has been created successfully, proceed to sign in
                with the email and password you used to create your account
              </p>{' '}
              <div className="flex items-center justify-center mt-8">
                <Link
                  to="/auth/login"
                  className="bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                >
                  Sign in
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Sign Up
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-gray-600 text-sm mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-2">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`border-2 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      } rounded-md pl-8 py-2 w-full focus:outline-none focus:border-orange-500`}
                      placeholder="Enter your fullName"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-600 text-sm mb-2"
                  >
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
                      value={formData.email}
                      onChange={handleChange}
                      className={`border-2 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-md pl-8 py-2 w-full focus:outline-none focus:border-orange-500`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-600 text-sm mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-2">
                      <FaLock />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`border-2 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      } rounded-md pl-8 py-2 w-full focus:outline-none focus:border-orange-500`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={handleTogglePassword}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 focus:outline-none"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the{' '}
                      <a
                        href="/terms"
                        className="text-orange-500 hover:underline"
                      >
                        Terms and Conditions
                      </a>
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.agreeTerms}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                >
                  Sign Up
                </button>
              </form>
              <div className="mt-4">
                {/* Link to SignUpPage */}
                <p className="text-gray-600 text-sm">
                  Already have an account?{' '}
                  <Link
                    to="/auth/login"
                    className="text-orange-500 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;

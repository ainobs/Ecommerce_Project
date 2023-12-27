// Login.tsx

import React, { useEffect, useState } from 'react';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';

const Login = () => {
  const { login, user, loading, error } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      if (user && !loading) navigate('/dashboard/stat');
    };
    checkUser();
  }, [loading, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    const newErrors = {
      email: formData.email.trim() === '' ? 'Email is required' : '',
      password: formData.password.trim() === '' ? 'Password is required' : '',
    };

    setErrors(newErrors);

    // Check if there are no errors
    if (!Object.values(newErrors).some((error) => error !== '')) {
      // Handle sign-in logic or API call here
      await login(formData);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full lg:w-1/2 bg-white p-8 lg:p-24">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Sign In
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {error && <div className="text-red-500 text-sm">{error}</div>}
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
                    type="text"
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
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
              <div className="mb-4 text-right">
                {/* Link for forgotten password */}
                <p className="text-gray-600 text-sm">
                  <Link
                    to="/auth/forgot-password"
                    className="text-orange-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </p>
              </div>

              <div className="mb-4">
                {/* Link to SignUpPage */}
                <p className="text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <Link
                    to="/auth/signup"
                    className="text-orange-500 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>

              <button
                type="submit"
                className="bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-cover relative">
        {/* You can replace the image URL with your own */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <Link
          to="/"
          className="absolute top-8 right-8 text-2xl font-bold text-orange-500"
        >
          Logo
        </Link>
        <img
          src="/images/login.jpg"
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Login;

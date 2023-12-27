// AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';

import {
  getAllUserService,
  getUserService,
  loginUser,
  logoutUser,
  signupUser,
  updateUserService,
} from '../services/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTimeout, setShowTimeout] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error) => {
    setLoading(false);
    if (error === 'Token expired') {
      setShowTimeout(true);
    } else {
      setError(error || 'An error occurred.');
    }
  };

  const login = async (credentials) => {
    try {
      setError('');
      setLoading(true);
      const authenticatedToken = await loginUser(credentials);
      if (authenticatedToken) {
        setAuthToken(authenticatedToken);
        setLoading(false);
        return null;
      }
      setLoading(false);
      return 'Authentication failed.';
    } catch (error) {
      handleError(error);
      return 'Authentication failed.';
    }
  };
  const signup = async (credentials) => {
    try {
      setError('');
      setLoading(true);
      const result = await signupUser(credentials);
      setLoading(false);
      return result;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const getUser = async () => {
    try {
      setError('');
      setLoading(true);
      const authenticatedUser = await getUserService();
      if (authenticatedUser) {
        setUser(authenticatedUser);
        return authenticatedUser;
      }
      return null;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAllUser = async () => {
    try {
      setError('');
      const allUser = await getAllUserService();
      if (allUser) {
        return allUser;
      }
      return null;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData) => {
    try {
      setError('');
      const updatedUser = await updateUserService(userData);
      if (updatedUser) {
        setUser(updatedUser);
        return updatedUser;
      }
      return null;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    const checkUser = async () => {
      const savedToken = authToken || localStorage.getItem('authToken');
      if (savedToken) {
        await getUser();
      }
      setLoading(false);
    };
    checkUser();
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        showTimeout,
        login,
        signup,
        getUser,
        getAllUser,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

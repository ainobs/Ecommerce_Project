import { getBackendErrorMessage } from '../utils/error';
import api from './api';

export async function loginUser(credentials) {
  try {
    const data = await api.post('/users/login', credentials);

    if (!data.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error('Login failed: ' + getBackendErrorMessage(data.data));
    }
    console.log(data.accessToken);

    localStorage.setItem('authToken', data.accessToken);

    return data.accessToken;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Login error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}
export async function signupUser(credentials) {
  try {
    const data = await api.post('/users/register', credentials);

    if (!data.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error('Login failed: ' + getBackendErrorMessage(data.data));
    }

    return data.status;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Login error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}

export async function getUserService() {
  try {
    const data = await api.get('/users/profile');

    if (!data.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error('Login failed: ' + getBackendErrorMessage(data.data));
    }

    return data.user;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Get user error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}

export async function getAllUserService() {
  try {
    const data = await api.get('/users/');

    if (!data.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error('Get all failed: ' + getBackendErrorMessage(data.data));
    }

    return data.users;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Get user error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}

export async function updateUserService(userData) {
  try {
    const response = await api.put('/users/update-profile', userData);

    console.log(response);
    if (!response.status) {
      // Handle login error, e.g., display an error message to the user
      throw new Error(
        'Update failed: ' + getBackendErrorMessage(response.data)
      );
    }

    return response.user;
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Update user error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}

export async function logoutUser() {
  try {
    const { data } = await api.get('/users/logout');

    if (!data.status) {
      // Handle logout error, e.g., display an error message to the user
      throw new Error('Logout failed: ' + getBackendErrorMessage(data.data));
    }

    localStorage.removeItem('authToken');
  } catch (error) {
    // Handle network errors or other exceptions
    // You can log the error or perform other error-handling actions
    console.error('Logout error:', getBackendErrorMessage(error));

    // Re-throw the error to propagate it up the call stack if needed
    throw getBackendErrorMessage(error);
  }
}

// You can add more authentication-related functions here, such as checking the user's authentication status, resetting passwords, etc.

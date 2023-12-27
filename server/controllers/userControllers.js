// controllers/userController.ts

import User from '../models/user.js';
import {
  comparePassword,
  generateAccessToken,
  hashPassword,
} from '../utils/userUtils.js';
import { validationResult, query, body } from 'express-validator';

export const registerUser = async (req, res) => {
  try {
    await Promise.all([
      body('firstName')
        .notEmpty()
        .escape()
        .withMessage('First name is required')
        .run(req),
      body('lastName')
        .notEmpty()
        .escape()
        .withMessage('Last name is required')
        .run(req),
      body('email')
        .isEmail()
        .escape()
        .withMessage('Invalid email format')
        .run(req),
      body('password')
        .isLength({ min: 8 })
        .escape()
        .withMessage('Password must be at least 8 characters long')
        .run(req),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ status: false, errors: errors.array() });
    }

    // Extract the verification token from the request parameters
    const { firstName, lastName, email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(404).json({
        status: false,
        message: 'Account with this email already exist ',
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email: email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return res.status(200).json({
      status: true,
      message: 'Account created and password change successful',
      user,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({
      status: false,
      message: 'An error occurred during sign up',
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    await Promise.all([
      body('email')
        .isEmail()
        .escape()
        .withMessage('Invalid email format')
        .run(req),
      body('password')
        .isLength({ min: 8 })
        .escape()
        .withMessage('Password must be at least 8 characters long')
        .run(req),
    ]);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });

    // If the user doesn't exist, respond with an error
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: 'Invalid username or password' });
    }
    const isMatch = await comparePassword(password, user.password);

    // If the password is invalid, respond with an error
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: 'Invalid username or password' });
    }

    // Generate access and refresh tokens
    const accessToken = await generateAccessToken(user._id, user.email);
    // Respond with both tokens
    return res.status(200).json({ status: true, accessToken });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during Login',
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the middleware

    // Fetch user details from the database, excluding sensitive data
    const user = await User.findById(userId).select(
      '-password -pin -passphrase -twoFactorSecret -tokenBlacklist -recoveryCodes -mnemonic'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user details in the response
    return res.status(200).json({ status: true, user });
  } catch (error) {
    console.error('Fetch user details error:', error);
    return res
      .status(500)
      .json({ status: false, message: 'An error occurred' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the middleware

    // Extract the fields to be updated from the request body
    const updateFields = req.body;

    // Check if any of the fields is not allowed
    const allowedFields = ['firstName', 'lastName', 'image'];
    for (const field in updateFields) {
      if (!allowedFields.includes(field)) {
        return res.status(400).json({
          status: false,
          message: `Field '${field}' is not allowed for update`,
        });
      }
    }

    // Update the user profile in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true, // Return the updated user document
      select: '-password', // Exclude sensitive data
    });

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Send the updated user profile in the response
    return res.status(200).json({ status: true, user: updatedUser });
  } catch (error) {
    console.error('Update user profile error:', error);
    return res
      .status(500)
      .json({ status: false, message: 'An error occurred' });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const { userId } = req; // Assuming you're using authentication middleware

    // Increment the token version
    await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });

    // You can also add the current token to the blacklist if needed
    // const user = await User.findById(userId);
    // user.tokenBlacklist.push(req.token); // Assuming you have access to the current token
    // await user.save();

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'An error occurred during logout' });
  }
};

export const getAllUser = async (req, res) => {
  try {
    // Find all products in the database
    const users = await User.find();

    return res.status(200).json({
      status: true,
      users,
    });
  } catch (error) {
    console.error('Error fetching all users:', error);
    return res.status(500).json({
      status: false,
      message: 'An error occurred',
    });
  }
};

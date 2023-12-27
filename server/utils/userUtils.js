import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = parseInt('10');

const secretKey = process.env.JWT_SECRET;

// Function to generate an access token
export async function generateAccessToken(userId, email) {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('Secret key not found');
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('user not found');
  }
  user.save();
  return jwt.sign({ userId, email, version: user.tokenVersion }, secretKey, {
    expiresIn: '60000m',
  });
}

// Function to generate a refresh token
export function generateRefreshToken(userId) {
  if (!secretKey) {
    throw new Error('Secret key not found');
  }
  return jwt.sign({ userId }, secretKey, { expiresIn: '7d' });
}

export const hashPassword = async (password) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    // Hash the password with the salt
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error(error);
    throw new Error('Error hashing password');
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);

    return match;
  } catch (error) {
    console.error(error);
    throw new Error('Error comparing passwords');
  }
};

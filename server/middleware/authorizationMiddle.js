import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Middleware for authorization
export const authorize = (requiredRole) => {
  return async (req, res, next) => {
    try {
      // Extract the access token from the request headers or query params
      const accessToken = String(
        req.headers.authorization?.split(' ')[1] || req.query.accessToken
      );

      if (!accessToken) {
        return res.status(401).json({ message: 'Access token is missing' });
      }

      const secretKey = process.env.JWT_SECRET;

      if (!secretKey) {
        return res
          .status(500)
          .json({ message: 'JWT secret key is not configured' });
      }

      // Verify the access token
      const decoded = jwt.verify(accessToken, secretKey);

      // Check if the token version matches the user's tokenVersion
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: 'Invalid user token' });
      }

      // Check if a required role is specified
      if (requiredRole && user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access forbidden' });
      }

      // Attach user data to the request object for use in the route handler
      req.userId = user._id;

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Authorization error:', error);
      if (error) {
        return res.status(403).json({ message: 'Token expired' });
      } else {
        return res
          .status(500)
          .json({ message: 'An error occurred during authorization' });
      }
    }
  };
};

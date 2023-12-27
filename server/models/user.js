import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: '/images/profile.webp' },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });

const User = model('User', userSchema);

export default User;

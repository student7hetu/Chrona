import { Request, Response } from 'express';
import { User } from '../models/User.model';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: passwordHash,
    creditBalance: 30,
  });

  const token = signToken({ userId: user._id });

  await user.save();

  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = signToken({ userId: user._id });
  res
    .status(200)
    .json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
};

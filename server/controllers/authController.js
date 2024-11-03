import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import { catchErrorAsync } from './errorController.js';

// Register User
const registerHandler = catchErrorAsync(async (req, res, next) => {
  const { body } = req;

  console.log('Request Body -> ', body);

  const newUser = await UserModel.create(body);
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  if (newUser._id) {
    res.status(201).json({
      status: 'success',
      data: { user: newUser, token },
      message: 'Signup successful',
    });
  }
});

export { registerHandler };

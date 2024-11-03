import express from 'express';
import multer from 'multer';
import { registerHandler } from '../controllers/authController.js';

const authRouter = express.Router();

// File Storage
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

// Auth Routes
authRouter.post('/register', upload.single('picture'), registerHandler);

export default authRouter;

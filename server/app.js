import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { globalErrorHandler } from './controllers/errorController.js';
import authRouter from './routes/auth-routes.js';

// PACKAGE AND MIDDLEWARE CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express
const app = express();
app.use(express.json());

// Helmet and morgan
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));

// Body Parser
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Routes
app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    message: `Cannot find URL - ${req.originalUrl}`,
  });

  next();
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;

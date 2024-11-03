import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });

import app from './app.js';

// Mongoose Connection
const PORT = process.env.PORT || 6002;
const mongodbURL = process.env.MONGODB_DATABASE;

mongoose
  .connect(mongodbURL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`\n🚀 Connection Successful in port ${PORT}\n`)
    );
  })
  .catch((err) => {
    console.log('Mongoose Connection Error ->', err.message);
  });

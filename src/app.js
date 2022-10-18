import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { customError } from './utils/customError.js';

import indexRoutes from './routes/index.js';
import imagesRoutes from './routes/images.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/images', imagesRoutes);

/*********************/
// ERROR HANDLER
// Error 404
app.use((req, res, next) => {
  const error = customError('The requested resource does not exist', 404);
  next(error);
});

// Error response & logger
app.use((error, req, res, next) => {
  res.status(error.status || error.http_code || 500).json({
    error: {
      status: error.status || error.http_code || 500,
      message: error.message || 'Internal Server Error.'
    }
  });
  console.log('****************************************');
  console.log(new Date());
  console.log(error);
  console.log('****************************************');
});
/*********************/

export default app;

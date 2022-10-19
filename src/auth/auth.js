import jwt from 'jsonwebtoken';
import { customError } from '../utils/customError.js';
import * as dotenv from 'dotenv';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const isAuth = async (req, res, next) => {
  try {
    let token = req.headers['authorization'];

    if (!token) {
      throw customError('Token was not provided', 400);
    }

    token = token.replace('Bearer ', '');

    jwt.verify(token, jwtSecret, (err, jwtPayload) => {
      if (err) {
        throw customError('Unauthorized', 401);
      }
      req.user = jwtPayload;
    });

    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.roles.includes('admin')) {
      throw customError('Forbidden', 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { isAuth, isAdmin };

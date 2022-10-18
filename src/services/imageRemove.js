import cloudinary from '../config/cloudinary.js';
import { customError } from '../utils/customError.js';

const imageRemove = async (publicId) => {
  const response = await cloudinary.uploader.destroy(publicId);

  if (response.result === 'not found') {
    throw customError(`Image not found: ${publicId}`, 404);
  }

  if (response.result === 'ok') {
    return true;
  }

  throw customError(`Unexpected error deleting image: ${publicId}`, 500);
};

export { imageRemove };

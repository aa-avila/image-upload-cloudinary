import cloudinary from '../config/cloudinary.js';

const imageRemove = async (publicId) => {
  const response = await cloudinary.uploader.destroy(publicId);

  if (response.result === 'not found') {
    const error = new Error(`Image not found: ${publicId}`);
    error.status = 404;
    throw error;
  }

  if (response.result === 'ok') {
    return true;
  }

  const error = new Error(`Unexpected error deleting image: ${publicId}`);
  error.status = 500;
  throw error;
};

export { imageRemove };

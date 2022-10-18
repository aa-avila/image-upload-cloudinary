import cloudinary from '../config/cloudinary.js';
import fs from 'fs/promises';
import { logger } from '../utils/logger.js';

const imageUpload = async (image, folder) => {
  const { tempFilePath } = image;

  const options = { folder };

  try {
    const result = await cloudinary.uploader.upload(tempFilePath, options);

    await fs
      .unlink(tempFilePath)
      .then(logger('Temp file deleted after upload success'))
      .catch((error) => console.log(error));

    return {
      assetId: result.asset_id,
      publicId: result.public_id,
      url: result.secure_url,
      format: result.format,
      width: result.width,
      height: result.height
    };
  } catch (error) {
    await fs
      .unlink(tempFilePath)
      .then(logger('Temp file deleted after upload error'))
      .catch((error) => console.log(error));

    throw error;
  }
};

export { imageUpload };

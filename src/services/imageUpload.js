import cloudinary from '../config/cloudinary.js';
import fs from 'fs/promises';

const imageUpload = async (image, folder) => {
  const { tempFilePath } = image;

  const options = {
    folder
  };

  try {
    const result = await cloudinary.uploader.upload(tempFilePath, options);

    await fs.unlink(tempFilePath).catch((error) => console.log(error));

    return {
      assetId: result.asset_id,
      publicId: result.public_id,
      url: result.secure_url,
      format: result.format,
      width: result.width,
      height: result.height
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { imageUpload };

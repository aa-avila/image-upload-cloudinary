import cloudinary from '../config/cloudinary.js';

const imageUpload = async (image, folder) => {
  const { tempFilePath } = image;

  const options = {
    folder,
    discard_original_filename: true
  };

  try {
    const result = await cloudinary.uploader.upload(tempFilePath, options);
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { imageUpload };

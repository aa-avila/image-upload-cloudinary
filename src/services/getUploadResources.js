import cloudinary from '../config/cloudinary.js';
import * as dotenv from 'dotenv';
dotenv.config();

const cloudName = process.env.CLOUDINARY_NAME;
const BASE_URL = `https://res.cloudinary.com/${cloudName}/image/upload`;
const TRANSF_W400 = 'c_scale,w_400';

const addTransformation = (imgUrl, baseUrl, transform) => {
  const splited = imgUrl.split(baseUrl);
  return `${baseUrl}/${transform}${splited[1]}`;
};

const getUploadResources = async (folder, limit, nextCursor) => {
  try {
    const options = {
      type: 'upload',
      prefix: folder,
      max_results: limit,
      next_cursor: nextCursor
    };

    const results = await cloudinary.api.resources(options);

    const response = {
      nextCursor: results.next_cursor,
      images: results.resources
        .map((item) => {
          const w400 = addTransformation(
            item.secure_url,
            BASE_URL,
            TRANSF_W400
          );
          return {
            original: {
              assetId: item.asset_id,
              publicId: item.public_id,
              url: item.secure_url,
              format: item.format,
              width: item.width,
              height: item.height
            },
            transform: {
              w400
            }
          };
        })
        .sort((a, b) => a.publicId - b.publicId)
    };
    return response;
  } catch (error) {
    throw error;
  }
};

export { getUploadResources };

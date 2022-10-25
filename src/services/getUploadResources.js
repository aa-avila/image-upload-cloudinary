import cloudinary from '../config/cloudinary.js';
import { logger } from '../utils/logger.js';

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
          return {
            assetId: item.asset_id,
            publicId: item.public_id,
            url: item.secure_url,
            format: item.format,
            width: item.width,
            height: item.height
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

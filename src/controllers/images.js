import { imageUpload } from '../services/imageUpload.js';
import { imageRemove } from '../services/imageRemove.js';
import { getUploadResources } from '../services/getUploadResources.js';

const upload = async (req, res, next) => {
  // TODO: image resize
  // 1080 px max width OR heigth
  // if <, do nothing
  // https://sharp.pixelplumbing.com/api-resize
  // https://github.com/lovell/sharp/blob/main/docs/api-resize.md

  try {
    const { files } = req;
    const { folder } = req.body;

    const response = await imageUpload(files.image, folder);

    res.status(200).json({ data: response });
  } catch (error) {
    next(error);
  }
};

const listImages = async (req, res, next) => {
  try {
    const { folder, limit, nextCursor } = req.query;

    const response = await getUploadResources(folder, limit, nextCursor);

    res.status(200).json({ data: response });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const response = await imageRemove(req.params.publicId);
    res.status(200).json({ data: response });
  } catch (error) {
    next(error);
  }
};

export { upload, remove, listImages };

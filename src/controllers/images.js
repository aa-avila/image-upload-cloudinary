import { imageUpload } from '../services/imageUpload.js';
import { imageRemove } from '../services/imageRemove.js';

const upload = async (req, res, next) => {
  try {
    const { files } = req;
    const { folder } = req.body;
    const response = await imageUpload(files.image, folder);
    // TODO: delete temp file
    res.status(200).json({ data: response });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const response = await imageRemove('123asd');
    res.status(200).json({ data: response });
  } catch (error) {
    next(error);
  }
};

export { upload, remove };

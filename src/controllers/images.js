import { imageUpload } from '../services/imageUpload.js';
import { imageRemove } from '../services/imageRemove.js';

const upload = async (req, res, next) => {
  try {
    const response = await imageUpload('123asd');
    res.status(200).send({ data: response });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const response = await imageRemove('123asd');
    res.status(200).send({ data: response });
  } catch (error) {
    next(error);
  }
};

export { upload, remove };

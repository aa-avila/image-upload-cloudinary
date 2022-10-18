import { upload, remove } from '../controllers/images.js';
import fileUpload from 'express-fileupload';
import { Router } from 'express';
const router = Router();

router.post(
  '/',
  fileUpload({
    useTempFiles: true,
    tempFileDir: './temp'
  }),
  upload
);

/**
 * NOTA:
 * Es necesario que publicId sea URIencoded debido a que contiene "/"
 * https://www.w3schools.com/jsref/jsref_encodeuricomponent.asp
 */
router.delete('/:publicId', remove);

export default router;

import fileUpload from 'express-fileupload';
import { upload, listImages, remove } from '../controllers/images.js';
import { isAuth, isAdmin } from '../auth/auth.js';
import { Router } from 'express';
const router = Router();

router.post(
  '/',
  isAuth,
  isAdmin,
  fileUpload({
    useTempFiles: true,
    tempFileDir: './temp'
  }),
  upload
);

router.get('/', listImages);

/**
 * NOTA:
 * Es necesario que publicId sea URIencoded debido a que contiene "/"
 * https://www.w3schools.com/jsref/jsref_encodeuricomponent.asp
 */
router.delete('/:publicId', isAuth, isAdmin, remove);

export default router;

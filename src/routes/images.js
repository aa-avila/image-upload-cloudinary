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
router.delete('/', remove);

export default router;

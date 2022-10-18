import { upload, remove } from '../controllers/images.js';

import { Router } from 'express';
const router = Router();

router.post('/', upload);
router.delete('/', remove);

export default router;

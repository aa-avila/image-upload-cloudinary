import { healthOk } from '../controllers/index.js';

import { Router } from 'express';
const router = Router();

router.get('/', healthOk);

export default router;

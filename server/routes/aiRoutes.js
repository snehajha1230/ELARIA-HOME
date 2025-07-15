import express from 'express';
import { talkToAi } from '../controllers/aiController.js';

const router = express.Router();

router.post('/talk', talkToAi);

export default router;

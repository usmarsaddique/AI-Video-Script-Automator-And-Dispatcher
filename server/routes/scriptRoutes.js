import express from 'express';
import { processAutomation } from '../controllers/scriptController.js';

const router = express.Router();

router.post('/process-automation', processAutomation);

export default router;

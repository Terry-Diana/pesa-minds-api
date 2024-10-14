// src/routes/tipsRoutes.ts
import express from 'express';
import { createTip, getTips } from '../controllers/tipsController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticateUser, createTip);
router.get('/', authenticateUser, getTips);

export default router;

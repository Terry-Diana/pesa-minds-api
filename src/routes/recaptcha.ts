import express from 'express';
import { generateRecaptchaChallenge, verifyRecaptcha } from '../controllers/recaptchaController';

const router = express.Router();

// Route to get the CAPTCHA challenge
router.get('/challenge', generateRecaptchaChallenge);

// Route to verify the user's CAPTCHA response
router.post('/verify', verifyRecaptcha);

export default router;  // This is important to export the router

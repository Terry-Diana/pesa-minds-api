import express from 'express';
import { generatecaptchaChallenge, verifycaptcha } from '../config/captcha';

const router = express.Router();

// Route to get the CAPTCHA challenge
router.get('/challenge', generatecaptchaChallenge);

// Route to verify the user's CAPTCHA response
router.post('/verify', verifycaptcha);

export default router;  // This is important to export the router

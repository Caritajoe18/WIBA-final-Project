import { Router } from 'express';
import {
    register,
    login,
    verifyEmail,
    connectWallet,
    resendVerification,
    getProfile,
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);

// Protected routes
router.post('/connect-wallet', authenticate, connectWallet);
router.get('/profile', authenticate, getProfile);

export default router;

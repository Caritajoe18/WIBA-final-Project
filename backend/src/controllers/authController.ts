import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User, { UserRole } from '../models/User';
import { generateToken } from '../utils/jwt';
import { sendVerificationEmail, sendWelcomeEmail } from '../utils/email';
import { AuthRequest } from '../middleware/auth';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, firstName, lastName, phoneNumber, role } = req.body;

        // Validation
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        if (password.length < 8) {
            res.status(400).json({ error: 'Password must be at least 8 characters' });
            return;
        }

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'Email already registered' });
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phoneNumber,
            role: role || UserRole.REQUESTER,
            emailVerificationToken: verificationToken,
            emailVerificationExpires: verificationExpires,
        });

        // Send verification email
        await sendVerificationEmail(email, verificationToken, firstName);

        res.status(201).json({
            message: 'Registration successful. Please check your email to verify your account.',
            userId: user.id,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.body;

        if (!token) {
            res.status(400).json({ error: 'Verification token is required' });
            return;
        }

        const user = await User.findOne({
            where: {
                emailVerificationToken: token,
            },
        });

        if (!user) {
            res.status(400).json({ error: 'Invalid verification token' });
            return;
        }

        if (user.emailVerificationExpires && user.emailVerificationExpires < new Date()) {
            res.status(400).json({ error: 'Verification token has expired' });
            return;
        }

        // Update user
        user.isEmailVerified = true;
        user.emailVerificationToken = "";
        user.emailVerificationExpires = null;
        await user.save();

        // Send welcome email
        await sendWelcomeEmail(user.email, user.firstName);

        // Generate JWT token
        const jwtToken = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        res.json({
            message: 'Email verified successfully',
            token: jwtToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
            },
        });
    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({ error: 'Email verification failed' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Check if email is verified
        if (!user.isEmailVerified) {
            res.status(403).json({ error: 'Please verify your email before logging in' });
            return;
        }

        // Generate token
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                walletAddress: user.walletAddress,
                kycStatus: user.kycStatus,
                reputationScore: user.reputationScore,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

export const connectWallet = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const { walletAddress } = req.body;

        if (!walletAddress) {
            res.status(400).json({ error: 'Wallet address is required' });
            return;
        }

        // Check if wallet is already connected to another user
        const existingWallet = await User.findOne({ where: { walletAddress } });
        if (existingWallet && existingWallet.id !== req.user.userId) {
            res.status(400).json({ error: 'Wallet already connected to another account' });
            return;
        }

        // Update user
        const user = await User.findByPk(req.user.userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        user.walletAddress = walletAddress;
        await user.save();

        res.json({
            message: 'Wallet connected successfully',
            walletAddress: user.walletAddress,
        });
    } catch (error) {
        console.error('Wallet connection error:', error);
        res.status(500).json({ error: 'Failed to connect wallet' });
    }
};

export const resendVerification = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ error: 'Email is required' });
            return;
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (user.isEmailVerified) {
            res.status(400).json({ error: 'Email is already verified' });
            return;
        }

        // Generate new token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        user.emailVerificationToken = verificationToken;
        user.emailVerificationExpires = verificationExpires;
        await user.save();

        // Send email
        await sendVerificationEmail(email, verificationToken, user.firstName);

        res.json({ message: 'Verification email sent' });
    } catch (error) {
        console.error('Resend verification error:', error);
        res.status(500).json({ error: 'Failed to resend verification email' });
    }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const user = await User.findByPk(req.user.userId, {
            attributes: { exclude: ['password', 'emailVerificationToken'] },
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json({ user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

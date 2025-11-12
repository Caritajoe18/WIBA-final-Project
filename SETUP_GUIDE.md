# DropIt Registration System - Setup Guide

This guide will help you set up the registration system with email verification and wallet connection.

## Features Implemented

### Backend (Node.js + Sequelize + Supabase)
- ✅ User registration with email/password
- ✅ Email verification with token
- ✅ JWT authentication
- ✅ Wallet connection endpoint
- ✅ User roles (REQUESTER, TASKER, VERIFIER, ADMIN)
- ✅ KYC status tracking
- ✅ Sequelize ORM with PostgreSQL (Supabase)

### Frontend (React + Wagmi + shadcn/ui)
- ✅ Registration form with validation
- ✅ Login form
- ✅ Email verification page
- ✅ Wallet connection with Wagmi (MetaMask, WalletConnect, Coinbase Wallet)
- ✅ Dashboard with profile info
- ✅ Beautiful UI with shadcn/ui components

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (Supabase account)
- Gmail account (for email verification)
- WalletConnect Project ID (optional, for WalletConnect support)

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Database Configuration (Supabase PostgreSQL)
DB_HOST=db.your-project.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-supabase-password

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@dropit.com

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Setup Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security → App Passwords
4. Generate a new app password for "Mail"
5. Use this password in `EMAIL_PASSWORD`

### 4. Setup Supabase Database

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Get your database credentials from Settings → Database
4. Update the `.env` file with your credentials

### 5. Start Backend Server

```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install wagmi viem @tanstack/react-query
```

### 2. Configure Environment Variables

Create a `.env` file in the `frontend` folder:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

### 3. Get WalletConnect Project ID (Optional)

1. Go to https://cloud.walletconnect.com/
2. Create a new project
3. Copy the Project ID
4. Add it to your `.env` file

### 4. Start Frontend Development Server

```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Testing the Registration Flow

### 1. Register a New User

1. Navigate to `http://localhost:5173/register`
2. Fill in the registration form:
   - First Name & Last Name
   - Email
   - Phone Number (optional)
   - Role (Requester or Tasker)
   - Password (min 8 characters)
3. Click "Create Account"
4. Check your email for verification link

### 2. Verify Email

1. Open the verification email
2. Click the verification link
3. You'll be redirected to the verification page
4. After successful verification, you'll be redirected to the dashboard

### 3. Connect Wallet

1. On the dashboard, click "Connect Wallet"
2. Choose your wallet provider (MetaMask, WalletConnect, or Coinbase Wallet)
3. Approve the connection in your wallet
4. Your wallet address will be linked to your account

### 4. Login

1. Navigate to `http://localhost:5173/login`
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to the dashboard

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-email` - Verify email with token
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/connect-wallet` - Connect wallet (requires auth)
- `GET /api/auth/profile` - Get user profile (requires auth)

## Database Schema

### Users Table

```sql
- id (UUID, Primary Key)
- email (String, Unique)
- password (String, Hashed)
- role (ENUM: REQUESTER, TASKER, VERIFIER, ADMIN)
- walletAddress (String, Unique, Optional)
- isEmailVerified (Boolean)
- emailVerificationToken (String, Optional)
- emailVerificationExpires (Date, Optional)
- kycStatus (ENUM: PENDING, VERIFIED, REJECTED)
- kycHash (String, Optional)
- didRecord (Text, Optional)
- firstName (String, Optional)
- lastName (String, Optional)
- phoneNumber (String, Optional)
- profileImage (String, Optional)
- reputationScore (Float, Default: 0)
- isActive (Boolean, Default: true)
- createdAt (Timestamp)
- updatedAt (Timestamp)
```

## User Roles

- **REQUESTER (Customer)**: Creates tasks, sets delivery details, funds tasks
- **TASKER (Rider/Agent)**: Accepts tasks, completes them, earns crypto
- **VERIFIER/ADMIN**: Confirms KYC, mediates disputes, updates reputations

## Next Steps

1. **KYC Verification**: Implement KYC verification flow with document upload
2. **Task Management**: Create task creation and acceptance features
3. **Smart Contract Integration**: Connect to blockchain for escrow and payments
4. **Reputation System**: Build on-chain reputation tracking
5. **Real-time Features**: Add chat and GPS tracking

## Troubleshooting

### Email Not Sending

- Check Gmail app password is correct
- Ensure 2FA is enabled on Gmail
- Check firewall/antivirus settings
- Try using a different email provider

### Database Connection Failed

- Verify Supabase credentials
- Check if IP is whitelisted in Supabase
- Ensure database is running

### Wallet Connection Issues

- Make sure you have a wallet extension installed
- Check if you're on the correct network
- Clear browser cache and try again

## Security Notes

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Enable HTTPS in production
- Implement rate limiting for API endpoints
- Add CSRF protection
- Validate all user inputs
- Hash passwords with bcrypt (already implemented)

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for DropIt - Decentralized Logistics Marketplace**

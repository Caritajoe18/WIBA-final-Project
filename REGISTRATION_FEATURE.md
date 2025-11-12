# Registration & Authentication System

## Overview

Complete user registration system with email verification, JWT authentication, and Web3 wallet connection for the DropIt decentralized logistics platform.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Register    │  │    Login     │  │  Dashboard   │      │
│  │    Form      │  │    Form      │  │   + Wallet   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                     ┌──────▼──────┐                         │
│                     │  API Client  │                         │
│                     └──────┬──────┘                         │
└────────────────────────────┼────────────────────────────────┘
                             │ HTTP/REST
┌────────────────────────────▼────────────────────────────────┐
│                    Backend (Node.js + Express)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Auth      │  │     JWT      │  │    Email     │      │
│  │ Controllers  │  │ Middleware   │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                     ┌──────▼──────┐                         │
│                     │  Sequelize   │                         │
│                     │     ORM      │                         │
│                     └──────┬──────┘                         │
└────────────────────────────┼────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│              Supabase PostgreSQL Database                    │
│                        Users Table                           │
└─────────────────────────────────────────────────────────────┘
```

## Features Implemented

### 1. User Registration
- Email/password registration
- Role selection (Requester/Tasker)
- Form validation with Zod
- Password strength requirements (min 8 chars)
- Duplicate email prevention

### 2. Email Verification
- Secure token generation (32-byte random hex)
- 24-hour token expiration
- Beautiful HTML email templates
- Resend verification option
- Automatic login after verification

### 3. Authentication
- JWT token-based authentication
- Secure password hashing with bcrypt
- Token expiration (7 days default)
- Protected routes with middleware
- Role-based authorization

### 4. Wallet Connection
- Wagmi integration for Web3 wallets
- Support for MetaMask, WalletConnect, Coinbase Wallet
- Wallet address linking to user account
- Duplicate wallet prevention
- Multi-chain support (Base, Base Sepolia, Mainnet)

### 5. User Roles
- **REQUESTER**: Creates and funds tasks
- **TASKER**: Accepts and completes tasks
- **VERIFIER**: Validates KYC and mediates disputes
- **ADMIN**: Full system access

## File Structure

```
backend/
├── config/
│   └── database.ts          # Sequelize configuration
├── controllers/
│   └── authController.ts    # Auth logic (register, login, verify)
├── middleware/
│   └── auth.ts              # JWT authentication middleware
├── models/
│   └── User.ts              # User model with Sequelize
├── routes/
│   └── authRoutes.ts        # Auth API routes
├── utils/
│   ├── email.ts             # Email sending utilities
│   └── jwt.ts               # JWT token utilities
├── .env                     # Environment variables
├── package.json
└── server.ts                # Express server setup

frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── RegisterForm.tsx    # Registration form
│   │   │   ├── LoginForm.tsx       # Login form
│   │   │   └── WalletConnect.tsx   # Wallet connection
│   │   └── ui/                     # shadcn/ui components
│   ├── config/
│   │   └── wagmi.ts                # Wagmi configuration
│   ├── lib/
│   │   └── api.ts                  # API client
│   ├── pages/
│   │   ├── Register.tsx            # Registration page
│   │   ├── Login.tsx               # Login page
│   │   ├── VerifyEmail.tsx         # Email verification page
│   │   └── Dashboard.tsx           # User dashboard
│   └── App.tsx                     # Main app with routing
├── .env
└── package.json
```

## API Endpoints

### Public Endpoints

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "role": "REQUESTER"
}
```

**Response:**
```json
{
  "message": "Registration successful. Please check your email to verify your account.",
  "userId": "uuid-here"
}
```

#### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "REQUESTER",
    "walletAddress": "0x...",
    "kycStatus": "PENDING",
    "reputationScore": 0
  }
}
```

#### POST /api/auth/verify-email
Verify email with token.

**Request Body:**
```json
{
  "token": "verification-token-here"
}
```

**Response:**
```json
{
  "message": "Email verified successfully",
  "token": "jwt-token-here",
  "user": { ... }
}
```

#### POST /api/auth/resend-verification
Resend verification email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

### Protected Endpoints (Require JWT Token)

#### POST /api/auth/connect-wallet
Connect wallet to user account.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "walletAddress": "0x1234567890abcdef..."
}
```

**Response:**
```json
{
  "message": "Wallet connected successfully",
  "walletAddress": "0x1234567890abcdef..."
}
```

#### GET /api/auth/profile
Get user profile.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "REQUESTER",
    "walletAddress": "0x...",
    "kycStatus": "PENDING",
    "reputationScore": 0,
    "isEmailVerified": true,
    "isActive": true,
    "createdAt": "2025-11-12T...",
    "updatedAt": "2025-11-12T..."
  }
}
```

## Database Schema

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique user identifier |
| email | VARCHAR | UNIQUE, NOT NULL | User email address |
| password | VARCHAR | NOT NULL | Hashed password |
| role | ENUM | NOT NULL | User role (REQUESTER, TASKER, VERIFIER, ADMIN) |
| walletAddress | VARCHAR | UNIQUE | Connected wallet address |
| isEmailVerified | BOOLEAN | DEFAULT false | Email verification status |
| emailVerificationToken | VARCHAR | | Verification token |
| emailVerificationExpires | TIMESTAMP | | Token expiration time |
| kycStatus | ENUM | DEFAULT PENDING | KYC status (PENDING, VERIFIED, REJECTED) |
| kycHash | VARCHAR | | On-chain KYC hash |
| didRecord | TEXT | | Decentralized identity record |
| firstName | VARCHAR | | User first name |
| lastName | VARCHAR | | User last name |
| phoneNumber | VARCHAR | | User phone number |
| profileImage | VARCHAR | | Profile image URL |
| reputationScore | FLOAT | DEFAULT 0 | User reputation score |
| isActive | BOOLEAN | DEFAULT true | Account active status |
| createdAt | TIMESTAMP | | Account creation time |
| updatedAt | TIMESTAMP | | Last update time |

## Security Features

1. **Password Security**
   - Bcrypt hashing with salt rounds
   - Minimum 8 characters requirement
   - Password confirmation validation

2. **Token Security**
   - JWT with expiration
   - Secure random token generation for email verification
   - Token expiration (24 hours for email, 7 days for JWT)

3. **Email Verification**
   - Required before login
   - Prevents spam accounts
   - Secure token-based verification

4. **Wallet Security**
   - One wallet per account
   - Wallet uniqueness validation
   - Secure wallet connection flow

5. **API Security**
   - CORS enabled
   - JWT authentication middleware
   - Role-based authorization
   - Input validation with Zod

## Environment Variables

### Backend (.env)
```env
# Database
DB_HOST=db.your-project.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-password

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@dropit.com

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_WALLETCONNECT_PROJECT_ID=your-project-id
```

## Testing Checklist

- [ ] User can register with valid email/password
- [ ] Duplicate email registration is prevented
- [ ] Verification email is sent successfully
- [ ] Email verification link works
- [ ] User can login after email verification
- [ ] Login fails with unverified email
- [ ] JWT token is stored and used correctly
- [ ] Protected routes require authentication
- [ ] Wallet connection works with MetaMask
- [ ] Wallet connection works with WalletConnect
- [ ] Wallet connection works with Coinbase Wallet
- [ ] Duplicate wallet connection is prevented
- [ ] User profile displays correctly
- [ ] Logout clears authentication
- [ ] Password validation works
- [ ] Form validation displays errors

## Next Steps

1. **KYC Verification**
   - Document upload
   - Face verification
   - Physical agent verification
   - On-chain hash storage

2. **Task Management**
   - Task creation
   - Task acceptance
   - Task completion
   - Payment escrow

3. **Smart Contract Integration**
   - Identity contract
   - Escrow contract
   - Reputation contract
   - DAO governance

4. **Real-time Features**
   - WebSocket for live updates
   - GPS tracking
   - In-app chat
   - Push notifications

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Check Gmail app password
   - Enable 2FA on Gmail
   - Check spam folder

2. **Database connection failed**
   - Verify Supabase credentials
   - Check IP whitelist
   - Ensure database is running

3. **Wallet connection issues**
   - Install wallet extension
   - Check network selection
   - Clear browser cache

4. **JWT token errors**
   - Check token expiration
   - Verify JWT_SECRET matches
   - Clear localStorage

## Support

For issues or questions:
- Open an issue on GitHub
- Contact the development team
- Check the main README.md

---

**DropIt - Deliver trust. On-chain.** 🚚

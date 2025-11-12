# 🚚 DropIt Registration System

Complete authentication and onboarding system for the DropIt decentralized logistics marketplace.

## 🎯 Overview

This registration system provides secure user onboarding with:
- Email/password authentication
- Email verification
- Web3 wallet connection (Wagmi)
- Role-based access control
- KYC status tracking
- JWT token authentication

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Wagmi)                  │
│  Registration → Email Verify → Login → Wallet Connect        │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API
┌────────────────────────▼────────────────────────────────────┐
│              Backend (Node.js + Express)                     │
│  Auth Controllers → JWT Middleware → Email Service           │
└────────────────────────┬────────────────────────────────────┘
                         │ Sequelize ORM
┌────────────────────────▼────────────────────────────────────┐
│              Database (Supabase PostgreSQL)                  │
│  Users Table with Roles, KYC Status, Wallet Address         │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
.
├── backend/
│   ├── config/
│   │   └── database.ts              # Database configuration
│   ├── controllers/
│   │   └── authController.ts        # Authentication logic
│   ├── middleware/
│   │   └── auth.ts                  # JWT middleware
│   ├── models/
│   │   └── User.ts                  # User model
│   ├── routes/
│   │   └── authRoutes.ts            # API routes
│   ├── utils/
│   │   ├── email.ts                 # Email service
│   │   └── jwt.ts                   # JWT utilities
│   ├── .env                         # Environment config
│   ├── package.json
│   └── server.ts                    # Express server
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── auth/
│   │   │       ├── RegisterForm.tsx
│   │   │       ├── LoginForm.tsx
│   │   │       └── WalletConnect.tsx
│   │   ├── config/
│   │   │   └── wagmi.ts             # Wagmi config
│   │   ├── lib/
│   │   │   └── api.ts               # API client
│   │   ├── pages/
│   │   │   ├── Register.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── VerifyEmail.tsx
│   │   │   └── Dashboard.tsx
│   │   └── App.tsx
│   ├── .env
│   └── package.json
│
├── SETUP_GUIDE.md                   # Setup instructions
├── REGISTRATION_FEATURE.md          # Feature documentation
├── API_REFERENCE.md                 # API documentation
├── IMPLEMENTATION_SUMMARY.md        # Implementation details
├── DEPLOYMENT_CHECKLIST.md          # Deployment guide
├── install-dependencies.sh          # Dependency installer
└── start-dev.sh                     # Dev server starter
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Run the installation script
chmod +x install-dependencies.sh
./install-dependencies.sh

# Or manually:
cd backend && npm install
cd ../frontend && npm install wagmi viem @tanstack/react-query
```

### 2. Configure Environment

**Backend (.env):**
```env
DB_HOST=your-supabase-host.supabase.co
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-password
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_WALLETCONNECT_PROJECT_ID=your-project-id
```

### 3. Start Development Servers

```bash
# Use the startup script
chmod +x start-dev.sh
./start-dev.sh

# Or manually:
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

### 4. Test the System

1. Visit http://localhost:5173/register
2. Register a new account
3. Check email for verification link
4. Verify email
5. Connect wallet on dashboard

## 🎨 Features

### User Registration
- ✅ Email/password with validation
- ✅ Role selection (Requester/Tasker)
- ✅ Form validation with Zod
- ✅ Password strength requirements
- ✅ Beautiful UI with shadcn/ui

### Email Verification
- ✅ Secure token generation
- ✅ 24-hour expiration
- ✅ HTML email templates
- ✅ Resend option
- ✅ Auto-login after verification

### Authentication
- ✅ JWT token-based
- ✅ Bcrypt password hashing
- ✅ Protected routes
- ✅ Role-based authorization
- ✅ 7-day token expiration

### Wallet Connection
- ✅ MetaMask support
- ✅ WalletConnect support
- ✅ Coinbase Wallet support
- ✅ Multi-chain (Base, Sepolia, Mainnet)
- ✅ Duplicate prevention

### User Roles
- **REQUESTER**: Creates tasks, funds escrow
- **TASKER**: Accepts tasks, earns crypto
- **VERIFIER**: Validates KYC, mediates disputes
- **ADMIN**: Full system access

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login user |
| POST | `/api/auth/verify-email` | ❌ | Verify email |
| POST | `/api/auth/resend-verification` | ❌ | Resend verification |
| POST | `/api/auth/connect-wallet` | ✅ | Connect wallet |
| GET | `/api/auth/profile` | ✅ | Get profile |

See [API_REFERENCE.md](API_REFERENCE.md) for detailed documentation.

## 🗄️ Database Schema

### Users Table

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR | Unique email |
| password | VARCHAR | Hashed password |
| role | ENUM | User role |
| walletAddress | VARCHAR | Connected wallet |
| isEmailVerified | BOOLEAN | Email verification status |
| kycStatus | ENUM | KYC status |
| reputationScore | FLOAT | User reputation |
| ... | ... | Additional fields |

## 🔐 Security

- ✅ Bcrypt password hashing
- ✅ JWT token authentication
- ✅ Email verification required
- ✅ CORS protection
- ✅ Input validation
- ✅ SQL injection prevention
- ⏳ Rate limiting (TODO)
- ⏳ CSRF protection (TODO)

## 📚 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup instructions
- **[REGISTRATION_FEATURE.md](REGISTRATION_FEATURE.md)** - Feature details
- **[API_REFERENCE.md](API_REFERENCE.md)** - API documentation
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Implementation overview
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Deployment guide

## 🧪 Testing

### Manual Testing Checklist
- [ ] Register new user
- [ ] Receive verification email
- [ ] Verify email
- [ ] Login with verified account
- [ ] Connect MetaMask
- [ ] Connect WalletConnect
- [ ] Connect Coinbase Wallet
- [ ] View dashboard
- [ ] Logout

### Automated Testing (TODO)
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests

## 🚀 Deployment

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for complete deployment guide.

### Quick Deploy

**Backend**: Render, Railway, or AWS  
**Frontend**: Vercel or Netlify  
**Database**: Supabase (already configured)

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- Sequelize ORM
- PostgreSQL (Supabase)
- JWT + Bcrypt
- Nodemailer

### Frontend
- React + TypeScript
- Wagmi (Web3)
- React Router
- React Hook Form + Zod
- shadcn/ui + Tailwind CSS

## 📈 Next Steps

### Phase 2: KYC Verification
- Document upload
- Face verification
- Physical agent verification
- On-chain hash storage

### Phase 3: Task Management
- Task creation
- Task discovery
- Task acceptance
- Escrow payments

### Phase 4: Smart Contracts
- Identity contract
- Escrow contract
- Reputation contract
- DAO governance

## 🐛 Troubleshooting

### Email Not Sending
- Check Gmail app password
- Enable 2FA on Gmail
- Check spam folder

### Database Connection Failed
- Verify Supabase credentials
- Check IP whitelist
- Test connection

### Wallet Connection Issues
- Install wallet extension
- Check network
- Clear browser cache

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License - See LICENSE file

## 👥 Team

- **Carita** - Developer
- **Confidence** - Developer
- **Proper-Progress** - Mentor

## 📞 Support

- GitHub Issues: [Open Issue](https://github.com/Caritajoe18/WIBA-final-Project/issues)
- Email: support@dropit.com
- Documentation: See docs folder

---

## 🎯 Status

✅ **Registration System: Complete**

- [x] User registration
- [x] Email verification
- [x] JWT authentication
- [x] Wallet connection
- [x] Dashboard
- [x] Documentation

**Ready for testing and deployment!**

---

🚚 **DropIt - Deliver trust. On-chain.**

Built with ❤️ for decentralized logistics

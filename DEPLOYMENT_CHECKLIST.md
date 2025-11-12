# DropIt Registration System - Deployment Checklist

## Pre-Deployment Checklist

### Backend Configuration

- [ ] **Database Setup**
  - [ ] Supabase account created
  - [ ] PostgreSQL database created
  - [ ] Database credentials obtained
  - [ ] Connection tested successfully

- [ ] **Environment Variables**
  - [ ] `DB_HOST` configured
  - [ ] `DB_PORT` configured
  - [ ] `DB_NAME` configured
  - [ ] `DB_USER` configured
  - [ ] `DB_PASSWORD` configured
  - [ ] `JWT_SECRET` set (strong random string)
  - [ ] `JWT_EXPIRES_IN` configured
  - [ ] `EMAIL_HOST` configured
  - [ ] `EMAIL_PORT` configured
  - [ ] `EMAIL_USER` configured
  - [ ] `EMAIL_PASSWORD` configured (Gmail App Password)
  - [ ] `EMAIL_FROM` configured
  - [ ] `PORT` configured
  - [ ] `NODE_ENV` set to production
  - [ ] `FRONTEND_URL` set to production URL

- [ ] **Email Setup**
  - [ ] Gmail 2FA enabled
  - [ ] App-specific password generated
  - [ ] Test email sent successfully
  - [ ] Email templates reviewed

- [ ] **Security**
  - [ ] Strong JWT secret generated
  - [ ] CORS configured for production domain
  - [ ] Rate limiting implemented (TODO)
  - [ ] Input validation tested
  - [ ] SQL injection prevention verified
  - [ ] XSS prevention verified

### Frontend Configuration

- [ ] **Environment Variables**
  - [ ] `VITE_API_URL` set to production API URL
  - [ ] `VITE_WALLETCONNECT_PROJECT_ID` configured

- [ ] **WalletConnect Setup**
  - [ ] WalletConnect account created
  - [ ] Project created
  - [ ] Project ID obtained
  - [ ] Wallet connection tested

- [ ] **Build Configuration**
  - [ ] Production build tested (`npm run build`)
  - [ ] Build output verified
  - [ ] Assets optimized
  - [ ] Environment variables embedded correctly

### Testing

- [ ] **Unit Tests** (TODO)
  - [ ] Backend controller tests
  - [ ] Frontend component tests
  - [ ] Utility function tests

- [ ] **Integration Tests** (TODO)
  - [ ] API endpoint tests
  - [ ] Database operation tests
  - [ ] Email sending tests

- [ ] **E2E Tests** (TODO)
  - [ ] Registration flow
  - [ ] Login flow
  - [ ] Email verification flow
  - [ ] Wallet connection flow

- [ ] **Manual Testing**
  - [ ] User registration works
  - [ ] Email verification works
  - [ ] Login works
  - [ ] Wallet connection works (MetaMask)
  - [ ] Wallet connection works (WalletConnect)
  - [ ] Wallet connection works (Coinbase Wallet)
  - [ ] Dashboard displays correctly
  - [ ] Logout works
  - [ ] Error handling works
  - [ ] Form validation works
  - [ ] Responsive design works
  - [ ] Dark mode works

## Deployment Steps

### Backend Deployment (Render/Railway/AWS)

#### Option 1: Render

1. [ ] Create Render account
2. [ ] Create new Web Service
3. [ ] Connect GitHub repository
4. [ ] Configure build command: `cd backend && npm install && npm run build`
5. [ ] Configure start command: `cd backend && npm start`
6. [ ] Add environment variables
7. [ ] Deploy
8. [ ] Test API endpoints

#### Option 2: Railway

1. [ ] Create Railway account
2. [ ] Create new project
3. [ ] Connect GitHub repository
4. [ ] Configure root directory: `backend`
5. [ ] Add environment variables
6. [ ] Deploy
7. [ ] Test API endpoints

#### Option 3: AWS EC2

1. [ ] Launch EC2 instance
2. [ ] Install Node.js
3. [ ] Clone repository
4. [ ] Install dependencies
5. [ ] Configure environment variables
6. [ ] Setup PM2 for process management
7. [ ] Configure Nginx reverse proxy
8. [ ] Setup SSL certificate
9. [ ] Start application
10. [ ] Test API endpoints

### Frontend Deployment (Vercel/Netlify)

#### Option 1: Vercel

1. [ ] Create Vercel account
2. [ ] Import GitHub repository
3. [ ] Configure root directory: `frontend`
4. [ ] Configure build command: `npm run build`
5. [ ] Configure output directory: `dist`
6. [ ] Add environment variables
7. [ ] Deploy
8. [ ] Test application
9. [ ] Configure custom domain (optional)

#### Option 2: Netlify

1. [ ] Create Netlify account
2. [ ] Import GitHub repository
3. [ ] Configure base directory: `frontend`
4. [ ] Configure build command: `npm run build`
5. [ ] Configure publish directory: `dist`
6. [ ] Add environment variables
7. [ ] Deploy
8. [ ] Test application
9. [ ] Configure custom domain (optional)

### Database Deployment (Supabase)

1. [ ] Supabase project created
2. [ ] Database tables created (auto via Sequelize)
3. [ ] Database indexes added for performance
4. [ ] Database backups configured
5. [ ] Connection pooling configured
6. [ ] IP whitelist configured (if needed)

## Post-Deployment Checklist

### Verification

- [ ] **Backend**
  - [ ] API health check responds
  - [ ] Database connection works
  - [ ] Email sending works
  - [ ] JWT authentication works
  - [ ] All endpoints respond correctly

- [ ] **Frontend**
  - [ ] Application loads
  - [ ] API calls work
  - [ ] Wallet connection works
  - [ ] Routing works
  - [ ] Assets load correctly

- [ ] **Integration**
  - [ ] Complete registration flow works
  - [ ] Email verification works
  - [ ] Login flow works
  - [ ] Wallet connection flow works
  - [ ] Dashboard loads correctly

### Monitoring

- [ ] **Error Tracking**
  - [ ] Sentry/LogRocket setup (TODO)
  - [ ] Error alerts configured
  - [ ] Error logging working

- [ ] **Performance Monitoring**
  - [ ] API response times monitored
  - [ ] Database query performance monitored
  - [ ] Frontend performance monitored

- [ ] **Uptime Monitoring**
  - [ ] Uptime monitoring service configured
  - [ ] Alerts configured
  - [ ] Status page created (optional)

### Security

- [ ] **SSL/TLS**
  - [ ] HTTPS enabled
  - [ ] SSL certificate valid
  - [ ] HTTP redirects to HTTPS

- [ ] **Headers**
  - [ ] Security headers configured
  - [ ] CORS properly configured
  - [ ] CSP configured (optional)

- [ ] **Secrets**
  - [ ] All secrets in environment variables
  - [ ] No secrets in code
  - [ ] No secrets in version control

### Documentation

- [ ] **User Documentation**
  - [ ] User guide created
  - [ ] FAQ created
  - [ ] Support contact provided

- [ ] **Developer Documentation**
  - [ ] API documentation updated
  - [ ] Setup guide updated
  - [ ] Architecture documented

- [ ] **Operations Documentation**
  - [ ] Deployment process documented
  - [ ] Rollback process documented
  - [ ] Monitoring guide created

## Production Environment Variables

### Backend (.env)

```env
# Database (Production)
DB_HOST=your-production-db-host
DB_PORT=5432
DB_NAME=your-production-db
DB_USER=your-production-user
DB_PASSWORD=your-production-password

# JWT (Production)
JWT_SECRET=your-super-strong-production-secret-min-32-chars
JWT_EXPIRES_IN=7d

# Email (Production)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASSWORD=your-production-app-password
EMAIL_FROM=noreply@yourdomain.com

# Server (Production)
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### Frontend (.env.production)

```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_WALLETCONNECT_PROJECT_ID=your-production-project-id
```

## Rollback Plan

### If Deployment Fails

1. [ ] Identify the issue
2. [ ] Check error logs
3. [ ] Revert to previous version
4. [ ] Verify rollback successful
5. [ ] Investigate and fix issue
6. [ ] Test fix in staging
7. [ ] Redeploy

### Database Rollback

1. [ ] Stop application
2. [ ] Restore database backup
3. [ ] Verify data integrity
4. [ ] Restart application
5. [ ] Test functionality

## Maintenance

### Regular Tasks

- [ ] **Daily**
  - [ ] Check error logs
  - [ ] Monitor uptime
  - [ ] Check email delivery

- [ ] **Weekly**
  - [ ] Review performance metrics
  - [ ] Check database size
  - [ ] Review user feedback

- [ ] **Monthly**
  - [ ] Update dependencies
  - [ ] Security audit
  - [ ] Database optimization
  - [ ] Backup verification

## Support Contacts

- **Database Issues**: Supabase Support
- **Email Issues**: Gmail Support
- **Hosting Issues**: Vercel/Netlify/Render Support
- **Development Team**: [Your Contact Info]

## Success Criteria

- [ ] Users can register successfully
- [ ] Email verification works 100%
- [ ] Login success rate > 99%
- [ ] Wallet connection works for all providers
- [ ] API response time < 500ms
- [ ] Zero critical security vulnerabilities
- [ ] Uptime > 99.9%

---

**Deployment Status**: ⏳ Pending

**Last Updated**: November 12, 2025

**Deployed By**: [Your Name]

**Deployment Date**: [Date]

**Production URL**: [URL]

---

🚚 **DropIt - Deliver trust. On-chain.**

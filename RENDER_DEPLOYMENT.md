# Deploying DropIt to Render

This guide walks you through deploying the DropIt backend to Render with PostgreSQL database.

## Prerequisites

- GitHub account
- Render account (free tier available)
- Gmail account with App Password

## Step 1: Prepare Your Repository

1. **Commit all changes:**
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

2. **Ensure your `package.json` has the correct scripts:**
```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "migrate": "sequelize-cli db:migrate"
  }
}
```

## Step 2: Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure database:
   - **Name:** `dropit-db`
   - **Database:** `dropit`
   - **User:** `dropit_user` (auto-generated)
   - **Region:** Choose closest to your users
   - **Plan:** Free (or paid for production)
4. Click **"Create Database"**
5. Wait for database to be created
6. **Save these credentials** (you'll need them):
   - Internal Database URL
   - External Database URL
   - Host
   - Port
   - Database
   - Username
   - Password

## Step 3: Create Web Service on Render

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure service:

### Basic Settings
- **Name:** `dropit-api`
- **Region:** Same as database
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install && npm run build && npm run migrate`
- **Start Command:** `npm start`

### Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

```env
# Database (use Internal Database URL from Step 2)
DATABASE_URL=<your-internal-database-url>
DB_HOST=<your-db-host>
DB_PORT=5432
DB_NAME=dropit
DB_USER=<your-db-user>
DB_PASSWORD=<your-db-password>

# JWT Secret (generate a strong random string)
JWT_SECRET=<generate-strong-random-32-char-string>
JWT_EXPIRES_IN=7d

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<your-email@gmail.com>
EMAIL_PASSWORD=<your-gmail-app-password>
EMAIL_FROM=noreply@dropit.com

# Server
PORT=5000
NODE_ENV=production

# Frontend URL (update after deploying frontend)
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Instance Type
- **Free** (for testing)
- **Starter** or higher (for production)

4. Click **"Create Web Service"**

## Step 4: Setup Gmail App Password

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Go to **App Passwords**
5. Select **Mail** and **Other (Custom name)**
6. Name it "DropIt Backend"
7. Click **Generate**
8. Copy the 16-character password
9. Add it to Render environment variables as `EMAIL_PASSWORD`

## Step 5: Generate Strong JWT Secret

```bash
# On Mac/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and add it as `JWT_SECRET` in Render.

## Step 6: Deploy

1. Render will automatically deploy after you create the service
2. Monitor the deployment logs
3. Wait for "Build successful" and "Deploy live"
4. Your API will be available at: `https://dropit-api.onrender.com`

## Step 7: Test Your Deployment

### Test Health Endpoint
```bash
curl https://dropit-api.onrender.com/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "DropIt API is running"
}
```

### Test Registration
```bash
curl -X POST https://dropit-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "role": "REQUESTER"
  }'
```

### Check Email
You should receive a verification email at the registered address.

## Step 8: Deploy Frontend

### Update Frontend Environment Variables

Create `.env.production` in frontend:
```env
VITE_API_URL=https://dropit-api.onrender.com/api
VITE_WALLETCONNECT_PROJECT_ID=your-project-id
```

### Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add environment variables from `.env.production`
6. Click **"Deploy"**

### Update Backend FRONTEND_URL

1. Go back to Render dashboard
2. Open your web service
3. Go to **Environment**
4. Update `FRONTEND_URL` to your Vercel URL: `https://your-app.vercel.app`
5. Save changes (this will trigger a redeploy)

## Step 9: Run Migrations

Migrations should run automatically during build. If they don't:

1. Go to Render dashboard
2. Open your web service
3. Go to **Shell** tab
4. Run:
```bash
npm run migrate
```

## Troubleshooting

### Build Fails

**Check logs for errors:**
- Missing dependencies? Run `npm install` locally first
- TypeScript errors? Run `npm run build` locally
- Migration errors? Check database connection

**Common fixes:**
```bash
# Clear build cache
rm -rf node_modules dist
npm install
npm run build
```

### Database Connection Error

1. Verify database credentials in environment variables
2. Use **Internal Database URL** (not External)
3. Check database is running in Render dashboard
4. Verify IP whitelist (Render IPs should be auto-allowed)

### Email Not Sending

1. Verify Gmail App Password is correct
2. Check 2FA is enabled on Gmail
3. Test email locally first
4. Check Render logs for email errors

### Migration Errors

```bash
# In Render Shell
npm run migrate:status  # Check which migrations ran
npm run migrate:undo    # Undo last migration if needed
npm run migrate         # Run migrations again
```

## Monitoring

### View Logs
1. Go to Render dashboard
2. Open your web service
3. Click **"Logs"** tab
4. Monitor real-time logs

### Set Up Alerts
1. Go to **Settings** → **Notifications**
2. Add email for deployment notifications
3. Enable failure alerts

## Scaling

### Free Tier Limitations
- Spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- 750 hours/month free

### Upgrade for Production
1. Go to **Settings** → **Instance Type**
2. Choose **Starter** ($7/month) or higher
3. Benefits:
   - Always on
   - Faster response times
   - More resources
   - Custom domains

## Custom Domain (Optional)

1. Go to **Settings** → **Custom Domains**
2. Click **"Add Custom Domain"**
3. Enter your domain: `api.yourdomain.com`
4. Add DNS records to your domain provider:
   ```
   Type: CNAME
   Name: api
   Value: dropit-api.onrender.com
   ```
5. Wait for DNS propagation (5-30 minutes)
6. SSL certificate will be auto-generated

## Backup Strategy

### Database Backups
1. Render automatically backs up PostgreSQL
2. Free tier: 7-day retention
3. Paid tiers: Longer retention + manual backups

### Manual Backup
```bash
# Export database
pg_dump -h <host> -U <user> -d <database> > backup.sql

# Import database
psql -h <host> -U <user> -d <database> < backup.sql
```

## Environment-Specific Configs

### Development
```env
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Production
```env
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

## Cost Estimate

### Free Tier
- PostgreSQL: Free (1GB storage)
- Web Service: Free (750 hours/month)
- **Total: $0/month**

### Production Tier
- PostgreSQL: $7/month (10GB storage)
- Web Service: $7/month (Starter)
- **Total: $14/month**

## Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com/
- GitHub Issues: https://github.com/your-repo/issues

---

🚚 **DropIt - Deployed and ready to deliver trust on-chain!**

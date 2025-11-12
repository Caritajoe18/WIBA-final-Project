# Migration to Supabase Auth

This guide explains how to migrate from custom email verification to Supabase Auth.

## What Changed

### Before (Custom Auth)
- Custom email verification with tokens
- Password stored in database (hashed)
- Custom JWT tokens
- Nodemailer for sending emails

### After (Supabase Auth)
- Supabase handles email verification
- Passwords managed by Supabase
- Supabase session tokens
- Supabase sends verification emails

## Database Changes

### Removed Fields
- `password` - Now handled by Supabase Auth
- `email_verification_token` - Supabase handles verification
- `email_verification_expires` - Supabase handles expiration
- `is_email_verified` - Check via Supabase Auth

### Added Fields
- `supabase_user_id` (UUID) - Links to Supabase Auth user

## Setup Steps

### 1. Configure Supabase

1. Go to your Supabase project dashboard
2. Navigate to Authentication → Settings
3. Configure email templates (optional)
4. Get your credentials:
   - Project URL
   - Anon Key
   - Service Role Key

### 2. Update Environment Variables

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Run Migrations

```bash
cd backend
npm run migrate
```

This will:
- Add `supabase_user_id` column
- Remove `password`, `email_verification_token`, `email_verification_expires`
- Add necessary indexes

## API Changes

### Registration

**Before:**
```javascript
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "REQUESTER"
}

Response:
{
  "message": "Registration successful. Please check your email...",
  "userId": "uuid"
}
```

**After:**
```javascript
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "REQUESTER"
}

Response:
{
  "message": "Registration successful. Please check your email...",
  "userId": "uuid",
  "supabaseUserId": "supabase-uuid"
}
```

### Login

**Before:**
```javascript
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt-token",
  "user": { ... }
}
```

**After:**
```javascript
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "session": {
    "access_token": "supabase-token",
    "refresh_token": "refresh-token",
    "expires_in": 3600
  },
  "user": { ... }
}
```

### Email Verification

**Before:**
```javascript
POST /api/auth/verify-email
{
  "token": "verification-token"
}
```

**After:**
Supabase handles this automatically via email link.
The callback URL is: `${FRONTEND_URL}/auth/callback`

## Frontend Changes

### 1. Install Supabase Client

```bash
cd frontend
npm install @supabase/supabase-js
```

### 2. Create Supabase Client

```typescript
// frontend/src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 3. Update API Client

```typescript
// frontend/src/lib/api.ts
import { supabase } from './supabase';

class ApiClient {
  async register(data: RegisterData) {
    // Register with Supabase
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          role: data.role,
        },
      },
    });

    if (error) throw error;

    // Also create record in your backend
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;

    // Store session
    if (authData.session) {
      this.setToken(authData.session.access_token);
    }

    return authData;
  }

  async logout() {
    await supabase.auth.signOut();
    this.clearToken();
  }
}
```

### 4. Create Auth Callback Page

```typescript
// frontend/src/pages/AuthCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  return <div>Verifying email...</div>;
}
```

### 5. Update Routes

```typescript
// frontend/src/App.tsx
<Route path="/auth/callback" element={<AuthCallback />} />
```

## Benefits of Supabase Auth

1. **Built-in Email Verification** - No need to manage tokens
2. **Secure Password Storage** - Handled by Supabase
3. **Session Management** - Automatic token refresh
4. **Social Auth Ready** - Easy to add Google, GitHub, etc.
5. **Rate Limiting** - Built-in protection
6. **Email Templates** - Customizable in dashboard
7. **MFA Support** - Can enable 2FA easily
8. **Audit Logs** - Track auth events

## Testing

### 1. Register New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "role": "REQUESTER"
  }'
```

### 2. Check Email

User receives email from Supabase with verification link.

### 3. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. Use Session Token

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <supabase-access-token>"
```

## Troubleshooting

### Email Not Sending

1. Check Supabase dashboard → Authentication → Email Templates
2. Verify SMTP settings (if using custom SMTP)
3. Check spam folder
4. Verify email redirect URL is correct

### Token Invalid

1. Check token hasn't expired (default 1 hour)
2. Use refresh token to get new access token
3. Verify Supabase URL and keys are correct

### User Not Found

1. Ensure user record created in both Supabase Auth and your database
2. Check `supabase_user_id` matches
3. Verify migration ran successfully

## Rollback

If you need to rollback:

```bash
cd backend
npm run migrate:undo
```

This will restore the old schema with password and email verification fields.

## Support

- Supabase Docs: https://supabase.com/docs/guides/auth
- Supabase Discord: https://discord.supabase.com/

---

🚚 **DropIt - Now powered by Supabase Auth**

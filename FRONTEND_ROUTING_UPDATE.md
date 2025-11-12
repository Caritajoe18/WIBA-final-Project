# Frontend Routing Update

## Landing Page Changed

The landing page has been updated to use the **Welcome** page instead of the Home page.

## New Routing Structure

```
/ (root)
  └─> Welcome Page (Landing)
        ├─> Get Started → /profile-setup
        │     ├─> Continue as Requester → /home
        │     └─> Register as Tasker → /tasker-registration
        │
        └─> Explore Tasks → /home

/home
  └─> Task Discovery (Browse available tasks)
        ├─> Login → /login
        └─> Sign Up → /register

/profile-setup
  └─> Choose Role (Requester or Tasker)

/tasker-registration
  └─> Tasker-specific registration with KYC

/register
  └─> General registration → /verify-email

/login
  └─> Login → /dashboard

/verify-email
  └─> Email verification → /dashboard

/dashboard
  └─> User dashboard with profile and wallet
```

## Pages Overview

### 1. Welcome (/) - Landing Page
**Purpose:** First page visitors see

**Features:**
- Hero section with background image
- Value propositions (6 cards):
  - Hyperlocal Delivery
  - Verified & Trusted
  - Instant Payments
  - Earn on Your Terms
  - Community-Powered
  - On-Demand Speed
- CTA buttons:
  - "Get Started" → Profile Setup
  - "Explore Tasks" → Home
- Stats section (10K+ users, 50K+ tasks, 99% success)

### 2. Profile Setup (/profile-setup)
**Purpose:** Choose between Requester or Tasker role

**Features:**
- Two role cards:
  - **Requester (I Need Help)**
    - Post tasks
    - No KYC required
    - Wallet required
    - Button: "Continue as Requester" → /home
  
  - **Tasker (I Want to Earn)**
    - Complete tasks
    - KYC required
    - Earn crypto
    - Buttons:
      - "Register as Tasker" → /tasker-registration
      - "Browse Tasks First" → /home

### 3. Home (/home)
**Purpose:** Task discovery and browsing

**Features:**
- Search bar
- Filter button
- Stats bar (Active Tasks, Nearby, Today)
- Task cards with:
  - Title, description
  - Location, distance
  - Deadline
  - Price in USDC
  - Requester info
- Login/Sign Up buttons in header

### 4. Register (/register)
**Purpose:** General user registration

**Features:**
- Email/password registration
- Role selection
- Email verification flow
- Link to login

### 5. Tasker Registration (/tasker-registration)
**Purpose:** Tasker-specific registration with KYC

**Features:**
- (To be implemented)
- KYC verification
- Background check
- Wallet connection

### 6. Login (/login)
**Purpose:** User authentication

**Features:**
- Email/password login
- Email verification check
- Links to register and forgot password

### 7. Verify Email (/verify-email)
**Purpose:** Email verification

**Features:**
- Token validation
- Success/error states
- Auto-redirect to dashboard

### 8. Dashboard (/dashboard)
**Purpose:** User profile and management

**Features:**
- Profile header
- Stats (reputation, tasks, success rate)
- Wallet connection
- KYC status
- Account settings
- Quick actions

## User Flows

### New User Flow (Requester)
```
1. Visit / (Welcome)
2. Click "Get Started"
3. Choose "Continue as Requester" on /profile-setup
4. Browse tasks on /home
5. Click "Sign Up" to register
6. Complete registration on /register
7. Verify email on /verify-email
8. Redirected to /dashboard
9. Connect wallet
10. Start creating tasks
```

### New User Flow (Tasker)
```
1. Visit / (Welcome)
2. Click "Get Started"
3. Choose "Register as Tasker" on /profile-setup
4. Complete tasker registration on /tasker-registration
5. Complete KYC verification
6. Verify email
7. Redirected to /dashboard
8. Connect wallet
9. Start accepting tasks
```

### Returning User Flow
```
1. Visit / (Welcome)
2. Click "Explore Tasks" or navigate to /home
3. Click "Login"
4. Enter credentials on /login
5. Redirected to /dashboard
6. Browse or create tasks
```

## Design Consistency

All pages follow the mobile-first design pattern:
- Max width: 512px (max-w-lg) for forms
- Max width: 896px (max-w-4xl) for content pages
- Sticky header with navigation
- Card-based layouts
- Consistent spacing and shadows
- Touch-friendly buttons

## Environment Setup

No additional environment variables needed for routing.

## Testing Checklist

- [ ] Welcome page loads at /
- [ ] "Get Started" navigates to /profile-setup
- [ ] "Explore Tasks" navigates to /home
- [ ] Profile setup role selection works
- [ ] Requester path navigates correctly
- [ ] Tasker path navigates correctly
- [ ] Home page shows tasks
- [ ] Login/Sign Up buttons work
- [ ] Registration flow completes
- [ ] Email verification works
- [ ] Dashboard loads after login
- [ ] All back buttons work
- [ ] Mobile responsive
- [ ] Hero image loads

## Next Steps

1. **Implement TaskerRegistration page** with:
   - KYC document upload
   - Background check
   - Verification flow

2. **Add authentication guards**:
   - Protect /dashboard route
   - Redirect unauthenticated users
   - Check email verification

3. **Add task creation**:
   - Task creation form
   - Payment setup
   - Location selection

4. **Add task detail page**:
   - Task information
   - Accept task button
   - Chat with requester

---

🚚 **DropIt - Welcome page is now the landing page!**

# Create Profile Page

## Overview

A comprehensive profile creation page that follows the Welcome/ProfileSetup design pattern with a 3-step process:
1. Profile Information
2. Wallet Connection
3. Success Confirmation

## Features

### Step 1: Profile Information
- **Fields:**
  - First Name (required)
  - Last Name (required)
  - Email (required, validated)
  - Phone Number (optional)
  - Password (required, min 8 chars)
  - Confirm Password (required, must match)
  - Role (passed via URL parameter)

- **Validation:**
  - Zod schema validation
  - Real-time error messages
  - Password strength check
  - Email format validation

- **Design:**
  - Card-based layout
  - Icon indicators
  - Role badge display
  - Gradient background

### Step 2: Wallet Connection
- **Wallet Providers:**
  - MetaMask
  - WalletConnect
  - Coinbase Wallet
  - Any Wagmi-supported connector

- **Features:**
  - Connect wallet button for each provider
  - Connected wallet display
  - Disconnect option
  - Skip option (can connect later)

- **Design:**
  - Wallet icon
  - Provider buttons
  - Connection status indicator
  - Skip option

### Step 3: Success Confirmation
- **Information Displayed:**
  - Success message
  - Email verification reminder
  - Wallet connection status
  - Next steps based on role

- **Actions:**
  - "Go to Login" button
  - Redirects to login page

## User Flow

### Requester Flow
```
1. Welcome → Get Started
2. Profile Setup → Continue as Requester
3. Create Profile (?role=REQUESTER)
   - Fill profile form
   - Connect wallet (optional)
   - Success confirmation
4. Login → Dashboard
5. Start creating tasks
```

### Tasker Flow
```
1. Welcome → Get Started
2. Profile Setup → Register as Tasker
3. Create Profile (?role=TASKER)
   - Fill profile form
   - Connect wallet (required for payments)
   - Success confirmation
4. Login → Dashboard
5. Complete KYC verification
6. Start accepting tasks
```

## Design Pattern

Matches the Welcome and ProfileSetup pages:
- **Background:** Gradient overlay
- **Logo:** Primary color with Package icon
- **Progress Indicator:** 3-step dots
- **Cards:** Backdrop blur with border
- **Icons:** Colored backgrounds
- **Buttons:** Large, prominent CTAs
- **Footer:** Centered tagline

## Technical Implementation

### Form Handling
- React Hook Form for form state
- Zod for validation
- Real-time error display

### Wallet Integration
- Wagmi hooks (useAccount, useConnect, useDisconnect)
- Multi-provider support
- Connection state management

### API Integration
- Registration API call
- Error handling with toast notifications
- Success state management

### State Management
- Step progression (profile → wallet → success)
- Form data persistence
- Wallet connection state

## API Integration

### Registration Endpoint
```typescript
POST /api/auth/register
{
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber?: string,
  role: 'REQUESTER' | 'TASKER'
}
```

### Response
```typescript
{
  message: string,
  userId: string
}
```

## Routing

### URL Parameters
- `?role=REQUESTER` - For requester registration
- `?role=TASKER` - For tasker registration

### Navigation
- From: `/profile-setup`
- To: `/create-profile?role=REQUESTER` or `/create-profile?role=TASKER`
- Success: `/login`
- Back: `/profile-setup`

## Components Used

### UI Components
- Button
- Input
- Label
- Card (CardContent, CardDescription, CardHeader, CardTitle)

### Icons (lucide-react)
- Package (logo)
- User (profile step)
- Mail (email field)
- Phone (phone field)
- Wallet (wallet step)
- Loader2 (loading state)
- CheckCircle (success step)

### Hooks
- useNavigate (routing)
- useSearchParams (URL parameters)
- useForm (form handling)
- useAccount, useConnect, useDisconnect (wallet)
- useToast (notifications)

## Validation Rules

### Email
- Must be valid email format
- Required field

### Password
- Minimum 8 characters
- Must match confirmation
- Required field

### Name Fields
- Minimum 2 characters
- Required fields

### Phone Number
- Optional field
- No specific format validation (flexible for international)

## Error Handling

### Form Errors
- Displayed below each field
- Red text color
- Clear error messages

### API Errors
- Toast notification
- Descriptive error message
- Retry option (stay on form)

### Wallet Errors
- Toast notification
- Option to try different provider
- Skip option available

## Success States

### Profile Created
- Success message
- Email verification reminder
- Next steps guidance

### Wallet Connected
- Green indicator
- Address display (truncated)
- Disconnect option

## Mobile Responsive

- Max width: 896px (max-w-2xl)
- Centered layout
- Touch-friendly buttons
- Stacked form fields
- Responsive grid for name fields

## Accessibility

- Proper label associations
- Error announcements
- Keyboard navigation
- Focus management
- ARIA attributes

## Testing Checklist

- [ ] Form validation works
- [ ] Email format validation
- [ ] Password match validation
- [ ] Required fields enforced
- [ ] API registration succeeds
- [ ] Email verification sent
- [ ] Wallet connection works (MetaMask)
- [ ] Wallet connection works (WalletConnect)
- [ ] Wallet connection works (Coinbase)
- [ ] Skip wallet option works
- [ ] Success state displays
- [ ] Navigation to login works
- [ ] Back button works
- [ ] Progress indicator updates
- [ ] Toast notifications appear
- [ ] Mobile responsive
- [ ] Error handling works

## Future Enhancements

1. **Profile Picture Upload**
   - Add image upload field
   - Preview before upload
   - Store in cloud storage

2. **Social Login**
   - Google OAuth
   - GitHub OAuth
   - Twitter OAuth

3. **Password Strength Indicator**
   - Visual strength meter
   - Requirements checklist
   - Suggestions for strong password

4. **Email Verification in Flow**
   - Verify email before wallet step
   - Send OTP code
   - Verify code input

5. **KYC Integration**
   - For taskers, add KYC step
   - Document upload
   - Face verification

## Environment Variables

No additional environment variables needed beyond existing:
- `VITE_API_URL` - Backend API URL
- `VITE_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID

---

🚚 **DropIt - Streamlined profile creation with wallet integration!**

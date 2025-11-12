# DropIt API Reference - Authentication

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### 1. Register User

**POST** `/auth/register`

Create a new user account.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "role": "REQUESTER"
  }'
```

**Response (201):**
```json
{
  "message": "Registration successful. Please check your email to verify your account.",
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

### 2. Login

**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "REQUESTER",
    "walletAddress": null,
    "kycStatus": "PENDING",
    "reputationScore": 0
  }
}
```

---

### 3. Verify Email

**POST** `/auth/verify-email`

Verify user email with token from email.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "token": "a1b2c3d4e5f6..."
  }'
```

**Response (200):**
```json
{
  "message": "Email verified successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "REQUESTER",
    "isEmailVerified": true
  }
}
```

---

### 4. Resend Verification Email

**POST** `/auth/resend-verification`

Resend verification email to user.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/resend-verification \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

**Response (200):**
```json
{
  "message": "Verification email sent"
}
```

---

### 5. Connect Wallet

**POST** `/auth/connect-wallet` 🔒

Link crypto wallet to user account. Requires authentication.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/connect-wallet \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678"
  }'
```

**Response (200):**
```json
{
  "message": "Wallet connected successfully",
  "walletAddress": "0x1234567890abcdef1234567890abcdef12345678"
}
```

---

### 6. Get Profile

**GET** `/auth/profile` 🔒

Get authenticated user's profile. Requires authentication.

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "role": "REQUESTER",
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "isEmailVerified": true,
    "kycStatus": "PENDING",
    "kycHash": null,
    "didRecord": null,
    "profileImage": null,
    "reputationScore": 0,
    "isActive": true,
    "createdAt": "2025-11-12T10:30:00.000Z",
    "updatedAt": "2025-11-12T10:35:00.000Z"
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Email and password are required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Please verify your email before logging in"
}
```

### 404 Not Found
```json
{
  "error": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Registration failed"
}
```

---

## Authentication

Protected endpoints (marked with 🔒) require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Get the token from:
- Login response
- Email verification response

Store the token securely (localStorage, sessionStorage, or secure cookie).

---

## User Roles

- **REQUESTER**: Customer who creates tasks
- **TASKER**: Rider/agent who completes tasks
- **VERIFIER**: Validates KYC and mediates disputes
- **ADMIN**: Full system access

---

## KYC Status

- **PENDING**: KYC not yet completed
- **VERIFIED**: KYC approved
- **REJECTED**: KYC rejected

---

## Rate Limiting

(To be implemented)

- 100 requests per 15 minutes per IP
- 5 login attempts per 15 minutes per email

---

## Postman Collection

Import this collection to test the API:

```json
{
  "info": {
    "name": "DropIt Auth API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\",\n  \"firstName\": \"Test\",\n  \"lastName\": \"User\",\n  \"role\": \"REQUESTER\"\n}"
        },
        "url": "http://localhost:5000/api/auth/register"
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": "http://localhost:5000/api/auth/login"
      }
    }
  ]
}
```

---

**Need help?** Check SETUP_GUIDE.md or REGISTRATION_FEATURE.md

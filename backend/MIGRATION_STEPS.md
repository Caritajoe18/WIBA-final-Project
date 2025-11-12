# Migration Steps

## Quick Start

### 1. Undo All Existing Migrations (if any)

```bash
cd backend
npm run migrate:undo:all
```

### 2. Run All Migrations

```bash
npm run migrate
```

This will create all tables in order:
1. **users** - User accounts with authentication
2. **tasks** - Task/delivery management
3. **reviews** - User reviews and ratings
4. **disputes** - Dispute resolution

### 3. Check Migration Status

```bash
npm run migrate:status
```

Expected output:
```
up 20251112000001-create-users-table.js
up 20251112000002-create-tasks-table.js
up 20251112000003-create-reviews-table.js
up 20251112000004-create-disputes-table.js
```

## Database Schema Created

### Users Table
- id (UUID)
- email (unique)
- password (hashed)
- role (REQUESTER, TASKER, VERIFIER, ADMIN)
- wallet_address (unique, optional)
- is_email_verified (boolean)
- email_verification_token
- email_verification_expires
- kyc_status (PENDING, VERIFIED, REJECTED)
- kyc_hash
- did_record
- first_name, last_name, phone_number
- profile_image
- reputation_score
- is_active
- created_at, updated_at

### Tasks Table
- id (UUID)
- requester_id (FK to users)
- tasker_id (FK to users)
- title, description
- category (DELIVERY, PICKUP, ERRAND, OTHER)
- status (OPEN, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED, DISPUTED)
- pickup_location, pickup_latitude, pickup_longitude
- delivery_location, delivery_latitude, delivery_longitude
- payment_amount, payment_currency
- escrow_tx_hash, completion_tx_hash
- deadline
- proof_of_delivery
- notes
- created_at, updated_at

### Reviews Table
- id (UUID)
- task_id (FK to tasks)
- reviewer_id (FK to users)
- reviewee_id (FK to users)
- rating (1-5)
- comment
- review_hash (on-chain)
- created_at, updated_at

### Disputes Table
- id (UUID)
- task_id (FK to tasks)
- raised_by (FK to users)
- resolved_by (FK to users)
- reason
- status (OPEN, UNDER_REVIEW, RESOLVED, REJECTED)
- resolution
- evidence
- resolution_tx_hash
- resolved_at
- created_at, updated_at

## Troubleshooting

### If migration fails:

1. **Check database connection:**
```bash
# Verify .env has correct credentials
cat .env | grep DB_
```

2. **Undo last migration:**
```bash
npm run migrate:undo
```

3. **Undo all and start fresh:**
```bash
npm run migrate:undo:all
npm run migrate
```

### If table already exists:

```bash
# Drop all tables manually (CAUTION: Deletes all data!)
npm run migrate:undo:all

# Or connect to database and drop manually
psql "postgresql://user:pass@host:5432/db"
DROP TABLE IF EXISTS disputes CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS enum_users_role CASCADE;
DROP TYPE IF EXISTS enum_users_kyc_status CASCADE;
DROP TYPE IF EXISTS enum_tasks_category CASCADE;
DROP TYPE IF EXISTS enum_tasks_status CASCADE;
DROP TYPE IF EXISTS enum_disputes_status CASCADE;
\q

# Then run migrations
npm run migrate
```

## Verify Tables Created

```bash
# Connect to database
psql "postgresql://user:pass@host:5432/db"

# List all tables
\dt

# Describe users table
\d users

# Describe tasks table
\d tasks

# Describe reviews table
\d reviews

# Describe disputes table
\d disputes

# Exit
\q
```

## Next Steps

After migrations are successful:

1. **Start the server:**
```bash
npm run dev
```

2. **Test registration:**
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

3. **Check database:**
```bash
psql "postgresql://user:pass@host:5432/db"
SELECT * FROM users;
\q
```

---

🚚 **DropIt - Database ready!**

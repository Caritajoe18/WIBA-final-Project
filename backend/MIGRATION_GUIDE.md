# Database Migration Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install sequelize-cli --save
```

### 2. Configure Database

Update `.env` with your Supabase PostgreSQL credentials:

```env
DB_HOST=db.your-project.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-password

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Run Migrations

```bash
# Run all pending migrations
npm run migrate

# Check migration status
npm run migrate:status

# Undo last migration
npm run migrate:undo

# Undo all migrations
npm run migrate:undo:all
```

## Available Migrations

### 1. Create Users Table (20251112000001)
Creates the main users table with:
- Basic user info (email, name, phone)
- Role (REQUESTER, TASKER, VERIFIER, ADMIN)
- KYC status and hash
- Wallet address
- Reputation score
- Timestamps

### 2. Create Tasks Table (20251112000002)
Creates tasks table with:
- Task details (title, description, category)
- Locations (pickup/delivery with coordinates)
- Payment info (amount, currency, tx hashes)
- Status tracking
- Foreign keys to users

### 3. Create Reviews Table (20251112000003)
Creates reviews table with:
- Rating (1-5)
- Comment
- On-chain hash
- Foreign keys to task and users
- Unique constraint (one review per task per user)

### 4. Create Disputes Table (20251112000004)
Creates disputes table with:
- Reason and evidence
- Status (OPEN, UNDER_REVIEW, RESOLVED, REJECTED)
- Resolution details
- Foreign keys to task and users

### 5. Update for Supabase Auth (20251112000005)
Updates users table for Supabase Auth:
- Adds `supabase_user_id` column
- Removes `password` column
- Removes email verification columns

## Migration Commands

```bash
# Development
npm run migrate              # Run all pending migrations
npm run migrate:status       # Check which migrations have run
npm run migrate:undo         # Undo last migration
npm run migrate:undo:all     # Undo all migrations

# Create new migration
npx sequelize-cli migration:generate --name migration-name
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  supabase_user_id UUID UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role ENUM('REQUESTER', 'TASKER', 'VERIFIER', 'ADMIN'),
  wallet_address VARCHAR(255) UNIQUE,
  kyc_status ENUM('PENDING', 'VERIFIED', 'REJECTED'),
  kyc_hash VARCHAR(255),
  did_record TEXT,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  phone_number VARCHAR(50),
  profile_image VARCHAR(255),
  reputation_score FLOAT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  requester_id UUID REFERENCES users(id),
  tasker_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category ENUM('DELIVERY', 'PICKUP', 'ERRAND', 'OTHER'),
  status ENUM('OPEN', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED'),
  pickup_location VARCHAR(500),
  pickup_latitude DECIMAL(10,8),
  pickup_longitude DECIMAL(11,8),
  delivery_location VARCHAR(500),
  delivery_latitude DECIMAL(10,8),
  delivery_longitude DECIMAL(11,8),
  payment_amount DECIMAL(20,8),
  payment_currency VARCHAR(10),
  escrow_tx_hash VARCHAR(255),
  completion_tx_hash VARCHAR(255),
  deadline TIMESTAMP,
  proof_of_delivery TEXT,
  notes TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  task_id UUID REFERENCES tasks(id),
  reviewer_id UUID REFERENCES users(id),
  reviewee_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  review_hash VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE(task_id, reviewer_id)
);
```

### Disputes Table
```sql
CREATE TABLE disputes (
  id UUID PRIMARY KEY,
  task_id UUID REFERENCES tasks(id),
  raised_by UUID REFERENCES users(id),
  resolved_by UUID REFERENCES users(id),
  reason TEXT NOT NULL,
  status ENUM('OPEN', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'),
  resolution TEXT,
  evidence TEXT,
  resolution_tx_hash VARCHAR(255),
  resolved_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Troubleshooting

### Migration Failed

```bash
# Check migration status
npm run migrate:status

# Undo failed migration
npm run migrate:undo

# Fix the migration file
# Then run again
npm run migrate
```

### Database Connection Error

1. Check `.env` file has correct credentials
2. Verify Supabase database is running
3. Check IP is whitelisted in Supabase
4. Test connection:

```bash
psql "postgresql://postgres:password@db.project.supabase.co:5432/postgres"
```

### Table Already Exists

```bash
# Drop all tables (CAUTION: This deletes all data!)
npm run migrate:undo:all

# Then run migrations again
npm run migrate
```

## Best Practices

1. **Always backup before migrating production**
2. **Test migrations in development first**
3. **Never edit migration files after they've run**
4. **Create new migrations for schema changes**
5. **Use transactions in migrations**
6. **Add indexes for foreign keys**
7. **Document complex migrations**

## Next Steps

After running migrations:

1. Update models to match schema
2. Test CRUD operations
3. Seed database with test data (optional)
4. Run application and verify

---

🚚 **DropIt - Database ready for decentralized logistics**

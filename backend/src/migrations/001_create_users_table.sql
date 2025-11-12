-- Migration: Create Users Table
-- Description: Initial users table with Supabase Auth integration
-- Date: 2025-11-12

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('REQUESTER', 'TASKER', 'VERIFIER', 'ADMIN');
CREATE TYPE kyc_status AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Supabase Auth Integration
    supabase_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Basic Info
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(50),
    profile_image VARCHAR(500),
    
    -- Role & Status
    role user_role NOT NULL DEFAULT 'REQUESTER',
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Wallet & Blockchain
    wallet_address VARCHAR(255) UNIQUE,
    did_record TEXT,
    
    -- KYC
    kyc_status kyc_status DEFAULT 'PENDING',
    kyc_hash VARCHAR(255),
    kyc_verified_at TIMESTAMP,
    kyc_verified_by UUID REFERENCES users(id),
    
    -- Reputation
    reputation_score FLOAT DEFAULT 0.0,
    total_tasks_completed INTEGER DEFAULT 0,
    total_tasks_created INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login_at TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_wallet_address ON users(wallet_address);
CREATE INDEX idx_users_supabase_user_id ON users(supabase_user_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_kyc_status ON users(kyc_status);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE users IS 'Main users table integrated with Supabase Auth';
COMMENT ON COLUMN users.supabase_user_id IS 'Reference to Supabase Auth user ID';
COMMENT ON COLUMN users.wallet_address IS 'Connected Web3 wallet address';
COMMENT ON COLUMN users.did_record IS 'Decentralized Identity record (JSON)';
COMMENT ON COLUMN users.kyc_hash IS 'On-chain KYC verification hash';
COMMENT ON COLUMN users.reputation_score IS 'User reputation score (0-100)';

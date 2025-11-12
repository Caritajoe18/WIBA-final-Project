#!/bin/bash

# DropIt - Install Dependencies Script

echo "🚚 DropIt - Installing Dependencies..."
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm found${NC}"
echo ""

# Install backend dependencies
echo -e "${YELLOW}📦 Installing Backend Dependencies...${NC}"
cd backend
if npm install; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi
cd ..
echo ""

# Install frontend dependencies
echo -e "${YELLOW}📦 Installing Frontend Dependencies...${NC}"
cd frontend
if npm install; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

# Install additional frontend dependencies
echo -e "${YELLOW}📦 Installing Wagmi and Web3 dependencies...${NC}"
if npm install wagmi viem @tanstack/react-query; then
    echo -e "${GREEN}✓ Web3 dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install Web3 dependencies${NC}"
    exit 1
fi
cd ..
echo ""

# Check for .env files
echo -e "${YELLOW}🔍 Checking environment files...${NC}"

if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}⚠️  Backend .env not found. Creating from example...${NC}"
    if [ -f backend/.env.example ]; then
        cp backend/.env.example backend/.env
        echo -e "${GREEN}✓ Created backend/.env${NC}"
        echo -e "${YELLOW}⚠️  Please edit backend/.env with your credentials${NC}"
    else
        echo -e "${RED}❌ backend/.env.example not found${NC}"
    fi
else
    echo -e "${GREEN}✓ Backend .env exists${NC}"
fi

if [ ! -f frontend/.env ]; then
    echo -e "${YELLOW}⚠️  Frontend .env not found. Creating from example...${NC}"
    if [ -f frontend/.env.example ]; then
        cp frontend/.env.example frontend/.env
        echo -e "${GREEN}✓ Created frontend/.env${NC}"
        echo -e "${YELLOW}⚠️  Please edit frontend/.env with your API URL${NC}"
    else
        echo -e "${RED}❌ frontend/.env.example not found${NC}"
    fi
else
    echo -e "${GREEN}✓ Frontend .env exists${NC}"
fi

echo ""
echo -e "${GREEN}✅ Installation Complete!${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Configure backend/.env with your database and email credentials"
echo "2. Configure frontend/.env with your API URL"
echo "3. Run './start-dev.sh' to start development servers"
echo ""
echo -e "${YELLOW}For detailed setup instructions, see SETUP_GUIDE.md${NC}"

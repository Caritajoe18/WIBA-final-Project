# 🚚 TaskLogix — Decentralized Logistics & Task Marketplace

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![EVM Compatible](https://img.shields.io/badge/EVM-Compatible-blue)
![Built with Foundry](https://img.shields.io/badge/Built%20with-Foundry-orange)
![Powered by Base](https://img.shields.io/badge/Powered%20by-Base%20Network-0052FF)

> **TaskLogix** is a decentralized marketplace where verified individuals complete physical tasks (deliveries, errands, etc.) for others — powered by blockchain verification, escrow payments, and on-chain reputation.  
> Think of it as **“Bolt for Tasks”** — starting where traditional logistics stops.

---

## Vision

Enable people to request and complete real-world tasks (deliver flowers, pick up groceries, deliver packages, etc.) using verified, KYC’d individuals nearby — ensuring **trust, accountability, and transparent reputation**, all powered by blockchain.

---

## Project Structure

```

tasklogix/
├── frontend/         # React app for users & taskers
├── backend/          # Java or Node.js backend (off-chain ops)
├── smart-contract/   # Foundry Solidity contracts (on-chain logic)
├── README.md
└── .env.example

````

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| **Frontend** | React TailwindCSS | User-facing DApp UI |
| **Backend** | java / Node.js, PostgreSQL | Off-chain data & APIs |
| **Smart Contracts** | Solidity + Foundry | On-chain escrow, identity, reputation |
| **Blockchain** | Base (EVM L2) | Secure, fast, low-cost execution layer |
| **Storage** | IPFS + Cloud | Proofs and task metadata |
| **Web3 Middleware** | Alchemy / Ethers.js | Blockchain connectivity |

---

## 🌟 Core Features

### 🧍‍♂️ For Requesters
- Create & fund tasks via crypto escrow  
- Select verified nearby taskers  
- Track real-time progress  
- Confirm & release payment  
- Leave reviews (on-chain hashed)

### 🚴 For Taskers
- Complete KYC & verification  
- Accept one task at a time  
- Receive instant crypto payouts  
- Build immutable on-chain reputation  

### For Verifiers / DAO
- Manage KYC verifications  
- Resolve disputes  
- Update on-chain reputation & trust scores  

---

## 🔗 On-Chain Modules

| Contract | Purpose |
|-----------|----------|
| `Identity.sol` | Links verified users’ wallets to KYC hash |
| `TaskEscrow.sol` | Locks, releases, and manages task payments |
| `Reputation.sol` | Stores task ratings & performance history |
| `DisputeDAO.sol` | Manages on-chain dispute resolutions |

### Foundry Commands

```bash
# Compile contracts
cd smart-contract
forge build

# Run tests
forge test

# Deploy to Base testnet
forge script script/Deploy.s.sol \
  --rpc-url $BASE_TESTNET_RPC \
  --private-key $PRIVATE_KEY \
  --broadcast
````

---

## 🧩 Backend API

Handles off-chain functionality such as:

* Authentication (JWT)
* Real-time GPS tracking & chat
* KYC verification & face match
* IPFS uploads for proof-of-delivery
* Off-chain ↔ on-chain state sync

---

##  Frontend (React )

**Features**

* Web3 wallet connection (MetaMask / Coinbase Wallet)
* Task creation & map discovery
* Live status tracking + chat
* Wallet & reputation dashboard
* Admin/Verifier interface

```bash
cd frontend
npm install
npm run dev
```

Then visit **[http://localhost:3000](http://localhost:3000)**

---

<details>
<summary>🧪 Local Development Setup (Click to expand)</summary>

1️⃣ **Clone the repository**

```bash
git clone https://github.com/Caritajoe18/WIBA-final-Project.git
cd WIBA-final-Project
```

2️⃣ **Set up environment**

```bash
cp .env.example .env
```

Fill in your:

* RPC URLs (Base, Polygon, etc.)
* Private key for testnet
* Database connection string
* API keys (Alchemy, Pinata, etc.)

3️⃣ **Run each component**

```bash
# Smart contracts
cd smart-contract
forge build && forge test

# Backend
cd ../backend
npm install
npm run dev   # or uvicorn main:app --reload

# Frontend
cd ../frontend
npm install
npm run dev
```

4️⃣ **Connect wallet**
Open [http://localhost:3000](http://localhost:3000) and connect via MetaMask or Coinbase Wallet.

</details>

---

## ☁️ Deployment

| Component       | Platform                     |
| --------------- | ---------------------------- |
| Frontend        | Vercel / Netlify             |
| Backend         | Render / Railway / AWS       |
| Smart Contracts | Base / Polygon (via Alchemy) |
| Storage         | IPFS + Pinata                |

---

## 🧭 Roadmap

* [x] KYC Verification & Wallet Integration
* [x] Smart Contract Escrow & Payout
* [ ] DAO-based Dispute System
* [ ] Tasker Staking for Integrity
* [ ] Tokenized Rewards
* [ ] React Native Mobile App
* [ ] Multi-Chain Expansion (Polygon zkEVM, Arbitrum)

---

## 👥 Contributors

| Name    | Role                     | GitHub                                       |
| ------- | ------------------------ | -------------------------------------------- |
| **Proper-Progress** | Mentor | [@](https://github.com/) |
| **Carita**     | Developer |    [@caritajoe18](https://github.com/Caritajoe18) |                                      |
| **Confidence**      | Developer        |                                              |


---

## 🛡️ License

This project is licensed under the **MIT License**.
Feel free to use, modify, and build upon it.

---

##  Acknowledgments

* [Foundry](https://book.getfoundry.sh/) — Smart Contract Toolkit
* [OpenZeppelin](https://openzeppelin.com/contracts/) — Secure Solidity Contracts
* [Alchemy](https://www.alchemy.com/) — Blockchain Node & API Provider
* [Base](https://base.org/) — Ethereum L2 by Coinbase
* [IPFS](https://ipfs.tech/) — Decentralized File Storage

---

> *“Deliver trust. On-chain.”*
> Built with love for decentralized logistics.

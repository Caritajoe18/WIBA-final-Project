// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title OChain Decentralized Identity Registry
/// @notice Stores hashed KYC data, supports wallet rotation, and validator verification
contract DIDRegistry {
    /*//////////////////////////////////////////////////////////////
                               STRUCTS
    //////////////////////////////////////////////////////////////*/

    struct DID {
        bytes32 kycHash;        // hash of off-chain verified KYC data
        address primaryWallet;  // main wallet for user
        bool verified;          // verified by DAO or validator
        uint256 createdAt;      // timestamp
    }

    /*//////////////////////////////////////////////////////////////
                               STATE
    //////////////////////////////////////////////////////////////*/

    /// @notice maps a userId (UUID/email hash/mobile hash) to DID record
    mapping(bytes32 => DID) public didRecords;

    /// @notice maps a DID (kycHash) to all associated wallets
    mapping(bytes32 => address[]) public linkedWallets;

    /// @notice validators allowed to verify DIDs
    mapping(address => bool) public validators;

    address public owner;

    /*//////////////////////////////////////////////////////////////
                               EVENTS
    //////////////////////////////////////////////////////////////*/

    event DIDCreated(bytes32 indexed userId, bytes32 indexed kycHash, address primaryWallet);
    event WalletLinked(bytes32 indexed kycHash, address wallet);
    event WalletRemoved(bytes32 indexed kycHash, address wallet);
    event DIDVerified(bytes32 indexed kycHash, address validator);
    event ValidatorAdded(address validator);
    event ValidatorRemoved(address validator);

    /*//////////////////////////////////////////////////////////////
                               MODIFIERS
    //////////////////////////////////////////////////////////////*/

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyValidator() {
        require(validators[msg.sender], "Not validator");
        _;
    }

    modifier onlyLinkedWallet(bytes32 kycHash) {
        address[] memory wallets = linkedWallets[kycHash];
        bool authorized = false;
        for (uint256 i = 0; i < wallets.length; i++) {
            if (wallets[i] == msg.sender) {
                authorized = true;
                break;
            }
        }
        require(authorized, "Not linked wallet");
        _;
    }

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor() {
        owner = msg.sender;
    }

    /*//////////////////////////////////////////////////////////////
                               OWNER FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function addValidator(address _validator) external onlyOwner {
        validators[_validator] = true;
        emit ValidatorAdded(_validator);
    }

    function removeValidator(address _validator) external onlyOwner {
        validators[_validator] = false;
        emit ValidatorRemoved(_validator);
    }

    /*//////////////////////////////////////////////////////////////
                               CORE LOGIC
    //////////////////////////////////////////////////////////////*/

    /// @notice Create a new DID record (called after KYC hash computed off-chain)
    function createDID(bytes32 userId, bytes32 kycHash, address primaryWallet) external {
        require(didRecords[userId].createdAt == 0, "DID exists");

        didRecords[userId] = DID({
            kycHash: kycHash,
            primaryWallet: primaryWallet,
            verified: false,
            createdAt: block.timestamp
        });

        linkedWallets[kycHash].push(primaryWallet);

        emit DIDCreated(userId, kycHash, primaryWallet);
    }

    /// @notice Add a new wallet for an existing DID (wallet rotation)
    function linkWallet(bytes32 kycHash, address newWallet) external onlyLinkedWallet(kycHash) {
        linkedWallets[kycHash].push(newWallet);
        emit WalletLinked(kycHash, newWallet);
    }

    /// @notice Remove a wallet (if compromised)
    function removeWallet(bytes32 kycHash, address wallet) external onlyLinkedWallet(kycHash) {
        address[] storage wallets = linkedWallets[kycHash];
        for (uint256 i = 0; i < wallets.length; i++) {
            if (wallets[i] == wallet) {
                wallets[i] = wallets[wallets.length - 1];
                wallets.pop();
                emit WalletRemoved(kycHash, wallet);
                return;
            }
        }
        revert("Wallet not found");
    }

    /// @notice Mark a DID as verified (only validator)
    function verifyDID(bytes32 userId) external onlyValidator {
        DID storage record = didRecords[userId];
        require(record.createdAt != 0, "DID not found");
        record.verified = true;
        emit DIDVerified(record.kycHash, msg.sender);
    }

    /*//////////////////////////////////////////////////////////////
                               VIEW HELPERS
    //////////////////////////////////////////////////////////////*/

    function getLinkedWallets(bytes32 kycHash) external view returns (address[] memory) {
        return linkedWallets[kycHash];
    }

    function isWalletLinked(bytes32 kycHash, address wallet) external view returns (bool) {
        address[] memory wallets = linkedWallets[kycHash];
        for (uint256 i = 0; i < wallets.length; i++) {
            if (wallets[i] == wallet) return true;
        }
        return false;
    }
}

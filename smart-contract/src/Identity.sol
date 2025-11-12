// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title OChain Identity Registry (Off-chain wallet linking + on-chain proof)
/// @notice Links off-chain verified KYC data to on-chain DIDs, supports wallet ownership proofs
contract IdentityRegistry {
    /*//////////////////////////////////////////////////////////////
                               STRUCTS
    //////////////////////////////////////////////////////////////*/

    struct DIDRecord {
        bytes32 kycHash;        // hash of user's verified off-chain KYC data
        address primaryWallet;  // main wallet currently linked
        bool verified;          // verified by validator DAO
        uint256 createdAt;      // timestamp when DID was created
    }

    /*//////////////////////////////////////////////////////////////
                               STATE
    //////////////////////////////////////////////////////////////*/

    mapping(bytes32 => DIDRecord) public didRecords;          // userId → DIDRecord
    mapping(bytes32 => bytes32[]) public walletProofs;         // kycHash → array of wallet proof hashes
    mapping(address => bool) public validators;                // DAO or validator agents
    address public owner;

    /*//////////////////////////////////////////////////////////////
                               EVENTS
    //////////////////////////////////////////////////////////////*/

    event DIDCreated(bytes32 indexed userId, bytes32 indexed kycHash, address primaryWallet);
    event WalletLinkedProof(bytes32 indexed kycHash, bytes32 proofHash, address requestedBy);
    event DIDVerified(bytes32 indexed userId, address indexed validator);
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

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor() {
        owner = msg.sender;
    }

    /*//////////////////////////////////////////////////////////////
                               ADMIN FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function addValidator(address validator) external onlyOwner {
        validators[validator] = true;
        emit ValidatorAdded(validator);
    }

    function removeValidator(address validator) external onlyOwner {
        validators[validator] = false;
        emit ValidatorRemoved(validator);
    }

    /*//////////////////////////////////////////////////////////////
                               CORE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Create a new DID record (hash of verified off-chain data)
    function createDID(bytes32 userId, bytes32 kycHash, address primaryWallet) external {
        require(didRecords[userId].createdAt == 0, "DID already exists");

        didRecords[userId] = DIDRecord({
            kycHash: kycHash,
            primaryWallet: primaryWallet,
            verified: false,
            createdAt: block.timestamp
        });

        emit DIDCreated(userId, kycHash, primaryWallet);
    }

    /// @notice Submit an on-chain proof (hash of signed message proving new wallet ownership)
    /// @dev The proofHash = keccak256(signature or linking payload) generated off-chain
    function submitWalletProof(bytes32 kycHash, bytes32 proofHash) external {
        require(kycHash != bytes32(0), "Invalid KYC hash");
        require(proofHash != bytes32(0), "Invalid proof hash");

        walletProofs[kycHash].push(proofHash);
        emit WalletLinkedProof(kycHash, proofHash, msg.sender);
    }

    /// @notice DAO or validator approves DID after verifying KYC off-chain
    function verifyDID(bytes32 userId) external onlyValidator {
        DIDRecord storage record = didRecords[userId];
        require(record.createdAt != 0, "DID not found");
        record.verified = true;
        emit DIDVerified(userId, msg.sender);
    }

    /*//////////////////////////////////////////////////////////////
                               VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function getWalletProofs(bytes32 kycHash) external view returns (bytes32[] memory) {
        return walletProofs[kycHash];
    }

    function isVerified(bytes32 userId) external view returns (bool) {
        return didRecords[userId].verified;
    }

    function getPrimaryWallet(bytes32 userId) external view returns (address) {
        return didRecords[userId].primaryWallet;
    }
}

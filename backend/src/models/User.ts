import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export enum UserRole {
    REQUESTER = 'REQUESTER',
    TASKER = 'TASKER',
    VERIFIER = 'VERIFIER',
    ADMIN = 'ADMIN',
}

export enum KYCStatus {
    PENDING = 'PENDING',
    VERIFIED = 'VERIFIED',
    REJECTED = 'REJECTED',
}

interface UserAttributes {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    walletAddress?: string;
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    emailVerificationExpires?: Date | null;
    kycStatus: KYCStatus;
    kycHash?: string;
    didRecord?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profileImage?: string;
    reputationScore: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'isEmailVerified' | 'kycStatus' | 'reputationScore' | 'isActive'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public email!: string;
    public password!: string;
    public role!: UserRole;
    public walletAddress?: string;
    public isEmailVerified!: boolean;
    public emailVerificationToken?: string;
    public emailVerificationExpires?: Date | null;
    public kycStatus!: KYCStatus;
    public kycHash?: string;
    public didRecord?: string;
    public firstName?: string;
    public lastName?: string;
    public phoneNumber?: string;
    public profileImage?: string;
    public reputationScore!: number;
    public isActive!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: false,
            defaultValue: UserRole.REQUESTER,
        },
        walletAddress: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
            field: 'wallet_address',
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_email_verified',
        },
        emailVerificationToken: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'email_verification_token',
        },
        emailVerificationExpires: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'email_verification_expires',
        },
        kycStatus: {
            type: DataTypes.ENUM(...Object.values(KYCStatus)),
            defaultValue: KYCStatus.PENDING,
            field: 'kyc_status',
        },
        kycHash: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'kyc_hash',
        },
        didRecord: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'did_record',
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'first_name',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'last_name',
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'phone_number',
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'profile_image',
        },
        reputationScore: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            field: 'reputation_score',
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_active',
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        underscored: true,
    }
);

export default User;

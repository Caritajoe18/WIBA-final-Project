'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            role: {
                type: Sequelize.ENUM('REQUESTER', 'TASKER', 'VERIFIER', 'ADMIN'),
                allowNull: false,
                defaultValue: 'REQUESTER',
            },
            wallet_address: {
                type: Sequelize.STRING(255),
                unique: true,
                allowNull: true,
            },
            is_email_verified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            email_verification_token: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            email_verification_expires: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            kyc_status: {
                type: Sequelize.ENUM('PENDING', 'VERIFIED', 'REJECTED'),
                defaultValue: 'PENDING',
                allowNull: false,
            },
            kyc_hash: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            did_record: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            first_name: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            last_name: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            phone_number: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            profile_image: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            reputation_score: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
                allowNull: false,
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });

        // Add indexes for better query performance
        await queryInterface.addIndex('users', ['email']);
        await queryInterface.addIndex('users', ['wallet_address']);
        await queryInterface.addIndex('users', ['role']);
        await queryInterface.addIndex('users', ['kyc_status']);
        await queryInterface.addIndex('users', ['email_verification_token']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Add supabase_user_id column
        await queryInterface.addColumn('users', 'supabase_user_id', {
            type: Sequelize.UUID,
            allowNull: true,
            unique: true,
        });

        // Remove email verification columns (Supabase handles this)
        await queryInterface.removeColumn('users', 'email_verification_token');
        await queryInterface.removeColumn('users', 'email_verification_expires');

        // Remove password column (Supabase handles authentication)
        await queryInterface.removeColumn('users', 'password');

        // Add index for supabase_user_id
        await queryInterface.addIndex('users', ['supabase_user_id']);
    },

    async down(queryInterface, Sequelize) {
        // Restore password column
        await queryInterface.addColumn('users', 'password', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });

        // Restore email verification columns
        await queryInterface.addColumn('users', 'email_verification_token', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });

        await queryInterface.addColumn('users', 'email_verification_expires', {
            type: Sequelize.DATE,
            allowNull: true,
        });

        // Remove supabase_user_id
        await queryInterface.removeColumn('users', 'supabase_user_id');
    }
};

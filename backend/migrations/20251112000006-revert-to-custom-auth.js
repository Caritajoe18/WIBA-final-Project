'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Add password column back
        await queryInterface.addColumn('users', 'password', {
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: '', // Temporary default
        });

        // Add email verification columns back
        await queryInterface.addColumn('users', 'is_email_verified', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        });

        await queryInterface.addColumn('users', 'email_verification_token', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });

        await queryInterface.addColumn('users', 'email_verification_expires', {
            type: Sequelize.DATE,
            allowNull: true,
        });

        // Make supabase_user_id nullable (we won't use it)
        await queryInterface.changeColumn('users', 'supabase_user_id', {
            type: Sequelize.UUID,
            allowNull: true,
        });

        // Add indexes
        await queryInterface.addIndex('users', ['email_verification_token']);
    },

    async down(queryInterface, Sequelize) {
        // Remove columns
        await queryInterface.removeColumn('users', 'password');
        await queryInterface.removeColumn('users', 'is_email_verified');
        await queryInterface.removeColumn('users', 'email_verification_token');
        await queryInterface.removeColumn('users', 'email_verification_expires');

        // Make supabase_user_id required again
        await queryInterface.changeColumn('users', 'supabase_user_id', {
            type: Sequelize.UUID,
            allowNull: false,
        });
    }
};

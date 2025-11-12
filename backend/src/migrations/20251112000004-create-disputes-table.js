'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('disputes', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            task_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'tasks',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            raised_by: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            resolved_by: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            reason: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('OPEN', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'),
                allowNull: false,
                defaultValue: 'OPEN',
            },
            resolution: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            evidence: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: 'JSON array of evidence URLs',
            },
            resolution_tx_hash: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            resolved_at: {
                type: Sequelize.DATE,
                allowNull: true,
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

        // Add indexes
        await queryInterface.addIndex('disputes', ['task_id']);
        await queryInterface.addIndex('disputes', ['raised_by']);
        await queryInterface.addIndex('disputes', ['resolved_by']);
        await queryInterface.addIndex('disputes', ['status']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('disputes');
    }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tasks', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            requester_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            tasker_id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            title: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            category: {
                type: Sequelize.ENUM('DELIVERY', 'PICKUP', 'ERRAND', 'OTHER'),
                allowNull: false,
                defaultValue: 'DELIVERY',
            },
            status: {
                type: Sequelize.ENUM('OPEN', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED'),
                allowNull: false,
                defaultValue: 'OPEN',
            },
            pickup_location: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            pickup_latitude: {
                type: Sequelize.DECIMAL(10, 8),
                allowNull: true,
            },
            pickup_longitude: {
                type: Sequelize.DECIMAL(11, 8),
                allowNull: true,
            },
            delivery_location: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            delivery_latitude: {
                type: Sequelize.DECIMAL(10, 8),
                allowNull: true,
            },
            delivery_longitude: {
                type: Sequelize.DECIMAL(11, 8),
                allowNull: true,
            },
            payment_amount: {
                type: Sequelize.DECIMAL(20, 8),
                allowNull: false,
            },
            payment_currency: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'ETH',
            },
            escrow_tx_hash: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            completion_tx_hash: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            deadline: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            proof_of_delivery: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            notes: {
                type: Sequelize.TEXT,
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
        await queryInterface.addIndex('tasks', ['requester_id']);
        await queryInterface.addIndex('tasks', ['tasker_id']);
        await queryInterface.addIndex('tasks', ['status']);
        await queryInterface.addIndex('tasks', ['category']);
        await queryInterface.addIndex('tasks', ['created_at']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tasks');
    }
};

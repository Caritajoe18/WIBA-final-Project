'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('reviews', {
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
            reviewer_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            reviewee_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            rating: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                },
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            review_hash: {
                type: Sequelize.STRING(255),
                allowNull: true,
                comment: 'On-chain hash of the review',
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
        await queryInterface.addIndex('reviews', ['task_id']);
        await queryInterface.addIndex('reviews', ['reviewer_id']);
        await queryInterface.addIndex('reviews', ['reviewee_id']);
        await queryInterface.addIndex('reviews', ['rating']);

        // Add unique constraint to prevent duplicate reviews
        await queryInterface.addConstraint('reviews', {
            fields: ['task_id', 'reviewer_id'],
            type: 'unique',
            name: 'unique_task_reviewer',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('reviews');
    }
};

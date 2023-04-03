'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('matches', { 
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    home_team_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    home_team_goals: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    away_team_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    away_team_goals: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    in_progress: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }, 
  });
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('matches');
  }
};

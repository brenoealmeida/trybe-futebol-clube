module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      teamName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'team_name',
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  }
};

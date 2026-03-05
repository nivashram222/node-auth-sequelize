module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define("Team", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "teams",
    timestamps: true
  });

  Team.associate = (models) => {
    Team.belongsTo(models.Company, {
      foreignKey: "companyId",
      as: "company"
    });
    Team.hasMany(models.User, {
      foreignKey: "teamId",
      as: "members"
    });
  };

  return Team;
};

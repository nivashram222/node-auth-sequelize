module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define("Company", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "companies",
    timestamps: true
  });

  Company.associate = (models) => {
    Company.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    });
  };

  return Company;
};

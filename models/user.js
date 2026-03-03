module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: "users",
    timestamps: true
  });

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: "user_roles",
      foreignKey: "userId",
      otherKey: "roleId"
    });
    User.hasMany(models.Company, {
      foreignKey: "userId",
      as: "companies"
    });
  };

  return User;
};

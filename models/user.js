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
    mobile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    designationId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    User.belongsTo(models.Department, {
      foreignKey: "departmentId",
      as: "department"
    });
    User.belongsTo(models.Designation, {
      foreignKey: "designationId",
      as: "designation"
    });
    User.belongsTo(models.User, {
      foreignKey: "managerId",
      as: "manager"
    });
    User.hasMany(models.User, {
      foreignKey: "managerId",
      as: "subordinates"
    });
    User.belongsTo(models.Team, {
      foreignKey: "teamId",
      as: "team"
    });
  };

  return User;
};

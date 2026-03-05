module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define("Department", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: "departments",
    timestamps: true
  });

  Department.associate = (models) => {
    Department.hasMany(models.User, {
      foreignKey: "departmentId",
      as: "users"
    });
  };

  return Department;
};

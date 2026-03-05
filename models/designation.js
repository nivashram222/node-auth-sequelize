module.exports = (sequelize, DataTypes) => {
  const Designation = sequelize.define("Designation", {
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
    tableName: "designations",
    timestamps: true
  });

  Designation.associate = (models) => {
    Designation.hasMany(models.User, {
      foreignKey: "designationId",
      as: "users"
    });
  };

  return Designation;
};

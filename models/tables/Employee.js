module.exports = (sequelize, { DataTypes }) => {
  return sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "User already exist with this phone number",
        },
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      blockedReason: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "employee",
      },
      session: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Invalid Session",
        },
      },
    },
    {
      sequelize,
      modelName: "Employee",
      timestamps: true,
      createdAt: "registered_on",
      updatedAt: false,
    }
  );
};

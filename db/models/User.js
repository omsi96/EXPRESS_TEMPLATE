module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "This user already exists!",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetCode: {
      type: DataTypes.STRING,
    },
  });

  return User;
};

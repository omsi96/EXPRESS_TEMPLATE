const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discordId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discordStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discordHandel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    barmejId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    altEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enrolled: DataTypes.BOOLEAN,
    civilId: DataTypes.STRING,
    isMentor: DataTypes.BOOLEAN,
  });

  return Profile;
};

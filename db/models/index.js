"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: "postgres",
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/** Connect is a method that connects the database to postgres database
 * @param {function} cb - your call back function such as app.listen or anything you want to happen when the database is connected
 * @param {object} options - alter: true or force true. By default it's `alter: true`
 */

// Database relationship
// Video has many progress

// db.Video.hasMany(db.Progress, {
//   foreignKey: "videoId",
//   as: "progress",
// });
// db.Progress.belongsTo(db.Video, {
//   foreignKey: "videoId",
//   as: "video",
// });

module.exports = db;

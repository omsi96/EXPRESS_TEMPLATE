const bcrypt = require("bcrypt");

const salt = 10;
exports.hashPassword = (password) => bcrypt.hashSync(password, salt);

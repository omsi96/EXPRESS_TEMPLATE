const AdminBro = require("admin-bro");
const AdminBroSequelize = require("@admin-bro/sequelize");
const AdminBroExpress = require("@admin-bro/express");

// Database
import db from "../../db/models";
AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
  databases: [db],
});

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;

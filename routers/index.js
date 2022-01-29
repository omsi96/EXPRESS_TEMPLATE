import adminBroRoute from "./admin/adminBro";
import authRouter from "./auth/auth.router";
import express from "express";
import profileRouter from "./profile/profile.router";

const routers = express.Router();

routers.use("/account", authRouter);
routers.use("/profile", profileRouter);
routers.use("/admin", adminBroRoute);

export default routers;

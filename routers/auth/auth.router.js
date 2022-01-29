const express = require("express");
const router = express.Router();
const { createUser, signIn, me, resetPass } = require("./auth.controller");
const passport = require("passport");
import { isSignedIn } from "../../middleware/permissions";
const signInPassportMiddleware = passport.authenticate("local", {
  session: false,
});

router.post("/register", createUser);
router.post("/login", signInPassportMiddleware, signIn);
router.get("/me", isSignedIn, me);
router.post("/reset", resetPass);
module.exports = router;

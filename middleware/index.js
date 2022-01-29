import cors from "cors";
import express from "express";
import multer from "./multer";
import path from "path";
export const preMiddleware = express.Router();
export const postMiddleware = express.Router();
const { errorMiddleware, notFoundMiddleware } = require("./errorMiddleware");

const passport = require("passport");

const { localStrategy, jwtStrategy } = require("./passport");
preMiddleware.use("/media", express.static(path.join(__dirname, "../media")));
// Passport
preMiddleware.use(passport.initialize());
passport.use(localStrategy); // authentication
passport.use(jwtStrategy); // authorization
// Middleware
preMiddleware.use(cors());
preMiddleware.use(express.json());
preMiddleware.use(express.urlencoded({ extended: false }));

// Error middleware
postMiddleware.use(notFoundMiddleware);

import { Profile, User } from "../../db/models";
import { disabled, isSignedIn } from "../../middleware/permissions";
import {
  getMyProfile,
  getSingleProfile,
  updateProfileForAnyProfileType,
} from "./profile.controller";
import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import express from "express";
import upload from "../../middleware/multer";

const router = express.Router();

router.use(
  new CrudRouter(new CrudController(Profile, "profile"), {
    updatePath: "/",
    updateMW: [
      isSignedIn,
      upload.single("image"),
      updateProfileForAnyProfileType,
    ],
    createMW: [disabled],
    destroyMW: [disabled],
    listMW: [isSignedIn, getMyProfile],
  })
);
router.get("/:id", getSingleProfile);
export default router;

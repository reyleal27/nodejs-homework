import express from "express";
import { ctrlWrapper } from "../../helper/ctrlWrapper.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";
import { upload } from "../../middlewares/upload.js";
import { getCurrentUsers, loginUser, logoutUser, signupUser, updateAvatar, updateUserSubscription } from "../../controllers/usersController.js";

const router = express.Router();

router.post("/signup", ctrlWrapper(signupUser));

router.post("/login", ctrlWrapper(loginUser));

router.get("/logout", authenticateToken, ctrlWrapper(logoutUser));

router.get("/current", authenticateToken, ctrlWrapper(getCurrentUsers));

router.patch("/", authenticateToken, ctrlWrapper(updateUserSubscription));

router.patch("/avatars", authenticateToken, upload.single("avatar"), ctrlWrapper(updateAvatar));

export { router };
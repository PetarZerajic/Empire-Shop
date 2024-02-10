import express from "express";
import {
  getUserProfile,
  getUser,
  getAllUsers,
  registerUser,
  logInUser,
  logOutUser,
  updateUserProfile,
  deleteUserProfile,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { protect } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.get("/logut", logOutUser);

router.use(protect);

router
  .route("/profile")
  .get(getUserProfile)
  .patch(updateUserProfile)
  .delete(deleteUserProfile);
router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;

import express from "express";
import {
  getUserProfile,
  getUser,
  getAllUsers,
  updateUserProfile,
  deleteUserProfile,
  deleteUser,
  updateUser,
} from "../controllers/userController";
import {
  admin,
  logInUser,
  logOutUser,
  protect,
  registerUser,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", logInUser);
router.post("/logout", logOutUser);

router.use(protect);

router
  .route("/profile")
  .get(getUserProfile)
  .patch(updateUserProfile)
  .delete(deleteUserProfile);
router.route("/").get(admin, getAllUsers);
router
  .route("/:id")
  .get(admin, getUser)
  .patch(admin, updateUser)
  .delete(admin, deleteUser);

export default router;

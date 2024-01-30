import express from "express";
import { getOneUser, gettAllUsers } from "../controllers/userController";

const router = express.Router();

router.get("/", gettAllUsers);
router.route("/:id").get(getOneUser);

export default router;

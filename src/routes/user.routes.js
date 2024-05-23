import { Router } from "express";
import { register, login, setAvatar, getAllUsers } from "../controllers/user.controller.js";

const router = Router();


router.post("/register", register)
router.post("/login", login);
router.post("/setavatar/:id", setAvatar);
router.get("/getAllUsers/:id", getAllUsers)

export default router
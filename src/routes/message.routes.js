import { Router } from "express";
import { addMessage,getAllMessages } from "../controllers/message.controller.js";
const router = Router();


router.post("/addMessage",addMessage);
router.post("/getAllMessages",getAllMessages);


export default router;
import express from "express"
import { protectRoute } from "../middleware/auth.middleware";
import { getMessages, getUsersForSidebar, sendMessages } from "../controllers/message.controller";

const router = express.Router()

router.get("/users", protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getMessages)

router.post("/send/:id", protectRoute, sendMessages)

export default router;
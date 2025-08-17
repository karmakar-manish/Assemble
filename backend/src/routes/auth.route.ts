import express from "express"
import { login, logout, providerLogin, signup } from "../controllers/auth.controller"
import { getCurrentUser, protectRoute } from "../middleware/auth.middleware"

const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.post("/providerlogin", providerLogin)
router.post("/logout", logout)

//route to get the details of the logged in user
router.get("/check", protectRoute, getCurrentUser)

export default router;
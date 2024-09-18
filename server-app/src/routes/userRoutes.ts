import express from 'express';
import { registerUser, loginUser, deleteUser, getUserStocks } from '../controllers/userController';
import authenticateToken from "../middleware/authMiddleware";

const router = express.Router();

// User operations
router.post("/register", registerUser); // POST /api/users/register

router.post("/login", loginUser); // POST /api/users/login

router.delete("/delete/:id", deleteUser) // DELETE /api/users/delete/:id

router.get("/user", authenticateToken, getUserStocks); // GET /api/users/

export default router;
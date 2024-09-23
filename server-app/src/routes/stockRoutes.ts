import express from "express";
import { addStock, getStock, getStocks, updateStock, deleteStock}  from "../controllers/stockController";
import authenticateToken from "../middleware/authMiddleware";


const router = express.Router();

// Stock operations
router.post("/", authenticateToken, addStock); // POST /api/stocks

router.get("/:id", authenticateToken, getStock); // GET /api/stocks/:id

router.get("/user/:userId", authenticateToken, getStocks) // GET /api/stocks/user/:id (userId)

router.put("/:id", authenticateToken, updateStock); // PUT /api/stocks/:id

router.delete("/:id", authenticateToken, deleteStock); // DELETE /api/stocks/:id


export default router;
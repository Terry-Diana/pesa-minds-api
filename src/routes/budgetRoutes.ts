import express from "express";
import { addBudget, getBudgets } from "../controllers/budgetController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authenticateUser, addBudget);
router.get("/", authenticateUser, getBudgets);

export default router;

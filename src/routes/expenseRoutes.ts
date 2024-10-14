import express from "express";
import { createExpense, getExpenses } from "../controllers/expenseController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authenticateUser, createExpense);
router.get("/", authenticateUser, getExpenses);

export default router;

import express from "express";
import { createIncome, getIncomes } from "../controllers/incomeController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authenticateUser, createIncome);
router.get("/", authenticateUser, getIncomes);

export default router;

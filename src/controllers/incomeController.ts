import { Request, Response } from "express";
import { addIncome, listIncome } from "../services/incomeService";

export const createIncome = async (req: Request, res: Response) => {
  const { source, amount, date } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const income = await addIncome({
      user_id: userId, // Use userId from req.user
      source,
      amount,
      date,
    });
    res.status(201).json(income);
  } catch (error) {
    res.status(400).json({ message: "Failed to add income", error });
  }
};

export const getIncomes = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const incomes = await listIncome(userId);
    res.status(200).json(incomes);
  } catch (error) {
    res.status(400).json({ message: "Failed to retrieve incomes", error });
  }
};

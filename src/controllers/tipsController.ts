import { Request, Response } from "express";
import { addTip, listTips } from "../services/tipsService";

export const createTip = async (req: Request, res: Response) => {
  const { message, trigger_type, trigger_value } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const tip = await addTip({
      user_id: userId, // Use userId from req.user
      message,
      trigger_type,
      trigger_value,
    });
    res.status(201).json(tip);
  } catch (error) {
    res.status(400).json({ message: "Failed to add tip", error });
  }
};

export const getTips = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const tips = await listTips(userId);
    res.status(200).json(tips);
  } catch (error) {
    res.status(400).json({ message: "Failed to retrieve tips", error });
  }
};

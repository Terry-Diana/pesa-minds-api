import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

{/*import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});*/}

dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

{/*app.use('/api/', apiLimiter);*/}

app.get("/", (req: Request, res: Response) => {
  res.send("Pesa Minds API is running");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

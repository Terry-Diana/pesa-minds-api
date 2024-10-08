import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import authRoutes from "./routes/authRoutes";
import rateLimit from "express-rate-limit";
import recaptchaRoutes from './routes/recaptcha';

dotenv.config();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin
  methods: ['GET', 'POST'], // Specify the methods you want to allow
  allowedHeaders: ['Content-Type'], // Specify the allowed headers
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use('/api/', apiLimiter);
app.use('/api/recaptcha', recaptchaRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Pesa Minds API is running");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

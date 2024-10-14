import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import authRoutes from "./routes/authRoutes";
import budgetRoutes from './routes/budgetRoutes';
import expenseRoutes from './routes/expenseRoutes';
import incomeRoutes from './routes/incomeRoutes';
import tipsRoutes from './routes/tipsRoutes';
import { errorHandler } from './utils/errorHandler';
import recaptchaRoutes from './routes/recaptcha';

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin
  methods: ['GET', 'POST'], // Specify the methods you want to allow
  allowedHeaders: ['Content-Type'], // Specify the allowed headers
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/tips', tipsRoutes);
app.use(errorHandler);
app.use('/api/recaptcha', recaptchaRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Pesa Minds API is running");
});

const port = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}



export default app;

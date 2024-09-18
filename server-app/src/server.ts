import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import stockRoutes from './routes/stockRoutes';
import userRoutes from './routes/userRoutes';


dotenv.config();
connectDb();

const port = process.env.PORT || 5002;

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:"http://localhost:3001",
    credentials: true,
}));

app.use("/api/stocks", stockRoutes);
app.use("/api/users", userRoutes);


app.listen(port, () => {
    console.log(`Server started successfully on port ${port}`);
});


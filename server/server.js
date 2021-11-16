import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import error from "./middleware/error.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes

app.use("/api/lists", listRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use(error);

// Startup

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}...`));

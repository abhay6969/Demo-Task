import express from 'express';
import authRoutes from './routers/auth.routers.js';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import bookRoutes from './routers/book.routers.js';
import { errorHandler, notFound } from './middlewares/errorHanding.js';
dotenv.config();

const app = express(); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors({
//   origin: "*", // For testing; restrict in production
// }));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use("/api", authRoutes);
app.use("/api", bookRoutes);
app.use(notFound);
app.use(errorHandler);

connectDB();

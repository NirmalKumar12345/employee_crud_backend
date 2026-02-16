import express from 'express';
import cors from 'cors';
import ConnectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employee.routes.js';

dotenv.config();
const app = express();
ConnectDB();
const allowedOrigins = ["http://localhost:3000",
    "http://localhost:3001","http://localhost:5000"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        }
        else {
            return callback(new Error("Not allowed by cors"))
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => { console.log(`server running on Port ${PORT}`) });

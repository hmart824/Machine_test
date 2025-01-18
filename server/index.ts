import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import apiRoute from './src/routes'

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api', apiRoute);
app.use((req, res , next) => {
  console.log(`Received a request: ${req.method} ${req.url}`);
  next();
});



mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port ${process.env.PORT}` );
}); 
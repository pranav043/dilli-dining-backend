import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();
dotenv.config({ path: "./.env" });
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ status: "OK" });
});

//Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Healthy" });
});

app.use("/api/v1/reservation", reservationRouter);

dbConnection();

app.use(errorMiddleware);

export default app;

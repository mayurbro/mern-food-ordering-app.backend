import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/userRoutes";

// connecting database
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Database connected"));
if (!process.env.MONGODB_CONNECTION_STRING) {
  console.error(
    "Error: MONGODB_CONNECTION_STRING is not defined in environment variables."
  );
  process.exit(1);
}

const app = express(); //create a server
app.use(express.json()); //converts the incoming req data in json.
app.use(cors());

// handling api requests
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health Ok!" });
});

app.use("/api/my/user", myUserRoute);

app.listen(8000, () => {
  console.log("server started at 8000");
});

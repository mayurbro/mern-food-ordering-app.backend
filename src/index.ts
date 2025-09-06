import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/userRoutes";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoutes from "./routes/RestaurantRoutes";
import { v2 as cloudinary } from "cloudinary";
import orderRoute from "./routes/OrderRoute";
// connecting database
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Database connected to mongodb"));
if (!process.env.MONGODB_CONNECTION_STRING) {
  console.error(
    "Error: MONGODB_CONNECTION_STRING is not defined in environment variables."
  );
  process.exit(1);
}

// cloudinary set-up
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express(); //create a server

app.use(cors());

// handling api requests
app.use(
  "/api/order/checkout/webhook",
  express.raw({ type: "application/json" })
);
app.use(express.json()); //converts the incoming req data in json.
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health Ok!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/order", orderRoute);
app.listen(8000, () => {
  console.log("server started at 8000");
});

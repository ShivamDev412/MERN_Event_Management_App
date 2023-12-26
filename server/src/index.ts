import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { AuthRoute, UserRoute } from "./router";
import connectDB from "./db";
dotenv.config();
const app = express();
const PORT = process.env.DEV_PORT || 4003;
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.listen(PORT, () => {
  console.clear();
  console.log(`listening on port:${PORT}`);
});

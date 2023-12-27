import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AuthRoute, UserRoute } from "../router";
const expressApp = async (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/auth", AuthRoute);
  app.use("/api/user", UserRoute);
  return app;
};
export default expressApp;
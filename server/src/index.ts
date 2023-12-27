import express from "express";
import dotenv from "dotenv";
import expressApp from "./services/ExpressApp";
import connectDB from "./services/Database";
dotenv.config();
const startServer = async () => {
  const app = express();
  const PORT = process.env.DEV_PORT || 4003;
  connectDB();
  expressApp(app);

  app.listen(PORT, () => {
    console.clear();
    console.log(`listening on port:${PORT}`);
  });
};
startServer();

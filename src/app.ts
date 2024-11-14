import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import awsAuthRoutes from "./routes/awsAuthRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "prod") {
  require("dotenv").config({ path: ".env.prod" });
} else {
  require("dotenv").config({ path: ".env.dev" });
}

const port = process.env.PORT || 3000;

const MONGO_URL = "mongodb://localhost:27017";
mongoose
  .connect(MONGO_URL, {
    dbName: "typecsipt-user-app",
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/awsAuth", awsAuthRoutes);
app.use("/api/user", userRoutes);

// app.use("/", router)

app.listen(port, () => {
  console.log(`server is running localhost:${port}`);
});

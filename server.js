import express from "express";
import env from "dotenv";
import connectDB from "./config/db.js";
import "./config/cloudinary.js"

//bringing Required Routes
import userRoutes from "./routes/api/user.js";
import profileRoutes from "./routes/api/profile.js";

//
//Using Express
const app = express();
app.use(express.json());
app.use(express.static("upload/images"));


//
//Configuring .Env Functionalities
env.config();

//
connectDB();
// app.get("/hometest", (req, res) => {
//   res.json({ msg: "hello" });
// });

//Connecting routes
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);

//
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

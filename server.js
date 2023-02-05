import express from "express";
import env from "dotenv";
import connectDB from "./config/db.js";
import "./config/cloudinary.js";
import cors from "cors";

//bringing Required Routes
import userRoutes from "./routes/api/user.js";
import profileRoutes from "./routes/api/profile.js";

//
//Using Express
const app = express();
app.use(express.json());
app.use(express.static("upload/images"));

// 👇️ specify origins to allow
// const whitelist = ["http://localhost:3000"];

// ✅ Enable pre-flight requests
// app.options("*", cors());

// const corsOptions = {
//   credentials: true,
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use(cors());

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

import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// 1. Connect to MongoDB container
mongoose
  .connect("mongodb://root:pass123@localhost:27017/mydb?authSource=admin")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// 2. Simple model
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
  })
);

// 3. Test route
app.get("/", (req, res) => {
  res.send("Express + MongoDB is working!");
});

// 4. Create user test
app.post("/user", async (req, res) => {
  const u = await User.create({ name: req.body.name });
  res.json(u);
});

// 5. Start server
app.listen(3000, () => console.log("Server running: http://localhost:3000"));

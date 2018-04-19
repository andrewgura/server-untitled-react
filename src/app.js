import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import auth from "./routes/auth";

dotenv.config();
const app = express();

app.use(bodyParser.json());

//access mongo url from .env file variable
mongoose.connect(process.env.MONGODB_URL);

app.use("/api/auth", auth);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8080, () => console.log("Example app listening on port 3000!"));

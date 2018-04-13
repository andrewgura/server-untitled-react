import express from "express";
import path from "path";

const app = express();

app.post("/api/auth", function(req, res) {
  res.status(400).json({ errors: { global: "Incorrect" } });
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8080);

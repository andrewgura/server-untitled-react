import express from "express";
import User from "../models/User";

const router = express.Router();

router.post("/", function(req, res) {
  const { credentials } = req.body; //credentials from React app
  User.findOne({ email: credentials.email }).then(user => { //finds used from email
    if (user && user.isValidPassword(credentials.password)) { //if user is found and password has is correct, success
      res.json({ user: { email: user.email } });
    } else { //if user wasnt found, react app uses json object to display error
      res.status(400).json({ errors: { global: "Incorrect" } });
    }
  });
});

export default router;

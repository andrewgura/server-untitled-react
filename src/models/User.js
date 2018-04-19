import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema(
  {
    email: { type: String, requied: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

//Method to check if password is correct from bcrypt hash
schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

//Method to generate a JWT from email
schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email
    },
    process.env.JWT_SECRET //access JWT_SECRET from .env file variable
  );
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    token: this.generateJWT()
  };
};

export default mongoose.model("User", schema);

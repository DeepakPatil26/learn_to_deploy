const express = require("express");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;
  try {
    bcrypt.hash(password, 5, async (_err, hash) => {
      const user = new UserModel({ name, email, age, password: hash });
      await user.save();
      res.status(200).send({ msg: "New User has been registered" });
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { authorID: user._id, author: user.name },
            "masai"
          );
          res.status(200).send({ msg: "Login Successful", token: token });
        } else {
          res.status(200).send({ msg: "Enter Correct Credentials" });
        }
      });
    } else res.status(200).send({ msg: "Enter Correct Credentials" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = { userRouter };

require("dotenv").config();
const jwt = require("jsonwebtoken");
const newToken = (newUser) => {
  return jwt.sign({ newUser }, "HashEnv");
};
const User = require("../models/Users.model");

const register = async (req, res, next) => {
  try {
    let newUser = await User.findOne({ email: req.body.email });
    if (newUser) return res.send("newUser already exist");
    newUser = await User.create(req.body);
    const token = newToken(newUser);
    return res
    .status(201)
    .json({
      msg: "User created successfully",
      name: newUser.Name,
      profileImage: newUser.profileImage,
      token,
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
const login = async (req, res, next) => {
  try {
    let newUser = await User.findOne({ email: req.body.email });
    if (!newUser) return res.status(404).send("User not found!");
    const match = newUser.check(req.body.password);
    if (!match) return res.send("wrong password!");
    const token = newToken(newUser);
    return res.status(200).json({msg: "Login Successful", name:newUser.Name, profileImage: newUser.profileImage, token});
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
module.exports = { register, login };
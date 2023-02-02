import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc: Auth A  User And Get Token
// @route POST /api/users/login
// @public Route
// @grey_w0lf
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  // console.log(user);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
    throw new Error("User Already There");
  }
});

//@desc:  Register A New User
// @route POST /api/users/register
// @public Route
// @grey_w0lf

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  //Finding The User Requesting Login
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400).json({ message: "User Already Exists" });
    throw new Error("User Already There");
  }
  const user = await User.create({ userName, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});


export { authUser, registerUser };

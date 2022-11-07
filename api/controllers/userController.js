const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, login, password } = req.body;
  const email = login; //frontend need to change login to email

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("password must be at least 6 characters");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  //create new users
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  /* implement late and add back token to 201 json
  // generate token
  const token = generateToken(user._id);

  //send cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //1 day expires
    sameSite: "none",
    secure: true
  });
  */

  if (user) {
    const { _id, firstName, lastName, email, password, } = user;
    res.status(201).json({
      _id, firstName, lastName, email, password,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body;
  const email = login; //frontend need to change login to email

  //validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("please add email and password");
  }

  const user = await User.findOne({ email });

  //check for user already exists
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  /*password encyption removed and removed token from 201 json
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  */
  if (user && password) {
    const { _id, firstName, lastName, email, password, } = user;
    res.status(201).json({
      _id, firstName, lastName, email, password, 
    });
  }
  else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc Auth user and token
// @route POST /api/users/login
// @access public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    //set JWT as HTTP-Only Cookie
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// @desc Auth user and token
// @route POST /api/users
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400).json("Invalid user data");
  }
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access private

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc get user profile
// @route POST /api/users/profile
// @access private

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc update user profile
// @route PUT /api/users/profile
// @access private

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    if (user) {
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
};

// @desc get users
// @route GET /api/users/
// @access private/admin

const getUsers = async (req, res) => {
  res.send("get users");
};

// @desc get user by ID
// @route GET /api/users/:id
// @access private/admin

const getUserByID = async (req, res) => {
  res.send("get user by id");
};

// @desc delete users
// @route DELETE /api/users/:id
// @access private/admin

const deleteUser = async (req, res) => {
  res.send("delete user");
};

// @desc Update user
// @route PUT /api/users/:id
// @access private/admin

const updateUser = async (req, res) => {
  res.send("update user");
};

export {
  authUser,
  registerUser,
  logoutUser,
  getUserByID,
  getUsers,
  updateUser,
  updateUserProfile,
  deleteUser,
  getUserProfile,
};

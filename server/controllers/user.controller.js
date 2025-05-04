import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All field are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already exist with this account",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashPassword });
    return res.status(200).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in the register controller is", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All field are required",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email and password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email and password",
        success: false,
      });
    }
    const tokenData = {
      UserId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      phoneNumber: user.phoneNumber,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome ${user.name}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log("Error in the Login controller is", error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in the logout controller is", error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, address } = req.body;

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    //update kr do agr user agata hain tu

    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;

    await user.save();

    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
    };
    return res.status(200).json({
        message:"User Updated successfully",
        success:true,
        user
    })
  } catch (error) {
    console.log("Error n the update the user profile", error);
  }
};

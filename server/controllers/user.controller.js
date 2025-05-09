import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sanitize from "mongo-sanitize";

export const register = async (req, res) => {
  try {
    const cleanData = sanitize(req.body);
    const { name, email, password } = cleanData;
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
    const cleanData = sanitize(req.body);
    const { email, password } = cleanData;
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
    // const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
    //   expiresIn: "1d",
    // });
    const accessToken = jwt.sign(tokenData, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(tokenData, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      phoneNumber: user.phoneNumber,
    };
    // return res
    //   .status(200)
    //   .cookie("token", token, {
    //     maxAge: 1 * 24 * 60 * 60 * 1000,
    //     httpsOnly: true,
    //     sameSite: "strict",
    //   })
    //   .json({
    //     message: `Welcome ${user.name}`,
    //     success: true,
    //     user,
    //   });

     res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
     
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      
    });
    return res.status(200).json({
          message: `Welcome ${user.name}`,
          success: true,
          user,
          accessToken
        })
  } catch (error) {
    console.log("Error in the Login controller is", error);
  }
};

export const logout = async (req, res) => {
  try {
    // return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    //   message: "User Logout successfully",
    //   success: true,
    // });
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log("Error in the logout controller is", error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const cleanData = sanitize(req.body);
    const { name, email, phoneNumber, address } = cleanData;

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
      message: "User Updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error n the update the user profile", error);
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid refresh token",
        success: false,
      });
    }
    const newAccessToken = jwt.sign(
      { UserId: decoded.UserId },
      process.env.ACCESS_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Access token refreshed",
        accessToken: newAccessToken,
      });
  } catch (error) {
    return res.status(403).json({
      message: "Invalid refresh token",
      success: false,
    });
  }
};

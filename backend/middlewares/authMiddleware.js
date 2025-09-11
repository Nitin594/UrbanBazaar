import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import userModel from "../models/userModel.js";

//protected route token based
export const requireSignIn = asyncHandler(async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log("Decoded user:", req.user);
    req.user = decode; //decrypt
    next();
  } catch (error) {
    console.log(error);
  }
});

//admin access
export const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    console.log("req.user:", req.user);
    const user = await userModel.findById(req.user._id);
    console.log("Found User:", user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("Admin middleware error:", error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Admin middleware",
    });
  }
});

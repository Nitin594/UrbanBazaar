import userModel from "../models/userModel.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { comparePassword, hashedPassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";

export const registerController = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validation
    if (!name) {
      throw new ApiError(400, "name is required");
    }
    if (!email) {
      throw new ApiError(400, "email is required");
    }
    if (!password) {
      throw new ApiError(400, "password is required");
    }
    if (!phone) {
      throw new ApiError(400, "phone is required");
    }
    if (!address) {
      throw new ApiError(400, "address is required");
    }

    //check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered please login",
      });
    }

    //register user
    const hashedPass = await hashedPassword(password);

    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPass,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
});

//POST LOGIN
export const loginController = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res
        .status(404)
        .send({
          success: false,
        })
        .json(new ApiResponse(404, "Invalid email or password"));
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "loggedIn successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .success(false)
      .json(new ApiResponse(401, "Error in login"));
  }
});

//test controller
export const testController = (req, res) => {
  res.send("protected route");
};

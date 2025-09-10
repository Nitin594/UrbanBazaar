import userModel from "../models/userModel.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { hashedPassword } from "../helpers/authHelper.js";

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

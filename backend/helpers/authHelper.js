import bcrypt from 'bcrypt'
//import { asyncHandler } from '../utils/asyncHandler'
import { ApiError } from "../utils/apiError.js";

export const hashedPassword = async(password) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword
    } catch (error) {
        console.log(error)
        throw new ApiError(401, "Password not Hashed properly")
    }
};

export const comparePassword =  async (password,hashedPassword) => {
   try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Compare password error:", error);
    throw new ApiError(500, "Error comparing passwords");
  }
}
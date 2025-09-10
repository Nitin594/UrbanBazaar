import bcrypt from 'bcrypt'
import { asyncHandler } from '../utils/asyncHandler'
import { ApiError } from '../utils/apiError'

export const hashPassword = asyncHandler( async(password) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword
    } catch (error) {
        console.log(error)
        throw new ApiError(401, "Password not Hashed properly")
    }
});

export const comparePassword = asyncHandler( async (password,hashedPassword) => {
    return bcrypt.compare(password,hashPassword);
})
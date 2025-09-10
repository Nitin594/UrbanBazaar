import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to MOngoDB ${conn.connection.host}`.bgMagenta.white)
    }catch(error){
        console.log(`Errors in MongoDB ${error}`.bgRed.white)
    }
}

export default connectDB;
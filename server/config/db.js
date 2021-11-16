import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Connected to DB: ${connection.connections[0].host}`);
    } catch (error) {
        console.error(error.message);
    }
};

export default connectDB;

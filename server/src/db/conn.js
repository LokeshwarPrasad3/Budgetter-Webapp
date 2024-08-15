import mongoose from "mongoose";


const connectToDb = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb://127.0.0.1:27017/budgetter");
        console.log(`Mongodb Connected!! HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Failed!");
        process.exit(1);
    }
}

export default connectToDb;
import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://Aryan:Aryan@841424@cluster0.sdwd4ww.mongodb.net/Mindhub');
    console.log("MongoDB connected successfully");
}

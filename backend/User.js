import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    profileImage: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", UserSchema);

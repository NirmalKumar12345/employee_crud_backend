import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    // provider: {
    //     type: String,
    //     enum: ["local","google"],
    //     default: "local",
    // },
    googleId: String
});

export default mongoose.model("User",userSchema);
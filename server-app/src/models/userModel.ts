import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash password
userSchema.pre('save', async function(next) { // (before saving, callback function)
    if (this.isModified('password')) { // hashing password IF modified
        this.password = await bcrypt.hash(this.password, 10); // 'salt rounds' (higher the number, the more secure)
    }
    next(); // call next middleware (provided by mongoose)
});

export const userModel = mongoose.model("User", userSchema);


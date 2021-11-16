import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 25,
        required: true,
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 255,
        required: true,
    },
    lists: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        required: true,
    },
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, username: this.username },
        process.env.JWT_SECRET
    );
};

const User = new mongoose.model("User", userSchema);

export default User;

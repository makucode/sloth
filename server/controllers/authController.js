import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncMiddleware from "../middleware/async.js";
import User from "../models/user.js";

// DESC Authenticate user
// POST /api/auth/
// ACCESS public

export const authUser = asyncMiddleware(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("Invalid email or password.");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(404).send("Invalid email or password.");

    const token = user.generateAuthToken();

    return res
        .status(200)
        .json({ _id: user._id, username: user.username, token });
});

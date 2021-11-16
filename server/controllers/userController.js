import bcrypt from "bcryptjs";
import asyncMiddleware from "../middleware/async.js";
import User from "../models/user.js";

// DESC Returns a certain user
// GET /api/users/:id
// ACCESS private (only owner of data or admin)

export const getUser = () => {};

// DESC Create new user
// POST /api/users/
// ACCESS public

export const createUser = asyncMiddleware(async (req, res) => {
    const { username, email, password } = req.body;

    const isExisting = await User.findOne({ email });

    if (isExisting)
        return res.status(409).send("This email is already registered.");

    if (username && email && password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = newUser.generateAuthToken();

        return res
            .status(201)
            .json({ _id: newUser._id, username: newUser.username, token });
    }

    res.status(400).send(
        "Please provide a valid username, email and password."
    );
});

import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token)
        return res.status(401).send("Access denied. No token provided.");

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(400).send("Invalid token.");
    }
};

export default auth;

import jwt from "jsonwebtoken";


const isAuth = (req, res, next) => {
    try {
        const {token} = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let verifytoken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifytoken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = verifytoken.id;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: "Internal server error(is auth)" });
    }
} 
export default isAuth;
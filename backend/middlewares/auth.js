import jwt from 'jsonwebtoken'

const authMiddleware = async(req, res, next)=>{
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Please login first." });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // because we created the token using userId and in the form of Object '{id}'. So when decoding the token we will get the same object with userId.
        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error occurred." });
    }
}

export default authMiddleware;
import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: 'Not authorized' });
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodeToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not authorized' });
        }
        next();
    } catch (error) {
        console.error("Error in admin authentication middleware:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default adminAuth;
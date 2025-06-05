import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.json({ success: false, message: 'Not authorized,Login first' });
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodeToken.id;
        next();
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export default authUser;
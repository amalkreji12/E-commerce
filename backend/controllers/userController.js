import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


//User Login API
const doLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            return res.json({
                success: true,
                message: 'User logged in successfully',
                token,
            });
        } else {
            res.json({ success: false, message: 'Invalid password' });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//User Registration API

const doRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        //validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format.." });
        }
        if (password.length < 6) {
            return res.json({ success: false, message: "Please enter a strong password.." });
        }

        //Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        const user = await newUser.save();

        // Create JWT token
        if (!user) {
            return res.json({ success: false, message: "User registration failed" });
        }
        const token = createToken(user._id);
        res.json({
            success: true,
            message: "User registered successfully",
            token,
        })
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//Admin Login

const doAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the provided email and password match the admin credentials
        if (email === process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({
                success: true,
                message: 'Admin logged in successfully',
                token,
            })
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};


export { doLogin, doRegister, doAdminLogin };
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

//User Login
const doLogin = async (req, res) => {

};

//User Registration

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
        
    } catch (error) {

    }
};

//Admin Login

const doAdminLogin = async (req, res) => {

};


export { doLogin, doRegister, doAdminLogin };
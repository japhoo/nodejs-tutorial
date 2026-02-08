import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are important"
            })
        }

        const exists = await User.findOne({
            email: email.toLowerCase()
        });
        if (exists) {
            res.status(400).json({
                message: "User already exists"
            })
        }


        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);



        // create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            loggedIn: false,
        });


        res.status(201).json({
            message: "User registered",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const loginUser = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "All fields required"
            });
        }

        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid Username or Password"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    username
                }
            }
        });
    } catch (error) {

        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const logoutUser = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        if (!user) {

           return res.status(400).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {

        res.status(500).json({
            message: "Internal server errors",
            error: error.message
        });
    }
}
export { registerUser, loginUser,logoutUser }
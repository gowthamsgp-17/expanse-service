import User from "../models/user.js"
import bcrypt from "bcryptjs";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ email })
        if (exists) return res.status(400).json({ message: "Email already exists" });
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ name, email, password: hashedPassword })
        res.json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export { register }
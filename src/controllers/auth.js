import User from "../models/user.js"
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens.js'
import Joi from 'joi'
import _ from 'lodash'

const register = async (req, res) => {
    console.log('req.body', req.body)
    try {
        const schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            userId: Joi.string().email().min(3).max(30).required(),
            password: Joi.string().required()
        })
        const  { error, value } = schema.validate(req.body);
        if(error) return res.status(400).json({message: error.details[0].message})
        const { name, userId, password } = value
        const existsUserId = await User.findOne({ userId })
        const existsUserName = await User.findOne({ name })
        if (existsUserId) return res.status(400).json({ message: "UserId already exists"});
        if (existsUserName) return res.status(400).json({ message: "User Name already exists"});
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ name, userId, password: hashedPassword })
        res.json({ message: "User registered successfully" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const schema = Joi.object({
            userId: Joi.string().min(3).max(30).required(),
            password: Joi.string().required()
        })
        const  { error, value } = schema.validate(req.body);
        if(error) return res.status(400).json({message: error.details[0].message})
        const { userId, password } = value;
        const user = await User.findOne({ userId }).select("-__v");
        if (!user) return res.status(404).json({ message: "User not found" });
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({ message: "Invalid password" })

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        const {_id, name, createdAt, updatedAt} = user;
        res.json({ accessToken, user: { _id, name, userId: user.userId, createdAt, updatedAt } })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUsersList = async (_, res) => {
    const usersList = await User.find({}, {name:1, userId:1})
    res.json({usersList})
}

export { register, login, getUsersList }
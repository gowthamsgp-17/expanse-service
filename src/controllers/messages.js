import Messages from "../models/messages.js"
import Joi from 'joi'

const message = async (req, res) => {
    try{
        const schema = Joi.object({
            id: Joi.string().required(),
            userId: Joi.string().required(),
            chatId: Joi.string().required(),
            content: Joi.string().required(),
            status: Joi.string().required()
        })
        const  { error, value } = schema.validate(req.body);
        const {id, userId, chatId, content, status}=  value
        if(error)  return res.status(400).json({ message: error.message })
        await Messages.create({id, userId, chatId, content, status})
        res.json(value)
    } catch(error) {
           return res.status(400).json({ message: error.message })
    }

}

const getMessages = async (req, res) => {
    try{
        const {page, limit}  = req.query
        const skip = (page - 1) * limit 
        const messages = await Messages.find().sort({createdAt:-1}).skip(skip).limit(limit)
        const totalCount = await Messages.find().countDocuments()
        res.json({totalCount, messages })
    } catch(error) {
        return res.status(400).send(error.message)
    }
}

export { message, getMessages }
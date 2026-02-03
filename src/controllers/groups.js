import Groups from '../models/groups.js'
import Joi from 'joi'
import _ from 'lodash'

export const saveGroup = async (req, res) =>{
    const schema = Joi.object({
        groupName: Joi.string().required(),
        members: Joi.array().required()
    })
    const { error, value } = schema.validate(req.body)
    const { groupName, members } = value   
    const isExist = await Groups.findOne({groupName})
    console.log("isExist", isExist)
    if(isExist) return res.status(400).send("Group name already exists")
    if(error)  return res.status(400).json({ message: error.message })
    const doc = await Groups.create({groupName, members})
    res.status(200).json({groups: doc})
}

export const queryGroup = async(req, res) =>{
    const groups = await Groups.find({})
    if(_.isEmpty(groups)) return res.status(400).send("No Groups are Found")
    return res.status(200).json({groups})
}

export const updateGroup = async(req, res) =>{
    try {
        const userId = req.params.id;
        const user = await Groups.findByIdAndUpdate(
        userId,
        // { $push: { members: req.body } },
        { $push: { members: { $each: req.body.members } } },
        { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

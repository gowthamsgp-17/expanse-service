import Expanses from '../models/expanses.js'
import Joi from 'joi'

const expanseList = async (req, res) => {
  const schema = Joi.object({
    expanses: Joi.array().items(
        Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required(),
          amount: Joi.number().required(),
          date: Joi.date().required(),
          description: Joi.string().allow("").optional()
        })
      )
      .required(),
      createdMonth: Joi.string().required(),
      groupExpense: Joi.boolean().required(),
      groupName: Joi.string().optional(),
      total: Joi.number().required()
  }); 

  const { error, value } = schema.validate(req.body)
  console.log('req.body.groupName', value.groupName)

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map(d => d.message)
    });
  }

  const doc = await Expanses.create({
    expanses: value.expanses,
    total: value.total,
    createdMonth: value.createdMonth,
    groupExpense: value.groupExpense,
    groupName:value.groupName,
    createdBy: req?.user?.userId
  });

  res.status(201).json(doc);
};

const fetchExpanses = async (req, res) => {
  const expenses = await Expanses.find({createdBy: req.user.userId, groupExpense: req.query.isFromGroup})
   res.status(200).json(expenses);
}

const fetchExpensesByGroup = async (req, res) => {
    console.log('req.query', req.query)
    const expenses = await Expanses.find({createdBy: req.query.createdBy, groupName: req.query.groupName})
    res.status(200).json(expenses);
}

export { expanseList, fetchExpanses, fetchExpensesByGroup }
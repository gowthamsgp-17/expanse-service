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
    let expenses
    if(req.query.groupName && req.query.createdBy){
      expenses = await Expanses.find({createdBy: req.query.createdBy, groupName: req.query.groupName})
    } else if(req.query.groupName){
      expenses = await Expanses.find({groupName: req.query.groupName})
    } else {
      expenses =[]
    }
    res.status(200).json(expenses);
}
const deleteRecords = async (req, res) =>{
  console.log('req.body', req.body)
  let deletedData
  const {createdMonth, createdBy, isFromGroup = false, groupName = ''} = req.body
    if(createdMonth && createdBy && isFromGroup){
       deletedData = await Expanses.deleteMany({createdBy, createdMonth, groupExpense: isFromGroup})
    } else if(createdMonth && createdBy && groupName) {
      deletedData = await Expanses.deleteMany({createdBy, createdMonth, groupName})
    } else {
      deletedData = await Expanses.deleteMany({createdBy, createdMonth})
    }
  if(deletedData.deletedCount) 
    res.status(200).json(`Records Deleted Successfully!, deletedCount ==> ${deletedData.deletedCount}`)
}

export { expanseList, fetchExpanses, fetchExpensesByGroup, deleteRecords }
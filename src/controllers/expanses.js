import Expanses from '../models/expanses.js'
import Joi from 'joi'

const expanseList = async (req, res) => {
  console.log('req.body', req.body)
  const schema = Joi.object({
    expanses: Joi.array().items(
        Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required(),
          amount: Joi.number().required(),
          date: Joi.date().required(),
          description: Joi.string().allow("").optional(),
        })
      )
      .required(),
      createdMonth: Joi.string().required(),
      total: Joi.number().required()
  }); 

  const { error, value } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map(d => d.message)
    });
  }

  const doc = await Expanses.create({
    expanses: value.expanses,
    total: value.total,
    createdMonth: value.createdMonth
  });

  res.status(201).json(doc);
};

const fetchExpanses = async (_, res) => {
   const expanses = await Expanses.find()
   res.status(200).json(expanses);
}

export { expanseList, fetchExpanses }
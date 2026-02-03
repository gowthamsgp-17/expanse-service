import mongoose from "mongoose";

const expanseSchema = new mongoose.Schema({
    expanses:[{
        id : {type: String, unique:true},
        name:  String,
        amount: Number,
        date:Date, 
        description: String,
        createdMonth: String
    },
    {_id: false}
    ],
    createdMonth: String,
    groupExpense: Boolean,
    groupName: String,
    total: Number,
    createdBy: {
      type: String,
      ref: "User",
      required: true
    }

}, { timestamps: true })

export default mongoose.model("Expanses", expanseSchema)
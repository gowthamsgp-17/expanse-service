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
    total: Number
}, { timestamps: true })

export default mongoose.model("Expanses", expanseSchema)
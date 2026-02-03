import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupName: { type: String, unique: true, required: true },
    members: Array,
}, { timestamps: true })

export default mongoose.model("Groups", groupSchema)
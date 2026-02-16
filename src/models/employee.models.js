import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type: Number,
        required: true,
        trim: true
    },
    position:{
        type: String,
        required: true,
        trim: true
    },
    company:{
        type: String,
        required: true,
        trim: true
    },
    salary:{
        type: String,
        required: true,
        trim: true
    },
});

export default mongoose.model('Employee',EmployeeSchema);
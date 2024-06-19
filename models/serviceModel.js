import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 30,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 800,
    },
    image: {
        type: String,
        required: true,
    },
    
    
},
    {
        timestamps: true,
    }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;    
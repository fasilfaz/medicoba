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
        maxLength: 100,
    },
    image: {
        type: String,
        required: true,
    },
    admin: [{ type: mongoose.Types.ObjectId, ref: "User"}],
    
},
    {
        timestamps: true,
    }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;    
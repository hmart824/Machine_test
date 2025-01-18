import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAgent extends Document {
    name: string;
    email: string;
    password: string;
    phone: number;
    user: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const agentSchema = new Schema<IAgent>({    
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
}); 

const Agent = mongoose.model<IAgent>("Agent", agentSchema);

export default Agent;
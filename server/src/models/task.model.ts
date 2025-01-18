import mongoose , {Document , Schema} from "mongoose";

export interface ITASK extends Document{
    _id: string;
    agent: mongoose.Schema.Types.ObjectId;
    details: any;
    status: "pending" | "in-progress" | "completed";
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITASK>({
    agent:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
    },
    details: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    },
},{
    timestamps: true,
});

const Task = mongoose.model<ITASK>("TASK" , taskSchema);
export default Task;
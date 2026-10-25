import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type: String,
        required: [true,"la tâche est obligatoire"],
        trim: true
    },
    completed:{
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
 
export default Task;
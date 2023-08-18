import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    id: String,
    title: String,
    label: {
        type: String,
        enum : ["Bug" , "Documentation" , "Feature"],
        default: 'Bug'
    },
    status: {
        type: String,
        enum : ["in progress" , "Backlog" , "Todo" , "Done" , "Cancelled"],
        default: 'in progress'
    },
    priority: {
        type: String,
        enum : ["Low" , "Medium" , "High"],
        default: 'Low'
    }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
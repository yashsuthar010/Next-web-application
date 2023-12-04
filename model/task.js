import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  title: String,
  description: String,
  priority: String,
  status: String,
});

const Tasks = mongoose.models.Tasks || mongoose.model("Tasks", taskSchema);

export default Tasks;

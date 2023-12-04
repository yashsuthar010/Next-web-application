import Tasks from "../model/task";

// fetching single task
export const getTask = async (req, res) => {
  try {
    const { taskID } = req.query;
    if (taskID) {
      const task = await Tasks.findById(taskID);
      res.status(200).json(task);
    }
    res.status(404).json({ error: "task not found" });
  } catch (error) {
    res.status(404).json({ error: "error while fetching task" });
    console.log(error);
  }
};

// fetching tasks
export async function getTasks(req, res) {
  try {
    const tasksData = await Tasks.find();
    if (!tasksData) return res.status(404).json({ error: "tasks not found" });
    res.status(200).json(tasksData);
  } catch (error) {
    res.status(404).json({ error: "error while fetching tasks" });
    console.log(error);
  }
}

// post or creating tasks
export async function CreateTask(req, res) {
  try {
    // const { title, description, priority, status } = req.body;
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "there is no formData" });

    const task = await Tasks.create(formData);
    res.status(200).json({
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
    });
  } catch (error) {
    res.status(404).json({ error: "error while creating task" });
    console.log(error);
  }
}

// update
export const updateTask = async (req, res) => {
  try {
    const { taskID } = req.query;
    const formData = req.body;

    if (taskID && formData) {
      await Tasks.findByIdAndUpdate(taskID, formData);
      res.status(200).json({
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: formData.status,
      });
    }
    res.status(404).json({ error: "Task not found" });
  } catch (error) {
    res.status(404).json({ error: "error while updating task" });
    console.log(error);
  }
};

// delete task
export const deleteTask = async (req, res) => {
  try {
    const { taskID } = req.query;

    if (taskID) {
      await Tasks.findByIdAndDelete(taskID);
      res.status(200).json({ deleted: taskID });
    }
    res.status(404).json({ error: "Task not found" });
  } catch (error) {
    res.status(404).json({ error: "error while deleting task" });
    console.log(error);
  }
};

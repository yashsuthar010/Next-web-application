const BASE_URL = "http://localhost:3000";

// fetch all the tasks
export const getTasks = async () => {
  const tasks = await fetch(`${BASE_URL}/api/tasks/`);
  const jsonData = await tasks.json();
  return jsonData;
};

// fetch single task
export const getTask = async (taskID) => {
  const singleTask = await fetch(`${BASE_URL}/api/tasks/${taskID}`);
  const jsonData = await singleTask.json();
  if (jsonData) return jsonData;
  return {};
};

// creating task
export const postTask = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}/api/tasks`, options);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// updating task
export const updateTask = async (taskID, formData) => {
  try {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${BASE_URL}/api/tasks/${taskID}`, options);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// deleting task
export const deleteTask = async (taskID) => {
  try {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${BASE_URL}/api/tasks/${taskID}`, options);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

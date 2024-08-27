import Task from "../models/todo.model.js";

// Create a New Task
// Create a New Task
export const createTask = async (req, res) => {
  try {
    const { title, date, description, isImportant, isCompleted } = req.body;
    console.log(req.body);
    

    // Explicitly convert to boolean
    const newTask = new Task({
      title,
      date,
      description,
      isImportant: Boolean(isImportant),
      isCompleted: Boolean(isCompleted),
    });

    const savedTask = await newTask.save();
    console.log(savedTask);
    
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Task
// Update a Task
export const updateTask = async (req, res) => {
  try {
    const { title,  description, isImportant, isCompleted } = req.body;
    console.log(req.body);
    

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        isImportant: Boolean(isImportant),
        isCompleted: Boolean(isCompleted),
      },
      { new: true }
    );
console.log(updateTask);

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get All Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Single Task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Delete a Task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

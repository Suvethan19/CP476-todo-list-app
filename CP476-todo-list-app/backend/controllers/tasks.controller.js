exports.createTask = (req, res) => {
  res.status(201).json({ message: "Create task endpoint (stub)" });
};

exports.getAllTasks = (req, res) => {
  res.json({ message: "Get all tasks endpoint (stub)" });
};

exports.updateTask = (req, res) => {
  res.json({ message: `Update task ${req.params.id} endpoint (stub)` });
};

exports.deleteTask = (req, res) => {
  res.json({ message: `Delete task ${req.params.id} endpoint (stub)` });
};
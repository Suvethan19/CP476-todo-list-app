const db = require("../database/db");

//get all tasks
exports.getAllTasks = (req, res) => {
  const {list_id} = req.query;

  let sql = "SELECT * FROM tasks";
  let values = [];
  if (list_id) {
    sql += " WHERE list_id = ?";
    values.push(list_id);
  }
  
  sql += " ORDER BY due_date IS NULL, due_date ASC, task_id ASC";
  
  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error fetching tasks:", err.message);
      return res.status(500).json({ error: "Failed to get tasks" });
    }
    res.json(results);
  });
};

//creaet new task
exports.createTask = (req, res) => {
  const {list_id, task_description, due_date, is_priority, is_completed} = req.body;

  if (!list_id || !task_description) {
    return res.status(400).json({ error: "list_id and task_description are required" });
  }

  const sql = "INSERT INTO tasks (list_id, task_description, due_date, is_priority, is_completed) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [list_id, task_description, due_date || null, is_priority ?? 0, is_completed ?? 0], (err, result) => {
      if (err) {
        console.error("Error creating task:", err.message);
        return res.status(500).json({ error: "Failed to create task" });
      }
      res.status(201).json({
        message: "Task created successfully",
        task_id: result.insertId
      });
    }
  );
};

//update task
exports.updateTask = (req, res) => {
  const {id} = req.params;
  const {task_description, due_date, is_priority, is_completed} = req.body;

  if (!task_description) {
    return res.status(400).json({ error: "task_description is required" });
  }

  const sql = "UPDATE tasks SET task_description = ?, due_date = ?, is_priority = ?, is_completed = ? WHERE task_id = ?";
  db.query(sql, [task_description, due_date || null, is_priority ? 1 : 0, is_completed ? 1 : 0, id], (err, result) => {
      if (err) {
        console.error("Error updating task:", err.message);
        return res.status(500).json({ error: "Failed to update task" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json({ message: "Task updated successfully" });
    }
  );
};

//delete task
exports.deleteTask = (req, res) => {
  const {id} = req.params;

  const sql = "DELETE FROM tasks WHERE task_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting task:", err.message);
      return res.status(500).json({ error: "Failed to delete task" });
    }
    res.json({ message: "Task deleted successfully" });
  });
};

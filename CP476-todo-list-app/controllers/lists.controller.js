const db = require("../database/db");

//get all lists from db
exports.getAllLists = (req, res) => {
  const sql = "SELECT * FROM lists";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching lists:", err.message);
      return res.status(500).json({ error: "Failed to get lists" });
    }
    res.json(results);
  });
};

//create a new list 
exports.createList = (req, res) => {
  const {user_id, list_name} = req.body;
  if (!user_id || !list_name) {
    return res.status(400).json({ error: "user_id and list_name are required" });
  }

  const sql = "INSERT INTO lists (user_id, list_name) VALUES (?, ?)";
  db.query(sql, [user_id, list_name], (err, result) => {
    if (err) {
      console.error("Error creating list:", err.message);
      return res.status(500).json({ error: "Failed to create list" });
    }
    res.status(201).json({
      message: "List created successfully",
      list_id: result.insertId
    });
  });
};

//delete existing list by id
exports.deleteList = (req, res) => {
  const {id} = req.params;

  const sql = "DELETE FROM lists WHERE list_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting list:", err.message);
      return res.status(500).json({ error: "Failed to delete list" });
    }
    res.json({ message: "List deleted successfully" });
  });
};
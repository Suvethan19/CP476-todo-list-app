const express = require("express");
const path = require("path");
require("./database/db");
const app = express();

app.use(express.json());

//routes
const listRoutes = require("./routes/lists.routes");
const taskRoutes = require("./routes/tasks.routes");

//main page --> index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});
app.use("/api/lists", listRoutes);
app.use("/api/tasks", taskRoutes);

//serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

//start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});



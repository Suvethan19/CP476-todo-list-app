const express = require("express");
const app = express();
const taskRoutes = require("./routes/tasks.routes");

app.use(express.json());
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("CP476 To-Do App Backend is running");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
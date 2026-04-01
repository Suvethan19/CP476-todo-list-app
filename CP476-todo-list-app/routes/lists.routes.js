const express = require("express");
const router = express.Router();
const listController = require("../controllers/lists.controller");

router.get("/", listController.getAllLists);
router.post("/", listController.createList);
router.delete("/:id", listController.deleteList);

module.exports = router;
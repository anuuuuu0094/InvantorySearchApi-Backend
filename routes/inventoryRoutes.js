const express = require("express");
const router = express.Router();

const {
  createInventory,
  getInventory,
  getInventorySummary
} = require("../controllers/inventoryController");

const validate = require("../middleware/validate")

router.post("/inventory", validate , createInventory);
router.get("/inventory", getInventory);
router.get("/inventory/summary", getInventorySummary);

module.exports = router;
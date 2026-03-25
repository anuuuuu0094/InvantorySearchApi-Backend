const express = require("express");
const router = express.Router();

const { createSupplier } = require("../controllers/supplierController");

router.post("/supplier", createSupplier);

module.exports = router;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const supplierRoutes = require("./routes/supplierRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const searchRoutes = require("./routes/searchRoutes");

app.use("/", supplierRoutes);
app.use("/", inventoryRoutes);
app.use("/", searchRoutes);

module.exports = app;

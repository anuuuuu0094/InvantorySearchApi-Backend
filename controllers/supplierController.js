const pool = require("../config/db");

const createSupplier = async (req, res) => {
  const { name, city } = req.body;

  if (!name || !city) {
    return res.status(400).json({ message: "name aur city required hai" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO suppliers (name, city) VALUES ($1, $2) RETURNING *",
      [name, city]
    );

    res.status(201).json({
      message: "supplier add ho gaya",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = { createSupplier };
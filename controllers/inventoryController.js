const pool = require("../config/db");


const createInventory = async (req, res) => {
  const { supplier_id, product_name, quantity, price } = req.body;

  if (!supplier_id || !product_name || quantity == null || !price) {
    return res.status(400).json({ message: "sab fields required hai" });
  }
    
  if (quantity < 0 || price <= 0) {
    return res.status(400).json({
      message: "quantity >= 0 aur price > 0 hona chahiye",
    });
  }

  try {
    const supplierCheck = await pool.query(
      "SELECT * FROM suppliers WHERE id = $1",
      [supplier_id]
    );

    if (supplierCheck.rows.length === 0) {
      return res.status(400).json({
        message: "invalid supplier_id",
      });
    }

    const result = await pool.query(
      `INSERT INTO inventory (supplier_id, product_name, quantity, price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [supplier_id, product_name, quantity, price]
    );

    res.status(201).json({
      message: "inventory add ho gaya",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "server error" });
  }
};

const getInventory = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT inventory.*, suppliers.name AS supplier_name, suppliers.city
      FROM inventory
      JOIN suppliers ON inventory.supplier_id = suppliers.id
    `);

    res.json({
      count: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "server error" });
  }
};


const getInventorySummary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        suppliers.id,
        suppliers.name,
        suppliers.city,
        SUM(inventory.quantity * inventory.price) AS total_value
      FROM suppliers
      JOIN inventory 
        ON suppliers.id = inventory.supplier_id
      GROUP BY suppliers.id
      ORDER BY total_value DESC
    `);

    res.json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "server error" });
  }
};





module.exports = { createInventory, getInventory, getInventorySummary };
const pool = require("../config/db");

const searchItems = async (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  let query = `
    SELECT inventory.*, suppliers.name AS supplier_name, suppliers.city
    FROM inventory
    JOIN suppliers ON inventory.supplier_id = suppliers.id
    WHERE 1=1
  `;

  let values = [];
  let index = 1;

  if (q) {
    query += ` AND LOWER(inventory.product_name) LIKE LOWER($${index})`;
    values.push(`%${q}%`);
    index++;
  }

  if (category) {
    query += ` AND LOWER(inventory.category) = LOWER($${index})`;
    values.push(category);
    index++;
  }

  if (minPrice) {
    query += ` AND inventory.price >= $${index}`;
    values.push(Number(minPrice));
    index++;
  }

  if (maxPrice) {
    query += ` AND inventory.price <= $${index}`;
    values.push(Number(maxPrice));
    index++;
  }

  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    return res.status(400).json({
      message: "minPrice bada nahi ho sakta maxPrice se",
    });
  }

  try {
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.json({
        message: "No results found",
        data: [],
      });
    }

    res.json({
      count: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = { searchItems };
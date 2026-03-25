const pool = require("../config/db");

const seedData = async () => {
  try {
    await pool.query("DELETE FROM inventory");
    await pool.query("DELETE FROM suppliers");

    await pool.query(`
      INSERT INTO suppliers (name, city) VALUES
      ('Tech World', 'Delhi'),
      ('Fashion Hub', 'Mumbai'),
      ('Home Comforts', 'Bangalore'),
      ('Gadget Zone', 'Noida'),
      ('Style Street', 'Pune')
    `);

    await pool.query(`
      INSERT INTO inventory (supplier_id, product_name, quantity, price, category) VALUES
      (1, 'iPhone 13', 8, 65000, 'electronics'),
      (1, 'Samsung Galaxy S21', 10, 55000, 'electronics'),
      (1, 'Dell Inspiron Laptop', 5, 70000, 'electronics'),

      (2, 'Nike Running Shoes', 20, 4500, 'fashion'),
      (2, 'Adidas T-shirt', 30, 2000, 'fashion'),
      (2, 'Levi Jeans', 15, 3500, 'fashion'),

      (3, 'Wooden Dining Table', 4, 15000, 'furniture'),
      (3, 'Office Chair', 10, 7000, 'furniture'),
      (3, 'Sofa Set', 2, 30000, 'furniture'),

      (4, 'Sony Headphones', 12, 8000, 'electronics'),
      (4, 'Smart Watch', 18, 6000, 'electronics'),

      (5, 'Puma Jacket', 10, 5000, 'fashion'),
      (5, 'Casual Shirt', 25, 1500, 'fashion')
    `);

    console.log("✅ Data inserted successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();
const validateInventory = (req, res, next) => {
  const { quantity, price } = req.body;

  if (quantity < 0 || price <= 0) {
    return res.status(400).json({
      message: "quantity >= 0 aur price > 0 hona chahiye",
    });
  }

  next(); 
};

module.exports = validateInventory;
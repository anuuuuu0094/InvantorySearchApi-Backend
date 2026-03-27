# Inventory APIs & Database

##  Requirement

The backend required:

* A search API (`GET /search`) with filters:

  * product name (partial match)
  * category
  * minPrice and maxPrice
* Case-insensitive search
* Multiple filters working together
* Return all results if no filters are applied

Additionally, a database system was needed with:

* Suppliers and Inventory tables
* One-to-many relationship (supplier → inventory)
* APIs to create and fetch data
* A query to group inventory by supplier and calculate total value

---

## 💡 What I Implemented

Instead of using in-memory data, I used PostgreSQL to make the system more realistic.

* Created two tables: **suppliers** and **inventory**
* Linked them using a foreign key (`supplier_id`)
* Added validations like:

  * quantity ≥ 0
  * price > 0

### APIs built:

* `GET /search` → dynamic filtering using query params
* `POST /supplier` → add supplier
* `POST /inventory` → add inventory
* `GET /inventory` → fetch all inventory
* `GET /inventory/summary` → grouped data by supplier

The search API builds a query dynamically based on provided filters, so only relevant conditions are applied.

---

##  Search Logic (Backend)

* If `q` is present → match product name using case-insensitive search
* If `category` is provided → filter by category
* If price range is given → filter accordingly
* If no filters → return all records

---

##  One Optimization

For larger datasets, I would add indexes on frequently used fields like:

* `product_name`
* `category`
* `supplier_id`

This will improve search and join performance.

---

##  Note

The assignment allowed in-memory data, but I chose SQL to better handle relationships and make the system scalable.

## Search Logic

The frontend sends search parameters (like product name, category, and price range) to the backend using query params.

* If the user enters a product name, it searches using partial match
* Category filter is applied using a dropdown selection
* Price range filters results between min and max values
* If no filters are applied, all products are fetched and displayed

This keeps the UI simple while allowing flexible filtering.

---

## Performance Improvement

If the dataset becomes large, I would avoid fetching all data at once and implement **pagination or lazy loading**.

This ensures that only a limited number of results are loaded at a time, improving performance and user experience.

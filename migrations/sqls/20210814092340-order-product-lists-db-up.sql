/* Replace with your SQL commands */
CREATE TABLE order_product_lists (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id)
)
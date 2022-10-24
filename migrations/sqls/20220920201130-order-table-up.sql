/* Replace with your SQL commands */
CREATE TYPE check_status AS ENUM('active', 'complete', 'pending', 'cancelled','shipped');
CREATE TABLE orders(id SERIAL PRIMARY KEY NOT NULL, order_status check_status NOT NULL, order_total INTEGER, user_id bigint REFERENCES users(id) NOT NULL);

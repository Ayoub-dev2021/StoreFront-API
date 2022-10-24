/* Replace with your SQL commands */
CREATE TYPE country AS ENUM('eg', 'sa', 'ae', 'us','kw','uk','fr','trk');
CREATE TABLE users (id SERIAL PRIMARY KEY NOT NULL, first_name VARCHAR(50) NOT NULL,last_name VARCHAR(50),  user_email VARCHAR(50) NOT NULL, user_password VARCHAR NOT NULL, user_address TEXT, user_phone bigint, user_country country);
-- sudo -u postgres psql

CREATE DATABASE user_management;
\c user_management


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (name, email, password, role)
VALUES ('Yuktha', 'yuktha.creddy@gmail.com', crypt('iamgod', gen_salt('bf', 10)), 'admin');

-- SELECT * FROM users;

-- UPDATE users
-- SET name = 'User Updated', email = 'user@gmail.com', role = 'user', updated_at = CURRENT_TIMESTAMP
-- WHERE id = 1;

-- DELETE FROM users WHERE id = 1;

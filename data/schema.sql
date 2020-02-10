DROP TABLE IF EXISTS users;
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(10),
    password VARCHAR(255)
);

INSERT into users (username, password) VALUES ('admin', crypt('mochicool1', gen_salt('bf', 8)));



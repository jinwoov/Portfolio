DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(10),
    password VARCHAR(255)
);

INSERT into users (username, password) VALUES ('admin', crypt('ilovea11y', gen_salt('bf', 8)));



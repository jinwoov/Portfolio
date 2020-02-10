DROP TABLE IF EXISTS user_storage;

CREATE TABLE user_storage
(
    user_id INTEGER, 
    user_storage_id INTEGER,
    title VARCHAR(255),
    summary TEXT,
    url VARCHAR(255),
    FOREIGN KEY (user_storage_id) REFERENCES users (id)
);

INSERT into user_storage (user_id,user_storage_id, title, summary, url) VALUES (1, 1, 'Jumpstart', '<strong>F</strong>ullstack application that has compilation of job listings from four different APIs into one website providing user to see the result in one search in randomized order. <strong>A</strong>pplied PSQL database to store users favorited job and able to render whenever user seeks', './image/jumpstart.png');

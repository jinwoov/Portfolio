DROP TABLE IF EXISTS user_storage;

CREATE TABLE user_storage
(
    id SERIAL PRIMARY KEY,
    user_storage_id INTEGER,
    title VARCHAR(255),
    summary TEXT,
    url VARCHAR(255),
    image_url VARCHAR(255),
    FOREIGN KEY (user_storage_id) REFERENCES users (id)
);

INSERT into user_storage (user_storage_id, title, summary, url, image_url) VALUES (1, 'Jumpstart', '<strong>F</strong>ullstack application that has compilation of job listings from four different APIs into one website providing user to see the result in one search in randomized order. 

<strong>A</strong>pplied PSQL database to store users favorited job and able to render whenever user seeks', 'https://jumpstartcf.herokuapp.com/','./image/jumpstart.png');

INSERT into user_storage (user_storage_id, title, summary, url, image_url) VALUES (1, 'Book App', '<strong>F</strong>ullstack application that has Stored favorite book into PSQL database and render it to the users.

<strong>C</strong>reated backend server to call REST API and show it in front end using EJS files', 'https://bd-jk-booklists.herokuapp.com/','./image/book-app.png');

INSERT into user_storage (user_storage_id, title, summary, url, image_url) VALUES (1, 'Star Hunt Wars', '<strong>P</strong>ersonality quiz based on Star Wars trilogy and allow user to store data to render at the end.', 'https://jinwoov.github.io/Star-Hunt-Wars/','./image/star-hunt-wars.png');
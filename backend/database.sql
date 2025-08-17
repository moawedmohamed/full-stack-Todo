-- Active: 1755287435327@@127.0.0.1@5432@perntodo
CREATE DATABASE perntodo;
\c perntodo

CREATE Table todo(
    todo_id serial PRIMARY KEY ,
    description VARCHAR(255)
);
ALTER TABLE todo
ADD COLUMN user_id INT REFERENCES users(id) ON DELETE CASCADE;

SELECT datname FROM pg_database;
select * from "todo";

CREATE Table users(id SERIAL PRIMARY KEY,username VARCHAR(30),email VARCHAR(30) UNIQUE ,password VARCHAR(50) )

ALTER TABLE users ALTER COLUMN password TYPE VARCHAR(255);

CREATE DATABASE chat_db;

CREATE TYPE genderType AS ENUM ('Male', 'Female');
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  phoneNumber VARCHAR(20) NOT NULL,
  gender genderType NOT NULL,
  password VARCHAR(250) NOT NULL,
  profilePicture VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TYPE messageType AS ENUM ('text', 'image', 'video');

CREATE TABLE IF NOT EXISTS chats (
      chat_id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
      

CREATE TABLE IF NOT EXISTS users_chats (
    user_id INT,
    chat_id INT,
    PRIMARY KEY (user_id, chat_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
    );

CREATE TABLE IF NOT EXISTS groups (
          group_id SERIAL PRIMARY KEY,
          group_name VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

CREATE TABLE IF NOT EXISTS users_groups (
  user_id INT,
  group_id INT,
  PRIMARY KEY (user_id, group_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (group_id) REFERENCES groups(group_id)
  );

CREATE TABLE IF NOT EXISTS messages (
  message_id SERIAL,
  type messageType NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT,
  chat_id INT,
  group_id INT,
  PRIMARY KEY (user_id, message_id),
  FOREIGN KEY (chat_id) REFERENCES chats(chat_id),
  FOREIGN KEY (group_id) REFERENCES groups(group_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
    );


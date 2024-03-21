const { query } = require('./db');

const createTables = async () => {
  try {
    await query(createUsersTableQuery);
    await query(createMessagesTableQuery);
    await query(createChatsTableQuery);
    await query(createUsersChatsTableQuery);
    await query(createGroupsTableQuery);
    await query(createUsersGroupsTableQuery);
    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error.message);
  }
};

const createUsersTableQuery = `
  CREATE TYPE genderType AS ENUM ('Male', 'Female');
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    gender genderType NOT NULL,
    password VARCHAR(50) NOT NULL,
    profilePicture VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createMessagesTableQuery = `
  CREATE TYPE messageType AS ENUM ('text', 'image', 'video');
  CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    type messageType NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    chat_id INT,
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
  )
`;

const createChatsTableQuery = `
  CREATE TABLE IF NOT EXISTS chats (
    chat_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createUsersChatsTableQuery = `
  CREATE TABLE IF NOT EXISTS users_chats (
    user_id INT,
    chat_id INT,
    PRIMARY KEY (user_id, chat_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
  )
`;

const createGroupsTableQuery = `
  CREATE TABLE IF NOT EXISTS groups (
    group_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createUsersGroupsTableQuery = `
  CREATE TABLE IF NOT EXISTS users_groups (
    user_id INT,
    group_id INT,
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (group_id) REFERENCES groups(group_id)
  )
`;

module.exports = { createTables };

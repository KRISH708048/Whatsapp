const { Pool } = require('pg')
var config = require('../Config/config')

const pool = new Pool({
  user: config.development.database.user,
  host: config.development.database.host,
  database: config.development.database.database,
  password: config.development.database.password,
  port: config.development.database.port
})

const createUsersTable = (async () => {
  const query = `
  create table if not exists users (
    user_id serial primary key,
    name varchar(255) not null,
    phoneNumber varchar(20) not null,
    created_at timestamp default current_timestamp
  );`

  try {
    await pool.query(query)
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table: ', error.message);
  }
})

const createMessagesTable = (async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS messages (
      message_id SERIAL PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      content TEXT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      chat_id INT,
      FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
    );
  `;
  try {
    await pool.query(query);
    console.log('Messages table created successfully');
  } catch (error) {
    console.error('Error creating messages table:', error.message);
  }
})

// Create chats table
const createChatsTable = (async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS chats (
      chat_id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('Chats table created successfully');
  } catch (error) {
    console.error('Error creating chats table:', error.message);
  }
})

// Create users_chats table (N:M relationship)
const createUsersChatsTable = (async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users_chats (
      user_id INT,
      chat_id INT,
      PRIMARY KEY (user_id, chat_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
    );
  `;
  try {
    await pool.query(query);
    console.log('Users_Chats table created successfully');
  } catch (error) {
    console.error('Error creating users_chats table:', error.message);
  }
})

// Create groups table
const createGroupsTable = (async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS groups (
      group_id SERIAL PRIMARY KEY,
      -- Add other group details columns here
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('Groups table created successfully');
  } catch (error) {
    console.error('Error creating groups table:', error.message);
  }
})

// Create users_groups table (N:M relationship)
const createUsersGroupsTable = (async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users_groups (
      user_id INT,
      group_id INT,
      PRIMARY KEY (user_id, group_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (group_id) REFERENCES groups(group_id)
    );
  `;
  try {
    await pool.query(query);
    console.log('Users_Groups table created successfully');
  } catch (error) {
    console.error('Error creating users_groups table:', error.message);
  }
})

// Call the functions to create the tables
const createTables = (async () => {
  await createUsersTable();
  await createMessagesTable();
  await createChatsTable();
  await createUsersChatsTable();
  await createGroupsTable();
  await createUsersGroupsTable();
})

// Call the createTables function to execute the creation
createTables()
  .then(() => pool.end())
  .catch((err) => console.error('Error creating tables:', err));
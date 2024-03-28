const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authMiddleware, register, signIn } = require('../Middleware/login');
const { query } = require('../models/db');
const app = express();
const JWT_SECRET_KEY = "hello@123";
app.use(express.json());

const findUserQuery = `
      SELECT * FROM users WHERE name = $1;
    `;

const matchUserQuery = `
      SELECT * FROM users WHERE name = $1 AND password = $2;
    `;

// sign-up   
app.post('/sign-up', register, async (req, res) => {
  const { username, phoneNumber, password, confirmPassword, gender } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  try {
    const valueUser = [username, password];
    const existingUser = await query(findUserQuery, valueUser[0]);
    if (existingUser.rows.length > 0) {
      return res.status(403).send("User already exists. Please log in.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const insertQuery = `
      INSERT INTO users (name, phoneNumber, gender, password,profilePicture created_at)
      VALUES ($1, $2, $3, $4,$5 current_timestamp)
      RETURNING user_id, name, phoneNumber, profilePicture;
    `;

    const values = [username, phoneNumber, gender, hashedPassword, gender === "Male" ? boyProfilePic : girlProfilePic];
    const result = await query(insertQuery, values);

    if (result.rowCount == 0) {
      return res.status(403).json({
        msg: "Error creating user",
      });
    }

    const matchingUser = await query(matchUserQuery, valueUser);

    const userId = matchingUser.rows[0].user_id;
    const token = jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: '15d' });

    res.status(200).json({
      msg: "User created successfully",
      token
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// sign -in 
app.post('/sign-in', signIn, async (req, res) => {

  const { username, password } = req.body;
  try {
    const valueUser = [username, password];
    const existingUser = await query(findUserQuery, valueUser[0]);
    if (existingUser.rows.length === 0) {
      return res.status(403).json({ msg: "sign-up first!" });
    }
    const matchingUser = await query(matchUserQuery, valueUser);
    if (matchingUser.rows.length === 0) {
      return res.status(403).json({
        msg: "Incorrect Username/password!"
      })
    }

    const userId = matchingUser.rows[0].user_id;
    const token = jwt.sign({ userId }, JWT_SECRET_KEY);

    res.status(200).json({
      msg: "User signed in successfully",
      token: token
    });

  }
  catch (error) {
    console.error("Error signing in user:", error.message);
    res.status(500).send("Internal Server Error");
  }


})


// get all groups and chats
app.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  let groups = [];
  let chats = [];

  try {
    const getGroupsQuery = `
      SELECT group_name 
      FROM groups 
      WHERE group_id IN (
        SELECT ug.group_id 
        FROM users u 
        INNER JOIN users_groups ug ON u.user_id = ug.user_id 
        WHERE u.user_id = $1
      );
    `;
    const allGroups = await query(getGroupsQuery, [userId]);
    groups = allGroups.rows.map(group => ({ _id: group.group_id, _name: group.group_name }));

    const getChatsQuery = `
      SELECT name
      FROM users
      WHERE user_id IN (
        SELECT chat_id
        FROM users_chats
        WHERE user_id = $1
      );
    `;
    const allChats = await query(getChatsQuery, [userId]);
    chats = allChats.rows.map(chat => ({ _id: chat.chat_id, _name: chat.chat_name }));

    const friends = { chats: chats, groups: groups };

    res.status(200).json({ friends });
  } catch (error) {
    console.error("Error fetching groups and chats:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
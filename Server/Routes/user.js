const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {authMiddleware , register} = require('../Middleware/login');
const { query } = require('../models/db');
const app = express();
const JWT_SECRET_KEY = "hello@123";
app.use(express.json());

app.post('/sign-up',register, async (req, res) => {
  const { username, phoneNumber, password, confirmPassword, gender } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(403).send("User already exists. Please log in.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    // Insert user into the database
    const insertQuery = `
      INSERT INTO users (name, phoneNumber, gender, password,profilePicture created_at)
      VALUES ($1, $2, $3, $4,$5 current_timestamp)
      RETURNING user_id, name, phoneNumber, profilePicture;
    `;
    const values = [username, phoneNumber,gender, hashedPassword, gender ==="Male"?boyProfilePic:girlProfilePic ];
    const result = await query(insertQuery, values);

    // Generating JWT token
    const userId = result[0].user_id;
    const token = jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: '15d' });

    res.status(200).json({
      message: "User created successfully",
      token
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/sign-in',authMiddleware , async (req,res)=>{
    

})
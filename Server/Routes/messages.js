const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET_KEY = "hello@123";
const { authMiddleware } = require('../Middleware/login');
const { query } = require('../models/db');

app.use(express.json());

app.get('/:id', authMiddleware, async (req, res) => {
    const userId = req.user.userId;
    const chatId = req.params.id;

    const getMessageQuery = `
        SELECT user_id, chat_id, message_id, content
        FROM messages
        WHERE (user_id = $1 AND chat_id = $2) OR (user_id = $2 AND chat_id = $1)
        ORDER BY timestamp DESC;     
    `;

    try {
        let conversations = await query(getMessageQuery, [userId, chatId]);
        conversations = conversations.rows.map(message => ({
            sender_id: message.user_id,
            receiver_id: message.chat_id,
            message: message.content
        }));

        res.status(200).json({ conversations });
    } catch (error) {
        console.error("Error fetching conversations:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/send/:id",authMiddleware,async (req,res)=>{
    
})
const express = require('express');
const jwt = require('jsonwebtoken');
const {authMiddleware , register} = require('../Middleware/login');
const app = express();

app.use(express.json());

app.post('/sign-up', register ,async (req,res)=>{
    const details = req.body;
    const existing = await User.findOne({phNumber : details.phNumber})
    if(!existing){

        // const token = jwt.sign({ userId }, JWT_SECRET_KEY);
        res.status(400).json({
            message : "User Successfully created",
            token
        });
    }
    res.status(403).send("Already exist, login!");
})

// https://avatar.iran.liara.run/public/boy?username=${username}

app.post('/sign-in', async (req,res)=>{

})
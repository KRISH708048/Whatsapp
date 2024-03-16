const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

app.post('/sign-up',async (req,res)=>{

    const details = req.body;

    const existing = await User.findOne({phNumber : details.phNumber})
    if(!existing){
        
    }
})
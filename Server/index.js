const express = require('express');
const rootRouter = require("./routes/index");
const app = express();
const cors = require("cors");
const dotenv =require('dotenv');
dotenv.config();
const port  = process.env.PORT || 8000;
app.use(express.json());


app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(port,()=>{
    console.log(`running on port ${port}`);
});
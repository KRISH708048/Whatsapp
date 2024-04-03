const express = require('express');
const rootRouter = require("./routes/index");
const app = express();
const cors = require("cors");
const dotenv =require('dotenv');
const {createTables} = require('./models/createTabels');
const {query} = require('./models/db');
dotenv.config();
const port  = process.env.PORT || 8000;
app.use(express.json());

app.use(cors());
app.use(express.json());

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT
//   // connectionString:"postgresql://User_owner:RvbA3f1qZzjk@ep-soft-bird-a1zpc4ts-pooler.ap-southeast-1.aws.neon.tech/User?sslmode=require"
// });


// createTables()
//   .then(() => {
//     console.log('Tables created successfully');
//     return query('SELECT * FROM users');
//   })
//   .then((result) => console.log('Query result:', result))
//   .catch((error) => console.error('Error:', error.message));

app.use("/api/v1", rootRouter);

app.listen(port,()=>{
    console.log(`running on port ${port}`);
});
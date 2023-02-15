const express = require('express')
const app = express()
const mongoose = require("mongoose");
const cors = require('cors');

mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 8000

require("dotenv").config();
const connectDB = require("./Config/db");
connectDB();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/Client', require('./Client/Routes/AuthClient')) 

app.listen(PORT ,()=>console.log(`server runing on port ${PORT}`))


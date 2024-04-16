const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//dotenv
dotenv.config()

//mongo connection
connectDB()

//rest object
const app = express()

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//listen server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
});
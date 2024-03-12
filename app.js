const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(cookieParser());
app.use(express.json());

const userRoute = require('./routes/user');

app.use(userRoute);


mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('connected to database');
        app.listen(process.env.PORT);
    })
    .catch(err => console.log(err));


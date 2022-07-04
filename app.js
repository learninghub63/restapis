const express = require("express");
const app = express();
const http = require('https');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./db');
const { Schema } = mongoose;

app.use(express.json());
app.set('port', (5000));

// call database
db();

// get method
app.get('/', async (req, res) => {
    res.send('hello world')
})

// user schema
const userData = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const user = new mongoose.model('users', userData);

// post method
app.post('/', async (req, res) => {
    let name = req.body.name;
    let email = req.body.email

    const users = user({ name: name, email: email });

    const rest = await users.save();

    res.status(200).json({
        messga: "user details inserted successfully",
        data: rest
    });
    res.end();
})


// server listing on port 5000
app.listen(5000, () => {
    console.log(`server listen on port  5000`)
})

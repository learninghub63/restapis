const express = require("express");
const app = express();
const http = require('https');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dataBase = require('./db');
const { Schema } = mongoose;
const http = require('http');

app.use(express.json());
app.set('port', (5000));

// call database
dataBase();

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


// get method
app.get('/getuser', async (req, res) => {
    const result = await user.find({}, {});
    res.send({
        "mesaage": 'Users fetch successfully',
        "data": result
    })

})

// post method
app.post('/ragister', async (req, res) => {

    let name = req.body.name;
    let email = req.body.email

    const users = user({ name: name, email: email });

    const rest = await users.save();

    res.status(200).json({
        messages: "user ragister successfully",
        data: rest
    });
    // console.log("hello", JSON.stringify(req.body))
    res.end();
})

// update user

// app.put('/updateuser', async (req, res) => {
//     let name = req.body.name;
//     let email = req.body.email
//     let id = req.body.id
//     const result = await user.findByIdAndUpdate(id, {
//         $set: {
//             name: name,
//             email: email
//         }
//     }
//     );
//     const result1 = await user.find({}, {});
//     res.send({
//         "mesaage": 'Users fetch successfully',
//         "data": result1
//     })
// });

// update user
app.put('/updateuser', async (req, res) => {
    let name = req.body.name;
    let email = req.body.email
    let id = req.body.id
    const result = await user.findByIdAndUpdate(id, {
        $set: {
            name: name,
            email: email
        }
    }
    );
    const result1 = await user.findOne({ _id: id });
    res.send({
        "mesaage": 'User updated successfully',
        "data": result1
    })
});

// delete user;

app.delete('/deleteuser', async (req, res) => {
    const id = req.query.id
    const result = await user.deleteOne({ id: id })
    console.log(result)
    res.json(result)
});







// server listing on port 5000
app.listen(7000);

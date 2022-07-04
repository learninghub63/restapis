
const mongoose = require('mongoose');

const database = () => {
    mongoose.connect(
        "mongodb+srv://admin:admin@cluster0.svy2fg8.mongodb.net/userdetails?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err, database) => {
            if (!err) {
                console.log("database connected successfully");
            } else {
                console.log(err);
            }
        }
    );

}

module.exports = database;
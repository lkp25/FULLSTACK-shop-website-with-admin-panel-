const mongoose = require('mongoose');
const Schema = mongoose.Schema



const userSchema = new Schema({
    password: {
        type: String,
        requred: true
    },
    email: {
        type: String,
        requred: true
    },
})

module.exports = mongoose.model('User', userSchema);
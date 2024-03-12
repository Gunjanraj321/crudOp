const { Schema, default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    date_time:{
        type: Date,
        default:Date.now,
    }

}, { strict: false });


module.exports = mongoose.model('user', userSchema);


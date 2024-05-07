//const mongoose = require('mongoose');
import {mongoose} from 'mongoose'

const messageSchema = new mongoose.Schema({
    message: String,
    user: String,
    date: { type: Date, default: Date.now }
});

//module.exports = mongoose.model('Message', messageSchema);
const Message = mongoose.model('Message', messageSchema);

export default Message;
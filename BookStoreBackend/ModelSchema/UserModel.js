// import { Schema, model } from 'mongoose';
const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
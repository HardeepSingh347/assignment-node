// import { mongoose } from 'mongoose';
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    thread: {
        // Chat Thread ID
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatThread" // Table Name
    },
    body: {
        type: String,
        default: null,
        trim: true
    },
    sender: {
        // User ID
        type: mongoose.Schema.Types.ObjectId,
        ref: "user" // Table Name
    },
    readBy: {
        type: [{
            // User ID
            type: mongoose.Schema.Types.ObjectId,
            ref: "user" // Table Name
        }],
        default: []
    },
}, {
    timestamps: true
});

// Index
messageSchema.index({
    thread: 1
});

// Middleware
// Error handling
messageSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(error);
    } else {
        next();
    }
});

const message = mongoose.model(
    "chatMessage",
    messageSchema
);

module.exports = message;
const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null,
        trim: true
    },
    type: {
        type: String,
        trim: true,
        lowercase: true,
        enum: ['direct', 'group'], // direct - one to one chat, group - group chat
        default: 'direct'
    },
    recipients: {
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
threadSchema.index({
    type: 1
});

// Middleware
// Error handling
threadSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(error);
    } else {
        next();
    }
});

const ChatThread = mongoose.model(
    "chatThread",
    threadSchema
);

module.exports = ChatThread;
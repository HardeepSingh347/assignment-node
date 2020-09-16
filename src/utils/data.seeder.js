const ThreadModel = require("../models/thread.model");
const MessageModel = require("../models/message.model");
const User = require("../models/user.model");

/** create user accounts */
exports.dataSeeders = async () => {
    try {
        /** check if already populated */
        const usersCollection = await User.find({});
        if (usersCollection.length > 0) {
            return;
        }

        const users = [
            new User({
                name: 'Hardeep Singh',
                email: 'hardeep@mail.com',
                password: '12345678'
            }),
            new User({
                name: 'Amit K Sharma',
                email: 'amit.k.sharma@mail.com',
                password: '12345678'
            }),
            new User({
                name: 'Sukhwinder Singh',
                email: 'sukhi@mail.com',
                password: '12345678'
            }),
            new User({
                name: 'Arun Kumar',
                email: 'arun.kumar@mail.com',
                password: '12345678'
            })
        ];

        /** create new database entry for user */
        for (const user of users) {
            await User.create(user);
        }
        console.log('User seeder runned.');
        seedChatThreads();
    } catch (error) {
        console.log('Seeder: Error - User', error);
    }
}

/** create chat threads */
seedChatThreads = async () => {
    try {
        /** check if already populated */
        const usersCollection = await User.find({});
        const chatThreadsCollection = await ThreadModel.find({});

        if (usersCollection.length < 3 || chatThreadsCollection.length > 0) {
            return;
        }

        const threads = [
            new ThreadModel({
                title: 'Group - hardeep/arun',
                type: 'group',
                recipients: [usersCollection[0]._id, usersCollection[1]._id, usersCollection[2]._id, ]
            }),

            new ThreadModel({
                type: 'direct',
                recipients: [usersCollection[0]._id, usersCollection[1]._id]
            }),
            new ThreadModel({
                type: 'direct',
                recipients: [usersCollection[0]._id, usersCollection[2]._id, ]
            }),
            new ThreadModel({
                title: 'Group - amit/hardeep/sukhi',
                type: 'group',
                recipients: [usersCollection[0]._id, usersCollection[3]._id, usersCollection[2]._id, ]
            }),
        ];

        /** create new database threads for user */
        for (const thread of threads) {
            await ThreadModel.create(threads);
        }
        // 
        console.log('Chat Thread seeder runned.');
        seedChatMessages();
    } catch (error) {
        console.log('Seeder: Error - Chat Thread', error);
    }
}

/** create chat messages */
seedChatMessages = async () => {
    try {
        /** check if already populated */
        const chatThreadsCollection = await ThreadModel.find({});
        const chatMessagesCollection = await MessageModel.find({});

        if (chatThreadsCollection.length < 3 || chatMessagesCollection.length > 0) {
            return;
        }

        const messageProto = [
            'Hello there',
            'How are you?',
            'I am good.',
            'What about you?',
            'I am also good.'
        ]

        for (const thread of chatThreadsCollection) {
            const chatThreadId = thread._id;
            const chatRecipients = thread.recipients;

            for (let i = 0; i < 3; i++) {
                const message = {
                    thread: chatThreadId,
                    body: messageProto[getRandomInt(9)],
                    sender: chatRecipients[getRandomInt(chatRecipients.length)],
                    readBy: [chatRecipients[getRandomInt(chatRecipients.length)]],
                }
                await MessageModel.create(message);
            }
        }

        console.log('Chat Message seeder runned.');
    } catch (error) {
        console.log('Seeder: Error - Chat Message', error);
    }
}

getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
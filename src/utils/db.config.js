const mongoose = require('mongoose');
const { dataSeeders } = require('./data.seeder');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected to database.');
    dataSeeders();
}).catch((e) => {
    console.log('Database connection failed.');
});
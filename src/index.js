const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./utils/db.config');
const http = require("http");

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// CORS Middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-custom-header, Authorization, Authorization-identity, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PATCH, DELETE, PUT");
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('hello world');
})
const appRoutes = require('./routes/app.routes');
app.use("/app", appRoutes);

// 404 Error
app.get('*', (req, res) => {
    return res.status(404).send({
        status: false,
        status_code: 404,
        message: "URL Not found."
    });
});

let server = http.Server(app);
server.listen(port, () => {
    console.log('Server is up on port ' + port);
    console.log('Running stagging server.');
});
const http = require('http');
const port = 3300;
const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.url,  { useNewUrlParser: true })
.then(() => {
    console.log("Connected to Database");
}).catch(err => {
    console.log(err);
    process.exit();
});

http.createServer(app).listen(port, () => {
    console.log("Server is listening on port " + port);
});
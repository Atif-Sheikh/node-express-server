const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const post = require('./routes/post');

require('./mongo');


//models

require('./model/post');

app.use(bodyParser.json());
app.use('/post', post);


app.listen(2000, () => {
    console.log('yahoooo server is running on port 2000 with nodemon');
});
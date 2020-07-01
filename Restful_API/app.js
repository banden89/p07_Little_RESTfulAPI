const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const postsRoute = require('./routes/posts');

//Middleware
app.use(bodyParser.json());
app.use('/posts', postsRoute);
// app.use('/posts', () => {
//     console.log('中介開啟~~');
// });

app.get('/', (req, res) => {
    res.send('We are on Home');
});

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('DB Connected!!')
);

app.listen(3000);
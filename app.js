const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(morgan('short'));

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended: false}));

const router = require('./routes/user.js');
app.use(router);

app.listen(3004, () =>{
    console.log("Server listening to port 3004");
});

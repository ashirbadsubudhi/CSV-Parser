//importing library
const express = require('express');
const path = require('path');
const mongoose = require('./configs/mongoose')
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

//defining port
const port = 8000;

const app = express();
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/upload/', express.static(__dirname + '/uploads/'));


//router
app.use('/', require('./routers'));

//start server
app.listen(port, function(err){
    if(err) 
        console.log('Error: ',err);
    else
        console.log('Server is running on PORT: ', port);
});
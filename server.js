require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const {PORT} = require('./config/keys');

//connect to client
app.use(
    cors({
        origin: process.env.CLIENT
    })
);
//Use bodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Load routes
const users = require('./routes/api/users');
const books = require('./routes/api/books');

//Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);


//Use routes
app.use('/api/users', users);
app.use('/api/books', books);



//CORS

//Db config
mongoose
    .connect(process.env.DATABASE_URL)
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err)=>console.log(err));

// mongoose.promise = Global.promise;

app.get('/', (req,res)=> {
    res.send('testing route');
})

app.listen(PORT, ()=> {
    console.log(`Bibliophile server started on port ${PORT}`);
});

module.exports = {app};
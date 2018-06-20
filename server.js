const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const {DATABASE_URL, PORT, CLIENT, JWT_SECRET, TEST_DATABASE_URL} = require('./config/config');

//connect to client
app.use(
    cors({
        origin: CLIENT
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
    .connect(DATABASE_URL)
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err)=>console.log(err));

// mongoose.promise = Global.promise;

app.get('/', (req,res)=> {
    res.send('testing route');
})

app.listen(PORT, ()=> {
    console.log(`Bibliophile server started on port ${PORT}`);
});

module.exports = {
    app, 
    DATABASE_URL, 
    PORT, 
    JWT_SECRET, 
    TEST_DATABASE_URL
}
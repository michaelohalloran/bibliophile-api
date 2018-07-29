const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const keys = require('./config/keys');

//connect to client
app.use(
    cors({
        origin: keys.CLIENT
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
    .connect(keys.DATABASE_URL)
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err)=>console.log(err));

// mongoose.promise = Global.promise;

app.get('/', (req,res)=> {
    res.send('testing route');
})

app.listen(keys.PORT, ()=> {
    console.log(`Bibliophile server started on port ${keys.PORT}`);
});

module.exports = app;
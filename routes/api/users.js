const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');


//Load User model
const User = require('../../models/User');

//@route GET api/users/test
//@desc Test users route
//@access Public
// router.get('/test', (req,res)=> {
//     res.json({msg: 'Hit the test user route'});
// });

//@route POST api/users/register
//@desc Register new user
//@access Public
router.post('/register', (req,res)=> {

    //destructure validation function
    const {errors, isValid} = validateRegisterInput(req.body);
    //if it's not valid, return the error
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email:req.body.email})
        .then(user=>{
            if(user) {
                return res.status(400).json({error: 'That email already exists'});
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err,salt)=> {
                    bcrypt.hash(newUser.password, salt, (err, hash)=> {
                        if(err) {throw err};
                        newUser.password = hash;
                        newUser.save()
                            .then(user=> res.json(user))
                            .catch(err=>console.log(err));
                    });
                });
            }
        })
});

//@route POST api/users/login
//@desc Login a user
//@access Public
router.post('/login', (req,res)=> {

    //destructure validation function
    const {errors, isValid} = validateLoginInput(req.body);
    //if it's not valid, return the error
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const password = req.body.password;

    User.findOne({email: req.body.email})
        .then(user=> {
            if(!user) {
                return res.status(404).json({notfound: 'User not found'});
            }

            bcrypt.compare(password, user.password)
                .then(isMatch=> {
                    if(isMatch) {
                        //make JWT payload
                        const payload = {id:user.id, name: user.name};
                        //sign the token
                        jwt.sign(
                            payload, 
                            process.env.JWT_SECRET,
                            {expiresIn: 3600},
                            (err,token)=> {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            });
                        // console.log('in login route ', req.user);
                    } else {
                        return res.status(400).json({error: 'Password incorrect'});
                    }
                })
        })
});


//@route GET api/users/protected
//@desc Access a dummy protected route
//@access Private
router.get('/protected',passport.authenticate('jwt',{session:false}), (req,res)=> {
    res.json({secret: 'Accessed protected route'});
});


module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {JWT_SECRET} = require('../../config/config');
const validateBookInput = require('../../validation/book');
const validateReviewInput = require('../../validation/review');

//Load User model
const User = require('../../models/User');
const Book = require('../../models/Book');


//@route GET api/books/test
//@desc Test books route
//@access Public
router.get('/test', (req,res)=> {
    res.json({msg: 'Hit the test books route'});
});

//@route GET api/books/all
//@desc Get all books
//@access Private
router.get('/all', passport.authenticate('jwt', {session:false}), (req,res)=> {
    const errors = {}
    Book.find({user: req.user.id})
        .populate('user')
        .then(books=> {
            if(!books) {
                errors.nobooks = 'There are no books';
                return res.status(404).json(errors);
            }
            res.json(books);
        })
        .catch(err=>res.status(404).json({nobooks: 'No books founds'}));
});

//@route GET api/books/:book_id
//@desc Get a single book
//@access Public
router.get('/:book_id', (req,res)=> {

    Book.findById(req.params.book_id)
        .populate('user')
        .then(book=>res.json(book))
        .catch(err=>res.status(404).json({nosuchbook: 'No such book'}));
});

//@route POST api/books
//@desc Create a new book item
//@access Private
router.post('/', passport.authenticate('jwt', {session:false}), (req,res)=> {
    //destructure validation function
    const {errors, isValid} = validateBookInput(req.body);
    //if it's not valid, return the error
    if(!isValid) {
        return res.status(400).json(errors);
    }

    //make new book object
    const bookFields = {};
    //associate this book with the user creating it
    bookFields.user = req.user.id;
    if(req.body.title) bookFields.title = req.body.title;
    if(req.body.author) bookFields.author = req.body.author;
    if(req.body.price) bookFields.price = req.body.price;
    if(req.body.rating) bookFields.rating = req.body.rating;
    if(req.body.image) bookFields.image = req.body.image;
    // if(req.body.review) bookFields.review = req.body.review;
    bookFields.review = '';
    
    //check if book already exists 
    Book.findOne({user: req.user.id, title: req.body.title})
        .then(title=> {
            if(title) {
                res.status(400).json({bookexists: 'You already entered this book'});
            } else {
                new Book(bookFields).save().then(book=>{
                    res.json(book)
                })
            }
        })
});

//@route POST api/books/review/:book_id
//@desc Create a new book review
//@access Private
router.post('/review/:book_id', passport.authenticate('jwt', {session:false}), (req,res)=> {
    const {errors, isValid} = validateReviewInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    //check if user already reviewed book; if not, create it
    Book.findById(req.params.book_id)        
        .then(book=> {
            //if the book review is not an empty string, that means it already has a review
            if(book.review!=='') {
                return res.status(400).json({alreadyreviewed: 'You already reviewed this book'})
            } else {
                const newReview = req.body.review;
                book.review = newReview;
                //save the newly reviewed book
                book.save().then(book=>res.json(book));
            }
        })
        .catch(err=>res.status(404).json({notfound:'Book not found'}));
});



//@route DELETE api/books/:id
//@desc Delete a book item
//@access Private
router.delete('/:id', passport.authenticate('jwt', {session:false}), (req,res)=>{
    
    //find the book by id
    Book.findById(req.params.id)
        .then(book=> {
            //check that it's the user's book
            if(book.user.toString() !== req.user.id) {
                return res.status(401).json({notauth: 'Not authorized'});
            }
        //delete it and save
            book.remove().then(()=>res.json({success: true}));
        })
        .catch(err=>res.json(err));
});



//@route DELETE api/books/review/:book_id
//@desc Delete a book review
//@access Private
router.delete('/review/:book_id', passport.authenticate('jwt', {session:false}), (req,res)=> {
    //Find the book
    Book.findById(req.params.book_id)
        .then(book=> {
            if(book.review === '') {
                return res.status(400).json({noreview: 'No review to delete'});
            }
            //if it is, delete it
            book.review = '';
            book.save().then(book=>res.json(book));
        })
        .catch(err=>res.json({notfound: 'Book not found'}));
    
});

//@route PUT api/books/review/:book_id
//@desc Edit a book review
//@access Private
router.put('/review/:book_id', passport.authenticate('jwt', {session:false}), (req,res)=> {
    //Find the book
    Book.findById(req.params.book_id)
        .then(book=> {
            if(book.review === '') {
                return res.status(400).json({noreview: 'No review to update'});
            }
            const updatedReview = req.body.review;
            book.review = updatedReview;
            book.save().then(book=>res.json(book));
        })
        .catch(err=>res.json({notfound: 'Book not found'}));
    
});

module.exports = router;
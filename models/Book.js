const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    }, 
    price: {
        type: Number
    },
    image: {
        type: String
    },
    rating: {
        type: String
    },
    review: {
        type: String
    }
});

const Book = mongoose.model('books', BookSchema);

module.exports = Book;
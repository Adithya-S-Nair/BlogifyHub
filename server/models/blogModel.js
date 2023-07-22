const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    // category: {
    //     type: String,
    //     required: true
    // },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    cover: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Blog = mongoose.model('Blog', blogModel);

module.exports = Blog;

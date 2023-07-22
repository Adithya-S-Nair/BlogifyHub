require("dotenv").config();
const path = require("path");
const Blog = require("../models/blogModel");
const fs = require('fs')

const fetchAllBlogs = async (req, res) => {
    try {
        blogData = await Blog.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 });
        res.status(200).json({ blogs: blogData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching blog' });
    }
}

const fetchBlogById = async (req, res) => {
    try {
        blogData = await Blog.findOne({ _id: req.params.id })
            .populate('author', ['username']);
        res.status(200).json({ blogs: blogData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching blog' });
    }
};

const writeBlog = (req, res) => {
    const { title, summary, content } = req.body
    const { originalname, path } = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath);
    const newBlog = new Blog({
        title,
        summary,
        content,
        cover:newPath,
        author: req.userId
    })
    newBlog.save()
        .then((response) => {
            res.status(200).json({ id: response._id, msg: 'new blog saved' })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: 'Error creating blog' });
        })
}

module.exports = {
    fetchAllBlogs,
    fetchBlogById,
    writeBlog
};
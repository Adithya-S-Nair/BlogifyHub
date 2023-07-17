require("dotenv").config();
const Blog = require("../models/blogModel");

const fetchAllBlogs = async (req, res) => {
    try {
        blogData = await Blog.find().populate('author',['username']);
        res.status(200).json({ blogs: blogData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching blog' });
    }
}

const fetchBlogById = async (req, res) => {
    try {
        blogData = await Blog.findOne({ _id: req.params.id });
        res.status(200).json({ blogs: blogData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching blog' });
    }
};

const writeBlog = (req, res) => {
    const { title, summary, content, cover } = req.body
    const newBlog = new Blog({
        title,
        summary,
        content,
        cover,
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
require("dotenv").config();
const path = require("path");
const Blog = require("../models/blogModel");
const fs = require('fs')

const fetchAllBlogs = async (req, res) => {
    try {
        const blogData = await Blog.find({ isHidden: false })
            .populate('author', ['username'])
            .sort({ createdAt: -1 });
        res.status(200).json({ blogs: blogData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching blogs' });
    }
}

const fetchBlogById = async (req, res) => {
    try {
        const blogData = await Blog.findOne({ _id: req.params.id })
            .populate('author', ['username']);
        res.status(200).json({ blogs: blogData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching blog' });
    }
};

const fetchMyBlogs = async (req, res) => {
    try {
        const blogData = await Blog.find({ author: req.userId }).select('title createdAt');
        res.status(200).json({ blogs: blogData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching my blog' });
    }
}

const writeBlog = (req, res) => {
    const { title, summary, category, location, content } = req.body
    const { originalname, path } = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath);
    const newBlog = new Blog({
        title,
        summary,
        category,
        location,
        content,
        cover: newPath,
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

const likeBlog = async (req, res) => {
    const { blogId } = req.params; // Assuming you're sending blogId and userId in the request body
    const userId = req.userId;

    try {
        // Find the blog post by its ID
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if the user has already liked the blog post
        const existingLikeIndex = blog.likes.findIndex(like => like.user.equals(userId));

        if (existingLikeIndex !== -1) {
            // If user already liked, remove the like
            blog.likes.splice(existingLikeIndex, 1);
        } else {
            // If user hasn't liked, add the like
            blog.likes.push({ user: userId });
        }

        // Save the updated blog post
        await blog.save();

        res.status(200).json({ message: 'Blog post like status toggled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllLikedBlogs = async (req, res) => {
    try {
        const likedBlogs = await Blog.find({ 'likes.user': req.userId, isHidden: false }).populate('author');
        return res.status(200).json(likedBlogs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const showHideBlog = async (req, res) => {
    try {
        const { blogId } = req.params; // Assuming blogId is provided in the request body

        if (!blogId) {
            return res.status(400).json({ message: 'Blog ID is required.' });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        // Toggle the value of isHidden
        blog.isHidden = !blog.isHidden;

        await blog.save();

        res.json({ message: `Blog ${blog.isHidden ? 'hidden' : 'shown'} successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    fetchAllBlogs,
    fetchBlogById,
    fetchMyBlogs,
    writeBlog,
    likeBlog,
    getAllLikedBlogs,
    showHideBlog
};
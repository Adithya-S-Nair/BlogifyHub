const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const checkAuth = require('../middlewares/checkAuth');
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })

// Define user routes
router.get('/', checkAuth, blogController.fetchAllBlogs);
router.get('/fetchsingle/:id', checkAuth, blogController.fetchBlogById);
router.get('/myblogs', checkAuth, blogController.fetchMyBlogs);
router.post('/new', checkAuth, uploadMiddleware.single('cover'), blogController.writeBlog);

module.exports = router;
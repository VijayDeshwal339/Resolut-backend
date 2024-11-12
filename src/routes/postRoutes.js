// postRoutes.js
const express = require('express');
const multer = require('multer');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', upload.single('image'), updatePost);
router.delete('/:id', deletePost);

module.exports = router;

const Post = require('../models/Post');
const fs = require('fs');

exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file.path;
    const newPost = new Post({ title, description, imageUrl });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const { title, description } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  post.title = title || post.title;
  post.description = description || post.description;
  post.imageUrl = req.file ? req.file.path : post.imageUrl;
  await post.save();
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  // Delete the image file from the server
  if (fs.existsSync(post.imageUrl)) {
    fs.unlinkSync(post.imageUrl);
  }

  // Use deleteOne instead of remove
  await post.deleteOne();
  res.json({ message: 'Post deleted' });
};

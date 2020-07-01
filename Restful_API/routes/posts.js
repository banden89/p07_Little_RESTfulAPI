const express = require('express');
const router = express.Router();
const Post = require('../models/Post') //Schema

//GET
router.get('/', async (req, res) => {
    //res.send('We are on posts');
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err) {
        res.json({message: err});
    }
});

//POST
router.post('/', async (req, res) => {
    //console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savePost = await post.save();
        res.json(savePost);
    }
    catch(err) {
        res.json({message: err});
    }
    // post.save()
    //     .then(data => {
    //         res.json(data);
    //     })
    //     .catch(err => {
    //         res.json({ message: err });
    //     });
});

//SPECIFIC POST
router.get('/:postId', async (req, res) => {
    try {
        //console.log(req.params.postId);
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }
    catch(err) {
        res.json({message: err});
    }
});

//DELETE
router.delete('/:postId', async (req, res) => {
    try {        
        const removePost = await Post.remove({_id: req.params.postId});
        res.json(removePost);
    }
    catch(err) {
        res.json({message: err});
    }
});

//UPDATE
router.patch('/:postId', async (req, res) => {
    try {        
        const updatePost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title}}
        );
        res.json(updatePost);
    }
    catch(err) {
        res.json({message: err});
    }
});

module.exports = router;
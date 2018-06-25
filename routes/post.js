const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Post Model 

require('../model/post');
const Post = mongoose.model('Post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts);
    } catch (error) {
        res.status(500)
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.find({ _id: req.params.postId });
        res.send(post);
    } catch (error) {
        res.status(500);
    }
});

router.post('/', async (req, res) => {
    try {
        const post = new Post();
        post.title = req.body.title;
        post.content = req.body.content;
        await post.save();
        res.send(post);
    } catch (error) {
        res.send(500)
    }
});

router.delete('/:id', (req, res) => {
    Users.findByIdAndRemove(req.params.id, (err, users) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err.message);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Form successfully deleted",
            id: users._id
        };
        return res.status(200).send(response);
    });
    console.log('Users Delete')
})

router.put('/:id', function (req, res) {
    Users.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, user) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err.message);
            return res.status(200).send({ ...user._doc, id: user._id });
        }
    )
})

module.exports = router;
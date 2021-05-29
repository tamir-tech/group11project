const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Para: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

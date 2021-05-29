const mongoose = require('mongoose');

const CommSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Para: {
        type: String,
        required: true
    }
});

const Comm = mongoose.model('Comm', CommSchema);

module.exports = Comm;
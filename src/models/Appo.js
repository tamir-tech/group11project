const mongoose = require('mongoose');

const AppoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    filed: {
        type: String,
        required: true
    },
    dname: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
        index: true
    },
    subject: {
        type: String,
        required: true
    }

});

const Appo = mongoose.model('Appo', AppoSchema);

module.exports = Appo;

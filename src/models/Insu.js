const mongoose = require('mongoose');

const InsuSchema = new mongoose.Schema({
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
    id: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    date2: {
        type: String,
        required: true,
        index: true
    },
    payment: {
        type: String,
        required: true
    },
    confirm: {
        type: String,
        required: true
    }
});

const Insu = mongoose.model('Insu', InsuSchema);

module.exports = Insu;

const mongoose = require('mongoose');

const articleShema = new mongoose.Schema({
    title: {
        required: true,
        type: 'String'
    },
    description: {
        required: true,
        type: 'String'
    },
    markdown: {
        required: true,
        type: 'String'
    },
    createdAt: {
        type: 'Date',
        default: Date.now()
    }
})

module.exports =mongoose.model('Article', articleShema)
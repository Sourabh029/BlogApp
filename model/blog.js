const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    body: {
        type: String,
        require: true
    },
    coverImage: {
        type: String
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    }
},
    { timestamps: true },

);



const blog = mongoose.model('Blog', schema);

module.exports = blog;


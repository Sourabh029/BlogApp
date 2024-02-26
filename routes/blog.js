const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const model = require('../model/blog');
const commentmodel = require('../model/comments');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('../utils/images/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname)
    }
})

const upload = multer({ storage: storage })

router.get('/addBlog', (req, res) => {
    res.render('addBlog', {
        user: req.user
    });
})


router.post('/addblog', function (req, res) {
    console.log(req.body);
    return res.send(req.title, req.description, req.createdBy);
})

router.post('/addnewBlog', async function (req, res) {
    const title = req.body.title;
    console.log(title);
    const desc = req.body.description;
    console.log(desc);
    console.log(req.body)
    //const coverImage = req.file.filename;
    const createdBy = req.user._id;
    // console.log(req.user._id);
    console.log(title, desc);
    const blog = await model.create({ title, body: desc, createdBy });
    return res.send(title, desc, createdBy);

})


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const blog = await model.findById(id);
    return res.render('blog', {
        user: req.user,
        blog: blog
    });
})

router.post('/comment/:id', async function (req, res) {
    console.log('in comment')
    const id = req.params.id;
    const comment = req.body.comment;
    const createdBy = req.user;
    console.log(id, comment, createdBy);
    const blog = await model.findById(id);
    let newcomment = await commentmodel.create({ blog_id: id, user_id: createdBy, message: comment, createdAt: Date.now() });
    console.log(newcomment);
    let allcomments = await commentmodel.find({ blog_id: id }).populate('user_id');
    res.locals.comments = allcomments;
    return res.render('blog', {
        blog: blog,
        user: req.user,
        allcomments: allcomments
    });

})


module.exports = router;
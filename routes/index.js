const express = require('express');
const router = express.Router();
const model = require('../model/user');

router.get('/signin', (req, res) => {
    res.render('signin');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})
router.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    const isMatch = await model.matchPassword(email, password);
    if (isMatch) {
        return res.redirect('/');
    }


})

router.post('/signup', async (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);
    await model.create({ name, email, password });
    return res.redirect('/');

})


module.exports = router;
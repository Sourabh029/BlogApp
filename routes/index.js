const express = require('express');
const router = express.Router();
const model = require('../model/user');

router.get('/signin', (req, res) => {
    res.render('signin');
})

router.get('/Logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})


router.get('/signup', (req, res) => {
    res.render('signup');
})
router.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    try {
        const isMatch = await model.matchPassword(email, password);
        console.log(isMatch);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
        return res.cookie('token', isMatch).redirect('/');
    }
    catch (err) {
        console.log("inerr")
        console.log(err);
        return res.render('signin', { error: "Invalid email or password" });
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
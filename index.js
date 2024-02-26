//adding dependencies
const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routes/index');
const port = 3000;
const cookieParser = require('cookie-parser');
const cookieChecker = require('./middleware/auth');
const blogRouter = require('./routes/blog');
const model = require('./model/blog');

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use(cookieParser());
app.use(cookieChecker('token'))
app.use('/blog', blogRouter);

app.get('/', async (req, res) => {
    //console.log(req.user);
    let allblogs = await model.find({});
    return res.render('home', {
        user: req.user,
        blogs: allblogs,
    });
})






app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
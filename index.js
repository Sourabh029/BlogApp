//adding dependencies
const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routes/index');
const port = 3000;

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.render('home');
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
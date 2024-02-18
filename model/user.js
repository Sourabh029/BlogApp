const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
mongoose.connect('mongodb+srv://cyber:cyber@cluster0.l4gvtwj.mongodb.net/BlogUser');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    salt: {
        type: String,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },
    profileurl: {
        type: String,
        trim: true,
        default: '../utils/images/avatar.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }


},
    { timestamp: true });


userSchema.static("matchPassword", function (email, password) {
    console.log(email, password + "matchPassword");;
    let user = this.findOne({ email: 'sourabh2@gmail.com' });
    console.log(user.name);
    console.log(user.salt);
    if (!user) return false;
    let hash = createHmac('sha256', user.salt).update(user.password).digest('hex');
    if (hash === password) return true;

})

userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    let salt = randomBytes(16).toString();
    let password = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    user.password = password;
    user.salt = salt;

    next();

})

const User = mongoose.model('User', userSchema);



module.exports = User;
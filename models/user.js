var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    accessToken:{
        type: String,
        required: true,
        unique: true
    },
    refreshToken:{
        type: String,
        required: false,
        unique: true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
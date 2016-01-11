var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    local            : {
        username     : String,
        password     : String
}   ,
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password)
};

mongoose.model('Users', userSchema);
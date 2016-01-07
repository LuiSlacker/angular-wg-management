var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    local: {
        name: String,
        password: String
    }

});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password)
};

mongoose.model('Users', userSchema);
const mongoose = require('mongoose');
const crypto = require('crypto');
 
//make schema model. 
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            max: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        role: {
            type: String,
            default: 'subscriber'
        },
        resetPasswordLink: {  //link for restting password. 
            data: String,
            default: ''
        }
    },
    { timestamps: true } // auto creation of createdAt, updatedAt
);
 

//virtual. Temporary field for password
userSchema
    .virtual('password')
    .set(function(password) { // no errow furnction in this case. 
        // create a temporarity variable called _password
        this._password = password; //used only within this function. 
        // generate salt
        this.salt = this.makeSalt();
        // encryptPassword
        this.hashed_password = this.encryptPassword(password);
    
    })
    .get(function() {
        return this._password; //get for login
    });

    // 1. How come userSchema.virtual can access this.encryptPassword? 
    // shouldn't it be this.methods.encryptPassword as encryptPassword was defined inside of "userSchema.methods"? 
    //Also, virtual function part was defined earlier than userSchema.methods. How come it can be hoisted when it is inside of object as well? 
 
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
 
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt) //create hash mac
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + ''; //make it into string
    }
};
 
module.exports = mongoose.model('User', userSchema);

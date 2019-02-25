require('dotenv').config()
const config = require("../../config");
var mongoose = require("mongoose");
require('../../models/user-model')

//Connect to database
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(config.DBURI,{ useNewUrlParser: true}, (err)  =>{
    if (err) {
        throw err;
    } else {
        var User = mongoose.model("User")
        var email = process.argv[2]
        var password = process.argv[3]
        User.findOne({ "admin": true }, (err, findedUser) => {
            if (!findedUser) {
                var user = new User({
                    email: email,
                    password: password,
                    admin:true,
                });
                user.save().catch(e => { throw e })
            }
        })
    }
})

